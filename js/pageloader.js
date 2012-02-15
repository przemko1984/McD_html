$(document).ready(function() {
 
	$.history.init(function(hash){
		pageload(hash);
	});
	 
	
});

function pageload(hash) {
	var self = this;
	var setting = null;

	if (hash) {
		if(hash == 'default'){
			setDefault();
			
		}
		else {
			
			/*
			 * 
			 * 1 pobierz ajax
			 * 2 zaladuj content do ukrytego
			 * 3 sprawdz wielkość ukrytego
			 * 4 rozrzesz tak kontener aby biuro prasowe nie nachodzilo na element
			 * 5 zwin dotychczasowe elementy w gore/dol
			 * 6 nasun element z gory/dolu
			 * 
			 */
			
			fromDown = true; // jeśli true nowy idzie od dołu (stary chowa się w góre), jeśli false nowy od góry (stary do dołu) 
			
			$.ajax({
				  url: hash +"-ajax.html", // do zmiany przy integracji z CMSem
				  beforeSend: function() {
					  prevElem = $('.top-container-nav').find('.active');
					  $('.top-container-nav .active').removeClass("active");
					  nextElem = $('.top-container-nav a[href="#'+hash+'"]').parents('.top-container-col').addClass("active");
					  if(prevElem.index() > 0 && nextElem.index() < prevElem.index()){
						  fromDown = false;
					  }
					  
					  topAnimate();
				  },
				  success: function(data) {
					  $('#main-container').append(data);
					  					  
					  height_c_new = $('#main-container .main-container-new').height(); // pobranie wysokości nowego okna
					  height_c = $('#main-container .main-container').height(); // pobranie wysokości obecnego okna
					  
					  if(fromDown) {// najazd z dołu
						  $('#main-container .main-container-new').css('top',(height_c_new+100)+'px'); 
						  $('#main-container').has('.main-container').css('height',height_c+'px');
						  $('.main-container-full .main-container').addClass('main-container-rm').removeClass('main-container');
							$('.main-container-rm').animate({top: '-800px' }, 500, function() {
								$('.main-container-rm').remove();
								$('#main-container').animate({	    
										height: height_c_new+"px"										
								  }, 500, function() { 
									  $('#main-container').addClass('overflow-hidden main-container-full');
									  $('.main-container-new').css('display','block').css('opacity','0');
									  $('.main-container-new').animate({	    
											top: '0',							
											opacity: '1'
										  }, 400, function() {
											  $('.main-container-new').addClass('main-container').removeClass('main-container-new');
											  $('#main-container').removeClass('overflow-hidden');
											  $('#main-container').css('height','auto');
//											  console.log("#2 ŁADOWANIE od dołu");
										}); 
								  });							
							})
					  } else { // najazd z góry
						  
						  $('#main-container .main-container-new').css('top',(-height_c_new-500)+'px'); // najazd z góry
						  $('#main-container').has('.main-container').css('height',height_c+'px');
						  $('.main-container-full .main-container').addClass('main-container-rm').removeClass('main-container');
						  $('#main-container').addClass('overflow-hidden');
							$('.main-container-rm').animate({
									top: (height_c_new+100)+'px',
									opacity: '0'
								}, 500, function() {
								$('.main-container-rm').remove();
								$('#main-container').removeClass('overflow-hidden');
								$('#main-container').animate({	    
										height: height_c_new+"px", 
								  }, 500, function() { 
									  
									  $('.main-container-new').css('display','block').css('opacity','0');
									  $('.main-container-new').animate({	    
											top: '0',							
											opacity: '1'
										  }, 600, function() {
											  $('.main-container-new').addClass('main-container').removeClass('main-container-new');
											  $('#main-container').css('height','auto');
//											  console.log("#2 ŁADOWANIE od góry");
										}); 
								  });							
							})
					  }
					   
						$('#main-container:not(.main-container-full)').addClass('main-container-full').css('height','260px').animate({	    
							height: height_c_new+"px", 
						  }, 500, function() { 
							  $('#main-container').addClass('overflow-hidden');	
							  $('.main-container-new').css('display','block').css('opacity','0');
							  $('.main-container-new').animate({	    
									top: '0',							
									opacity: '1'
								  }, 700, function() {
									  $('.main-container-new').addClass('main-container').removeClass('main-container-new');
									  $('#main-container').removeClass('overflow-hidden');
									  $('#main-container').css('height','auto');
//									  console.log("#1 ŁADOWANIE");
								}); 
						});
				  },
				  complete: function(data) {
					  pageloadCallback();
				  }
			});			
		}
	}
}


function setDefault() {
	
	$('.top-container-nav .active').removeClass("active");
	$('#top-lead').animate({top: '60px'}, 300, function() {});
	$('.top-container-nav ').animate({ top: '240px' }, 400, function() {});
	
	height_c = $('#main-container .main-container').height(); // pobranie wysokości okna
	$('#main-container').has('.main-container').addClass('overflow-hidden').css('height',height_c+'px');
	$('.main-container').animate({top: (height_c+100)+'px' }, 400, function() { 
		$('.main-container').remove();
		$('#main-container').removeClass('overflow-hidden');
		$('#main-container').animate({	    
			height: "220px", 
			opacity: '0'
		  }, 400, function() {
			  $('#main-container').removeClass('main-container-full').css('height','0').css('opacity','1');
		});
	});
}

function topAnimate() {
	$('#top-lead').animate({	    
		top: '-160px', 
	  }, 300, function() {	  
		  
	});
	$('.top-container-nav').animate({	    
		top: '60px', 
	  }, 400, function() {
		   
	});
}

function pageloadCallback() {
	
	$('.timeline-carousel-container').carousel({
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

    $(".tabs").tabs();
}