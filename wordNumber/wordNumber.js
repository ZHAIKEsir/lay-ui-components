layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;
    var wordNumber = {
        render: function (elem, maxlength) {
            var textCount = "text_count_" + elem;
            var textGet = "#" + textCount;
            var elem = "#" + elem;
            var currleg = $(elem).val().length;

            var flag = true;
            var base = `<div class="word"><span id="${textCount}">${currleg}</span>&nbsp;/&nbsp;
                        <span>${maxlength}</span></div>`
            $(elem).after(base)
            $(elem).off().on('compositionstart', function () {
                flag = false;
            }).on('compositionend', function () {
                flag = true;
            })
            $(elem).unbind('input propertychange').bind('input propertychange', function () {
                setTimeout(function () {
                    var currleg = $(elem).val().length;
                    if (flag) {
                        if (currleg > maxlength) {
                            $(elem).val($(elem).val().substr(0, maxlength));
                            // layer.msg('字数请在' + length + '字以内');
                            $(textGet).text(maxlength);
                        } else {
                            $(textGet).text(currleg);
                        }
                    }
                }, 0)
            });
        }
    };

    //输出接口
    exports('wordNumber', wordNumber);
}).link('/assets/common/module/wordNumber.css');
