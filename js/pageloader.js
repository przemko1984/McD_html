$(document).ready(function() {
 
	$.history.init(function(hash){
		pageload(hash);
	});
	
	
	 
});

function pageload(hash) {
	var self = this;
	var setting = null;

//	$jQ('body').prepend("<p>hash:" + hash  + "</p>"+"<p>location.hash:" + location.hash + "</p>");
//	
	// gupi hack, problem pojawil sie z Safari 4 jak nie wykrywa hash sprawdza jeszcze czy nie ma cos w location.hash
	/*if($jQ.browser.safari && $jQ.browser.version < 533){
		if(location.hash != '')
			hash = location.hash.replace(/^#(.*)$/,'$1');
	}*/
	
	
	if (hash) {
		
		
		$.ajax({
			  url: hash +"-ajax.html",
			  beforeSend: function() {
				  pageloadCallback();
				  
			  },
			  success: function(data){
				  $('#main-container').html(data);
				  $(".tabs").tabs();
			  },
			  complete: function(data){
				  $('.main-container').animate({	    
						top: '0', 
					    //height: 'toggle'
					  }, 500, function() {
						   
					});
			  }
		});
		
		
		/*$('#main-container').load(hash +"-ajax.html",
                function(){ 
					$(".tabs").tabs();
                });*/
	}
}

function pageloadCallback() {
	$('#top-lead').animate({	    
		top: '-160px', 
	    //height: 'toggle'
	  }, 300, function() {		  
		  
	});
	$('.top-container-nav ').animate({	    
		top: '-160px', 
	    //height: 'toggle'
	  }, 400, function() {
		   
	});
	
	
	
}