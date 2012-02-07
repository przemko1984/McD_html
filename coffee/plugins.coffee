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
			defaults = 
				'duration': 'slow'
				'easing': 'swing'
				'speed': 1
				'delay': 0
				'onComplete': $.noop
			opts = $.extend defaults, options
			@each ->
				$self = $ @
				$ul = $self.find(':not(.carousel-controls)').children 'ul'
				$li = $ul.find 'li'
				$layers = $ul.find '.carousel-layer'
				$nextArrow = $self.find '.next-arrow'
				$previousArrow = $self.find '.previous-arrow'
				$controls = $self.find '.carousel-controls li'
				$controlsParentWidth = $controls.parent().width()
				itemWidth = $li.width()
				itemCount = $li.length
				controlsCount = $controls.length
				animationRunning = no

				# Initialization
				init = ->
					itemWidth = $li.width()
					
					$self.data('carousel').currentItem = 0 if $self.data('carousel')?

					$ul.css
						'width': "#{itemWidth * itemCount}px",
						'position': 'absolute',
						'left': 0,
						'top': 0

					if not $self.find('.list-wrapper').length
						$ul.wrap $ '<div />',
							'class': 'list-wrapper'

					$li.css('opacity': 1).filter(':not(:first)').css
						'opacity': 0


					$previousArrow.addClass 'disabled'
					$nextArrow.removeClass('disabled')
					$nextArrow.addClass 'disabled' if itemCount < 2

					$layers.each ->
						$layer = $ @ 
						$layer.data 'delay', if $layer.attr 'data-delay' then parseInt $layer.attr 'data-delay' else opts.delay
						$layer.data 'speed', if $layer.attr 'data-speed' then parseInt $layer.attr 'data-speed' else opts.speed
						$layer.css 'opacity': 1

					
					$controls.each (i) ->
						$control = $ @
						if i is 0 then $control.addClass 'active' else $control.removeClass 'active'
						horizontalMargin = parseInt $control.css('margin-left')
						horizontalMargin += parseInt $control.css('margin-right')
						$control.css 'width': "#{($controlsParentWidth/controlsCount) - horizontalMargin}px"
					
				init()

				# Object containing carousel API
				$self.data 'carousel',
					'currentItem': 0

					'itemCount': itemCount

					'stop': ->
						$ul.stop true, true
						$layers.stop true, true
						animationRunning = no

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
								opts.onComplete index, $li.eq index
						layerAnimationSettings =
							'duration': opts.duration
							'easing': opts.easing
						
						$ul.stop().delay(opts.delay).animate animationProperties, animationSettings
						
						$li.each (i) ->
							if i is index
								animationProperties =
									'opacity': 1
								direction = if $self.data('carousel').currentItem < index then 1 else -1
								$(@).find('.carousel-layer').each ->
									$layer = $ @
									$layer.css('left': "#{direction * $layer.data('speed') * 100}%", 'opacity': 0).stop().delay($layer.data 'delay').animate ('left': 0, 'opacity': 1), layerAnimationSettings
									
							else
								animationProperties =
									'opacity': 0
							$(@).stop().delay(opts.delay).animate animationProperties, layerAnimationSettings
													
						if index is itemCount - 1 then $nextArrow.addClass 'disabled' else $nextArrow.removeClass 'disabled'
						if index is 0 then $previousArrow.addClass 'disabled' else $previousArrow.removeClass 'disabled'
						
						$controls.removeClass('active').eq(index).addClass 'active'

						$self.data('carousel').currentItem = index
						yes

					'addItem': ($item) ->
						$self.data('carousel').stop()
						$newLi = $ '<li />'
						$newLi.append $item
						$self.data('carousel').itemCount = ++itemCount
						if $self.data('carousel').currentItem is itemCount - 1 then $nextArrow.addClass 'disabled' else $nextArrow.removeClass 'disabled'
						if $self.data('carousel').currentItem is 0 then $previousArrow.addClass 'disabled' else $previousArrow.removeClass 'disabled'
						$ul.append $newLi


				# Binding events
				$nextArrow.click ->
					$self.data('carousel').showItem $self.data('carousel').currentItem + 1
					no
				$previousArrow.click ->
					$self.data('carousel').showItem $self.data('carousel').currentItem - 1
					no

				$controls.click ->
					$self.data('carousel').showItem $.inArray @, $controls
					no
				
				$(window).bind 'resize', ->
					$self.data('carousel').stop()
					init()
							
)(jQuery)