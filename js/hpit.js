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
	var $iOS = /iphone|ipod|ios/i.test( $userAgent );
	var $iPad = /ipad/i.test( $userAgent );
	//var $iPad = true;

	//	Initialize
	function init(){
		$.logEvent('[hpit.core.init]');

		//$('#diagnostics').html($userAgent);

		//$('html').addClass('no-js');

		//var viewPortTag=document.createElement('meta');
		//viewPortTag.id="viewport";
		//viewPortTag.name = "viewport";
		//viewPortTag.content = "width=device-width, target-densityDpi=high-dpi, initial-scale=0.666667, minimum-scale=0.666667, maximum-scale=0.666667";
		//document.getElementsByTagName('head')[0].appendChild(viewPortTag);

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
		
		// inject "data-" and the video object
		injectStuff();

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
			if(!onMobile()){ // && !onIpad()
				paneLock($(this),index);
			}			
		});

		$('.bgImg').css({"opacity" : 0});
		$('.bgImg.data-insight-1,.bgImg.data-insight-2').css({"opacity" : 1});

		// Attach functionality to the native scroll function
		$(window).scroll(function(event){
			//console.log('onMobile: ', onMobile());

			if(!onMobile() && !onIpad()){
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
					if(!onIpad()) {
						$('#hero').css({'top' : - $newT});
					}
				}
			}
		});

		$(window).resize(function(){
			updateDimensions();
			updateSidemenu();

			if(onMobile()){
				$('html').addClass('onMobile');
				if(onIpad()){
					$('html').addClass('onIpad');
				} else{
					$('html').removeClass('onIpad');
				}
			} else {
				$('html').removeClass('onMobile');
			}
		});

		$(window).resize();
	}

	function onMobile() {
		return ( ( hpit.config.scrW < 768 ) || $Android || $iOS ); // || $iPad
	}

	function onIpad() {
		return ( $iPad );
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
		console.log('paneLock: ', element);

		$(window)
			.bind('scroll', function () {
				
				//var $arr = $('.insight');
				//console.log('currInsight: ', hpit.config.currInsight);
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
						$('.bgImg.data-insight-'+index).css({"opacity" : $per});
						$('.insight.data-insight-'+index+' .insightTitle').css({"opacity" : $per});
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

					var menuItem = $('.insight.current').find('.insightTitle h6').text().toLowerCase().replace('cio action item #','');				
					menuItem = parseInt(menuItem);
					$('#sideMenu ul li.data-insight-nav-'+menuItem).addClass('hilited');
					$('.bgImg.data-insight-'+menuItem+' img').addClass('activate');

					hpit.config.currInsight = menuItem;
					var prevImgNum = parseInt(menuItem) - 1;
					var nextImgNum = parseInt(menuItem) + 1;
					$('.bgImg.data-insight-'+prevImgNum).css({"opacity" : 0});
					$('.bgImg.data-insight-'+nextImgNum).css({"opacity" : 1});

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
			//console.log('cur: ', $cur);
			var $th = $(this);
			var newNum;
			var newHash;
			
			if($th.hasClass("prev")){
				//console.log('cur: ', $cur);
				if($cur > 1){
					newNum = ($cur - 1);
					//console.log('newNum: ' + newNum);
					newHash = $('#sideMenu ul li.data-insight-nav-'+newNum+' > a').attr('href');
					
					$(window).scrollTo(newHash, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing, onAfter: function() { hpit.config.currInsight = newNum; /*location.hash = newHash*/ }} );
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
					newHash = $('#sideMenu ul li.data-insight-nav-'+newNum+' > a').attr('href');
					
					$(window).scrollTo(newHash, hpit.config.duration[hpit.config.desktopORtouch], {easing:hpit.config.easing, onAfter: function() { hpit.config.currInsight = newNum; /*location.hash = newHash*/ }} );

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
			var $cl = $th.attr('class');
			var $link = $th.attr('href');
			var $title = $th.attr('title');
			var $shareTitle = encodeURIComponent($title);
			var $winName = $cl + '-win';

			switch($cl){
				case 'google':
					var $linkUrl = $link.split('?')[1].replace("url=","");
					var $shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'https://plus.google.com/share?url=' + $shareUrl;
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
				case 'facebook':
					var $linkUrl = $link.split('?')[1].replace("u=","");
					var $shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'http://www.facebook.com/share.php?u=' + $shareUrl;
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					//http://www.facebook.com/sharer.php?s=100&p[title]=titleheresexily&p[url]=http://www.mysexyurl.com&p[summary]=mysexysummaryhere&p[images][0]=http://www.urltoyoursexyimage.com
					break;
				case 'twitter':
					var $linkUrl = $link.split('?')[1].replace("url=","");
					var $shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'http://twitter.com/share?url=' + $shareUrl +
						'&text=Descriptive text goes here...';
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
				case 'linkedin':
					var $linkUrl = $link.split('?')[1].replace("mini=true&url=","");
					var $shareUrl = encodeURIComponent($linkUrl);
					var $shareSummary = 'test summary - linkedin';
					var $shareSource = 'test source - linkedin';
					var $goto = 'http://www.linkedin.com/shareArticle?mini=true' +
						'&url=' + $shareUrl +
						'&title=' + $shareTitle;// +
						//'&summary=' + $shareSummary +
						//'&source=' + $shareSource;
					$params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
			}

			window.open($goto, $winName, $params);
		});
		/*
		$('.social > a').on('click',function(e){
			e.preventDefault();
			var $th = $(this);
			var $link = $th.attr('href');
			var $name = $th.attr('class') + '-win';
			var $params = 'toolbar=0,status=0,width=626,height=436';
			window.open($link, $name, $params);
			return false;
		});
		*/
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

	function updateSidemenu(){
		console.log('scrH:', hpit.config.scrH);

		var scrH = parseInt(hpit.config.scrH);
		var availH = scrH - 62;
		var menuH = $('#sideMenu > ul').outerHeight();
		
		var $target = $('#sideMenu');
		$target.css({"height" : hpit.config.scrH - 62});

		

		var $diff = menuH - availH;
		//console.log('$diff:', $diff);
		$target.removeClass('height-xxs height-xs height-sm height-md height-lg');
		
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
	}
	
	// sidemenu toggle method
	function toggleMenuInit(){
		//updateSidemenu();
		var $target = $('#sideMenu');

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

	function injectStuff() {
		$('.navbar-toggle').on('click',function(e){
			e.preventDefault();
		});
		$('.navbar-toggle')
			.attr('data-toggle','collapse')
			.attr('data-target','.navbar-collapse');
		$('.video-wrapper').html('<video width="100%" height="auto" autoplay loop><source src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/blue-loop.mp4" type="video/mp4"><source src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/blue-loop.ogg" type="video/ogg"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/video-1280.jpg" /></video>');
	}

	function updateDimensions(){
		$.logEvent('[hpit.core.updateDimensions]');
		
		hpit.config.scrW = $(window).width();
		hpit.config.scrH = $(window).height();
		//console.log('scrW:', hpit.config.scrW);
		//console.log('scrH:', hpit.config.scrH);
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