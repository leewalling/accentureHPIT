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

function preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
		$('.bgImages').append('<div class="bgImg"><img src="'+this+'" /></div>');
	});
}

var hpit = window.hpit || {};

// initial config
hpit.config = {
	currPageView: 0,
	currInsight: 0,
	state: 0,
	justClicked: false,
	locked: false,
	debugLogging: false,
	scrW: null,
	scrH: null,
	desktopORtouch: 'desktop',
	footerInView: false,
	isIE7: false,
	easing: 'easeOutExpo',
	duration: {
		backToTop: 2000,
		desktop: 1500,
		touch: 1
	},
	limelightVideos: {
		'insight1': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight2': {
			mediaId: '533c3bba782f4c8fb90ab67c1e343f2a',
			uid: '204902'
		},
		'insight3': {
			mediaId: '93ad7ada761541949557fe9677d2872d',
			uid: '905416'
		},
		'insight4': {
			mediaId: '80e9c5e088bc4f718d9e496e35d026ae',
			uid: '289104'
		},
		'insight5': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight6': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight7': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight8': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight9': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		},
		'insight10': {
			mediaId: 'c8403ed273d34709ba9d33a222d54877',
			uid: '388912'
		}
	},
	groups: {
		'insight1': {
			newHash: '#insight1'
		},
		'insight2': {
			newHash: '#insight2'
		},
		'insight3': {
			newHash: '#insight3'
		},
		'insight4': {
			newHash: '#insight4'
		},
		'insight5': {
			newHash: '#insight5'
		},
		'insight6': {
			newHash: '#insight6'
		},
		'insight7': {
			newHash: '#insight7'
		},
		'insight8': {
			newHash: '#insight8'
		},
		'insight9': {
			newHash: '#insight9'
		},
		'insight10': {
			newHash: '#insight10'
		}
	},
	activeChap: 0,
	currChap: 0,
	chapters: {
		'1': {
			title: 'Chapter 1: Accenture High Performance IT Survey 2013',
			position: 0
		},
		'2': {
			title: 'Chapter 2: What’s on Paul’s mind',
			position: 31000
		},
		'3': {
			title: 'Chapter 3: Distinguishing high performing CIOs',
			position: 81000
		},
		'4': {
			title: 'Chapter 4: The role of the CIOs',
			position: 137000
		},
		'5': {
			title: 'Chapter 5: Rethinking your business',
			position: 182000
		},
		'6': {
			title: 'Chapter 6: Putting data to work',
			position: 220000
		},
		'7': {
			title: 'Chapter 7: Dealing with complexity',
			position: 256000
		},
		'8': {
			title: 'Chapter 8: Evaluating the findings',
			position: 305000
		}	
   }
};

