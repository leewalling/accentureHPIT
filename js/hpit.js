/*		Accenture High Performance IT		*/

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

var hpit = window.hpit || {};

// initial config
hpit.config = {
	currInsight: 1,
	debugLogging: false,
	scrW: null,
	scrH: null,
	desktopORtouch: 'desktop',
	isIE7: false,
	easing: 'easeInOutExpo',
	duration: {
		backToTop: 1500,
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
			duration: hpit.config.duration[hpit.config.desktopORtouch],
			easing: hpit.config.easing,
			hash: true,
			onBefore: function(anchor,settings){
				$('#toggleMenu').trigger("click");
			},
			onAfter: function(anchor,settings){
				if(hpit.config.desktopORtouch == 'desktop'){
					console.log('done scrolling');
				}
			}
		});
		
		// Dynamically switch on debug logging, if specified in the URL
		if(top.location.href.indexOf('debug') != -1) {
			hpit.config.debugLogging = true;
		}
		
		// Calcaulate/re-calculate any dimensions which may be altered by an orientation change or browser resize
		resetSite();
				
		// Initialize event handler for 'Back to top' links
		//backToTopInit();

		// Initialize event handler for control arrows
		arrowsInit();

		// Initialize event handler for menu toggle
		toggleMenuInit();
		
		// Work out whether IE7 is being used to view the site, due to the way absolute vs. fixed positioning works differently in that browser
		hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
		
		var validHashValue = false;

		console.log('config: ', hpit.config);

		$('.insight').each(function () {
			paneLock($(this));
		});
	}

	function paneLock(element) {
		element.find('.bgImg').css({"min-height" : element.outerHeight()});

		$(window)
	        .bind('scroll', function () {
	            
	            //var $arr = $('.insight');
	            //console.log('$arr: ', $arr);
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
	                $('.insight').removeClass('current');
	                $('#sideMenu ul li').removeClass('hilited');
	                currEle.addClass('current');

	                var menuItem = $('.insight.current').data('insight');
	                $('#sideMenu ul li[data-insight-nav='+menuItem+']').addClass('hilited');
	                hpit.config.currInsight = menuItem;
	            }
	            // out of the viewport
	            else {
	                currEle.removeClass('current');
	            }

	        });

	}; //End Function

	//hpit.config.currInsight
	function arrowsInit(){
		
		$('.arrows').on('click',function(e){
			e.preventDefault();
			var $cur = parseInt(hpit.config.currInsight);
			var $th = $(this);
			var newNum;
			
			if($th.hasClass("prev")){
				console.log('cur: ', $cur);
				if($cur > 1){
					newNum = ($cur - 1);
					console.log('newNum: ' + newNum);
					$(window).scrollTo('#insight-' + newNum, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing} );
				} else {
					console.log('nothing there');
					return false;
				}
			} else {
				console.log('cur: ', $cur);
				console.log('#total: ', $('.insight').length);
				if($cur < $('.insight').length){
					newNum = ($cur + 1);
					console.log('newNum: ' + newNum);
					$(window).scrollTo('#insight-' + newNum, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing} );
				} else {
					console.log('nothing there');
					return false;
				}
			}
		});
		
	}
	
	// sidemenu toggle method
	function toggleMenuInit(){
		var scrH = parseInt(hpit.config.scrH);
		var availH = scrH - 62;
		var menuH = $('#sideMenu > ul').outerHeight();

		var $diff = menuH - availH;
		if($diff > 0){
			if($diff > 300){
				$('#sideMenu').addClass('height-xxs');
			} else if($diff > 200){
				$('#sideMenu').addClass('height-xs');
			} else if($diff > 100){
				$('#sideMenu').addClass('height-sm');
			} else if($diff > 50){
				$('#sideMenu').addClass('height-md');
			} else  {
				$('#sideMenu').addClass('height-lg');
			}
			
		}
		
		var $target = $('#sideMenu');
		$target.css({"height" : hpit.config.scrH - 62});

		$('#toggleMenu,#sideMenu .closeX').on('click',function(e){
			e.preventDefault();

			if($target.hasClass("opened")){
				$target.animate({"right":"-275px"}, "normal");
				$target.removeClass("opened");
			} else {
				$target.animate({"right":"0px"}, "normal");
				$target.addClass("opened");
			}
		});
	}

	function resetSite(){
		$.logEvent('[hpit.core.resetSite]');
		
		hpit.config.scrW = $(window).width();
		hpit.config.scrH = $(window).height();
	}
		
	/**
	* Initialize event handler for 'Back to top' links
	* @method backToTopInit
	*/
	function backToTopInit(){
		$.logEvent('[hpit.core.backToTopInit]');
		
		$('.back-to-top').localScroll({
			duration: hpit.config.duration[hpit.config.desktopORtouch],
			easing: hpit.config.easing,
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
		return hpit.config.desktopORtouch == 'touch';
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
		if(hpit.config.debugLogging){
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