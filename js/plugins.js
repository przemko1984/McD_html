// Generated by CoffeeScript 1.2.1-pre

(function($) {
  /*
  	jQuery Carousel Plugin
  	Author: Jakub Korzeniowski
  	Agency: Softhis
  	Website: www.softhis.com
  	Released under the MIT License
  
  	options:
  	duration - duration in ms or a string representing jQuery-type duration
  	easing - jQuery easing. easing plugins allowed
  	speed - default speed for the layer, relative to li containing tag
  	delay - default delay in ms or a string representing jQuery-type duration
  	onAnimationComplete - function to be called after the animation. takes 2 params - index of element to be showed, and element itself
  	onAnimationInit - function to be called before the animation. takes 2 params - index of element to be showed, and element itself
  	onAjaxInit - function to be called before ajax request is made. takes 2 params - index of element to be showed, and the request string
  	onAjaxError - function to be called in case of failure of the request. takes 2 params - index of element to be showed, and the error message
  	onAjaxComplete - function to be called after successful ajax request was made. takes 2 params - index of element to be showed, and the return data
  	ajax - flag indicating if content of li tags in the carousel should be dynamically loaded. requires data-request attribute on all li elements.
  	vertical - determines direction of scrolling
  */
  return $.extend($.fn, {
    carousel: function(options) {
      var defaults, opts;
      defaults = {
        'duration': 'slow',
        'easing': 'swing',
        'speed': 0,
        'delay': 0,
        'variableDimensions': false,
        'onAnimationComplete': $.noop,
        'onAnimationInit': $.noop,
        'onAjaxInit': $.noop,
        'onAjaxError': $.noop,
        'onAjaxComplete': $.noop,
        'ajax': false,
        'vertical': false
      };
      opts = $.extend(defaults, options);
      return this.each(function() {
        var $controls, $controlsParentHeight, $controlsParentWidth, $layers, $li, $listWrapper, $nextArrow, $previousArrow, $self, $ul, animationRunning, controlsCount, getChildrenHeight, getChildrenWidth, getPreviousHeight, getPreviousWidth, init, itemCount, itemHeight, itemWidth;
        $self = $(this);
        $ul = $self.find(':not(.carousel-controls)').children('ul');
        $li = $ul.find('li');
        $layers = $ul.find('.carousel-layer');
        $nextArrow = $self.find('.next-arrow');
        $previousArrow = $self.find('.previous-arrow');
        $controls = $self.find('.carousel-controls li');
        $controlsParentWidth = $controls.parent().width();
        $controlsParentHeight = $controls.parent().height();
        itemWidth = $li.width();
        itemHeight = $li.height();
        itemCount = $li.length;
        controlsCount = $controls.length;
        animationRunning = false;
        $listWrapper = $self.find('.list-wrapper');
        if (itemCount > 1) {
          init = function() {
            if ($self.data('carousel') != null) {
              $self.data('carousel').currentItem = 0;
            }
            $ul.css({
              'position': 'absolute',
              'left': 0,
              'top': 0
            });
            if (!$listWrapper.length) {
              $ul.wrap($('<div />', {
                'class': 'list-wrapper'
              }));
              $listWrapper = $self.find('.list-wrapper');
            }
            $li.css({
              'opacity': 1
            }).filter(':not(:first)').css({
              'opacity': 0
            });
            if (opts.variableDimensions) {
              $li.each(function() {
                var $liItem;
                $liItem = $(this);
                if (opts.vertical) {
                  return $liItem.css({
                    'height': "" + (getChildrenHeight($liItem)) + "px"
                  });
                } else {
                  return $liItem.css({
                    'width': "" + (getChildrenWidth($liItem)) + "px"
                  });
                }
              });
            }
            itemWidth = $li.eq(0).width();
            itemHeight = $li.eq(0).height();
            if (opts.vertical) {
              $ul.css({
                'height': "" + (opts.variableDimensions ? getPreviousHeight(itemCount) : itemCount * itemHeight) + "px"
              });
              $listWrapper.css({
                'height': "" + itemHeight + "px"
              });
            } else {
              $ul.css({
                'width': "" + (opts.variableDimensions ? getPreviousWidth(itemCount) : itemCount * itemWidth) + "px"
              });
              $listWrapper.css({
                'width': "" + itemWidth + "px"
              });
            }
            $previousArrow.addClass('disabled');
            $nextArrow.removeClass('disabled');
            if (itemCount < 2) $nextArrow.addClass('disabled');
            $layers.each(function() {
              var $layer;
              $layer = $(this);
              $layer.data('delay', $layer.attr('data-delay') ? parseInt($layer.attr('data-delay')) : opts.delay);
              $layer.data('speed', $layer.attr('data-speed') ? parseInt($layer.attr('data-speed')) : opts.speed);
              return $layer.css({
                'opacity': 1
              });
            });
            return $controls.each(function(i) {
              var $control, horizontalMargin;
              $control = $(this);
              if (i === 0) {
                $control.addClass('active');
              } else {
                $control.removeClass('active');
              }
              horizontalMargin = parseInt($control.css('margin-left'));
              horizontalMargin += parseInt($control.css('margin-right'));
              return $control.css({
                'width': "" + (($controlsParentWidth / controlsCount) - horizontalMargin) + "px"
              });
            });
          };
          getPreviousHeight = function(index) {
            var dim, item, _i, _len, _ref;
            dim = 0;
            _ref = $li.slice(0, index);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              dim += $(item).height();
            }
            return dim;
          };
          getPreviousWidth = function(index) {
            var dim, item, _i, _len, _ref;
            dim = 0;
            _ref = $li.slice(0, index);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              dim += $(item).width();
            }
            return dim;
          };
          getChildrenHeight = function(item) {
            var ch, child, height, _i, _len, _ref;
            height = 0;
            _ref = item.children();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              ch = $(child).outerHeight(true);
              if (ch > height) height = ch;
            }
            return height;
          };
          getChildrenWidth = function(item) {
            var child, cw, width, _i, _len, _ref;
            width = 0;
            _ref = item.children();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              cw = $(child).outerWidth(true);
              if (cw > width) width = cw;
            }
            return width;
          };
          init();
          $self.data('carousel', {
            'currentItem': 0,
            'itemCount': itemCount,
            'stop': function() {
              $ul.stop(true, true);
              $layers.stop(true, true);
              return animationRunning = false;
            },
            'showItem': function(index) {
              var animationProperties, animationSettings, layerAnimationSettings, wrapperAnimationProperties;
              if (index < 0 || index >= itemCount || index === $self.data('carousel').currentItem || animationRunning) {
                return false;
              }
              animationRunning = true;
              opts.onAnimationInit(index, $li.eq(index));
              animationSettings = {
                'duration': opts.duration,
                'easing': opts.easing,
                'complete': function() {
                  animationRunning = false;
                  return opts.onAnimationComplete(index, $li.eq(index));
                }
              };
              layerAnimationSettings = {
                'duration': opts.duration,
                'easing': opts.easing
              };
              if (opts.vertical) {
                animationProperties = {
                  'top': "" + (opts.variableDimensions ? -getPreviousHeight(index) : -index * itemHeight) + "px"
                };
                if (opts.variableDimensions) {
                  wrapperAnimationProperties = {
                    'height': "" + ($li.eq(index).height()) + "px"
                  };
                  $listWrapper.animate(wrapperAnimationProperties, animationSettings);
                }
              } else {
                animationProperties = {
                  'left': "" + (opts.variableDimensions ? -getPreviousWidth(index) : -index * itemWidth) + "px"
                };
                if (opts.variableDimensions) {
                  wrapperAnimationProperties = {
                    'width': "" + ($li.eq(index).width()) + "px"
                  };
                  $listWrapper.animate(wrapperAnimationProperties, animationSettings);
                }
              }
              $ul.stop().delay(opts.delay).animate(animationProperties, animationSettings);
              $li.each(function(i) {
                var direction;
                if (i === index) {
                  animationProperties = {
                    'opacity': 1
                  };
                  direction = $self.data('carousel').currentItem < index ? 1 : -1;
                  $(this).find('.carousel-layer').each(function() {
                    var $layer;
                    $layer = $(this);
                    if (opts.vertical) {
                      return $layer.css({
                        'top': "" + (direction * $layer.data('speed') * 100) + "%",
                        'opacity': 0
                      }).stop().delay($layer.data('delay')).animate({
                        'top': 0,
                        'opacity': 1
                      }, layerAnimationSettings);
                    } else {
                      return $layer.css({
                        'left': "" + (direction * $layer.data('speed') * 100) + "%",
                        'opacity': 0
                      }).stop().delay($layer.data('delay')).animate({
                        'left': 0,
                        'opacity': 1
                      }, layerAnimationSettings);
                    }
                  });
                } else {
                  animationProperties = {
                    'opacity': 0
                  };
                }
                return $(this).stop().delay(opts.delay).animate(animationProperties, layerAnimationSettings);
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
              $controls.removeClass('active').eq(index).addClass('active');
              $self.data('carousel').currentItem = index;
              return true;
            },
            'requestItem': function(index) {
              var $request, $requestedLi;
              if (index < 0 || index >= itemCount || index === $self.data('carousel').currentItem || animationRunning) {
                return false;
              }
              if (opts.ajax) {
                $requestedLi = $li.eq(index);
                $request = $requestedLi.attr('data-request');
                opts.onAjaxInit(index, $request);
                return $.ajax($request, {
                  success: function(data) {
                    var $data, $img, imgCount, imgLoaded;
                    $data = $(data);
                    $img = $data.find('img');
                    imgCount = $img.length;
                    imgLoaded = 0;
                    if (imgCount > 0) {
                      return $img.each(function() {
                        var $curImg, src;
                        $curImg = $(this);
                        src = $curImg.attr('src');
                        return $curImg.load(function() {
                          if (++imgLoaded >= imgCount) {
                            $requestedLi.html($(data));
                            $requestedLi.find('.carousel-layer').each(function() {
                              var $layer;
                              $layer = $(this);
                              $layer.data('delay', $layer.attr('data-delay') ? parseInt($layer.attr('data-delay')) : opts.delay);
                              return $layer.data('speed', $layer.attr('data-speed') ? parseInt($layer.attr('data-speed')) : opts.speed);
                            });
                            opts.onAjaxComplete(index, data);
                            if (opts.variableDimensions) {
                              if (opts.vertical) {
                                $requestedLi.css({
                                  'height': "" + (getChildrenHeight($requestedLi)) + "px"
                                });
                              } else {
                                $requestedLi.css({
                                  'width': "" + (getChildrenWidth($requestedLi)) + "px"
                                });
                              }
                            }
                            return $self.data('carousel').showItem(index);
                          }
                        }).error(function(msg) {
                          return opts.onAjaxError(index, msg);
                        }).attr('src', src);
                      });
                    } else {
                      $requestedLi.html($(data));
                      $requestedLi.find('.carousel-layer').each(function() {
                        var $layer;
                        $layer = $(this);
                        $layer.data('delay', $layer.attr('data-delay') ? parseInt($layer.attr('data-delay')) : opts.delay);
                        return $layer.data('speed', $layer.attr('data-speed') ? parseInt($layer.attr('data-speed')) : opts.speed);
                      });
                      opts.onAjaxComplete(index, data);
                      if (opts.variableDimensions) {
                        if (opts.vertical) {
                          $requestedLi.css({
                            'height': "" + (getChildrenHeight($requestedLi)) + "px"
                          });
                        } else {
                          $requestedLi.css({
                            'width': "" + (getChildrenWidth($requestedLi)) + "px"
                          });
                        }
                      }
                      return $self.data('carousel').showItem(index);
                    }
                  },
                  error: function(msg) {
                    return opts.onAjaxError(index, msg);
                  }
                });
              } else {
                return $self.data('carousel').showItem(index);
              }
            }
          });
          $nextArrow.click(function() {
            $self.data('carousel').requestItem($self.data('carousel').currentItem + 1);
            return false;
          });
          $previousArrow.click(function() {
            $self.data('carousel').requestItem($self.data('carousel').currentItem - 1);
            return false;
          });
          $controls.click(function() {
            $self.data('carousel').requestItem($.inArray(this, $controls));
            return false;
          });
          return $(window).bind('resize', function() {
            $self.data('carousel').stop();
            return init();
          });
        }
      });
    }
  });
})(jQuery);
