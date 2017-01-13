(function () {
    var poptip = function (settings) {
        var options = {
            container: '.main',
            target: 'data-tip-target',
            targetTip: '.js-tip-',
            topClass: 'arrow-top',
            bottomClass: 'arrow-bottom',
            leftClass: 'arrow-left',
            rightClass: 'arrow-right'
        };

        options = $.extend(options, settings);

        var $container = $(options.container);
        var containerTop = $container.offset().top;
        var containerLeft = $container.offset().left;
        var targets = $('[' + options.target + ']');

        // events
        targets.hover(function () {
            hoverHandle($(this), true);
        }, function () {
            hoverHandle($(this), false);
        })

        var hoverHandle = function ($target, isShow) {
            var targetStr = $target.attr(options.target);
            var $targetTip = $(options.targetTip + targetStr);
            if (isShow) {
                setPoptipPosition($target, $targetTip);
                $targetTip.show();
            } else {
                $targetTip.hide();
            }
        }

        var setPoptipPosition = function ($target, $targetTip) {
            var targetStr = $(this).attr(options.target);
            var $arrow = $targetTip.children().filter('.arrow');

            // target 尺寸
            var height = $target.outerHeight();
            var width = $target.outerWidth();
            var top = $target.offset().top;
            var left = $target.offset().left;

            // tip箭头尺寸
            var arrowHeight = $arrow.outerHeight() / 2;
            var arrowWith = $arrow.outerWidth() / 2;
            var arrowTop = parseInt($arrow.css('top'));
            var arrowLeft = parseInt($arrow.css('left'));

            // tip尺寸
            var targetTipWidth = $targetTip.outerWidth();
            var targetTipHeight = $targetTip.outerHeight();

            if ($targetTip.length > 0) {
                $targetTip.appendTo($container);
                if ($arrow.length > 0) {
                    if ($arrow.hasClass(options.topClass)) {
                        $targetTip.css({
                            top: height - containerTop + top + arrowHeight, left: left - containerLeft + width / 2 - arrowLeft - arrowWith - 1
                        })
                    } else if ($arrow.hasClass(options.rightClass)) {
                        $targetTip.css({ top: top - containerTop + height / 2 - arrowHeight - arrowTop - 1, left: left - containerLeft - targetTipWidth - arrowWith })
                    } else if ($arrow.hasClass(options.bottomClass)) {
                        $targetTip.css({ top: top - containerTop - targetTipHeight - arrowHeight, left: left - containerLeft + width / 2 - arrowLeft - arrowWith - 1 })
                    } else if ($arrow.hasClass(options.leftClass)) {
                        $targetTip.css({ top: top - containerTop + height / 2 - arrowHeight - arrowTop - 1, left: left - containerLeft + width + arrowWith })
                    }
                }
            }

        }
    };

    window.initPoptip = poptip;
})();