jQuery(document).ready(function($) {
	
	// THIS SLIDER STARTS FROM 1, NOT 0
	
	// NOTE : YOU NEED TO DECLARE FUNCTIONS
	
	//console.log('turning all events OFF');
	//$("#jscript-right, #jscript-left, .jscript-nav-button").off();
	
	//console.log('turning all events ON');
	//$("#jscript-right, #jscript-left, .jscript-nav-button").on();
	
	// Declare global variables
	var intervalTimer = 5000, 
		fadeInOutTimer = 1000,
	// Start from 1 'cos the prev/next button will go to the last in row or second set
		count = 1,
		total = $('.jscript-image').length;
	
	// Function to go forward
	function goForward() {
		// Fade out old image
		console.log('starting fade OUT');
		$(".jscript-active").fadeOut(fadeInOutTimer, function(){
			// Remove all active classes [title, image]
			$(".jscript-image, .jscript-title").removeClass("jscript-active");
			// Tell me that its faded out
			console.log('faded OUT');
		})
		// Finished fade out ^
		// promise().done() function tells fadeIn() (below) to wait till fadeOut() (above) is done 
		.promise().done(function(){
			// Retacked remove button nav to after fade out has finished for a more smoother flow
			// Remove all active classes [button navigation]
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
			});
			// Finished fade in ^
		});
	}
	
	// Function to go backward
	function goBackward() {
		// Fade out old image
		console.log('starting fade OUT');
		$(".jscript-active").fadeOut(fadeInOutTimer, function(){
			// Remove all active classes [title, image]
			$(".jscript-image, .jscript-title").removeClass("jscript-active");
			// Tell me that its faded out
			console.log('faded OUT');
		})
		// Finished fade out ^
		// promise().done() function tells fadeIn() (below) to wait till fadeOut() (above) is done 
		.promise().done(function(){
			// Retacked remove button nav to after fade out has finished for a more smoother flow
			// Remove all active classes [button navigation]
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
	}
	
	function hoverOn() { $(".jscript-nav").css("visibility", "visible"); }
	function hoverOff() { $(".jscript-nav").css("visibility", "hidden"); }
	
	$(".jscript-image, .jscript-title, .jscript-nav").on({
		mouseenter: hoverOn(),
		mouseleave: hoverOff()
	});

	// Click Navigation (LEFT/RIGHT) function
	$("#jscript-right").click(function() {
		goForward();
	});
	$("#jscript-left").click(function() {
		goBackward();
	});
	
	// If there are images (Step NAV 1/2)
	if ($('.jscript-image').length) {
		// Create a navigation button box
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
			goForward();
		}
		else { count = 1; }
	};
	
	// Timer
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