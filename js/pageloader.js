$(document).ready(function() {
 
	$.history.init(function(hash){
		pageload(hash);
	});
	 
	$('#logo').click(function(){
//		$('.main-container').animate({top: '-800px' }, 500, function() { $('.main-container').remove();});
		removeUp();
		return false;
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
			
			$.ajax({
				  url: hash +"-ajax.html",
				  beforeSend: function() {
					  setNav(hash);
					  pageloadCallback();
					  removeUp();
				  },
				  success: function(data) {
					  $('#main-container').append(data);
					  $(".tabs").tabs();
					  $('#main-container .main-container-new').css('top','300px');
					  $('#main-container .main-container-new').css('display','block');
				  },
				  complete: function(data) {
					  $('.main-container-new').animate({	    
							top: '0', 
						  }, 700, function() {
							  $('.main-container-new').addClass('main-container').removeClass('main-container-new');
						}); 
				  }
			});
			
		}
		/*$('#main-container').load(hash +"-ajax.html",
                function(){ 
					$(".tabs").tabs();
                });*/
	}
}
function setNav(hash) {
	$('.top-container-nav .active').removeClass("active");
	$('.top-container-nav a[href="#'+hash+'"]').parents('.top-container-col').addClass("active");
}

function setDefault() {
	$('.top-container-nav .active').removeClass("active");
	$('#top-lead').animate({top: '60px'}, 300, function() {});
	$('.top-container-nav ').animate({ top: '240px' }, 400, function() {});
	removeDown();
}

function removeDown() {
	$('.main-container').animate({top: '1300px' }, 500, function() { $('.main-container').remove();});
}
function removeUp() {
	$('.main-container').addClass('main-container-rm').removeClass('main-container');
	$('.main-container-rm').animate({top: '-800px' }, 500, function() {
		$('.main-container-rm').remove();
	});

}
function addDown() {
	
}
function addUp() {
	
}

function pageloadCallback() {
	$('#top-lead').animate({	    
		top: '-160px', 
	  }, 300, function() {	  
		  
	});
	$('.top-container-nav').animate({	    
		top: '60px', 
	  }, 400, function() {
		   
	});
	
}