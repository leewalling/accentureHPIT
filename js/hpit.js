/*		Accenture High Performance IT		*/

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

var hpit = window.hpit || {};

// initial configuration
hpit.configuration = {
	debugLogging: false,
	screenWidth: null,
	screenHeight: null,
	touchOrDesktop: 'desktop',
	isIE7: false,
	easing: 'easeInOutExpo',
	timings: {
		backToTop: 1000,
		desktop: 1000,
		touch: 1
	}
};

// Attach functionality to the native scroll function
$(window).scroll(function(event){
	//console.log('scrolling...');	
});


/*		HPIT core class		*/
hpit.core = (function(){	
	
	//	Initialize
	function init(){
		$.logEvent('[hpit.core.init]');

		$('#hero,#sideMenu').localScroll({
			duration: hpit.configuration.timings[hpit.configuration.touchOrDesktop],
			easing: hpit.configuration.easing,
			hash: true,
			onAfter: function(anchor,settings){
				if(hpit.configuration.touchOrDesktop == 'desktop'){
					console.log('done scrolling');
				}
			}
		});
		
		// Dynamically switch on debug logging, if specified in the URL
		if(top.location.href.indexOf('debug') != -1) {
			hpit.configuration.debugLogging = true;
		}
		
		// Calcaulate/re-calculate any dimensions which may be altered by an orientation change or browser resize
		resetSite();
				
		// Initialize event handler for 'Back to top' links
		//backToTopInit();

		// Initialize event handler for menu toggle
		toggleMenuInit();
		
		// Work out whether IE7 is being used to view the site, due to the way absolute vs. fixed positioning works differently in that browser
		hpit.configuration.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
		
		var validHashValue = false;

		console.log('config: ', hpit.configuration);

		$('.insight').each(function () {
			paneLock($(this));
		});
	}

	function paneLock(element) {

	    $(window)
	        .bind('scroll', function () {
	            
	            var currEle = element;
	            var currFixedEle = element.find('.marker');

	            if (currFixedEle.length <= 0) {return false;}

	            // Viewport
	            var vpStart = currEle.offset().top; // - 62
	            var vpEnd = vpStart + currEle.height();

	            var currEleEnd = currEle.height();

	            // scroll offset
	            var winOffset = $(window).scrollTop();
	            //console.log('winOffset:',winOffset);

	            // is the element in the viewport?
	            if (winOffset >= vpStart && winOffset < vpEnd) {
	                currEle.addClass('current');
	            }
	            // out of the viewport
	            else {
	                currEle.removeClass('current');
	            }

	        });

	}; //End Function
	
	// sidemenu toggle method
	function toggleMenuInit(){
		var scrH = parseInt(hpit.configuration.screenHeight);
		var menuH = $('#sideMenu > ul').outerHeight();
		console.log('scrH: ' + scrH);
		console.log('menuH: ' + menuH);

		var $diff = menuH - (scrH - 62);
		if($diff > 0){
			alert('menu too big!');
		} else {
			alert('diff:' + $diff)
		}
		
		var $target = $('#sideMenu');
		$target.css({"height" : hpit.configuration.screenHeight - 62});

		$('#toggleMenu').on('click',function(e){
			e.preventDefault();

			if($target.hasClass("open")){
				$target.animate({"right":"-275px"}, "normal");
				$target.removeClass("open");
			} else {
				$target.animate({"right":"0px"}, "normal");
				$target.addClass("open");
			}
		});
	}

	/**
	* Calcaulate/re-calculate any dimensions which may be altered by an orientation change or browser resize
	* @method resetSite
	*/	
	function resetSite(){
		$.logEvent('[hpit.core.resetSite]');
		
		hpit.configuration.screenWidth = $(window).width();
		hpit.configuration.screenHeight = $(window).height();
	}
		
	/**
	* Initialize event handler for 'Back to top' links
	* @method backToTopInit
	*/
	function backToTopInit(){
		$.logEvent('[hpit.core.backToTopInit]');
		
		$('.back-to-top').localScroll({
			duration: hpit.configuration.timings[hpit.configuration.touchOrDesktop],
			easing: hpit.configuration.easing,
			hash: false,
			onBefore: function(e,anchor,$target){
				//
			},
			onAfter: function(anchor,settings){
				//
			}
		});
	}
	
	/**
	* Scroll the page to the selected trend
	* @method animateToTrend
	*/
	function animateToTrend(){
		$.logEvent('[hpit.core.animateToTrend]');
		
		//
	}
	
	/**
	* Check to see if the site is being run from a desktop or a touch device
	* @method isTouchDevice
	* @return {Boolean}
	*/
	function isTouchDevice(){
		return hpit.configuration.touchOrDesktop == 'touch';
	}
	
	/**
	* Functionality to execute upon an orientation change (touch devices only)
	* @method touchOrientationChange
	*/
	function touchOrientationChange(){
		$.logEvent('[hpit.core.touchOrientationChange]');
	}
	
	return {
		init: init,
		touchOrientationChange: touchOrientationChange
	}
}());

$(window).on('orientationchange',function(){
	// Functionality to execute upon an orientation change (touch devices only)
	// hpit.core.touchOrientationChange();
});

// jQuery extensions
$.extend({
	/**
	* Logging, based on whether it has been configured to log or not
	* @method logEvent
	* @param {String} event The event to log
	*/
	logEvent: function(event){
		if(hpit.configuration.debugLogging){
			console.log(event);
		}
	},
	
	/**
	* Loop through an object
	* @method logJSONObj
	* @param {Object} obj A variable JSON object to output to the console
	*/
	logJSONObj: function(obj){
		var debugJSON = '';
		var i;
		
		for(i in obj){
			if(obj.hasOwnProperty(i)){
				debugJSON += i + '=' + obj[i] + ', ';	
			}
		}
		return debugJSON.length > 0 ? debugJSON.substr(0,debugJSON.length-2) : '[empty parameter object]';
	}
});

$.fn.extend({	
	// Conditional switching
	hasParent: function(obj){
		return this.filter(function(){
			return $(obj).find(this).length;
		});
	}
});

$(document).ready(function(){
	// Initialize
	hpit.core.init();
}); 