(($) ->

	###
	jQuery Carousel Plugin
	Author: Jakub Korzeniowski
	Agency: Softhis
	Website: www.softhis.com
	Released under the MIT License
	###
	$.extend $.fn,
		
		carousel: (options) ->
			console.log 'carousel fired'
			defaults = 
				'duration': 'slow'
				'easing': 'swing'
				'speed': 1
				'delay': 0
			opts = $.extend defaults, options
			@each ->
				$self = $(@)
				$ul = $self.find 'ul'
				$li = $ul.find 'li'
				$layers = $ul.find '.carousel-layer'
				$nextArrow = $self.find '.next-arrow'
				$previousArrow = $self.find '.previous-arrow'
				itemWidth = $li.width()
				itemCount = $li.length
				animationRunning = no

				$ul.css
					'width': "#{itemWidth * itemCount}px"
				$ul.wrap $ '<div />',
					'class': 'list-wrapper'

				$li.filter(':not(:first)').css
					'opacity': 0

				$previousArrow.addClass 'disabled'
				$nextArrow.addClass 'disabled' if itemCount < 2

				$layers.each ->
					$layer = $(@)
					$layer.data 'speed', if $layer.attr 'data-speed' then $layer.attr 'data-speed' else opts.speed
					$layer.data 'delay', if $layer.attr 'data-delay' then $layer.attr 'data-delay' else opts.delay

				$self.data 'carousel',
					'currentItem': 0
					'itemCount': itemCount
					'showItem': (index) ->
						return no if index < 0 or index >= itemCount or index is $self.data('carousel').currentItem or animationRunning
						
						animationRunning = yes

						animationProperties =
							'left': "#{-index * itemWidth}px"
						animationSettings =
							'duration': opts.duration
							'easing': opts.easing
							'complete': ->
								animationRunning = no
						
						$ul.stop().animate animationProperties, animationSettings
						
						$li.each (i) ->
							if i is index
								animationProperties =
									'opacity': 1
							else
								animationProperties =
									'opacity': 0
							$(@).stop().animate animationProperties, animationSettings
													
						if index is itemCount - 1 then $nextArrow.addClass 'disabled' else $nextArrow.removeClass 'disabled'
						if index is 0 then $previousArrow.addClass 'disabled' else $previousArrow.removeClass 'disabled'
						$self.data('carousel').currentItem = index
						yes

				$nextArrow.click ->
					$self.data('carousel').showItem $self.data('carousel').currentItem + 1
					no
				$previousArrow.click ->
					$self.data('carousel').showItem $self.data('carousel').currentItem - 1
					no
							
)(jQuery)