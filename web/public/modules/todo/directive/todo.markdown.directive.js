/*
/!**
 * Created by Jason on 15/12/26.
 *!/
"use strict";
angular.module('todo').directive("cgMarkdown", ["$rootScope", "$compile", "hljsService", "Markdown", "$parse", "$timeout",
    function ($rootScope, $compile, hljs, MarkdownAPI, $parse, $timeout) {
    var nextId = 0;
    new Markdown.Converter;
    return {
        require: "ngModel",
        replace: !0,
        template: '<div class="markdown-editor"></div>',
        link: function (scope, iElement, iAttrs, ngModel) {
            var fn = $parse(iAttrs.cgMarkdown),
                off_refer_resource = scope.$eval(iAttrs.offReferResource) || !1,
                editorUniqueId = nextId++,
                preview = !!iAttrs.preview,
                style = iAttrs.style || "height:500px;",
                newElement = $compile('<div><div class="wmd-panel"><div id="wmd-button-bar-' + editorUniqueId + '"></div><textarea class="wmd-input" cg-at-who ' + (off_refer_resource ? "" : "cg-refer-resource") + ' at-member="PROJECT.id" id="wmd-input-' + editorUniqueId + '" ng-model="' + iAttrs.ngModel + '" style="' + style + '" ></textarea></div><div id="wmd-preview-' + editorUniqueId + '" style="display:none;"></div><div class="markdown content" id="preview-' + editorUniqueId + '" style="' + (preview ? "" : "display:none;") + '"></div></div>')(scope);
            iElement.html(newElement);
            var converter = new Markdown.Converter, help = function () {
            }, editor = new Markdown.Editor(converter, "-" + editorUniqueId, {
                helpButton: {handler: help},
                strings: {
                    bold: "粗体 <strong> Ctrl+B",
                    boldexample: "在此输入文字",
                    italic: "斜体 <em> Ctrl+I",
                    italicexample: "在此输入文字",
                    link: "链接 <a> Ctrl+L",
                    linkdescription: "在此输入链接内容",
                    linkdialog: "<h2>插入链接</h2>",
                    quote: "引用 <blockquote> Ctrl+Q",
                    quoteexample: "这里输入引用文字",
                    code: "代码片段 <pre><code> Ctrl+K",
                    codeexample: "在此输入代码片段",
                    image: "图片 <img> Ctrl+G",
                    imagedescription: "在这里输入图片描述",
                    imagedialog: "<h2>插入图片</h2>",
                    olist: "数字列表 <ol> Ctrl+O",
                    ulist: "符号列表 <ul> Ctrl+U",
                    litem: "列表项",
                    heading: "标题 <h1>/<h2> Ctrl+H",
                    headingexample: "这里输入标题",
                    hr: "水平分割线 <hr> Ctrl+R",
                    undo: "撤销 - Ctrl+Z",
                    redo: "重做 - Ctrl+Y",
                    redomac: "重做 - Ctrl+Shift+Z",
                    help: "需要帮助"
                }
            });
            editor.run();
            var $wmdInput = $("#wmd-input-" + editorUniqueId), preview = $("#preview-" + editorUniqueId), bar = $("#wmd-button-bar-" + editorUniqueId), buttons = bar.find(".wmd-button"), row = bar.find(".wmd-button-row"), btn_regex = /wmd\-(.*)\-button/, replace_ids = {
                redo: "flipped undo",
                link: "url",
                quote: "quote left",
                image: "photo",
                olist: "ordered list",
                ulist: "list",
                hr: "ellipsis horizontal"
            };
            buttons.each(function (i, button) {
                var self = $(button), id = self.attr("id").replace("-" + editorUniqueId, "");
                id = id.match(btn_regex), id && 2 == id.length && (id = id[1]), id = replace_ids[id] || id;
                var icon = '<i class="' + id + ' icon"></i>';
                self.find("span").hide(), self.append(icon)
            });
            var preview_button = $(['<li class="wmd-button" id="wmd-preview-button" title="Preview" style="left: 375px;">', '<i class="unhide icon"></i>', "</li>"].join("\n"));
            row.append(preview_button);
            var help_icon = bar.find(".wmd-help-button .help.icon"), help_url = "/help/";
            help_icon.wrap('<a class="gray" href="' + help_url + '" target="_blank"></a>'), preview_button.on("click", function () {
                if (preview.is(":hidden")) {
                    preview.show();
                    var promise = getPreview();
                    promise["finally"](function () {
                        addRefreshPreviewBtn()
                    }), preview_button.find(".icon").removeClass("unhide").addClass("hide")
                } else preview.hide(), preview_button.find(".icon").removeClass("hide").addClass("unhide")
            }), preview.on("click", "#markdown-refresh-btn", function () {
                var promise = getPreview();
                promise["finally"](function () {
                    addRefreshPreviewBtn()
                })
            });
            var addRefreshPreviewBtn = function () {
                var btn = $('<a href="javascript:void(0);" id="markdown-refresh-btn"><i class="refresh icon"></i></a>');
                $("#markdown-refresh-btn").remove(), preview.append(btn)
            }, getPreview = function (content) {
                var rawContent = content || $wmdInput.val() || "";
                if (0 != rawContent.length && !preview.is(":hidden")) {
                    var promise = MarkdownAPI.simple_preview({content: rawContent});
                    return promise.then(function (html) {
                        preview.html(html.data), preview.find("pre code, code").each(function (i, e) {
                            hljs.highlightBlock(e)
                        })
                    }), promise
                }
            };
            preview && getPreview(), $rootScope.$watch("InsertImageModal", function (modal) {
                modal && modal.activate()
            }), $rootScope.$watch("InsertLinkModal", function (modal) {
                modal && modal.activate()
            });
            var import_images = [], import_link = "", refreshModal = function () {
                setTimeout(function () {
                    $("#insert_image_modal").modal("refresh")
                }, 500)
            };
            scope.$on("on.project.image.insert", function (event, images) {
                import_images = angular.copy(images)
            }), scope.$on("on.insert.image.by.url", function () {
                refreshModal()
            }), editor.hooks.set("insertImageDialog", function (enterLink) {
                return $(".wmd-prompt-background").hide(), $timeout(function () {
                    var modal = $("#insert_image_modal");
                    modal.modal("setting", {
                        onShow: function () {
                            $rootScope.$broadcast("on.project.image.loading")
                        }, onApprove: function () {
                            if (angular.isArray(import_images) > 0) {
                                var file = import_images[0];
                                enterLink(file.owner_preview), import_images = []
                            } else angular.isString(import_images) && enterLink(import_images)
                        }, onHide: function () {
                            $rootScope.$broadcast("on.project.image.inserted")
                        }
                    }), modal.modal("show")
                }, 300), !0
            }), scope.$on("on.insert.link.change", function (event, link) {
                link && (import_link = link)
            }), editor.hooks.set("insertLinkDialog", function (enterLink) {
                return $(".wmd-prompt-background").hide(), $timeout(function () {
                    var modal = $("#insert_link_modal");
                    modal.modal("setting", {
                        onApprove: function () {
                            enterLink(import_link)
                        }, onHide: function () {
                            $rootScope.$broadcast("on.project.link.inserted")
                        }
                    }), modal.modal("show")
                }), !0
            }), editor.hooks.chain("onChange", function () {
                var rawContent = $wmdInput.val();
                scope.$apply(function () {
                    fn(scope, {$content: rawContent})
                })
            })
        }
    }
}]);*/
