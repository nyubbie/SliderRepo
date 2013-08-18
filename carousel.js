jQuery(document).ready(function($) {
	
	// THIS SLIDER STARTS FROM 1, NOT 0
	
	// Declare global variables
	var intervalTimer = 5000, 
		fadeInOutTimer = 1000,
	// Start from 1 'cos the prev/next button will go to the last in row or second set
		count = 1,
		total = $('.jscript-image').length;
	
	// Hover function for Carousel
	$(".jscript-image").hover(
		// Hover on
		function(){	$(".jscript-nav").css("visibility", "visible"); },
		// Hover off
		function(){	$(".jscript-nav").css("visibility", "hidden");  }
	);
	$(".jscript-title").hover(
		// Hover on
		function(){	$(".jscript-nav").css("visibility", "visible");	},
		// Hover off
		function(){	$(".jscript-nav").css("visibility", "hidden");	}
	);
	$(".jscript-nav").hover(
		// Hover on
		function(){	$(".jscript-nav").css("visibility", "visible");	},
		// Hover off
		function(){	$(".jscript-nav").css("visibility", "hidden");	}
	);	


	// Click Navigation (LEFT/RIGHT) function
	$("#jscript-right").click(function() {
		// Remove all active classes

		console.log('starting fade OUT');
		console.log('turning all events OFF');
		$("#jscript-right, #jscript-left, .jscript-nav-button").off();
			$(".jscript-active").fadeOut(fadeInOutTimer, function(){
				$(".jscript-image, .jscript-title").removeClass("jscript-active");
				// Tell me that its faded out
				console.log('faded OUT');
			})
			// Finished fade out ^
			// promise().done() function tells fadeIn() (below) to wait till fadeOut() (above) is done 
			.promise().done(function(){
				// Retacked remove button nav to after fade out has finished for a more smoother flow
				$(".jscript-nav-button").removeClass("button-active");
				console.log(count + ' right click before');
				
				count++; 
				if (count > total) {count = 1; console.log('count reset to 1');} 
				else if (count <= 0) {count = total; console.log('count reset to total');}
				
				console.log(count + ' right click after');
				// Fade In new image
				console.log('starting fade IN');
				//Add Button Nav first
				$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
				$("#featured-image-"+count+", #featured-title-"+count).fadeIn(fadeInOutTimer, function(){
					$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
					// Tell me that its faded in
					console.log('faded IN');
					console.log('turning all events ON');
					$("#jscript-right, #jscript-left, .jscript-nav-button").on();
				});
				// Finished fade in ^
			});


		//$(".jscript-image, .jscript-title").removeClass("jscript-active");
		//$(".jscript-nav-button").removeClass("button-active");
		//console.log(count + ' right click before');
		//count++; if (count > total) {count = 1;} else if (count <= 0) {count = total;}
		//console.log(count + ' right click after');
		//$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
		//$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
	});
	$("#jscript-left").click(function() {
		// Remove all active classes
		
		console.log('starting fade OUT');
			$(".jscript-active").fadeOut(fadeInOutTimer, function(){
				$(".jscript-image, .jscript-title").removeClass("jscript-active");
				// Tell me that its faded out
				console.log('faded OUT');
			})
			// Finished fade out ^
			// promise().done() function tells fadeIn() (below) to wait till fadeOut() (above) is done 
			.promise().done(function(){
				// Retacked remove button nav to after fade out has finished for a more smoother flow
				$(".jscript-nav-button").removeClass("button-active");
				console.log(count + ' left click before');
				
				count--; 
				if (count > total) {count = 1; console.log('count reset to 1');} 
				else if (count <= 0) {count = total; console.log('count reset to total');}
				
				console.log(count + ' left click after');
				// Fade In new image
				console.log('starting fade IN');
				//Add Button Nav first
				$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
				$("#featured-image-"+count+", #featured-title-"+count).fadeIn(fadeInOutTimer, function(){
					$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
					// Tell me that its faded in
					console.log('faded IN');
				});
				// Finished fade in ^
			});
		
		
		//$(".jscript-image, .jscript-title").removeClass("jscript-active");
		//$(".jscript-nav-button").removeClass("button-active");
		//console.log(count + ' left click before');
		// Add to count, but reset to first image or last image if higher or lower than count
		//count--; if (count > total) {count = 1;} else if (count <= 0) {count = total;}
		//console.log(count + ' left click after');
		//$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
		//$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
	});
	// If there are images (Step NAV 1/2)
	if ($('.jscript-image').length) {
		$('#jscript-content').after('<div id="jscript-nav-box"></div>');
	};
	// Get every '.jscript-image' in the DOM (Step NAV 2/2)
	$('.jscript-image').each(function(i){
		// Make 'i' into a number because doing .append(... i + 1 ...) gives you 01, 11, 21 on the html document.
		var nextInt = i + 1;
		$('#jscript-nav-box').append('<a rel="'+ nextInt +'" class="jscript-nav-button">'+ nextInt +'</a>');
	});
	
	// Button Navigation Click function (Step BCLICK 1/1)
	$(".jscript-nav-button").click(function() {
		// Remove all active classes first...
		$(".jscript-nav-button").removeClass("button-active");
		// Get rel attribute number so you can link to the image number in carousel
		count = $(this).attr("rel");
		//Then change the image, yo
		console.log('button navigation clicked');
		$(".jscript-image, .jscript-title").removeClass("jscript-active");
		console.log('button navigation active class removed');
		$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
		console.log('button navigation active class added');
		// Remember to put that button class in after everything is done!
		$(this).addClass("button-active");
	});
	
	// Timer Function
	function timerFunc() {
		if (count >= 1 || count <= total) { 
			// Fade out old image
			console.log('starting fade OUT');
			$(".jscript-active").fadeOut(fadeInOutTimer, function(){
				$(".jscript-image, .jscript-title").removeClass("jscript-active");
				// Tell me that its faded out
				console.log('faded OUT');
			})
			// Finished fade out ^
			// promise().done() function tells fadeIn() (below) to wait till fadeOut() (above) is done 
			.promise().done(function(){
				// Retacked remove button nav to after fade out has finished for a more smoother flow
				$(".jscript-nav-button").removeClass("button-active");
				console.log(count + ' timer before');
				
				// Add to count to move on to next image
				count++;
				
				// Catch any numbers that are 0 (or below), or more than total.
				if (count > total) {count = 1; console.log('count reset to 1');}
				else if (count <= 0) {count = total; console.log('count reset to total');}
				else {console.log('error, numbers out of range!');}
				
				console.log(count + ' timer after');
				// Fade In new image
				console.log('starting fade IN');
				//Add Button Nav first
				$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
				$("#featured-image-"+count+", #featured-title-"+count).fadeIn(fadeInOutTimer, function(){
					$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
					// Tell me that its faded in
					console.log('faded IN');
				});
				// Finished fade in ^
			});
		}
		else { count = 1; }
	};
	
	// Timer currently 8000
	var timer = setInterval(function(){timerFunc();},intervalTimer);
	
	// Declare active class after everything has loaded
	console.log(count + ' starting count');
	$("#featured-image-"+count+", #featured-title-"+count).addClass("jscript-active");
	$(".jscript-nav-button[rel="+count+"]").addClass("button-active");
	
	// Stop on Hover
	$(".jscript-content,.jscript-image,.jscript-title,.jscript-nav,.jscript-nav-button").hover(function(){
			clearInterval(timer);
			console.log("stopped");
		}, function(){
			timer = setInterval(function() {timerFunc()},intervalTimer);
			console.log("started");
		}
	);
});