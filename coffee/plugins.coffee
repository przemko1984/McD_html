(($) ->

	###
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
	###
	$.extend $.fn,
		
		carousel: (options) ->
			defaults = 
				'duration': 'slow'
				'easing': 'swing'
				'speed': 0
				'delay': 0
				'onAnimationComplete': $.noop
				'onAnimationInit': $.noop
				'onAjaxInit': $.noop
				'onAjaxError': $.noop
				'onAjaxComplete': $.noop
				'ajax': false,
				'vertical': false
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
				$controlsParentHeight = $controls.parent().height()
				itemWidth = $li.width()
				itemHeight = $li.height()
				itemCount = $li.length
				controlsCount = $controls.length
				animationRunning = no
				
				if itemCount > 1
					# Initialization
					init = ->
						itemWidth = $li.width()
						itemHeight = $li.height()
						
						$self.data('carousel').currentItem = 0 if $self.data('carousel')?
						
						$ul.css
							'position': 'absolute',
							'left': 0,
							'top': 0
						
						if opts.vertical
							$ul.css	'height': "#{itemHeight * itemCount}px"
						else
							$ul.css	'width': "#{itemWidth * itemCount}px"

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

							opts.onAnimationInit index, $li.eq index

							if opts.vertical
								animationProperties =
									'top': "#{-index * itemHeight}px"
							else
								animationProperties =
									'left': "#{-index * itemWidth}px"
							animationSettings =
								'duration': opts.duration
								'easing': opts.easing
								'complete': ->
									animationRunning = no
									opts.onAnimationComplete index, $li.eq index
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
										if opts.vertical
											$layer.css('top': "#{direction * $layer.data('speed') * 100}%", 'opacity': 0).stop().delay($layer.data 'delay').animate ('top': 0, 'opacity': 1), layerAnimationSettings
										else
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

						'requestItem': (index) ->
							return no if index < 0 or index >= itemCount or index is $self.data('carousel').currentItem or animationRunning

							if opts.ajax
								$requestedLi = $li.eq index
								$request = $requestedLi.attr('data-request')
								
								opts.onAjaxInit index, $request

								$.ajax $request,
									success: (data) ->
										$data = $ data
										$img = $data.find 'img'
										imgCount = $img.length
										imgLoaded = 0
										
										if imgCount > 0
											$img.each ->
												$curImg = $ @
												src = $curImg.attr 'src'
												$curImg.load( ->
													if ++imgLoaded >= imgCount
														$requestedLi.html $ data
														$requestedLi.find('.carousel-layer').each ->
															$layer = $ @ 
															$layer.data 'delay', if $layer.attr 'data-delay' then parseInt $layer.attr 'data-delay' else opts.delay
															$layer.data 'speed', if $layer.attr 'data-speed' then parseInt $layer.attr 'data-speed' else opts.speed
														
														opts.onAjaxComplete index, data
														$self.data('carousel').showItem index
												).error( (msg) ->
													opts.onAjaxError index, msg
												).attr('src', src)
										else
											$requestedLi.html $ data
											$requestedLi.find('.carousel-layer').each ->
												$layer = $ @ 
												$layer.data 'delay', if $layer.attr 'data-delay' then parseInt $layer.attr 'data-delay' else opts.delay
												$layer.data 'speed', if $layer.attr 'data-speed' then parseInt $layer.attr 'data-speed' else opts.speed		
											opts.onAjaxComplete index, data
											$self.data('carousel').showItem index
										
									error: (msg) ->
										opts.onAjaxError index, msg
							else
								$self.data('carousel').showItem index


					# Binding events
					$nextArrow.click ->
						$self.data('carousel').requestItem $self.data('carousel').currentItem + 1
						no
					$previousArrow.click ->
						$self.data('carousel').requestItem $self.data('carousel').currentItem - 1
						no

					$controls.click ->
						$self.data('carousel').requestItem $.inArray @, $controls
						no
					
					$(window).bind 'resize', ->
						$self.data('carousel').stop()
						init()
							
)(jQuery)