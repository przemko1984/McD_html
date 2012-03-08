(function($){
	
	$(function(){
		
		var $menu = $('.children-menu li a, .ticks li a');

		$menu.click(function(){
			
			var href = $(this).attr('href'),
				related = $menu.filter('[href="' + href + '"]');
			
			$menu.removeClass('active');

			$.ajax(href, {
				
				success : function(data) {
					var $data = $(data);
				}

			});


			return false;
		});

	});

})(jQuery);