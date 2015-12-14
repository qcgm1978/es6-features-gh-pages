/*
 **  es6-features -- ECMAScript 6 Feature Overview & Comparison
 **  Copyright (c) 2015 Ralf S. Engelschall <rse@engelschall.com>
 **
 **  Permission is hereby granted, free of charge, to any person obtaining
 **  a copy of this software and associated documentation files (the
 **  "Software"), to deal in the Software without restriction, including
 **  without limitation the rights to use, copy, modify, merge, publish,
 **  distribute, sublicense, and/or sell copies of the Software, and to
 **  permit persons to whom the Software is furnished to do so, subject to
 **  the following conditions:
 **
 **  The above copyright notice and this permission notice shall be included
 **  in all copies or substantial portions of the Software.
 **
 **  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 **  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 **  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 **  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 **  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 **  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 **  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
    $(document).ready(function () {
        /*  support switching between reduced and traditional semicolon style  */
        $(".content .js.es6").addClass("reduced")
        $(".content .js.es5").addClass("traditional")
        $(".content .js .title .style").click(function (ev) {
            var id = $(ev.target).text()
            var type = $(ev.target).parent().parent().hasClass("es5") ? "es5" : "es6"
            $(".content .js." + type)
                .removeClass("reduced")
                .removeClass("traditional")
                .addClass(id)
        })
        $('.J_toggle').click(function func() {
            $('.nav:last').toggle()
            var left = $('.nav:last').is(':hidden') ? 40 : 380;
            $('.content').css('left', left).width(
                'calc(100% - ' + left + 'px - 30px)'
            )
        })
        /*  support navigation item selection  */
        $(".showcase").css("display", "none")
        $(".showcase:first").css("display", "block")
        $("li.subtitle:first").addClass("selected")
        function switchEs6(ev) {
            if (ev.target) {
                var id = $(ev.target).attr("href").replace(/^#/, "")
            } else {
                var id = $(".showcase:visible").attr('id')
            }
            var $content = $(".showcase_" + id);
            var $title = $("li.subtitle_" + id);
            if (ev===true) {
                $content = $content.next()
                $title = $title.next().length==0?   $("li.subtitle_" + id).parent().parent().next().find('.subtitle:first'):$title.next()
            }else{
                $content = $content.prev()
                $title = $title.prev().length==0?   $("li.subtitle_" + id).parent().parent().prev().find('.subtitle:last'):$title.prev()
            }
            $(".showcase").css("display", "none")
            $content.css("display", "block")
            $("li.subtitle").removeClass("selected")
            $title.addClass("selected")
            var c = $(".nav")
            var ch = c.height()
            var cs = c.scrollTop()
            var e = $(".nav li.subtitle.selected")
            var ep = e.parent().position().top + e.position().top
            var eh = e.height()
            if (ep < cs)
                c.scrollTop(Math.max(0, ep - eh))
            else if (ep > cs + ch)
                c.scrollTop(Math.max(0, (ep + 4 * eh) - ch))
        }

        $('#triangle-right').click(function () {
            switchEs6(true)
        })
        $('#triangle-left').click(function () {
            switchEs6(false)
        })
        $(".nav a").click(function (ev) {
            switchEs6(ev);
        })
        /*  support navigation via cursor keys  */
        var ids = []
        $("li.subtitle a").each(function () {
            ids.push($(this).attr("href").replace(/^#/, ""))
        })
        Mousetrap.bind(["up", "pageup"], function (e) {
            var id = $("li.subtitle.selected a").attr("href").replace(/^#/, "")
            var idx = ids.indexOf(id)
            if (idx > 0)
                window.location.hash = "#" + ids[idx - 1]
        })
        Mousetrap.bind(["down", "pagedown"], function (e) {
            var id = $("li.subtitle.selected a").attr("href").replace(/^#/, "")
            var idx = ids.indexOf(id)
            if (idx < ids.length - 1)
                window.location.hash = "#" + ids[idx + 1]
        })
        /*  support URL based routing and this way deep-linking  */
        var dispatch = function (id) {
            if (id === "modernized")
                id = "reduced"
            if (id === "reduced" || id === "traditional")
                $(".content .js").removeClass("traditional").removeClass("reduced").addClass(id)
            else
                $("li.subtitle a[href='#" + id + "']").trigger("click")
        }
        var router = new Router()
        router.on("(.+)", dispatch)
        router.configure({delimiter: "/"})
        router.init("Constants")
        dispatch(router.getRoute(0))
    })
})(jQuery)

