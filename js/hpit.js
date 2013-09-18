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
	easing: 'easeInOutExpo',
	duration: {
		backToTop: 2000,
		desktop: 2000,
		touch: 1
	},
	groups: {
		'insight1': {
			newHash: '#your-new-boss-your-customer'
		},
		'insight2': {
			newHash: '#technology-is-inseparable-from-business-strategy'
		},
		'insight3': {
			newHash: '#context-is-king'
		},
		'insight4': {
			newHash: '#flexibility-first'
		},
		'insight5': {
			newHash: '#be-fearlessly-digital'
		},
		'insight6': {
			newHash: '#survival-of-the-quickest'
		},
		'insight7': {
			newHash: '#all-data-is-not-created-equal'
		},
		'insight8': {
			newHash: '#power-to-the-people'
		},
		'insight9': {
			newHash: '#build-your-capabilities-around-talent-not-technology'
		},
		'insight10': {
			newHash: '#take-a-holistic-stance-on-security-and-risk'
		}
	},
	activeChap: 0,
	currChap: 0,
	chapters: {
		'1': {
			title: 'Chapter 1 description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mi nisl, elementum a nulla sit amet.',
			position: 0
		},
		'2': {
			title: 'Chapter 2 description Nulla euismod est ante, a aliquet arcu lobortis mattis. Curabitur eget turpis lectus.',
			position: 18000
		},
		'3': {
			title: 'Chapter 3 description Pellentesque ac enim pulvinar, cursus ipsum ac, fringilla orci. Pellentesque fringilla est...',
			position: 37000
		},
		'4': {
			title: 'Chapter 4 description Ut odio est, consequat eu nisi vitae, euismod sagittis quam. Quisque eget ipsum pulvinar purus.',
			position: 56000
		},
		'5': {
			title: 'Chapter 5 description Cras pulvinar, erat ac tincidunt posuere, erat quam cursus leo, ac commodo dolor quam commodo tortor.',
			position: 75000
		},
		'6': {
			title: 'Chapter 6 description Vivamus eros diam, ultricies id nulla sed, euismod porttitor mi. Cras sed ornare arcu.',
			position: 94000
		},
		'7': {
			title: 'Chapter 7 description Sed ultricies aliquam arcu, eu fermentum lacus hendrerit id. Duis gravida dignissim purus...',
			position: 112000
		},
		'8': {
			title: 'Chapter 8 description Maecenas egestas nisi in convallis pellentesque. Cum sociis natoque penatibus et magnis dis.',
			position: 131000
		},
		'9': {
			title: 'Chapter 9 description Phasellus ac leo lorem. Sed rutrum cursus leo, eu facilisis diam adipiscing et. Etiam imperdiet.',
			position: 150000
		},
		'10': {
			title: 'Chapter 10 description In non augue dolor. Curabitur hendrerit felis nisl, id dignissim nisi gravida in',
			position: 168000
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

	//	Initialize
	function init(){

		var debug = $.getUrlVar('debug');
		if(debug){
			$('#diagnostics').show();
		}

		//console.log('hpit.config.scrW: ', $(window).width());
		//console.log('$Android: ', $Android);
		//console.log('$iOS: ', $iOS);

		$('head').append('<meta name="viewport" content="width=device-width, target-densityDpi=high-dpi, initial-scale=0.666667, minimum-scale=0.666667, maximum-scale=0.666667">');
		
		if(!onMobile() && !onIpad()){
			//console.log('preloading!');
			preload([
				'images/bg-bridge.png',
				'images/bg-ocean.png',
				'images/bg-boat.png',
				'images/bg-edinburgh.png',
				'images/bg-field.png',
				'images/bg-lake.png',
				'images/bg-sunflower.png',
				'images/bg-sea.png',
				'images/bg-beach.png',
				'images/bg-japanese.png'
			]);
		} else {
			//console.log('NO preload');
		}

		$('#diagnostics').html('<div>' + $userAgent + '</div>' + '<div>w: ' + $(window).width() + '</div>' + '<div>h: ' + $(window).height() + '</div>' + '<div>onMobile:' + onMobile() + '</div>');
		
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

		// Initialize event handler for insight togglers
		togglerInit();
		
		// Work out whether IE7 is being used to view the site, due to the way absolute vs. fixed positioning works differently in that browser
		hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
		
		var validHashValue = false;

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
			//console.log('insight 1 top: ', $('.insight').eq(0).offset().top);

			if(!onMobile() && !onIpad()){
				// determine if we need to lock the background images in place
				if($(window).scrollTop() > $('.insight').eq(0).offset().top){ //$('#hero').outerHeight(true)
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
		return ( ( $(window).width() < 768 ) || $Android || $iOS ); // || $iPad
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
				//console.log('winOffset:',winOffset);

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

					if(!hpit.config.locked && (hpit.config.currPageView != menuItem)){
						omniTrack({
							eventName: $('#sideMenu ul li[data-insight-nav="'+menuItem+'"] a').attr('href'),
							eventType: 'page-view'
						});
						/*
						setTimeout(function(){
							console.log('**************************************************');
							console.log('currPageView: ', hpit.config.currPageView);
							console.log('menuItem: ', menuItem);
							console.log('**************************************************');
						}, 100);
						*/
					}

					hpit.config.currInsight = menuItem;
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
								console.log('deeplinking DONE!');
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
							if(!$(window).scrollTop() > $('#hero').outerHeight(true)){
								//console.log('NOT TOP');
							} else {
								//console.log('scroll top: ', $(window).scrollTop());
								hpit.config.currInsight = 0;
								hpit.config.state = 0;
								hpit.config.currPageView = 0;
								setTimeout(function(){updateArrows(3)}, 100);
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
					//console.log('newHash: ', newHash);
					$(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
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
					newHash = $('#sideMenu ul li[data-insight-nav="'+newNum+'"] > a').attr('href');
					
					$(window).scrollTo(
						newHash, 
						hpit.config.duration[hpit.config.desktopORtouch], 
						{
							easing:hpit.config.easing,
							onAfter: function() {
								hpit.config.currInsight = newNum;
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

			omniTrack({
				eventName: $(this).attr('href').replace('#',''),
				eventType: 'video-button-click'
			});
		});

		// close button
		$('.closeVid').on('click',function(e){
			e.preventDefault();

			resetVideoStates();

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
				clearTimeout(chapterClicked);
				hpit.config.justClicked = true;

				var skipTo = hpit.config.chapters[$(this).text()].position / 1000;
				
				try {
					DelvePlayer.doSeekToSecond(skipTo);
				} catch(err) {
					console.log('DelvePlayer error: ', err);
				}

				chapterClicked = setTimeout(function(){
					hpit.config.justClicked = false;
					console.log('justClicked cleared');
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

	function omniTrack(obj){
		//console.log('Object: ', obj);
		
		try {
			console.log('******************* TRACK *******************');
			console.log('URL: ', top.location.href);
			console.log('Name: ', obj.eventName);
			console.log('Type: ', obj.eventType);
			console.log('******************* TRACK *******************');
			//FlashLinkAnalysis( top.location.href, obj.eventName, obj.eventType );
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
		
		case 'onMediaComplete':
			doOnMediaComplete(data);
			break;
		
		/*case 'onMediaLoad':
			doOnMediaLoad(data);
			break;
		
		case 'onPlayheadUpdate':
			doOnPlayheadUpdate(data);
			break;
		*/
	}
}

function doOnPlayerLoad(){
	//console.log('player loaded');
}

function doOnError(data){
	//console.log('player error: ', data);
}

function doOnPlayStateChanged(data){
	//console.log('player state: ', data);
}

function doonPlayheadUpdate(data){	
	//var currChap = 0;
	var currPos = data.positionInMilliseconds;
	//console.log('Playhead update: ', data.positionInMilliseconds +'/'+ data.durationInMilliseconds);

	switch (true) {
		case (currPos > 0 && currPos < hpit.config.chapters[2].position):
			hpit.config.currChap = 1;
			break;
		case (currPos > hpit.config.chapters[2].position && currPos < hpit.config.chapters[3].position):
			hpit.config.currChap = 2;
			break;
		case (currPos > hpit.config.chapters[3].position && currPos < hpit.config.chapters[4].position):
			hpit.config.currChap = 3;
			break;
		case (currPos > hpit.config.chapters[4].position && currPos < hpit.config.chapters[5].position):
			hpit.config.currChap = 4;
			break;
		case (currPos > hpit.config.chapters[5].position && currPos < hpit.config.chapters[6].position):
			hpit.config.currChap = 5;
			break;
		case (currPos > hpit.config.chapters[6].position && currPos < hpit.config.chapters[7].position):
			hpit.config.currChap = 6;
			break;
		case (currPos > hpit.config.chapters[7].position && currPos < hpit.config.chapters[8].position):
			hpit.config.currChap = 7;
			break;
		case (currPos > hpit.config.chapters[8].position && currPos < hpit.config.chapters[9].position):
			hpit.config.currChap = 8;
			break;
		case (currPos > hpit.config.chapters[9].position && currPos < hpit.config.chapters[10].position):
			hpit.config.currChap = 9;
			break;
		case (currPos > hpit.config.chapters[10].position):
			hpit.config.currChap = 10;
			break;
	}
	//console.log('active: '+ hpit.config.activeChap +' | curr: ' + hpit.config.currChap);
	//hpit.config.activeChap

	if(hpit.config.currChap != hpit.config.activeChap){
		hpit.config.activeChap = hpit.config.currChap;
		//console.log('justClicked: ', hpit.config.justClicked);
		//console.log('Switching to chapter: ', hpit.config.activeChap);

		if(!hpit.config.justClicked){
			console.log('track chapter rollover here!');
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