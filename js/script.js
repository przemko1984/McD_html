// Generated by CoffeeScript 1.2.1-pre

(function($) {
  return $(document).ready(function() {
    var $nutritionFacts, $nutritionFactsButton;
    $('.carousel-container').carousel({
      'ajax': true
    });
    $('.tiled-submenu').carousel();
    $('.timeline-carousel-container').carousel({
      'vertical': true
    });
    $('.timeline-carousel-container').carousel({
      'variableDimensions': true,
      'vertical': true,
      'onAnimationComplete': function(index, $li) {
        $('.decades li a').removeClass('active');
        return $('.decades li[data-decade="' + $li.attr('data-decade') + '"]').find('a').addClass('active');
      }
    });
    $('.decades li[data-decade="' + $('.timeline-carousel li').eq(0).attr('data-decade') + '"]').find('a').addClass('active');
    $('.decades li a').click(function() {
      $(this).parents('.timeline-container').find('.timeline-carousel-container').data('carousel').requestItem($.inArray($(this).parents('.timeline-container').find('.timeline-carousel li[data-decade="' + $(this).parent().attr('data-decade') + '"]')[0], $(this).parents('.timeline-container').find('.timeline-carousel li')));
      return false;
    });
    $nutritionFactsButton = $('.nutrition-facts-button');
    $nutritionFacts = $('.nutrition-facts');
    $nutritionFacts.css({
      'display': 'none'
    });
    $nutritionFactsButton.click(function() {
      $(this).addClass('active');
      $nutritionFacts.stop().slideDown().find('.percent-bar').each(function() {
        var $bar, animationProperties, animationSettings, percent;
        $bar = $(this);
        percent = parseInt($bar.attr('data-percentage'));
        animationProperties = {
          'width': "" + percent + "%"
        };
        animationSettings = {
          'duration': 'slow'
        };
        return $bar.css({
          'width': 0
        }).stop(true).delay('slow').animate(animationProperties, animationSettings);
      });
      $nutritionFacts.find('.close-button').click(function() {
        $nutritionFacts.stop().slideUp();
        $nutritionFactsButton.removeClass('active');
        return false;
      });
      return false;
    });
    if (Modernizr.touch) {
      return $('li').click(function() {
        if ($(this).children('.submenu').length) {
          $(this).toggleClass('hover');
          return false;
        }
      });
    }
  });
})(jQuery);
