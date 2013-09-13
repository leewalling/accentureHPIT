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
	state: 0,
	locked: false,
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
	},
	chapterDescriptions: {
		'1': 'Chapter 1 description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mi nisl, elementum a nulla sit amet.',
		'2': 'Chapter 2 description Nulla euismod est ante, a aliquet arcu lobortis mattis. Curabitur eget turpis lectus.',
		'3': 'Chapter 3 description Pellentesque ac enim pulvinar, cursus ipsum ac, fringilla orci. Pellentesque fringilla est...',
		'4': 'Chapter 4 description Ut odio est, consequat eu nisi vitae, euismod sagittis quam. Quisque eget ipsum pulvinar purus.',
		'5': 'Chapter 5 description Cras pulvinar, erat ac tincidunt posuere, erat quam cursus leo, ac commodo dolor quam commodo tortor.',
		'6': 'Chapter 6 description Vivamus eros diam, ultricies id nulla sed, euismod porttitor mi. Cras sed ornare arcu.',
		'7': 'Chapter 7 description Sed ultricies aliquam arcu, eu fermentum lacus hendrerit id. Duis gravida dignissim purus...',
		'8': 'Chapter 8 description Maecenas egestas nisi in convallis pellentesque. Cum sociis natoque penatibus et magnis dis.',
		'9': 'Chapter 9 description Phasellus ac leo lorem. Sed rutrum cursus leo, eu facilisis diam adipiscing et. Etiam imperdiet.',
		'10': 'Chapter 10 description In non augue dolor. Curabitur hendrerit felis nisl, id dignissim nisi gravida in.'
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

		/*
		$('.btt').on('click',function(e){
			hpit.config.currInsight = 0;
			hpit.config.state = 0;
		});
		*/
		
		// Dynamically switch on debug logging, if specified in the URL
		if(top.location.href.indexOf('debug') != -1) {
			hpit.config.debugLogging = true;
		}
		
		// Initialize event handler for sideMenu links
		sideMenuInit();

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
		$('.bgImg[data-insight="1"]').css({"opacity" : 1});
		$('.bgImg[data-insight="2"]').css({"opacity" : 1});

		// Attach functionality to the native scroll function
		$(window).scroll(function(event){
			//console.log('onMobile: ', onMobile());

			if(!onMobile() && !onIpad()){
				// determine if we need to lock the background images in place
				if($(window).scrollTop() > $('#hero').outerHeight(true)){
					if(!$('.bgImages').hasClass('fixed')){
						$('.bgImages').addClass('fixed');
					}
					if(!$('.whiteAngle').hasClass('fixed')){
						$('.whiteAngle').addClass('fixed');
					}
				} else {
					if($('.bgImages').hasClass('fixed')){
						$('.bgImages').removeClass('fixed');
					}
					if($('.whiteAngle').hasClass('fixed')){
						$('.whiteAngle').removeClass('fixed');
					}
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
		//console.log('paneLock: ', element);

		$(window)
			.bind('scroll', function () {
				
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
				// //console.log('winOffset:',winOffset);

				if(index === parseInt(hpit.config.currInsight)){ // && vpStart > winOffset
					var diff = vpStart - winOffset;
					var scH = parseInt(hpit.config.scrH);
					var $per = diff/scH;
					if(diff >= -1 && diff < scH + 1){
						$('.bgImg[data-insight="'+index+'"]').css({"opacity" : $per});
						$('.insight[data-insight="'+index+'"] .insightTitle').css({"opacity" : $per});
					} else {
						$('.insight .insightTitle').css({"opacity" : 1});
					}
				}

				// is the element in the viewport?
				if (winOffset >= vpStart && winOffset < vpEnd) {
					$('.insight.current').removeClass('current');
					$('#sideMenu ul li.hilited').removeClass('hilited');
					$('.bgImg img.activate').removeClass('activate');
					//$('.bgImages img').css({"margin-top" : 0});

					currEle.addClass('current');

					var menuItem = $('.insight.current').find('.insightTitle h6').text().toLowerCase().replace('cio action item #','');				
					menuItem = parseInt(menuItem);
					$('#sideMenu ul li[data-insight-nav="'+menuItem+'"]').addClass('hilited');
					$('.bgImg[data-insight="'+menuItem+'"] img').addClass('activate');

					hpit.config.currInsight = menuItem;
					hpit.config.state = menuItem;
					if(!hpit.config.locked){
						updateArrows(1);
					}
					//updateArrows();

					var prevImgNum = parseInt(menuItem) - 1;
					var nextImgNum = parseInt(menuItem) + 1;
					$('.bgImg').css({"opacity" : 0});
					$('.bgImg[data-insight="'+menuItem+'"]').css({"opacity" : 1});
					$('.bgImg[data-insight="'+nextImgNum+'"]').css({"opacity" : 1});

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
		if(cntrlMess == undefined || cntrlMess == null || cntrlMess == ''){
			$('#controls .control-info').fadeIn();
		}
	}

	//hpit.config.currInsight
	function sideMenuInit(){
		$('#sideMenu ul li a').on('click',function(e){
			e.preventDefault();
			hpit.config.locked = true;
			var $th = $(this);
			var newHash = $th.attr('href');

			$('#toggleMenu').trigger("click");
			$('.arrows').removeClass('noClick');

			$(window).scrollTo(
				newHash,
				{
					duration: hpit.config.duration[hpit.config.desktopORtouch],
					easing:hpit.config.easing,
					onAfter: function() {
						hpit.config.locked = false;
						if(hpit.config.desktopORtouch == 'desktop'){
							if(!$(window).scrollTop() > $('#hero').outerHeight(true)){
								console.log('NOT TOP');
							} else {
								//console.log('scroll top: ', $(window).scrollTop());
								hpit.config.currInsight = 0;
								hpit.config.state = 0;
								updateArrows(2);
							}							
						}
					}
				}							
			);

			/*
			$(window).localScroll(
				{
					duration: hpit.config.duration[hpit.config.desktopORtouch],
					easing: hpit.config.easing,
					hash: false,
					onAfter: function(anchor,settings){
						if(hpit.config.desktopORtouch == 'desktop'){
							if(!$(window).scrollTop() > $('#hero').outerHeight(true)){
								console.log('NOT TOP');
							} else {
								hpit.config.currInsight = 0;
								hpit.config.state = 0;
							}
							updateArrows();
						}
					}
				}
			);
			*/
		});

		//$('#sideMenu').localScroll();
	}

	//hpit.config.currInsight
	function arrowsInit(){

		$('.arrows').on('click',function(e){
			e.preventDefault();
			var $cur = parseInt(hpit.config.currInsight);
			var $th = $(this);
			var newNum;
			var newHash;

			$('.arrows').removeClass('noClick');
			
			if($th.hasClass("prev")){
				if($th.hasClass("noClick")){
					//
					return false;
				} else {
					if($cur > 1){
						newNum = ($cur - 1);
						//console.log('newNum: ' + newNum);
						newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					} else {
						newNum = 0;
						newHash = '#theTop';
						//return false;
					}
					//console.log('newHash: ', newHash);
					$(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
								hpit.config.state = newNum;
								$('.bgImg[data-insight="'+newNum+'"]').css({"opacity" : 1});
								//console.log('config onAfter: ', hpit.config);
								if(newNum < 1){
									$th.addClass('noClick');
								}
							}
						}							
					);
				}
			} else {
				//console.log('cur: ', $cur);
				//console.log('#total: ', $('.insight').length);
				if($cur < $('.insight').length){
					newNum = ($cur + 1);
					//console.log('newNum: ' + newNum);
					newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					
					$(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
								hpit.config.state = newNum;
								$('.bgImg[data-insight="'+newNum+'"]').css({"opacity" : 1});
								//console.log('config onAfter: ', hpit.config);
								if(newNum > $('.insight').length - 1 ){
									$th.addClass('noClick');
								}
							}
						}							
					);

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
	}

	// video player
	function playVideoInit(){
		$('#hero .playVid').on('click',function(e){
			e.preventDefault();
			$("#hero video")[0].pause();
			$('#ll-overlay').fadeIn(500);

			/*
			omniTrack({
				eventName: $(this).attr('href').replace('#',''),
				eventType: 'video-button-click'
			});
			*/
		});

		// close button
		$('.closeVid').on('click',function(e){
			e.preventDefault();

			$('#ll-overlay')
				//.find('#ll-player').html('')
				//.end()
				.fadeOut(500, function(){
					$("#hero video")[0].play();
				});
		});

		// video chapters
		$('.chapters a')
		.on('click',function(e){
			e.preventDefault();
			var skipTo = parseInt($(this).attr('href').replace('#',''));
			//console.log('DelvePlayer: ', DelvePlayer);
			console.log('DelvePlayer: ', DelvePlayer);
			try {
				DelvePlayer.doSeekToSecond(skipTo);
			} catch(err) {
				console.log('DelvePlayer error: ', err);
			}			
		})
		.on('mouseenter',function(e){			
			var thisNum = $(this).text();
			console.log('thisNum: ', thisNum);
			$('#ll-overlay .chapters .contentRow').text(hpit.config.chapterDescriptions[thisNum]).show();
		})
		.on('mouseleave',function(e){
			$('#ll-overlay .chapters .contentRow').hide().text('');
			console.log('clear description');
		});
	}

	function updateSidemenu(){
		//console.log('scrH:', hpit.config.scrH);

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
		$('.insight').each(function (index) {
			$(this).attr('data-insight', index+1);			
		});
		$('li.state').each(function (index) {
			$(this).attr('data-insight-nav', index+1);
			$(this).on('click',function(e){
				hpit.config.state = parseInt($(this).attr('data-insight-nav'));
			})
		});
		$('.bgImg').each(function (index) {
			$(this).attr('data-insight', index+1);			
		});
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
	}

	function updateArrows(from){
		console.log('from: ', from);
		console.log('hpit.config: ', hpit.config);
		if(hpit.config.state > 0 && hpit.config.state < $('.insight').length){
			$('.arrows').removeClass('noClick');
		} else if(hpit.config.state === $('.insight').length) {
			$('.nxt').addClass('noClick');
		} else {
			$('.prev').addClass('noClick');
		}
	}

	function omniTrack(objct){
		console.log('Object passed: ', objct);
		
		try {
			FlashLinkAnalysis( top.location.href, objct.eventName, objct.eventType );
		} catch(err) {
			console.log('Tracking error: ', err);
		}
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
			//console.log(event);
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

function delvePlayerCallback(playerId, eventName, data) {		
	var id = "limelight_player_239897";
	if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) {
		DelvePlayer.registerPlayer(id);
	}
	    
	switch (eventName) {
		case 'onPlayerLoad':
			doOnPlayerLoad();
			break;
		case 'onError':
			doOnError(data);
			break;
		
		case 'onPlayStateChanged':
			doOnPlayStateChanged(data);
			break;
		
		case 'onPlayheadUpdate':
			doonPlayheadUpdate(data);
			break;
		
		/*case 'onChannelLoad':
			doOnChannelLoad(data);
			break;
		
		case 'onMediaLoad':
			doOnMediaLoad(data);
			break;
		
		case 'onPlayheadUpdate':
			doOnPlayheadUpdate(data);
			break;
		*/
	}
}

function doOnPlayerLoad(){
	console.log('player loaded');
}

function doOnError(data){
	console.log('player error: ', data);
}

function doOnPlayStateChanged(data){
	console.log('player state: ', data);
}

function doonPlayheadUpdate(data){
	console.log('Playhead update: ', data);
}

$(document).ready(function(){
	// Initialize
	hpit.core.init();
});