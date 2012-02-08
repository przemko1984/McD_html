(($) ->

	$(document).ready ->
		$('.carousel-container').carousel('ajax': true)
		$('.tiled-submenu').carousel()

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