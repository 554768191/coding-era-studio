/**
 * Created by Yan on 15/12/24.
 */

"use strict";

angular.module('core').config([
        function(){

            String.prototype.startWith=function(str,doTrim){
                var s=(typeof doTrim!=='undefined'&&!!doTrim)?this.trim():this;
                return (typeof str==='string') && s.length>=str.length && s.substr(0,str.length)===str;
            };
            String.prototype.endWith=function(str,doTrim){
                var s=(typeof doTrim!=='undefined'&&!!doTrim)?this.trim():this;
                return (typeof str==='string') && s.length>=str.length && s.substr(s.length-str.length)===str;
            };

        }
    ]).constant('ceMarkdownConfig',{
        toolbar:[
            {group:[
                {action:'bold',icon:'glyphicon-bold',tip:'加粗(Ctrl+B)'},
                {action:'italic',icon:'glyphicon-italic',tip:'斜体(Ctrl+I)'},
                {action:'header',icon:'glyphicon-header',tip:'标题(Ctrl+H)'}
            ]},
            {group:[
                {action:'ul',icon:'glyphicon-align-justify',tip:'无序列表(Ctrl+U)'},
                {action:'ol',icon:'glyphicon-list',tip:'有序列表(Ctrl+O)'},
                {action:'code',icon:'glyphicon-console',tip:'代码(Ctrl+K)'},
                {action:'quote',icon:'glyphicon-menu-right',tip:'引用(Ctrl+Q)'}
            ]},
            {group:[
                {action:'link',icon:'glyphicon-link',tip:'连接(Ctrl+L)'},
                {action:'img',icon:'glyphicon-picture',tip:'图片(Ctrl+G)'}
            ]},
            {group:[
                {action:'undo',icon:'glyphicon-repeat',tip:'撤销'},
                {action:'redo',icon:'glyphicon-refresh',tip:'重做'},
                {action:'preview',icon:'glyphicon-eye-open',tip:'浏览'},
                //{action:'fullscreen',icon:'glyphicon-fullscreen',tip:'全屏'}
            ]}
        ]
    })
    .factory('markdownActions',[function(){
        var syntax={
            bold:{prefix:'**',postfix:'**'},
            italic:{prefix:'_',postfix:'_'},
            code:{prefix:'```\n',postfix:'\n```'},
            link:{prefix:'[',postfix:'](src)'},
            img:{prefix:'![',postfix:'](src)'},

            header:{prefix:'### ',postfix:''},
            quote:{prefix:'> ',postfix:''},
            ul:{prefix:'- ',postfix:''},
            //ol:{},
            //indent:{},
            //outdent:{},
        };
        function inlineAction(cm,actionName,canStartWithSpace){
            var texts=cm.getSelections();
            var replacements=[];
            var prefix=syntax[actionName].prefix;
            var postfix=syntax[actionName].postfix;
            texts.forEach(function(text){
                console.log('text',text);
                if( text.length>=prefix.length+postfix.length &&
                    text.startWith(prefix,canStartWithSpace) &&
                    text.endWith(postfix)){
                    replacements.push(text.substr(prefix.length,text.length-prefix.length-postfix.length));
                }else{
                    replacements.push(prefix+text+postfix);
                }
            });
            cm.replaceSelections(replacements,'around');
        }
        function rowAction(cm,actionName){
            //select row
            var selections=cm.listSelections();
            selections.forEach(function(range){
                var num1=range.anchor.line,num2=range.head.line;
                var start=num1<num2?num1:num2,end=num1>num2?num1:num2;
                cm.addSelection({line:start,ch:0},{line:end});
            });
            var prefix=syntax[actionName].prefix;
            var replacements=[];
            selections=cm.getSelections();
            selections.forEach(function(text){
                replacements.push(
                    text.split('\n').map(function(line){
                        if(line.startWith(prefix,true)){
                            var startAt=line.indexOf(prefix);
                            var startChars=line.substr(0,startAt);
                            var endChars=line.substr(startAt+prefix.length);
                            return startChars+endChars;
                        }else{
                            return prefix+line;
                        }
                    }).join('\n')
                );
            });
            cm.replaceSelections(replacements,'around');
        }
        return{
            //inline actions
            bold:function(cm){inlineAction(cm,'bold');},
            italic:function(cm){inlineAction(cm,'italic');},
            code:function(cm){inlineAction(cm,'code');},
            link:function(cm){inlineAction(cm,'link');},
            img:function(cm){inlineAction(cm,'img');},
            //row actions
            header:function(cm){rowAction(cm,'header');},
            quote:function(cm){rowAction(cm,'quote');},
            ul:function(cm){rowAction(cm,'ul');},
            ol:function(cm){
                var selections=cm.listSelections();
                selections.forEach(function(range){
                    var num1=range.anchor.line,num2=range.head.line;
                    var start=num1<num2?num1:num2,end=num1>num2?num1:num2;
                    cm.addSelection({line:start,ch:0},{line:end});
                });
                var replacements=[];
                selections=cm.getSelections();
                selections.forEach(function(text){
                    if(/^\s*\d+\.\s/m.test(text)){
                        replacements.push(text.replace(/^\s*\d+\.\s/mg,''));
                    }else{
                        replacements.push(
                            text.split('\n').map(function(line,i){ return (i+1)+'. '+line; }).join('\n')
                        );
                    }
                });
                cm.replaceSelections(replacements,'around');
            },
            undo:function(cm){cm.undo();},
            redo:function(cm){cm.redo();}
        };
    }])
    .filter('markdown',['$sce',function($sce){
        var marked=(function(marked){
            marked.setOptions({
             renderer: new marked.Renderer(),
             gfm: true,
             tables: true,
             breaks: false,
             pedantic: false,
             sanitize: true,
             smartLists: true,
             smartypants: false
             });
            return marked;
        })(window.marked);

        return function(input){
            if(!input||typeof input!=='string') return '';
            return $sce.trustAsHtml(marked(input));
        };
    }])
    .directive('ceMarkdown',
    ['markdownActions','ceMarkdownConfig','$log','leanCloud',function(markdownActions,ceMarkdownConfig,$log,leanCloud) {
        return {
            restrict: "E",
            replace:true,
            require: 'ngModel',
            template:['<div class="ce-markdown-container">',
                      '<div class="markdown-toolbar">',

                        '<div class="btn-group btn-group-sm" role="group" ng-repeat="item in toolbar" >',
                            '<button ng-repeat="toolbtn in item.group" type="button" class="btn btn-default " ng-click="callAction(toolbtn.action)" title="{{toolbtn.tip}}"><span class="glyphicon {{toolbtn.icon}}" aria-hidden="true"></span></button>',
                        '</div>',
                      '</div>',
                      '<textarea class="ce-textarea" ngf-drop="uploadImage($files)" ngf-pattern="\'image/*\'"  ng-show="!preview" ></textarea class>',
                      '<div class="ce-preview" ng-bind-html="text | markdown" ng-show="preview"></div>',
                      '</div>',
                        ].join(''),
            compile:function(tElm,tAttrs) {
                if (angular.isUndefined(window.CodeMirror)) {
                    throw(new Error('Require CodeMirror!'));
                }
                var theme = 'default';
                var textarea = tElm.find('textarea');
                var codemirror = new window.CodeMirror(function (cm_el) {
                    angular.forEach(textarea.prop('attributes'), function (attr) {
                        if (attr.name === 'class')
                            cm_el.className += ' ' + attr.textContent;
                        else
                            cm_el.setAttribute(attr.name, attr.textContent);
                    });
                    textarea.replaceWith(cm_el);
                }, {
                    mode: 'gfm',
                    lineWrapping: true,
                    theme: theme
                });

                return function postlink($scope, el, attrs, ngModel) {
                    $scope.toolbar = ceMarkdownConfig.toolbar;

                    //粘贴的图片是blod格式,转换成base64
                    var readBlobAsDataURL =function (blob, callback) {
                        var a = new FileReader();
                        a.onload = function(e) {callback(e.target.result);};
                        a.readAsDataURL(blob);
                    };

                    //粘贴图片
                    $scope.uploadImage = function($files){
                        readBlobAsDataURL($files[0], function (dataurl){

                            var replacements=[];


                            leanCloud.uploadImageByBase64(dataurl).success(function(obj){
                                replacements.push('![图片名称]('+obj.url()+')');
                                codemirror.replaceSelections(replacements,'around');
                            });

                        });
                    };

                    ngModel.$render = function () {
                        $scope.text = ngModel.$viewValue || '';
                        codemirror.setValue($scope.text);
                    };



                    var codemirrorOnChange = function(instance){
                        $scope.text=instance.getValue();
                        ngModel.$setViewValue(instance.getValue());
                    };

                    codemirror.on('change',codemirrorOnChange);


                    $scope.callAction = function (actionName) {

                        if(!actionName)return;
                        else if(markdownActions[actionName])
                            markdownActions[actionName](codemirror);
                        else if(actionName === 'preview'){
                            $scope.preview=!$scope.preview;
                        }
                        //全屏暂时没做
                        else if(actionName ==='fullscreen'){
                            var els=el[0];
                            var rfs=els.requestFullScreen|| els.webkitRequestFullScreen|| els.mozRequestFullScreen;
                            if(rfs) rfs.call(el);
                        }
                        codemirror.focus();
                    };
                };
            }
        };
    }]);