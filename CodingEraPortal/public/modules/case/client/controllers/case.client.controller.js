/**
 * Created by Yan on 16/3/9.
 */
'use strict';

var caseController = (function(){
    var service = {};
    //初始化头部组
    service.initTag = function () {
        //判断是否当前页面
        var container  = $('.case-content');
        var tagContainer = $('.tags ul');
        if(container.length > 0){

            $.ajax({
                url: window.apiURL + '/tag',
                type:'get',
                dataType:'json',
                success:function(res){
                    var node = '';
                    for(var i=0; i < res.data.content.length ; i++ ){
                        var data = res.data.content[i];
                        node = '<li><a href="/case?tagId='+data.id+'">'+data.name+'</a></li>' + node;

                    }
                    tagContainer.append(node);
                },
                complete:function(){
                    $('.tag-loading').hide();
                }
            });

        }

    };

    return service;
})();



caseController.initTag();
