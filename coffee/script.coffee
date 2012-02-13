(($) ->

	$(document).ready ->
		$('.carousel-container').carousel 'ajax': true
		$('.tiled-submenu').carousel()
		$('.timeline-carousel-container').carousel 'vertical': true

		$('.timeline-carousel-container').carousel
			'vertical': true
			'onAnimationComplete': (index, $li) ->
				$('.decades li a').removeClass 'active'
				$('.decades li[data-decade="' + $li.attr('data-decade') + '"]').find('a').addClass 'active'
		$('.decades li[data-decade="' + $('.timeline-carousel li').eq(0).attr('data-decade') + '"]').find('a').addClass 'active'
		$('.decades li a').click ->
			$(@).parents('.timeline-container').find('.timeline-carousel-container').data('carousel').requestItem $.inArray $(@).parents('.timeline-container').find('.timeline-carousel li[data-decade="' + $(@).parent().attr('data-decade') + '"]')[0], $(@).parents('.timeline-container').find('.timeline-carousel li')
			no

		$nutritionFactsButton = $ '.nutrition-facts-button'
		$nutritionFacts = $ '.nutrition-facts'
		$nutritionFacts.css 'display': 'none'
		$nutritionFactsButton.click ->
			$(@).addClass 'active'
			$nutritionFacts.stop().slideDown().find('.percent-bar').each ->
				$bar = $ @
				percent = parseInt $bar.attr('data-percentage')
				animationProperties = 'width' : "#{percent}%"
				animationSettings = 'duration' : 'slow'
				$bar.css('width': 0).stop(true).delay('slow').animate animationProperties, animationSettings
			$nutritionFacts.find('.close-button').click ->
				$nutritionFacts.stop().slideUp()
				$nutritionFactsButton.removeClass 'active'
				no
			no

		if Modernizr.touch
			$('li').click ->
				if $(@).children('.submenu').length
					$(@).toggleClass('hover')
					no

)(jQuery)