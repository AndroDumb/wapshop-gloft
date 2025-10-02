jQuery.fn.responsivePaginate = function ()
{

    "use strict";

    {
        var $this = $(this);
        for (var i = 0, max = $this.length; i < max; i++) {
            new responsivePaginate($($this[i]));
        }
    }

    function responsivePaginate($container)
    {

        this.toHtml = function ()
        {
            var html = '';
            if (this.pagerButtons < this.linkCount)
            {
                if (this.selectedPage  != 1)
                {
                    html += "<a href='" + this.links.eq(this.selectedPage - 2).attr("href") + "' style='visibility: visible;' class='pagination'>&lt;</a>";
                }
                    html = this.appendHtml(html, this.lowerSkip, this.lowerTo);
                if (this.useEllipsis) {
                    html += "<span class='pagination' style='visibility: visible;'>...</span>";
                    html = this.appendHtml(html, this.upperSkip, this.upperTo);
                }
                if(this.selectedPage < this.linkCount)
                {
                    html += "<a href='" + this.links.eq(this.selectedPage).attr("href") + "' style='visibility: visible;' class='pagination'>&gt;</a>";
                }
            }
            else
            {
                html = this.appendHtml(html, 0, this.linkCount);
            }

            this.$this.html(html);
        }

        this.reset = function ()
        {
            this.pagerButtons = this.calculatePagerButtons();
            this.useEllipsis = this.pagerButtons <= this.linkCount;
            if (!this.useEllipsis) {
                this.lowerSkip = 0;
                this.lowerTo = this.linkCount;
                return;
            }

            this.ellipsisPoint = (this.selectedPage <= this.linkCount / 2)
                ? Math.floor(3 * this.pagerButtons / 4)
                : Math.ceil(this.pagerButtons / 2)
            ;
            var lowerTake = this.ellipsisPoint - 2;
            var upperTake = this.pagerButtons - this.ellipsisPoint;
            this.lowerSkip = (this.selectedPage > lowerTake / 2) && (this.selectedPage <= this.linkCount / 2)
                ? this.selectedPage - Math.floor(lowerTake / 2)
                : 0
            ;
            this.upperSkip = (this.selectedPage > this.linkCount / 2) && (this.selectedPage <= this.linkCount - (upperTake / 2))
                ? this.selectedPage - Math.floor(upperTake / 2)
                : this.linkCount - upperTake
            ;
            this.lowerTo = this.lowerSkip + lowerTake;
            this.upperTo = this.upperSkip + upperTake;
        }

        this.appendHtml = function (html, from, to)
        {
            for (var i = from; i < to; i++) {
                if (i == (this.selectedPage - 1)) {
                    html += "<span class='pagination pagination_active' style='visibility: visible;'>" + this.links.eq(i).html() + "</span>";
                }
                else {
                    html += "<a href='" + this.links.eq(i).attr("href") + "' style='visibility: visible;' class='pagination'>" + this.links.eq(i).html() + "</a>";
                }
            }
            return html;
        }

        this.measureWidest = function ()
        {
            var result = 0;
            for (var i = 0, max = this.links.length; i < max; i++) {
                result = Math.max(result, this.links.eq(i).outerWidth(true));
            }
            return result;
        }

        this.findSelectedPage = function ()
        {
            for (var i = 0, max = this.links.length; i < max; i++) {
                var selected = this.links.eq(i).attr("data-selected");
                if (selected && (selected.toLowerCase() == "true")) {
                    return i + 1;
                }
            }
            return 1;
        }

        this.calculatePagerButtons = function ()
        {
            var result = this.width() / this.widest;
            result = Math.max(3, Math.floor(result));
            result = result - 1;
            return result;
        }

        this.width = function ()
        {
            return Math.floor(this.$this.width());
        }

        $('.pagination').css('visibility', 'hidden');
        this.$this = $container;
        this.links = this.$this.children("a");
        this.widest = this.measureWidest();
        this.linkCount = this.links.length;
        this.selectedPage = this.findSelectedPage();
        this.pagerButtons = 0;
        this.useEllipsis = false;
        this.ellipsisPoint = 0;
        this.lowerSkip = 0;
        this.lowerTo = 0;
        this.upperSkip = 0;
        this.upperTo = 0;
        this.reset();
        this.toHtml();

        $(window).resize($.proxy(
            function ()
            {
                this.reset();
                this.toHtml();
            },
            this
        ));

    }

};