/*		Accenture High Performance IT		*/

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(cname, cvalue) {
    document.cookie = cname + '=' + escape(cvalue);
}

var hpit = window.hpit || {};

// initial config
hpit.config = {
	currInsight: 0,
	debugLogging: false,
	scrW: null,
	scrH: null,
	desktopORtouch: 'desktop',
	footerInView: false,
	isIE7: false,
	easing: 'easeInOutExpo',
	duration: {
		backToTop: 2000,
		desktop: 1500,
		touch: 1
	}
};

/*		HPIT core class		*/
hpit.core = (function(){	
	
	var $userAgent = navigator.userAgent.toLowerCase();
    var $Android = /android/i.test( $userAgent );
    var $iOS = /ipad|iphone|ipod|ios/i.test( $userAgent );

	//	Initialize
	function init(){
		$.logEvent('[hpit.core.init]');

		$('#sideMenu').localScroll({
			duration: hpit.config.duration[hpit.config.desktopORtouch],
			easing: hpit.config.easing,
			hash: false,
			onBefore: function(anchor,settings){
				$('#toggleMenu').trigger("click");
			},
			onAfter: function(anchor,settings){
				if(hpit.config.desktopORtouch == 'desktop'){
					//console.log('done scrolling');
				}
			}
		});
		
		// Dynamically switch on debug logging, if specified in the URL
		if(top.location.href.indexOf('debug') != -1) {
			hpit.config.debugLogging = true;
		}
		
		// Calcaulate/re-calculate any dimensions which may be altered by an orientation change or browser resize
		updateDimensions();

		// Initialize controls message
		cntrlMessInit();

		// Initialize event handler for control arrows
		arrowsInit();

		// Initialize event handler for menu toggle
		toggleMenuInit();

		// Initialize event handler for video play button
		playVideoInit();

		// Initialize event handler for social links
		socialLinksInit();

		// Initialize event handler for insight togglers
		togglerInit();
		
		// Work out whether IE7 is being used to view the site, due to the way absolute vs. fixed positioning works differently in that browser
		hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
		
		var validHashValue = false;

		//console.log('config: ', hpit.config);

		footerLock($('#footer'));

		$('.insight').each(function (index) {
			if(!onMobile()){
				paneLock($(this),index);
			}			
		});

		$('.bgImg').css({"opacity" : 0});
		$('.bgImg[data-insight=\'1\']').css({"opacity" : 1});
		$('.bgImg[data-insight=\'2\']').css({"opacity" : 1});

		// Attach functionality to the native scroll function
		$(window).scroll(function(event){
			//console.log('onMobile: ', onMobile());

			if(!onMobile()){
				// determine if we need to lock the background images in place
				if($(window).scrollTop() > $('#hero').outerHeight(true)){
					$('.bgImages').addClass('fixed');
					$('.whiteAngle').addClass('fixed');
					$('#footer').addClass('fixed');
				} else {
					$('.bgImages').removeClass('fixed');
					$('.whiteAngle').removeClass('fixed');
					$('#footer').removeClass('fixed');
					$('#sideMenu ul li').removeClass('hilited');
					$('.bgImg img').removeClass('activate');
					var $newT = $(window).scrollTop() / 3.5;
					$('#hero').css({'top' : - $newT});
				}
			}
		});

		$(window).resize(function(){
        	updateDimensions();
        	if(onMobile()){
	        	$('html').addClass('onMobile');
	        } else {
	        	$('html').removeClass('onMobile');
	        }
        });

        $(window).resize();
	}

	function onMobile() {
		return ( ( hpit.config.scrW < 768 ) || $Android || $iOS );
	}

	function footerLock(element) {
		$(window)
	        .bind('scroll', function () {
	        	var currEle = element;
	        	var footerH = currEle.height();

	        	// Viewport
	            var vpStart = currEle.offset().top; // - 62
	            var vpEnd = vpStart + currEle.height();
	            var scH = parseInt(hpit.config.scrH);

	            // scroll offset
	            var winOffset = $(window).scrollTop();

	            // is the element in the viewport?
	            if (winOffset >= (vpStart-scH)) {
	            	hpit.config.footerInView = true;
	            	var diff = vpEnd - scH;
	            	var scrollDiff = -(winOffset - diff);
	            	var margOffset = scrollDiff - footerH;
	            	$('.bgImages .bgImg img.activate').css({"margin-top" : margOffset/2});
	            } else {
	            	hpit.config.footerInView = false;
	            }
	        });
	}

	function paneLock(element,index) {
		//console.log('paneLock: ', element);

		$(window)
	        .bind('scroll', function () {
	            
	            //var $arr = $('.insight');
	            //console.log('$arr: ', $arr);
	            var currEle = element;
	            var currFixedEle = element.find('.marker');
	            var bgPxToMove = 25;

	            if (currFixedEle.length <= 0) {return false;}

	            // Viewport
	            var vpStart = currEle.offset().top; // - 62
	            var vpEnd = vpStart + currEle.height();

	            var currEleEnd = currEle.height();
	            var currEleHgt = currEle.height();

	            // scroll offset
	            var winOffset = $(window).scrollTop();
	            // console.log('winOffset:',winOffset);

	            if(index === parseInt(hpit.config.currInsight)){ // && vpStart > winOffset
	            	var diff = vpStart - winOffset;
	            	var scH = parseInt(hpit.config.scrH);
	            	var $per = diff/scH; // console.log('$per: ' + $per);
	            	if(diff >= -1 && diff < scH + 1){
	            		$('.bgImg[data-insight='+index+']').css({"opacity" : $per});
	            		$('.insight[data-insight='+index+'] .insightTitle').css({"opacity" : $per});
	            	} else {
	            		$('.insight .insightTitle').css({"opacity" : 1});
	            		//console.log('$per: ' + $per);
	            	}
	            }

	            // is the element in the viewport?
	            if (winOffset >= vpStart && winOffset < vpEnd) {
	                $('.insight').removeClass('current');
	                $('#sideMenu ul li').removeClass('hilited');
	                $('.bgImg img').removeClass('activate');
	                //$('.bgImages img').css({"margin-top" : 0});

	                currEle.addClass('current');

	                var menuItem = $('.insight.current').data('insight');
	                $('#sideMenu ul li[data-insight-nav='+menuItem+']').addClass('hilited');
	                $('.bgImg[data-insight='+menuItem+'] img').addClass('activate');

	                hpit.config.currInsight = menuItem;
	                var prevImgNum = parseInt(menuItem) - 1;
	                var nextImgNum = parseInt(menuItem) + 1;
	                $('.bgImg[data-insight='+prevImgNum+']').css({"opacity" : 0});
	                $('.bgImg[data-insight='+nextImgNum+']').css({"opacity" : 1});

	                var diffToMove = (1 - ((vpEnd - winOffset) / currEleHgt)) * bgPxToMove;
	                if(!hpit.config.footerInView){
						$('.bgImages .bgImg img.activate').css({"margin-top" : -diffToMove});
	                }
	            }
	            // out of the viewport
	            else {
	                currEle.removeClass('current');
	            }

	        });

	}; //End Function

	// show/hide controls message
	function cntrlMessInit(){
		var cntrlMess = getCookie('hasUsedControls');
		console.log('cntrlMess: ', cntrlMess);
		if(cntrlMess == undefined || cntrlMess == null || cntrlMess == ''){
			$('#controls .control-info').fadeIn();
		}
	}

	//hpit.config.currInsight
	function arrowsInit(){
		
		$('.arrows').on('click',function(e){
			e.preventDefault();
			var $cur = parseInt(hpit.config.currInsight);
			var $th = $(this);
			var newNum;
			var newHash;
			
			if($th.hasClass("prev")){
				//console.log('cur: ', $cur);
				if($cur > 1){
					newNum = ($cur - 1);
					//console.log('newNum: ' + newNum);
					newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					$(window).scrollTo(newHash, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing, onAfter: function() { /*location.hash = newHash*/ }} );
				} else {
					//console.log('nothing there');
					return false;
				}
			} else {
				//console.log('cur: ', $cur);
				//console.log('#total: ', $('.insight').length);
				if($cur < $('.insight').length){
					newNum = ($cur + 1);
					//console.log('newNum: ' + newNum);
					newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					$(window).scrollTo(newHash, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing, onAfter: function() { /*location.hash = newHash*/ }} );

				} else {
					//console.log('nothing there');
					return false;
				}
			}
		});
		
	}

	// insight toggler
	function togglerInit(){

		$('.toggler').on('click',function(e){
			e.preventDefault();
			var $th = $(this);
			var $trgt = $th.parent().parent();
			var $cont = $trgt.find('.container.content');
			if($trgt.hasClass('open')){
				$cont.slideUp(500, function(){
					$trgt.removeClass('open');
				});
				//$trgt.removeClass('open');
			} else {
				//$trgt.addClass('open');
				$cont.slideDown(500, function(){
					$trgt.addClass('open');
				});
			}
		});
	}

	// social links
	function socialLinksInit(){

		$('.social > a').on('click',function(e){
			e.preventDefault();
			var $th = $(this);
			var $link = $th.attr('href');
			var $name = $th.attr('class') + '-win';
			var $params = 'toolbar=0,status=0,width=626,height=436';
			window.open($link, $name, $params);			
			return false;
		});
	}

	// video player
	function playVideoInit(){
		$('#hero .playVid').on('click',function(e){
			e.preventDefault();

			$("#hero video")[0].pause();

			$('#ll-player').html('');
			var contStr =  '<object width="100%" height="100%" class="LimelightEmbeddedPlayerFlash" data="https://assets.delvenetworks.com/player/loader.swf" id="limelight_player_239897" name="limelight_player_239897" type="application/x-shockwave-flash">';
				contStr += '<param name="movie" value="https://assets.delvenetworks.com/player/loader.swf">';
				contStr += '<param name="wmode" value="window">';
				contStr += '<param name="allowScriptAccess" value="always">';
				contStr += '<param name="allowFullScreen" value="true">';
				contStr += '<param name="flashVars" value="playerForm=LVPPlayer&amp;channelId=6d4c65019ddc4989a727df2bee85cd7c">';
				contStr += '</object>';

			$('#ll-overlay')
				.find('#ll-player').html(contStr)
				.end()
				.fadeIn(500);
		});

		// close button
		$('.closeVid').on('click',function(e){
			e.preventDefault();

			$('#ll-overlay')
				.find('#ll-player').html('')
				.end()
				.fadeOut(500, function(){
					$("#hero video")[0].play();
				});
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

		/*
			usage:
			//write cookie
			setCookie("id","1",3600);
			setCookie("name","my name",3600);

			//read cookie alert(getCookie("name"));	

			function setCookie(cname, cvalue, cexpire) {
			    document.cookie = cname + '=' + escape(cvalue) +
			    (typeof cexpire == 'date' ? 'expires=' + cexpire.toGMTString() : '') +
			    ',path=/;domain=about.com';
			}

			function getCookie(c_name){
		      var i,x,y,ARRcookies=document.cookie.split(";");
		      for (i=0;i<ARRcookies.length;i++)
		      {
		             x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		             y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		             x=x.replace(/^\s+|\s+$/g,"");
		             if (x==c_name)
		       {
		          return unescape(y);
		          }
		        }
		    }
		*/

		$('#controls a').on('click',function(e){
			e.preventDefault();
			if ( $('#controls .control-info').is(':visible') ) {
				$('#controls .control-info').fadeOut();
				setCookie('hasUsedControls', true);
			}
		});

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

	function updateDimensions(){
		$.logEvent('[hpit.core.updateDimensions]');
		
		hpit.config.scrW = $(window).width();
		hpit.config.scrH = $(window).height();
	}

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
		init: init
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