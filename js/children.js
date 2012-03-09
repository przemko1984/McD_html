(function($){
	
	$.fn.modal = function(options) {

		var defaults = {
			'onClose': $.noop,
			'onOpen': $.noop
		},
			opts = $.extend(defaults, options);

		return this.each(function(){

			var $self = $(this),
				$html = $('<div />', {
					'class': 'modal-container',
					'css' : {
						'display': 'none'
					}
				}).append($('<div />', {
					'class': 'modal'
				}).append($('<div />', {
					'class': 'modal-content'
				})).append($('<a />', {
					'class': 'modal-close',
					'text': 'x'
				}).click(modalCloseHandler))).appendTo('body');

			function modalCloseHandler() {
				$html.stop().fadeOut(function(){
					$html.find('.modal-content').empty();
					opts.onClose();
				});
			}

			$self.data('modal', {
				show: function($data) {
					$html.find('.modal-content').empty().append($data);
					var $modal = $html.find('.modal');
					$html.stop().fadeIn(function(){
						opts.onOpen($data);
					});
				}
			});

		});

	}

	$(function(){

		var $menu = $('.children-menu li, .ticks li');

		$('body').modal({
			'onClose': function() {
				$menu.removeClass('active');
			},
			'onOpen': function($data) {
				$data.find('.children-carousel-container').carousel();
			}
		});

		$menu.click(function(){
			
			var href = $(this).find('a').attr('data-request'),
				related = $menu.find('[data-request="' + href + '"]').parent('li');
			
			$menu.removeClass('active');

			$.ajax(href, {
				
				success : function(data) {
					related.addClass('active');
					var $data = $(data),
						$products = $data.find('.children-products a'),
						$descriptions = $data.find('.children-descriptions li');
					
					$('html, body').animate({
						'scrollTop': related.filter('.ticks li').offset().top - $(window).height()/2
					}, {
						'duration': 300,
						'queue': false
					});
					$('body').data('modal').show($data);

					$products.click(function(){
						var $this = $(this),
							$active = $descriptions.filter('.active');
						if($active.attr('data-description') === $this.attr('data-description')) return false;
						if($active.length)
							$descriptions.filter('.active').removeClass('active').stop().slideUp(function(){
								$descriptions.filter('[data-description="' + $this.attr('data-description') + '"]').addClass('active').stop().slideDown();
							});
						else
							$descriptions.filter('[data-description="' + $this.attr('data-description') + '"]').addClass('active').stop().slideDown();
						return false;
					});
				}

			});


			return false;
		});

	});

})(jQuery);