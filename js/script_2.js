$(document).ready(function() {
  
	setHeightBigP();	
	setHeightProduct();	
	$('.thumbnails .tile').each(function() {
		$(this).css('background-image','url("'+$(".thumb",this).attr('src')+'")');
	});
	
	$(window).load(function() { //hack na chrome i safari
		$('.thumbAdjustWidth .tile').each(function() {
			$(this).css('width',$(".thumb",this).width()+'px');
		});
	});
	
	$('.big-photo').each(function() {
		$(this).css('background-image','url("'+$("img",this).attr('src')+'")');
	});
	
	$('.product .big-prd').each(function() {
		$('.product').css('background-image','url("'+$("img",this).attr('src')+'")');		
	});

	 	 
	 $('.products .thumbnails .tile').hover( //produkty główne, ze składnikami
	  function () {
		 $('.big-photo').css('background-image','url("'+$('.big',this).attr('src')+'")');
		 $('.product').css('background-image','url("'+$('.big',this).attr('src')+'")');
		 $('.info-box-desc').text($('.desc',this).text());
	  },
	  function () {
		  $('.product').css('background-image','url("'+$(".product .big-prd img").attr('src')+'")');
		  $('.info-box-desc').text("");
	  }
	 );
	 
	 $('.desserts .thumbnails .tile').hover( // pozostałe produkty
		  function () {
//			 $('.big-photo img').attr('src', $('.big',this).attr('src'));
			 $('.big-photo').css('background-image','url("'+$('.big',this).attr('src')+'")');
			 $('.info-box h1').text($('.big',this).attr('title'));
		  }
	);
	
	 $(".tabs").tabs();
	 
	 $("#cafe-accordion table tr td:first-child").each(function() {
		 $(this).addClass("td_1");
	 });
	 $("#cafe-accordion table tr td.td_1 + td").each(function() {
		 $(this).addClass("td_2");
	 });

	 
	 $( "#cafe-accordion" ).accordion({ active: -1, autoHeight: false});
	 
});

/*
 * Set height to '.big_photo' 
 */
function setHeightBigP() {
	var bp_div_height = 0;
	$('.thumbnails .tile .big').each(function() {
		if(bp_div_height < $(this).height()) bp_div_height = $(this).height();		
	});
	if (bp_div_height > 0) $('.big-photo').css('min-height',bp_div_height+'px');
}

function setHeightProduct() {
	var div_height = $('.product .big-prd').height();
	$('.product .thumbnails .tile .big').each(function() {
		if(div_height < $(this).height()) div_height = $(this).height();		
	});
	if (div_height > 0) $('.product').css('min-height',div_height+'px');
}