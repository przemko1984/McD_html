(function($){
	
	$.fn.modal = function(options) {

		var defaults = {
			'onClose': $.noop
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
					//console.log($data);
					$html.find('.modal-content').empty().append($data);
					$html.stop().fadeIn();
				}
			});

		});

	}

	$(function(){

		var $menu = $('.children-menu li, .ticks li');

		$('body').modal({
			'onClose': function() {
				$menu.removeClass('active');
			}
		});

		$menu.click(function(){
			
			var href = $(this).find('a').attr('data-request'),
				related = $menu.find('[data-request="' + href + '"]').parent('li');
			
			$menu.removeClass('active');

			$.ajax(href, {
				
				success : function(data) {
					related.addClass('active');
					var $data = $(data);
					$('body').data('modal').show($data);
				}

			});


			return false;
		});

	});

})(jQuery);