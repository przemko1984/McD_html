// Generated by CoffeeScript 1.2.1-pre

(function($) {
  /*
  	jQuery Carousel Plugin
  	Author: Jakub Korzeniowski
  	Agency: Softhis
  	Website: www.softhis.com
  	Released under the MIT License
  */
  return $.extend($.fn, {
    carousel: function(options) {
      var defaults, opts;
      console.log('carousel fired');
      defaults = {
        'duration': 'slow',
        'easing': 'swing',
        'speed': 1,
        'delay': 0
      };
      opts = $.extend(defaults, options);
      return this.each(function() {
        var $layers, $li, $nextArrow, $previousArrow, $self, $ul, animationRunning, itemCount, itemWidth;
        $self = $(this);
        $ul = $self.find('ul');
        $li = $ul.find('li');
        $layers = $ul.find('.carousel-layer');
        $nextArrow = $self.find('.next-arrow');
        $previousArrow = $self.find('.previous-arrow');
        itemWidth = $li.width();
        itemCount = $li.length;
        animationRunning = false;
        $ul.css({
          'width': "" + (itemWidth * itemCount) + "px"
        });
        $ul.wrap($('<div />', {
          'class': 'list-wrapper'
        }));
        $li.filter(':not(:first)').css({
          'opacity': 0
        });
        $previousArrow.addClass('disabled');
        if (itemCount < 2) $nextArrow.addClass('disabled');
        $layers.each(function() {
          var $layer;
          $layer = $(this);
          $layer.data('speed', $layer.attr('data-speed') ? $layer.attr('data-speed') : opts.speed);
          return $layer.data('delay', $layer.attr('data-delay') ? $layer.attr('data-delay') : opts.delay);
        });
        $self.data('carousel', {
          'currentItem': 0,
          'itemCount': itemCount,
          'showItem': function(index) {
            var animationProperties, animationSettings;
            if (index < 0 || index >= itemCount || index === $self.data('carousel').currentItem || animationRunning) {
              return false;
            }
            animationRunning = true;
            animationProperties = {
              'left': "" + (-index * itemWidth) + "px"
            };
            animationSettings = {
              'duration': opts.duration,
              'easing': opts.easing,
              'complete': function() {
                return animationRunning = false;
              }
            };
            $ul.stop().animate(animationProperties, animationSettings);
            $li.each(function(i) {
              if (i === index) {
                animationProperties = {
                  'opacity': 1
                };
              } else {
                animationProperties = {
                  'opacity': 0
                };
              }
              return $(this).stop().animate(animationProperties, animationSettings);
            });
            if (index === itemCount - 1) {
              $nextArrow.addClass('disabled');
            } else {
              $nextArrow.removeClass('disabled');
            }
            if (index === 0) {
              $previousArrow.addClass('disabled');
            } else {
              $previousArrow.removeClass('disabled');
            }
            $self.data('carousel').currentItem = index;
            return true;
          }
        });
        $nextArrow.click(function() {
          $self.data('carousel').showItem($self.data('carousel').currentItem + 1);
          return false;
        });
        return $previousArrow.click(function() {
          $self.data('carousel').showItem($self.data('carousel').currentItem - 1);
          return false;
        });
      });
    }
  });
})(jQuery);