/*		HPIT core class		*/
hpit.core = (function(){	
	
	var $userAgent = navigator.userAgent.toLowerCase();
	var $Android = /android/i.test( $userAgent );
	var $iOS = /iphone|ipod|ios/i.test( $userAgent );
	var $iPad = /ipad/i.test( $userAgent );
	//var $iPad = true;
	var chapterClicked;
   var trackPageViewDelay;

	//	Initialize
	function init(){

		if(isIE8){
			//console.log('IS ie8');
			$('html').addClass('ie8');
		} else {
			//console.log('NOT ie8');
		}

		var debug = $.getUrlVar('debug');
		if(debug == 'true'){
			$('#diagnostics').show();
		}

		/*
		$('head').append('<meta name="viewport" content="width=device-width, target-densityDpi=high-dpi, initial-scale=0.666667, minimum-scale=0.666667, maximum-scale=0.666667">');
		$('head').append('<meta property="og:title" content="High Performance IT - Accenture" />');
		$('head').append('<meta property="og:url" content="http://www.accenture.com/microsites/high-performance-it/pages/home.aspx" />');
		$('head').append('<meta property="og:description" content="Accenture High Performance IT description ..." />');
		$('head').append('<meta property="og:type" content="company" />');
		$('head').append('<meta property="og:site_name" content="Accenture" />');
		$('head').append('<meta property="og:image" content="http://www.accenture.com/microsites/high-performance-it/PublishingImages/logo.png" />');
		*/

		if(!onMobile() && !onIpad()){
			//console.log('preloading!');
			preload([
				'images/01.png',
				'images/02.png',
				'images/03.png',
				'images/04.png',
				'images/05.png',
				'images/06.png',
				'images/07.png',
				'images/08.png',
				'images/09.png',
				'images/10.png'
			]);
		} else {
			//console.log('NO preload');
		}

		$('#diagnostics').html('<div>' + $userAgent + '</div>' + '<div>w: ' + $(window).width() + '</div>' + '<div>h: ' + $(window).height() + '</div>' + '<div>onMobile:' + onMobile() + '</div>' + '<div>onIpad:' + onIpad() + '</div>');
		
		// add favicon
		//addFavicon();

		// Initialize event handler for deeplinks
		deeplinkInit();

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
		
		// check if the user is on IE7
		hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
		
		var validHashValue = false;

		footerLock($('#footer'));

		$('.insight').each(function (index) {
			if(!onMobile() && !onIpad()){
				paneLock($(this),index);
			}			
		});

		// track download link click
		$('.download a,.download-link a').on('click',function(e){
         FlashLinkAnalysis($(this).attr('href'), "download study - insight " + hpit.config.currInsight, "linkanalysis")
		});

		// track contact link click
		$('.contact a').on('click',function(e){
			omniTrack({
				eventLink: $(this).attr('href'),
				eventName: 'Contact US – Top Nav',
				eventType: 'Internal Lead Gen'
			});
		});

		// track footer - "learn more" section link clicks
		$('#footer .about a').on('click',function(e){
			omniTrack({
				eventLink: $(this).attr('href'),
				eventName: 'Learn More - ' + $(this).text(),
				eventType: 'Internal Text Link'
			});
		});

		$('.bgImg').css({"opacity" : 0});
		$('.bgImg[data-insight="1"]').css({"opacity" : 1});
		$('.bgImg[data-insight="2"]').css({"opacity" : 1});

		// Attach functionality to the native scroll function
		$(window).scroll(function(event){
			//console.log('insight 1 top: ', $('.insight').eq(0).offset().top);

			// if the hero video exists remove it upon initial window scroll
			if($('#theVideo').length){
				$('.video-wrapper').html('');
			}

			if(!onMobile() && !onIpad()){
				// determine if we need to lock the background images in place
				if($(window).scrollTop() > $('.insight').eq(0).offset().top-1){ //$('.hero').outerHeight(true)
					if(!$('.bgImages').hasClass('fixed')){
						$('.bgImages').addClass('fixed');
					}
					if(!$('.whiteAngle').hasClass('fixed')){
						$('.whiteAngle').addClass('fixed');
					}
					if(!$('.blackAngle').hasClass('fixed')){
						$('.blackAngle').addClass('fixed');
					}
					if ( $('#controls .control-info').is(':visible') ) {
						$('#controls .control-info').fadeOut();
						setCookie('hasUsedControls', true);
					}
				} else {
					var toGo = $('.insight').eq(0).offset().top - $(window).scrollTop();					
					if(toGo > -1 && toGo < 226){						
						//console.log('toGo: ', toGo);
						if($('.blackAngle').hasClass('fixed')){
							$('.blackAngle').removeClass('fixed');
						}
						$('.blackAngle').css({'bottom' : - toGo});
					} else {
						//console.log('toGo ELSE: ', toGo);
						$('.blackAngle').removeClass('fixed').removeAttr('style');
					}

					if($('.bgImages').hasClass('fixed')){
						$('.bgImages').removeClass('fixed');
					}
					if($('.whiteAngle').hasClass('fixed')){
						$('.whiteAngle').removeClass('fixed');
					}
					if($('.blackAngle').hasClass('fixed')){
						$('.blackAngle').removeClass('fixed').removeAttr('style');
					}
					$('#footer').removeClass('fixed');
					$('#sideMenu ul li').removeClass('hilited');
					$('.bgImg img').removeClass('activate');
					var $newT = $(window).scrollTop() / 3.5;
					if(!onIpad()) {
						$('.hero').css({'top' : - $newT});
					}
				}
			}
		});

		$(window).resize(function(){
			updateDimensions();
			updateSidemenu();

			if(onMobile()){
				if(!onIpad() && $(window).width() > 767){
					//alert('exception!');
					$('html').addClass('exception');
				};
				$('html').removeClass('desktop').addClass('onMobile');
			} else {
				$('html').removeClass('onMobile exception').addClass('desktop');
			}

			if(onIpad()){
				$('html').addClass('onIpad');
			} else {
				$('html').removeClass('onIpad');
			}
		});

		$(window).on('orientationchange', function(event) {
			//alert('orientation - changed');
			//location.reload();
		});

		$(window).resize();

		// Initialize event handler for insight togglers
		togglerInit();
	}

	function onMobile() {
		return ( ( $(window).width() < 768 ) || $Android || $iOS && !$iPad );
		//return true;
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
				var vpStart = currEle.offset().top - 1; // - 62
				var vpEnd = vpStart + currEle.height();

				var currEleEnd = currEle.height();
				var currEleHgt = currEle.height();

				// scroll offset
				var winOffset = $(window).scrollTop();
				//console.log('winOffset:',winOffset);

				if(index === parseInt(hpit.config.currInsight)){ // && vpStart > winOffset
					var currEleTitle = $('.insight[data-insight="'+index+'"] .insightTitle');
					if(currEleTitle.hasClass('lockedBottom')){
						currEleTitle.removeClass('lockedBottom');
					}
					var titleEnd = parseInt(currEleTitle.css('top')) + currEleTitle.height() + 75;

					var diff = vpStart - winOffset;
					//console.log('diff:', diff);

					if(diff < titleEnd){
						if(!currEleTitle.hasClass('lockedBottom')){
							currEleTitle.addClass('lockedBottom');
						}						
					}/* else {
						if(currEleTitle.hasClass('lockedBottom')){
							currEleTitle.removeClass('lockedBottom');
						}
					}*/
					
					var scH = parseInt(hpit.config.scrH);
					var $per = diff/scH;
					if(diff >= -1 && diff < scH + 1){
						$('.bgImg[data-insight="'+index+'"]').css({"opacity" : $per});
						//$('.insight[data-insight="'+index+'"] .insightTitle').css({"opacity" : $per});
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

					//console.log('data: ', $('.insight.current').data('insight'));

					var menuItem = parseInt($('.insight.current').data('insight'));
					//$('.insight.current').find('.marker > div > span').text()
					menuItem = parseInt(menuItem);
					//console.log('data: ', menuItem);
					
					$('#sideMenu ul li[data-insight-nav="'+menuItem+'"]').addClass('hilited');
					$('.bgImg[data-insight="'+menuItem+'"] img').addClass('activate');
 
					if(!hpit.config.locked && (hpit.config.currPageView != menuItem)){
                  clearInterval(trackPageViewDelay);
                  trackPageViewDelay = setTimeout(function() {
                     //console.log("Page View: " + menuItem);
                     //omniTrackPageView(menuItem);
                  }, 2000);
               }

					hpit.config.currInsight = menuItem;
					//console.log('currInsight change 1');
					//console.log('currInsight: ', hpit.config.currInsight);
					hpit.config.state = menuItem;
					hpit.config.currPageView = menuItem;
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
						$('.bgImages .bgImg img').css({"margin-top" : 0});
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

	// Favicon
	function addFavicon(){
		var link = document.createElement('link');
    	link.type = 'image/x-icon';
    	link.rel = 'shortcut icon';
    	link.href = 'http://www.accenture.com/Microsites/high-performance-it/PublishingImages/favicon.ico';
    	document.getElementsByTagName('head')[0].appendChild(link);
	}

	// deeplinking
	function deeplinkInit(){
		var groupParam = $.getUrlVar('group');
		var delay = 500;
		
		if(groupParam && groupParam.indexOf('insight') != -1){
			//console.log('deeplink: ', groupParam);
			var deeplink = groupParam.replace('insight','');
			deeplink = parseInt(deeplink);
			if(isNaN(deeplink)){
				//console.log('deeplink - NAN');
			} else if(deeplink > 0 && deeplink < $('.insight').length+1) {
				/*if(deeplink > 5){
					delay = 1200;
				}*/
				//console.log('valid deeplink: ', groupParam);
				var newHash = hpit.config.groups[groupParam].newHash;
				//console.log('newHash: ', newHash);
				hpit.config.locked = true;

				setTimeout(function(){
					$(window).scrollTo(
						newHash,
						{
							duration: 1, //hpit.config.duration[hpit.config.desktopORtouch],
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.locked = false;
								//console.log('deeplinking DONE!');
								//setTimeout(function(){
									//updateArrows(4);
									//hpit.config.locked = false;
								//}, 100);
							}
						}							
					);
				}, delay);
					
			} else {
				//console.log('NOT IN RANGE!!!!');
			}
			
		} else {
			//console.log('invalid group: ', groupParam);
		}
	}
	// sidemenu init
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
							if($(window).scrollTop() < $('.insight').eq(0).offset().top){
								//console.log('win scroll: ', $(window).scrollTop());
								//console.log('insight 1 top: ', $('.insight').eq(0).offset().top);
								hpit.config.currInsight = 0;
								//console.log('currInsight change 2');
								hpit.config.state = 0;
								hpit.config.currPageView = 0;
								setTimeout(function(){updateArrows(3)}, 100);
							} else {
								//console.log('NOT TOP');
								//console.log('currInsight: ', hpit.config.currInsight);
							}							
						}
					}
				}							
			);
		});

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
               omniTrackPageView(newNum);
               //console.log('newHash: ', newHash);
               
                  $(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
								//console.log('currInsight change 3');
								hpit.config.state = newNum;
								hpit.config.currPageView = newNum;
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
				   omniTrackPageView(newNum);
               newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					
					$(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
								//console.log('currInsight change 4');
								hpit.config.state = newNum;
								hpit.config.currPageView = newNum;
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

		$('.onMobile .insight .insightTitle').on('click',function(e){
			e.preventDefault();
			var $th = $(this);
			//console.log('$th: ', $th);
			var $trgt = $th.parent();
			//alert('$trgt: ', $trgt);
			var $cont = $trgt.find('.container.content');
			if($trgt.hasClass('open')){
				$cont.show(0, function(){
					$trgt.removeClass('open');
				});
				/*$cont.slideUp(500, function(){
					$trgt.removeClass('open');
				});*/
			} else {
				$cont.hide(0, function(){
					$trgt.addClass('open');
				});
				/*$cont.slideDown(500, function(){
					$trgt.addClass('open');
				});*/
			}
		});
	}

	// social links
	function socialLinksInit(){

		$('.social > a').on('click',function(e){
			e.preventDefault();
			var $th = $(this);

			var inTopNav = false;
			if($th.parent().parent().hasClass('share')){
				inTopNav = true;
			}
			
			var $cl = $th.attr('class');
			var $link = $th.attr('href');
			var $linkUrl = $link.split('?')[1];
			var $title = $th.attr('title');
			var $shareUrl = '';
			var $shareTitle = encodeURIComponent($title);
			var $winName = $cl + 'Window';
			var $toTrack;
			var $trackName;

			switch($cl){
				case 'google':
					$trackName = 'Google+';
					$linkUrl = $linkUrl.replace("url=","");
					$shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'https://plus.google.com/share?url=' + $shareUrl;
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
				case 'facebook':
					// http://www.facebook.com/sharer.php?s=100&p[title]=titleheresexily&p[url]=http://www.mysexyurl.com&p[summary]=mysexysummaryhere&p[images][0]=http://www.urltoyoursexyimage.com
					$trackName = 'Facebook';
					$linkUrl = $linkUrl.replace("u=","");
					$shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'http://www.facebook.com/share.php?u=' + $shareUrl;
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
				case 'twitter':
					$trackName = 'Twitter';
					$linkUrl = $linkUrl.replace("url=","");
					$shareUrl = encodeURIComponent($linkUrl);
					var $goto = 'http://twitter.com/share?url=' + $shareUrl +
						'&text=Descriptive text goes here...';
					var $params = 'width=660,height=400,scrollbars=no;resizable=no';
					break;
				case 'linkedin':
					$trackName = 'LinkedIn';
					$linkUrl = $linkUrl.replace("mini=true&url=","");
					$shareUrl = encodeURIComponent($linkUrl);
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

			/*console.log('$goto: ', $goto);
			console.log('$winName: ', $winName);
			console.log('$params: ', $params);
			console.log('window: ', window);*/

			try {
				window.open($goto, $winName, $params);
			} catch(err) {
				console.log('error: ', err);
			}

			// tracking social clicks
			if(inTopNav){
				$toTrack = $linkUrl;
				omniTrack({
					eventLink: $toTrack,
					eventName: 'Share - Top Nav',
					eventType: 'Social'
				});
			} else {
				$toTrack = $linkUrl + '?' + $link.split('?')[2];
				omniTrack({
					eventLink: $toTrack,
					eventName: 'Share - ' + $trackName,
					eventType: 'Social'
				});
			}

			//console.log('$toTrack: ', $toTrack);
		});
	}

	// video player
	function playVideoInit(){
		$('.hero .playVid').on('click',function(e){
			e.preventDefault();

			$('.the-video.active').each(function (index) {
				$(this).find('.vidWrapper').remove().end().removeClass('active');
			});
			
			if(!onMobile() && !onIpad() && !isIE8){
				if($('#hero video').length){
					$("#hero video")[0].pause();
				} else {
					//console.log('NO VIDEO');
				}
			}
			$('html').addClass('noScroll');
			$('#ll-overlay').fadeIn(500, function(){
				var vidContent =  '<object type="application/x-shockwave-flash" id="limelight_player_239897" name="limelight_player_239897" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//assets.delvenetworks.com/player/loader.swf">';
					vidContent += '<param name="movie" value="//assets.delvenetworks.com/player/loader.swf"/>';
					vidContent += '<param name="wmode" value="transparent"/>';
					vidContent += '<param name="allowScriptAccess" value="always"/>';
					vidContent += '<param name="allowFullScreen" value="true"/>';
					vidContent += '<param name="flashVars" value="playerForm=HoverPlayer&amp;channelId=c315bfc4a8c345af807b2887698549f6"/>';
					vidContent += '</object>';

				$('#ll-overlay #ll-player').html(vidContent);
				LimelightPlayerUtil.initEmbed('limelight_player_239897');
			});

			omniTrack({
				eventLink: $(this).attr('href'),
				eventName: $(this).attr('href').replace('#',''),
				eventType: 'hero video play'
			});
		});

		// close button
		$('.closeVid').on('click',function(e){
			e.preventDefault();

			try {
				DelvePlayer.doPause();
			} catch(err) {
				//console.log('DelvePlayer error: ', err);
			}
			
			resetVideoStates();
			$('html').removeClass('noScroll');

			$('#ll-overlay')
				.find('#ll-player').html('')
				.end()
				.fadeOut(500, function(){
					if(!onMobile() && !onIpad() && !isIE8){
						if($('#hero video').length){
							$(".hero video")[0].play();
						} else {
							//console.log('NO VIDEO');
						}
					}
				});
		});

		// video chapters
		$('.chapters a')
		.on('click',function(e){
			e.preventDefault();
			clearTimeout(chapterClicked);
			hpit.config.justClicked = true;
         var cNum = $(this).text();
			var skipTo = hpit.config.chapters[cNum].position / 1000;
         FlashLinkAnalysis($(this).attr('href'), "Video Chapter " + cNum, "linkanalysis");
			try {
				DelvePlayer.doSeekToSecond(skipTo);
			} catch(err) {
				//console.log('DelvePlayer error: ', err);
			}

			chapterClicked = setTimeout(function(){
				hpit.config.justClicked = false;
				//console.log('justClicked cleared');
			}, 4000);
		})
		.on('mouseenter',function(e){			
			var thisNum = $(this).text();
			//console.log('thisNum: ', thisNum);
			$('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[thisNum].title).show();
		})
		.on('mouseleave',function(e){
			$('#ll-overlay .chapters .contentRow').hide().text('');
			//console.log('clear description');
		});

		$('.the-video a').on('click',function(e){
			e.preventDefault();

			$('.the-video.active').each(function (index) {
				$(this).find('.vidWrapper').remove().end().removeClass('active');
			});

			var target = $(this).parent();
			target.addClass('active');
			//var origContent = target.html();

			var insightID = $(this).attr('href').replace('#','');
			var vidID = 'limelight_player_' + hpit.config.limelightVideos[insightID].uid;
			//var chID = hpit.config.limelightVideos[insightID].channelId
         var mediaId = hpit.config.limelightVideos[insightID].mediaId;       

			var vidContent =  '<div class="vidWrapper">'; //<script src="//assets.delvenetworks.com/player/embed.js"></script>
				vidContent += '<object type="application/x-shockwave-flash" id="'+vidID+'" name="'+vidID+'" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//assets.delvenetworks.com/player/loader.swf">';
				vidContent += '<param name="movie" value="//assets.delvenetworks.com/player/loader.swf"/>';
				vidContent += '<param name="wmode" value="transparent"/>';
				vidContent += '<param name="allowScriptAccess" value="always"/>';
				vidContent += '<param name="allowFullScreen" value="true"/>';
				vidContent += '<param name="flashVars" value="mediaId=' + mediaId + '&amp;playerForm=Player&amp;autoplay=true"/>';
				vidContent += '</object></div>';

			target.append(vidContent);
			LimelightPlayerUtil.initEmbed(vidID);
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
            FlashLinkAnalysis($(this).attr('href'), "menu-closed", "linkanalysis");
			} else {
				$target.animate({"right":"0px"}, "normal");
				$target.addClass("opened");
            FlashLinkAnalysis($(this).attr('href'), "menu-opened", "linkanalysis");
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
		
		if(!onMobile() && !onIpad() && !isIE8){
			initVideo();
		}
	}

	function initVideo(){
		//poster="http://www.accenture.com/microsites/high-performance-it/PublishingImages/video-still.jpg"
		$('#hero .video-wrapper').html('<video id="theVideo" width="100%" height="auto" preload="auto" autoplay><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.mp4" type="video/mp4" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.ogg" type="video/ogg" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.webm" type="video/webm" /><img src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/video-still.jpg" /></video>');
		
		var video = document.getElementById('theVideo');
		if (video.addEventListener){
			video.addEventListener('ended', function(){
	        	$('.video-wrapper').html('');
	    	});
	    	//console.log('addEventListener - IF');
		} else if (video.attachEvent){
			video.attachEvent('ended', function(){
	        	$('.video-wrapper').html('');
	    	});
	    	$('html').addClass('ie8');
	    	$('head').append('<link href="/Microsites/high-performance-it/Documents/css/ie8.css" rel="stylesheet" media="screen" />');
	    	//console.log('addEventListener - ELSE IF');
		} else {
			video.addEventListener('ended', function(){
	        	$('.video-wrapper').html('');
	    	});
	    	//console.log('addEventListener - ELSE');
		}			
	}

	function updateDimensions(){
		hpit.config.scrW = $(window).width();
		hpit.config.scrH = $(window).height();
	}

	function updateArrows(from){
		$('.arrows').removeClass('noClick');
		//console.log('from: ', from);
		//console.log('hpit.config: ', hpit.config);
		if(hpit.config.state > 0 && hpit.config.state < $('.insight').length){
			//$('.arrows').removeClass('noClick');
			//console.log('updateArrows - IF');
		} else if(hpit.config.state === $('.insight').length) {
			$('.nxt').addClass('noClick');
			//console.log('updateArrows - ELSE IF');
		} else {
			$('.prev').addClass('noClick');
			//console.log('updateArrows - ELSE');
		}
	}

	function omniTrackPageView(num){
		//console.log('function omniTrackPageView: ', num);
		var newPageName = 'acn:microsites:high-performance-it:home:insight' + num;
		//console.log('newPageName: ', newPageName);
		//triggerOmniturePageView(newPageName);
	}

	/* omniture tracking function */
	function omniTrack(obj){
		//console.log('Object: ', obj);
		
		try {
			FlashLinkAnalysis( obj.eventLink, obj.eventName, obj.eventType );
			/*
			//console.log('******************* CLICK TRACK *******************');
			//console.log('URL: ', obj.eventLink);
			//console.log('Name: ', obj.eventName);
			//console.log('Type: ', obj.eventType);
			*/
		} catch(err) {
			//console.log('Tracking error: ', err);
		}
	}

	function isTouchDevice(){
		return hpit.config.desktopORtouch == 'touch';
	}

	function touchOrientationChange(){
		//
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
	getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

//var activeChap = 0;

function delvePlayerCallback(playerId, eventName, data) {
	if(playerId){
		var id = playerId;
	} else {
		var id = "limelight_player_239897";
	}
	if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) {
		//console.log('eventName: ', eventName);
		DelvePlayer.registerPlayer(id);
	}

	//console.log('curr id: ', id);
	
	switch (eventName) {
		case 'onPlayerLoad':
			doOnPlayerLoad(data);
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
		
		case 'onMediaComplete':
			doOnMediaComplete(data);
			break;
		
		/*case 'onMediaLoad':
			doOnMediaLoad(data);
			break;
		*/
	}
}

function doOnPlayerLoad(data){
	//console.log('player loaded (doOnPlayerLoad)', data);
	setTimeout(function(){DelvePlayer.doPlay()}, 1000);
}

function doOnError(data){
	//console.log('player error: ', data);
}

function doOnMediaLoad(data){
	//console.log('Media Loaded: ', data);
}

function doOnPlayStateChanged(data){
	//console.log('player state: ', data);
	if (data.isPlaying) {
      var videoTitle = DelvePlayer.doGetCurrentMedia().title;
      FlashLinkAnalysis($(this).attr('href'), videoTitle, "linkanalysis")
   }
}

function doonPlayheadUpdate(data){	
	//var currChap = 0;
	var currPos = data.positionInMilliseconds;
	//console.log('Playhead update: ', data.positionInMilliseconds +'/'+ data.durationInMilliseconds);

	switch (true) {
		case (currPos > 0 && currPos < hpit.config.chapters[2].position):
			hpit.config.currChap = 1;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[2].position && currPos < hpit.config.chapters[3].position):
			hpit.config.currChap = 2;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[3].position && currPos < hpit.config.chapters[4].position):
			hpit.config.currChap = 3;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[4].position && currPos < hpit.config.chapters[5].position):
			hpit.config.currChap = 4;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[5].position && currPos < hpit.config.chapters[6].position):
			hpit.config.currChap = 5;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[6].position && currPos < hpit.config.chapters[7].position):
			hpit.config.currChap = 6;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[7].position && currPos < hpit.config.chapters[8].position):
			hpit.config.currChap = 7;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[8].position && currPos < hpit.config.chapters[9].position):
			hpit.config.currChap = 8;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[9].position && currPos < hpit.config.chapters[10].position):
			hpit.config.currChap = 9;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
		case (currPos > hpit.config.chapters[10].position):
			hpit.config.currChap = 10;
         trackDelvePlayer("start", "limelight_player_239897", currPos); 
			break;
	}
	//console.log('active: '+ hpit.config.activeChap +' | curr: ' + hpit.config.currChap);
	//hpit.config.activeChap

	if(hpit.config.currChap != hpit.config.activeChap){
		hpit.config.activeChap = hpit.config.currChap;
		//console.log('justClicked: ', hpit.config.justClicked);
		//console.log('Switching to chapter: ', hpit.config.activeChap);

		if(!hpit.config.justClicked){
			//console.log('track chapter rollover here!');
		}

		$('#ll-overlay .chapters .topRow a')
			.removeClass('active')
			.eq(hpit.config.activeChap-1)
			.addClass('active');

		$('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[hpit.config.activeChap].title).fadeIn(500).delay(4000).fadeOut(500);
	} else {
		//console.log('currChap: ', hpit.config.currChap);
	}
}

function doOnMediaComplete(){
	//console.log('video end');
	resetVideoStates();
	//hpit.config.activeChap = 0;
}

function resetVideoStates(){
	//console.log('resetVideoStates');
	$('#ll-overlay .chapters .topRow a').removeClass('active');
	hpit.config.activeChap = 0;
	hpit.config.currChap = 0;
}

$(document).ready(function(){
	// Initialize
	hpit.core.init();
});
