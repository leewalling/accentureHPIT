 /*		Accenture High Performance IT		*/
 
if (typeof console == "undefined") {
    window.console = {
        log: function() {}
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
    $(arrayOfImages).each(function(index) {
        var num = parseInt(index) + 1;
        $('<img/>')[0].src = this;
        $('.bgImages').append('<div class="bgImg" data-insight="' + num + '"><img src="' + this + '" /></div>');
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
            mediaId: 'ab42f5241ae7470f8442092bd2ac41cc',
            uid: '204902'
        },
        'insight3': {
            mediaId: '1c15c6e812734acea5813e516cb08d11',
            uid: '905416'
        },
        'insight4': {
            mediaId: '0c0035212ec54df89d0f08a5a8f96199',
            uid: '289104'
        },
        'insight5': {
            mediaId: '80e9c5e088bc4f718d9e496e35d026ae',
            uid: '388912'
        },
        'insight6': {
            mediaId: '6375f519b40046708057d8d3204bd9d9',
            uid: '388912'
        },
        'insight7': {
            mediaId: 'd1ba2d30a0064af091c4d71cbc9aa1a5',
            uid: '388912'
        },
        'insight8': {
            mediaId: '90ecaba9c3e947d99d9f9cd8f6374040',
            uid: '388912'
        },
        'insight9': {
            mediaId: '533c3bba782f4c8fb90ab67c1e343f2a',
            uid: '388912'
        },
        'insight10': {
            mediaId: '93ad7ada761541949557fe9677d2872d',
            uid: '388912'
        }
    },
    groups: {
        'insight1': {
            newHash: '#insight1',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know you can\'t think like a database. You have to think like a customer. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Your new boss? Your customer.'
            },
            twitter: {
                title: 'CIO Action Item #1: Your new boss? Your customer. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: Your new boss? Your customer.'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know you can\'t think like a database. You have to think like a customer. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Your new boss? Your customer.'
            },
            google: {
                title: 'Your new boss? Your customer | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know you can\'t think like a database. You have to think like a customer. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Your new boss? Your customer.'
            },
            bitly: 'http://bit.ly/H5XBOD'
        },
        'insight2': {
            newHash: '#insight2',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know IT doesn\'t exist in a vacuum. If something impacts the business, it impacts IT, and vice versa.  Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Context is king'
            },
            twitter: {
                title: 'CIO Action Item #2: Context is king. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: Context is king'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know IT doesn\'t exist in a vacuum. If something impacts the business, it impacts IT, and vice versa.  Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Context is king'
            },
            google: {
                title: 'Context is king | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know IT doesn\'t exist in a vacuum. If something impacts the business, it impacts IT, and vice versa.  Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Context is king'
            },
            bitly: 'http://bit.ly/1bZhANm'
        },
        'insight3': {
            newHash: '#insight3',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know business strategy is now totally consolidated with IT strategy. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Business strategy and IT now work as one'
            },
            twitter: {
                title: 'CIO Action Item #3: Biz strategy and IT now work as one. Get the top 10 insights from the Accenture High Performance IT Survey:',
            	desc: '',
                alt: 'Share via Twitter: Business strategy and IT now work as one'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know business strategy is now totally consolidated with IT strategy. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Business strategy and IT now work as one'
            },
            google: {
                title: 'Business strategy and IT now work as one | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know business strategy is now totally consolidated with IT strategy. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Business strategy and IT now work as one'
            },
            bitly: 'http://bit.ly/16doQCH'
        },
        'insight4': {
            newHash: '#insight4',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs are master orchestrators of managing new and existing IT, leading the way in a new hybrid world. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Bringing harmony to hybrid IT'
            },
            twitter: {
                title: 'CIO Action Item #4: Bringing harmony to hybrid IT. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: Bringing harmony to hybrid IT'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs are master orchestrators of managing new and existing IT, leading the way in a new hybrid world. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Bringing harmony to hybrid IT'
            },
            google: {
                title: 'Business strategy and IT now work as one | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs are master orchestrators of managing new and existing IT, leading the way in a new hybrid world. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Bringing harmony to hybrid IT'
            },
            bitly: 'http://bit.ly/1aRnUkU'
        },
        'insight5': {
            newHash: '#insight5',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs have made the leap to digital because every business in now a digital business. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Fearlessly digital'
            },
            twitter: {
                title: 'CIO Action Item #5: Fearlessly digital. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: Fearlessly digital'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs have made the leap to digital because every business in now a digital business. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Fearlessly digital'
            },
            google: {
                title: 'Fearlessly digital | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs have made the leap to digital because every business in now a digital business. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Fearlessly digital'
            },
            bitly: 'http://bit.ly/19U3Qlu'
        },
        'insight6': {
            newHash: '#insight6',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know that being truly digital means that many more customers, suppliers and employees can answer their own questions-so you don\'t have to. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: The power of self-service'
            },
            twitter: {
                title: 'CIO Action Item #6: The power of self-service. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: The power of self-service'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know that being truly digital means that many more customers, suppliers and employees can answer their own questions-so you don\'t have to. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: The power of self-service'
            },
            google: {
                title: 'Fearlessly digital | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know that being truly digital means that many more customers, suppliers and employees can answer their own questions-so you don\'t have to. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: The power of self-service'
            },
            bitly: 'http://bit.ly/H5hLs5'
        },
        'insight7': {
            newHash: '#insight7',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know that creating actionable insights out of the data-wherever it comes from-is what \'Big Data\' is all about. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Unearthing data gems'
            },
            twitter: {
                title: 'CIO Action Item #7: Unearthing data gems. Get the top 10 insights from the Accenture High Performance IT Survey 2013',
                desc: '',
                alt: 'Share via Twitter: Unearthing data gems'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know that creating actionable insights out of the data-wherever it comes from-is what \'Big Data\' is all about. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Unearthing data gems'
            },
            google: {
                title: 'Unearthing data gems | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know that creating actionable insights out of the data-wherever it comes from-is what \'Big Data\' is all about. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Unearthing data gems'
            },
            bitly: 'http://bit.ly/174NBSq'
        },
        'insight8': {
            newHash: '#insight8',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know that if you\'re not making change happen on the run, then instead of being agile, you could be increasingly vulnerable. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Agility and speed. The new normal'
            },
            twitter: {
                title: 'CIO Action Item #8: Agility and speed are table stakes. Get the top 10 insights from the Accenture High Performance IT Survey',
                desc: '',
                alt: 'Share via Twitter: Agility and speed. The new normal'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know that if you\'re not making change happen on the run, then instead of being agile, you could be increasingly vulnerable. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Agility and speed. The new normal'
            },
            google: {
                title: 'Agility and speed are becoming table stakes | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know that if you\'re not making change happen on the run, then instead of being agile, you could be increasingly vulnerable. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Agility and speed. The new normal'
            },
            bitly: 'http://bit.ly/1aRo8s9'
        },
        'insight9': {
            newHash: '#insight9',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know that talent will drive future success. Figuring out where your opportunities are-and finding the right people to work on them-will pay off. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Plug-and-play talent'
            },
            twitter: {
                title: 'CIO Action Item #9: Plug-and-play talent. Get the top 10 insights from the Accenture High Performance IT Survey:',
                desc: '',
                alt: 'Share via Twitter: Plug-and-play talent'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know that talent will drive future success. Figuring out where your opportunities are-and finding the right people to work on them-will pay off. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Plug-and-play talent'
            },
            google: {
                title: 'Plug-and-play talent | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know that talent will drive future success. Figuring out where your opportunities are-and finding the right people to work on them-will pay off. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Plug-and-play talent'
            },
            bitly: 'http://bit.ly/19U3YkI'
        },
        'insight10': {
            newHash: '#insight10',
            linkedIn: {
                title: 'Accenture - High Performance IT',
                desc: 'High performing CIOs know risk management and IT security must be in the same room and on the same page. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via LinkedIn: Uniting business risk and IT security'
            },
            twitter: {
                title: 'CIO Action Item #10: Uniting biz risk and IT security. Get the top 10 insights from the Accenture High Performance IT Survey',
                desc: '',
                alt: 'Share via Twitter: Uniting business risk and IT security'
            },
            facebook: {
                title: 'High Performance IT - Accenture',
                desc: 'High performing CIOs know risk management and IT security must be in the same room and on the same page. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Facebook: Uniting business risk and IT security'
            },
            google: {
                title: 'Uniting business risk and IT security | Accenture High Performance IT Survey 2013',
                desc: 'High performing CIOs know risk management and IT security must be in the same room and on the same page. Read more and get our full list of top 10 insights from the Accenture High Performance IT Survey 2013',
                alt: 'Share via Google+: Uniting business risk and IT security'
            },
            bitly: 'http://bit.ly/1aRoaAm'
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
            title: 'Chapter 2: What\'s on Paul\'s mind',
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
            position: 354000
        }
    }
};

/*		HPIT core class		*/
hpit.core = (function() {
    
    var $userAgent = navigator.userAgent.toLowerCase();
    var $Android = /android/i.test($userAgent);
    var $iOS = /iphone|ipod|ios/i.test($userAgent);
    var $iPad = /ipad/i.test($userAgent);
    //var $iPad = true;
    var chapterClicked;
    var trackPageViewDelay;
    var haveDeepLink = false;

    //	Initialize
    function init() {

        // needed for fixing back button position
        if($(window).scrollTop() > 0){
        	//console.log('not at the top');
        	setTimeout(function(){
	        	window.scrollTo(0, 0);
	        }, 100);
        } else {
        	//console.log('already at the top');
        }
	
		/* SGS */
		overridePageView = true;
        
        if (isIE8) {
            //console.log('IS ie8');
            $('html').addClass('ie8');
        } else {
        //console.log('NOT ie8');
        }
        
        var debug = $.getUrlVar('debug');
        if (debug == 'true') {
            $('#diagnostics').show();
        }
        
        if (!onMobile() && !onIpad()) {
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

        //Initialize the Limelight Video Player Callback
        initDelvePlayer();

        // Initialize event handler for video play button
        playVideoInit();

        // Initialize addthis widget
        addThisInit();
        addthis.init();

        // Initialize event handler for social links
        socialLinksInit();

        // check if the user is on IE7
        hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
        
        var validHashValue = false;
        
        footerLock($('#footer'));
         
         /* 
        $('.insight').each(function(index) {
            if (!onMobile() && !onIpad()) {
                paneLock($(this), index);
            }
        });
         */   
      
        // track download link click
        $('.download a').on('click', function(e) {
            //FlashLinkAnalysis($(this).attr('href'), "download study:topnav", "linkanalysis") 
			/* SGS: To trigger as download instead of normal link analysis data */ 
			if (onProduction()) {
				FlashDownload($(this).attr('href'), "download study:topnav", "linkanalysis")
			}
        });
		
		$('.download-link a').on('click', function(e) {
            //FlashLinkAnalysis($(this).attr('href'), "download study:insight" + hpit.config.currInsight, "linkanalysis")
			/* SGS: To trigger as download instead of normal link analysis data */ 
			if (onProduction()) {
				FlashDownload($(this).attr('href'), "download study:insight" + hpit.config.currInsight, "linkanalysis")
			}
        });
        
        $('.bgImg').css({"opacity": 0});
        $('.bgImg[data-insight="1"]').css({"opacity": 1});
        $('.bgImg[data-insight="2"]').css({"opacity": 1});

    	var $ins 		= $('.insight');
    	var $theVid 	= $('#theVideo');
		var $vidWr 		= $('#hero .video-wrapper');
    	var $bgImg 		= $('.bgImages');
        var $wh 		= $('.whiteAngle');
        var $bl 		= $('.blackAngle');
        var $conInf 	= $('#controls .control-info');
        var $foot 		= $('#footer');
        var $bgImgImg	= $('.bgImg img');
        var $smUlLi 	= $('#sideMenu ul li');
		var $hero		= $('.hero');
		var $win		= $(window);
		var $hasFired	= 0;
		var $cntrlMess 	= getCookie('hasUsedControls');

        // Attach functionality to the native scroll function
        //$win.scroll($.throttle(250, function(event) {code goes here...}));
        $win.scroll(function(event) {

        	// fade out the control message upon initial scroll
        	if($hasFired == 0){
        		//console.log('fire here!');
        		if ($cntrlMess == undefined || $cntrlMess == null || $cntrlMess == '') {
		            $conInf.fadeOut(2000);
		        }
        		$hasFired = 1;
        	}
        	
        	// if the hero video exists remove it upon initial window scroll
            if ($theVid.length) {
                $vidWr.html('');
            } else {
            	//console.log('no video');
            }
            
            if (!onMobile() && !onIpad()) {
                // determine if we need to lock the background images in place
                if ($win.scrollTop() > $ins.eq(0).offset().top - 1) { //$hero.outerHeight(true)
                    if (!$bgImg.hasClass('fixed')) {
                        $bgImg.addClass('fixed');
                    }
                    if (!$wh.hasClass('fixed')) {
                        $wh.addClass('fixed');
                    }
                    if (!$bl.hasClass('fixed')) {
                        $bl.addClass('fixed');
                    }
                    /*if ($conInf.is(':visible')) {
                        $conInf.fadeOut();
                        setCookie('hasUsedControls', true);
                    }*/
                } else {
                    var toGo = $ins.eq(0).offset().top - $win.scrollTop();
                    if (toGo > -1 && toGo < 226) {
                        //console.log('toGo: ', toGo);
                        if ($bl.hasClass('fixed')) {
                            $bl.removeClass('fixed');
                        }
                        $bl.css({'bottom': -toGo});
                    } else {
                        //console.log('toGo ELSE: ', toGo);
                        $bl.removeClass('fixed').removeAttr('style');
                    }
                    
                    if ($bgImg.hasClass('fixed')) {
                        $bgImg.removeClass('fixed');
                    }
                    if ($wh.hasClass('fixed')) {
                        $wh.removeClass('fixed');
                    }
                    if ($bl.hasClass('fixed')) {
                        $bl.removeClass('fixed').removeAttr('style');
                    }
                    $foot.removeClass('fixed');
                    $smUlLi.removeClass('hilited');
                    $bgImgImg.removeClass('activate');
                    
                    if (!onIpad() && !isIE8) {
                        var $newT = $win.scrollTop() / 3.5;
                        $hero.css({'top': -$newT});
                    }
                }
            }
        });
        
        $win.resize(function() {
            updateDimensions();
            updateSidemenu();
            
            if (onMobile()) {
                if (!onIpad() && $win.width() > 767) {
                    //alert('exception!');
                    $('html').addClass('exception');
                };
                $('html').removeClass('desktop').addClass('onMobile');
            } else {
                $('html').removeClass('onMobile exception').addClass('desktop');
            }
            
            if (onIpad()) {
                $('html').addClass('onIpad');
            } else {
                $('html').removeClass('onIpad');
            }
        });
        
        $win.on('orientationchange', function(event) {
        	//location.reload();
        });
        
        $win.resize();

        // Initialize event handler for insight togglers
        togglerInit();
    }
    
    function onMobile() {
        return (($(window).width() < 768) || $Android || $iOS && !$iPad);
    //return true;
    }
    
    function onIpad() {
        return ($iPad);
    }
    
    function onProduction() {
        return (location.hostname.indexOf("accenture.com") > -1);
    }
    
    function footerLock(element) {
        //$win.scroll($.throttle(250, function(event) {code goes here...}));
        $(window).scroll(function() {
            var currEle = element;
            var footerH = currEle.height();

            // Viewport
            var vpStart = currEle.offset().top; // - 62
            var vpEnd = vpStart + currEle.height();
            var scH = parseInt(hpit.config.scrH);

            // scroll offset
            var winOffset = $(window).scrollTop();

            // is the element in the viewport?
            if (winOffset >= (vpStart - scH)) {
                hpit.config.footerInView = true;
                var diff = vpEnd - scH;
                var scrollDiff = -(winOffset - diff);
                var margOffset = scrollDiff - footerH;
                $('.bgImages .bgImg img.activate').css({"margin-top": margOffset / 2});
            } else {
                hpit.config.footerInView = false;
            }
        });
    }
    
    function paneLock(element, index) {
        //console.log('paneLock: ', element);
        //$win.scroll($.throttle(250, function(event) {code goes here...}));
        $(window).scroll(function() {

            //console.log('scrolling')
            
            var currEle = element;
            var currFixedEle = element.find('.marker');
            var bgPxToMove = 25;
            
            if (currFixedEle.length <= 0) {
                return false;
            }

            // Viewport
            var vpStart = currEle.offset().top - 1; // - 62
            var vpEnd = vpStart + currEle.height();
            
            var currEleEnd = currEle.height();
            var currEleHgt = currEle.height();

            // scroll offset
            var winOffset = $(window).scrollTop();
            //console.log('winOffset:',winOffset);
            
            if (index === parseInt(hpit.config.currInsight)) { // && vpStart > winOffset
                var currEleTitle = $('.insight[data-insight="' + index + '"] .insightTitle');
                if (currEleTitle.hasClass('lockedBottom')) {
                    currEleTitle.removeClass('lockedBottom');
                }
                var titleEnd = parseInt(currEleTitle.css('top')) + currEleTitle.height() + 75;
                
                var diff = vpStart - winOffset;
                //console.log('diff:', diff);
                
                if (diff < titleEnd) {
                    if (!currEleTitle.hasClass('lockedBottom')) {
                        currEleTitle.addClass('lockedBottom');
                    }
                } /* else {
						if(currEleTitle.hasClass('lockedBottom')){
							currEleTitle.removeClass('lockedBottom');
						}
					}*/
                
                var scH = parseInt(hpit.config.scrH);
                var $per = diff / scH;
                /*
                if (diff >= -1 && diff < scH + 1) {
                    $('.bgImg[data-insight="' + index + '"]').css({"opacity": $per});
                //$('.insight[data-insight="'+index+'"] .insightTitle').css({"opacity" : $per});
                } else {
                    $('.insight .insightTitle').css({"opacity": 1});
                }
                */
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
                
                $('#sideMenu ul li[data-insight-nav="' + menuItem + '"]').addClass('hilited');
                $('.bgImg[data-insight="' + menuItem + '"] img').addClass('activate');
                
                if (!hpit.config.locked && (hpit.config.currPageView >= menuItem)) {	/* SGS: changed to >= */ 
					      clearInterval(trackPageViewDelay);
                     trackPageViewDelay = setTimeout(function() {
                        //console.log("Page View: " + menuItem);
                        if (!haveDeepLink) {
                           omniTrackPageView(menuItem);
                        } else {
                           haveDeepLink = false;
                        }
                     }, 4000);
                }
                
                hpit.config.currInsight = menuItem;
                //console.log('currInsight change 1');
                //console.log('currInsight: ', hpit.config.currInsight);
                hpit.config.state = menuItem;
                hpit.config.currPageView = menuItem;
                if (!hpit.config.locked) {
                    updateArrows(1);
                }
                //updateArrows();
                
                var prevImgNum = parseInt(menuItem) - 1;
                var nextImgNum = parseInt(menuItem) + 1;
                $('.bgImg').css({"opacity": 0});
                $('.bgImg[data-insight="' + menuItem + '"]').css({"opacity": 1});
                $('.bgImg[data-insight="' + nextImgNum + '"]').css({"opacity": 1});

                if (!isIE8) {
	                var diffToMove = (1 - ((vpEnd - winOffset) / currEleHgt)) * bgPxToMove;
	                if (!hpit.config.footerInView) {
	                    $('.bgImages .bgImg img').css({"margin-top": 0});
	                    $('.bgImages .bgImg img.activate').css({"margin-top": -diffToMove});
	                }
	            }
            } 
            // out of the viewport
            else {
                currEle.removeClass('current');
            }
        
        });
    
    }
    ; //End Function

    // show/hide controls message
    function cntrlMessInit() {
        var cntrlMess = getCookie('hasUsedControls');
        if (cntrlMess == undefined || cntrlMess == null || cntrlMess == '') {
            $('#controls .control-info').fadeIn();
        }
    }

    // Favicon
    function addFavicon() {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'http://www.accenture.com/Microsites/high-performance-it/PublishingImages/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    // deeplinking
    function deeplinkInit() {
        var groupParam = $.getUrlVar('group');
        var delay = 500;
        
        if (groupParam && groupParam.indexOf('insight') != -1) {
            try {
               window.s.pageName = window.s.pageName + "#" + groupParam;
            } 
            catch (e) {
               //s_code.js does not exist on the page
            }
   
            haveDeepLink = true;
            //console.log('deeplink: ', groupParam);
            var deeplink = groupParam.replace('insight', '');
            deeplink = parseInt(deeplink);
            if (isNaN(deeplink)) {
            //console.log('deeplink - NAN');
            } else if (deeplink > 0 && deeplink < $('.insight').length + 1) {
                /*if(deeplink > 5){
					delay = 1200;
				}*/
                //console.log('valid deeplink: ', groupParam);
                var newHash = hpit.config.groups[groupParam].newHash;
                //console.log('newHash: ', newHash);
                hpit.config.locked = true;
                
                setTimeout(function() {
                    $(window).scrollTo(
	                    newHash, 
	                    {
	                        duration: 1, //hpit.config.duration[hpit.config.desktopORtouch],
	                        easing: hpit.config.easing,
	                        onAfter: function() {
	                            hpit.config.locked = false;
	                        //console.log('deeplinking DONE!');
	                        //setTimeout(function(){
	                        //updateArrows(4);
	                        //hpit.config.locked = false;
	                        //}, 100);
	                        }
	                    });
                }, delay);
            
            } else {
            //console.log('NOT IN RANGE!!!!');
            }
        
        } else {
        //console.log('invalid group: ', groupParam);
        }
    }
    // sidemenu init
    function sideMenuInit() {
        $('#sideMenu ul li a').on('click', function(e) {
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
	                easing: hpit.config.easing,
	                onAfter: function() {
	                    hpit.config.locked = false;
	                    if (hpit.config.desktopORtouch == 'desktop') {
	                        if ($(window).scrollTop() < $('.insight').eq(0).offset().top) {
	                            //console.log('win scroll: ', $(window).scrollTop());
	                            //console.log('insight 1 top: ', $('.insight').eq(0).offset().top);
	                            hpit.config.currInsight = 0;
	                            //console.log('currInsight change 2');
	                            hpit.config.state = 0;
	                            hpit.config.currPageView = 0;
	                            setTimeout(function() {
	                                updateArrows(3)
	                            }, 100);
	                        } else {
	                        //console.log('NOT TOP');
	                        //console.log('currInsight: ', hpit.config.currInsight);
	                        }
	                    }
	                }
	            });
        });
    
    }

    //hpit.config.currInsight
    function arrowsInit() {
        
        $('.arrows').on('click', function(e) {
            e.preventDefault();
            var $cur = parseInt(hpit.config.currInsight);
            var $th = $(this);
            var newNum;
            var newHash;
			/* SGS */ 
			var groupParam = $.getUrlVar('group');
			var targetPage = groupParam ? 'home.aspx#' + groupParam : 'home.aspx';
            
            $('.arrows').removeClass('noClick');
            
            if ($th.hasClass("prev")) {
                if ($th.hasClass("noClick")) {
                    //
                    return false;
                } else {
                    if ($cur > 1) {
                        newNum = ($cur - 1);
                        //console.log('newNum: ' + newNum);
                        newHash = $('#sideMenu ul li[data-insight-nav="' + newNum + '"] > a').attr('href');
                    } else {
                        newNum = 0;
                        newHash = '#theTop';
                    //return false;
                    }
					
                    $(window).scrollTo(
                    newHash, 
                    hpit.config.duration[hpit.config.desktopORtouch], 
                    {
                        easing: hpit.config.easing,
                        onAfter: function() {
                            hpit.config.currInsight = newNum;
                            //console.log('currInsight change 3');
                            hpit.config.state = newNum;
                            hpit.config.currPageView = newNum;
                            $('.bgImg[data-insight="' + newNum + '"]').css({"opacity": 1});
                            //console.log('config onAfter: ', hpit.config);
                            if (newNum < 1) {
                                $th.addClass('noClick');
                            }
                        }
                    });
                    if (onProduction()) {
                        //hpit.config.locked = true;
                        //FlashLinkAnalysis($(this).attr('href'), "Menu Up:insight" + newNum, "linkanalysis");
                        //omniTrackPageView(newNum);
                        /* SGS */
                        FlashLinkAnalysis(targetPage, "Menu Up:insight" + newNum, "linkanalysis");
                    }
                }
            } else {
                //console.log('cur: ', $cur);
                //console.log('#total: ', $('.insight').length);
                if ($cur < $('.insight').length) {
                    newNum = ($cur + 1);
                    //console.log('newNum: ' + newNum);
                    //SGS: omniTrackPageView(newNum);
                    newHash = $('#sideMenu ul li[data-insight-nav="' + newNum + '"] > a').attr('href');
                    
                    $(window).scrollTo(
                    newHash, 
                    hpit.config.duration[hpit.config.desktopORtouch], 
                    {
                        easing: hpit.config.easing,
                        onAfter: function() {
                            hpit.config.currInsight = newNum;
                            //console.log('currInsight change 4');
                            hpit.config.state = newNum;
                            hpit.config.currPageView = newNum;
                            $('.bgImg[data-insight="' + newNum + '"]').css({"opacity": 1});
                            //console.log('config onAfter: ', hpit.config);
                            if (newNum > $('.insight').length - 1) {
                                $th.addClass('noClick');
                            }
                        }
                    });
                    if (onProduction()) {
                        //FlashLinkAnalysis($(this).attr('href'), "Menu Down:insight" + newNum, "linkanalysis");
                        /* SGS */
                        FlashLinkAnalysis(targetPage, "Menu Down:insight" + newNum, "linkanalysis");
                        //omniTrackPageView(newNum);
                    }
                } else {
                    //console.log('nothing there');
                    return false;
                }
            }
        });
    
    }

    // insight toggler
    function togglerInit() {
        
        $('.onMobile .insight .insightTitle').on('click', function(e) {
            e.preventDefault();
            var $th = $(this);
            //console.log('$th: ', $th);
            var $trgt = $th.parent();
            //alert('$trgt: ', $trgt);
            var $cont = $trgt.find('.container.content');
            if ($trgt.hasClass('open')) {
                $cont.show(0, function() {
                    $trgt.removeClass('open');
                });
            	/*$cont.slideUp(500, function(){
					$trgt.removeClass('open');
				});*/
        		if (onProduction()) {
					FlashLinkAnalysis('home:insight', "mobile:close", "linkanalysis");
				}
            } else {
                $cont.hide(0, function() {
                    $trgt.addClass('open');
                });
            	/*$cont.slideDown(500, function(){
					$trgt.addClass('open');
				});*/
        		if (onProduction()) {
					FlashLinkAnalysis('home:insight', "mobile:open", "linkanalysis");
				}
            }
        });
    }

    // social links
    function socialLinksInit() {
        
        $('.social > a').on('click', function(e) {
            e.preventDefault();
            var $th = $(this);
            
            var inTopNav = false;
            if ($th.parent().parent().hasClass('share')) {
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
            
            switch ($cl) {
                case 'google':
                    $trackName = 'Google+';
                    $linkUrl = $linkUrl.replace("url=", "");
                    $shareUrl = encodeURIComponent($linkUrl);
                    var $goto = 'https://plus.google.com/share?url=' + $shareUrl;
                    var $params = 'width=660,height=400,scrollbars=no;resizable=no';
                    break;
                case 'facebook':
                    // http://www.facebook.com/sharer.php?s=100&p[title]=titleheresexily&p[url]=http://www.mysexyurl.com&p[summary]=mysexysummaryhere&p[images][0]=http://www.urltoyoursexyimage.com
                    $trackName = 'Facebook';
                    $linkUrl = $linkUrl.replace("u=", "");
                    $shareUrl = encodeURIComponent($linkUrl);
                    var $goto = 'http://www.facebook.com/share.php?u=' + $shareUrl;
                    var $params = 'width=660,height=400,scrollbars=no;resizable=no';
                    break;
                case 'twitter':
                    $trackName = 'Twitter';
                    $linkUrl = $linkUrl.replace("url=", "");
                    $shareUrl = encodeURIComponent($linkUrl);
                    var $goto = 'http://twitter.com/share?url=' + $shareUrl + 
                    '&text=Descriptive text goes here...';
                    var $params = 'width=660,height=400,scrollbars=no;resizable=no';
                    break;
                case 'linkedin':
                    $trackName = 'LinkedIn';
                    $linkUrl = $linkUrl.replace("mini=true&url=", "");
                    $shareUrl = encodeURIComponent($linkUrl);
                    var $shareSummary = 'test summary - linkedin';
                    var $shareSource = 'test source - linkedin';
                    var $goto = 'http://www.linkedin.com/shareArticle?mini=true' + 
                    '&url=' + $shareUrl + 
                    '&title=' + $shareTitle; // +
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
            } catch (err) {
                console.log('error: ', err);
            }

            // tracking social clicks
            if (inTopNav) {
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

    // addThis widget init
    function addThisInit(){
        /*
        var addthis_share = {
            templates: {
                twitter: 'check out {{url}} (from @example_dot_com)'
            }
        }
        */

        // for header social sharing
        $('.social.inHeader').each(function (index) {
        	//console.log($(this));
        	var targ = $(this);
            var ind = index+1;
            var url = 'http://bit.ly/1gNZdKR'; // bit.ly for home page
            var ttl = 'High Performance IT Research: Defined by Digital - Accenture';
            var descrip = 'Accenture\'s fourth High Performance IT research report identifies 10 key findings to help IT leaders drive their organizations into the digital future.';

            var temp  = '<div class="addthis_toolbox addthis_default_style addthis_16x16_style" addthis:url="'+url+'" addthis:title="'+ttl+'" addthis:description="'+descrip+'">';
                temp += '<a class="addthis_button_linkedin" title="Share via LinkedIn: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-linkedin.png" /></a>';
                temp += '<a class="addthis_button_twitter" title="Share via Twitter: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-twitter.png" /></a>';
                temp += '<a class="addthis_button_facebook" title="Share via Facebook: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-facebook.png" /></a>';
                temp += '<a class="addthis_button_google_plusone_share" title="Share via Google+: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-google.png" /></a>';
                temp += '</div>';
            targ.html(temp);

            addthis.toolbox(targ);
        });

        // for desktop insight level sharing
        $('.social.hidden-xs').each(function (index) {
            var targ = $(this);
            var ind = index+1;
            var url = hpit.config.groups['insight'+ind].bitly;
            
            var temp  = '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:url="'+url+'">';
                temp += '<a class="addthis_button_linkedin" addthis:title="'+hpit.config.groups['insight'+ind].linkedIn.title+'" addthis:description="'+hpit.config.groups['insight'+ind].linkedIn.desc+'" title="'+hpit.config.groups['insight'+ind].linkedIn.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-linkedin.png" /></a>';
                temp += '<a class="addthis_button_twitter" addthis:title="'+hpit.config.groups['insight'+ind].twitter.title+'" title="'+hpit.config.groups['insight'+ind].twitter.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-twitter.png" /></a>';
                temp += '<a class="addthis_button_facebook" addthis:title="'+hpit.config.groups['insight'+ind].facebook.title+'" addthis:description="'+hpit.config.groups['insight'+ind].facebook.desc+'" title="'+hpit.config.groups['insight'+ind].facebook.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-facebook.png" /></a>';
                temp += '<a class="addthis_button_google_plusone_share" addthis:title="'+hpit.config.groups['insight'+ind].google.title+'" addthis:description="'+hpit.config.groups['insight'+ind].google.desc+'" title="'+hpit.config.groups['insight'+ind].google.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-google.png" /></a>';
                temp += '</div>';
            targ.html(temp);

            addthis.toolbox(targ);
        });

        
 		// for mobile insight level sharing
        $('.social.visible-xs').each(function (index) {
            var targ = $(this);
            var ind = index+1;
            var url = hpit.config.groups['insight'+ind].bitly;
            
            var temp  = '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:url="'+url+'">';
                temp += '<a class="addthis_button_linkedin" addthis:title="'+hpit.config.groups['insight'+ind].linkedIn.title+'" addthis:description="'+hpit.config.groups['insight'+ind].linkedIn.desc+'" title="'+hpit.config.groups['insight'+ind].linkedIn.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-linkedin.png" /></a>';
                temp += '<a class="addthis_button_twitter" addthis:title="'+hpit.config.groups['insight'+ind].twitter.title+'" title="'+hpit.config.groups['insight'+ind].twitter.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-twitter.png" /></a>';
                temp += '<a class="addthis_button_facebook" addthis:title="'+hpit.config.groups['insight'+ind].facebook.title+'" addthis:description="'+hpit.config.groups['insight'+ind].facebook.desc+'" title="'+hpit.config.groups['insight'+ind].facebook.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-facebook.png" /></a>';
                temp += '<a class="addthis_button_google_plusone_share" addthis:title="'+hpit.config.groups['insight'+ind].google.title+'" addthis:description="'+hpit.config.groups['insight'+ind].google.desc+'" title="'+hpit.config.groups['insight'+ind].google.alt+'"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/icons-google.png" /></a>';
                temp += '</div>';
            targ.html(temp);

            addthis.toolbox(targ);
        });
        
    }

    function initDelvePlayer() {
    	//console.log("Initializing the delve player");

    	//var activeChap = 0;

		window.delvePlayerCallback = function delvePlayerCallback(playerId, eventName, data) {
		    if (playerId) {
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
	}

	function doOnPlayerLoad(data) {
	    //console.log('player loaded (doOnPlayerLoad)', data);
	    setTimeout(function() {
	        DelvePlayer.doPlay()
	    }, 1000);
	}

	function doOnError(data) {
	//console.log('player error: ', data);
	}

	function doOnMediaLoad(data) {
		var mTitle = "";
		if (typeof this[playerId] !== 'undefined') {
			mTitle = this[playerId].doGetCurrentMedia().title + ".mp4";
		} else if (typeof DelvePlayer[playerId] !== 'undefined') {
			mTitle = DelvePlayer[playerId].doGetCurrentMedia().title + ".mp4";
		} else if (typeof document[playerId] !== 'undefined' && typeof document[playerId] !== 'function') {
			mTitle = document[playerId].doGetCurrentMedia().title + ".mp4";
		} else {
			mTitle = playerId;
		}
		_delvePlayerMedia[playerId] = {mediaTitle: mTitle};
		
		//console.log('Media Loaded: ', data);
    }

	function doOnPlayStateChanged(data) {
	    //console.log('player state: ', data);
	    if (data.isPlaying) {
	        var videoTitle = DelvePlayer.doGetCurrentMedia().title;
	        if (onProduction()) {
				FlashLinkAnalysis($(this).attr('href'), videoTitle, "linkanalysis");
			}
	    }
	}

	function doonPlayheadUpdate(data) {
	    //var currChap = 0;
	    var currPos = data.positionInMilliseconds;
	    //console.log('Playhead update: ', data.positionInMilliseconds +'/'+ data.durationInMilliseconds);
	    
	    switch (true) {
            case (currPos == hpit.config.chapters[1].position):
                hpit.config.currChap = 1;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
			case (currPos > (hpit.config.chapters[2].position - 300) && currPos < (hpit.config.chapters[2].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);			
				break;
            case (currPos <= (hpit.config.chapters[2].position + 300) && currPos >= (hpit.config.chapters[2].position)):
                hpit.config.currChap = 2;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
			case (currPos >= (hpit.config.chapters[3].position - 300) && currPos < (hpit.config.chapters[3].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[3].position + 300) && currPos >= (hpit.config.chapters[3].position )):
                hpit.config.currChap = 3;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
            case (currPos >= (hpit.config.chapters[4].position - 300) && currPos <(hpit.config.chapters[4].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[4].position + 300) && currPos >= (hpit.config.chapters[4].position )):
                hpit.config.currChap = 4;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
			case (currPos >= (hpit.config.chapters[5].position - 300) && currPos < (hpit.config.chapters[5].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[5].position + 300) && currPos >= (hpit.config.chapters[5].position )):
                hpit.config.currChap = 5;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
			case (currPos >= (hpit.config.chapters[6].position - 300) && currPos < (hpit.config.chapters[6].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[6].position + 300) && currPos >= (hpit.config.chapters[6].position )):
                hpit.config.currChap = 6;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
            case (currPos >= (hpit.config.chapters[7].position - 300) && currPos < (hpit.config.chapters[7].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[7].position + 300) && currPos >= (hpit.config.chapters[7].position )):
                hpit.config.currChap = 7;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
            case (currPos >= (hpit.config.chapters[8].position - 300) && currPos < (hpit.config.chapters[8].position) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            case (currPos <= (hpit.config.chapters[8].position + 300) && currPos >= (hpit.config.chapters[8].position )):
                hpit.config.currChap = 8;
                trackSegmentDelvePlayer("start", "limelight_player_239897", currPos);
                break;
			case ( currPos > (hpit.config.chapters[8].position + 50000) ):
				trackSegmentDelvePlayer("complete", "limelight_player_239897", currPos);
				break;
            /*case (currPos > hpit.config.chapters[9].position && currPos < hpit.config.chapters[10].position):
                hpit.config.currChap = 9;
                trackDelvePlayer("start", "limelight_player_239897", currPos);
                break;
            case (currPos > hpit.config.chapters[10].position):
                hpit.config.currChap = 10;
                trackDelvePlayer("start", "limelight_player_239897", currPos);
                break;*/
        }
	    //console.log('active: '+ hpit.config.activeChap +' | curr: ' + hpit.config.currChap);
	    //hpit.config.activeChap
	    
	    if (hpit.config.currChap != hpit.config.activeChap) {
	        hpit.config.activeChap = hpit.config.currChap;
	        //console.log('justClicked: ', hpit.config.justClicked);
	        //console.log('Switching to chapter: ', hpit.config.activeChap);
	        
	        if (!hpit.config.justClicked) {
	        //console.log('track chapter rollover here!');
	        }
	        
	        $('#ll-overlay .chapters .topRow a')
	        .removeClass('active')
	        .eq(hpit.config.activeChap - 1)
	        .addClass('active');
	        
	        $('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[hpit.config.activeChap].title).fadeIn(500).delay(4000).fadeOut(500);
	    } else {
	    //console.log('currChap: ', hpit.config.currChap);
	    }
	}

	function doOnMediaComplete(data) {
	   console.log("video complete");
	   trackDelvePlayer("complete", "limelight_player_239897", data.title);
	   resetVideoStates();
	   //hpit.config.activeChap = 0;
	}

	function resetVideoStates() {
	    //console.log('resetVideoStates');
	    $('#ll-overlay .chapters .topRow a').removeClass('active');
	    hpit.config.activeChap = 0;
	    hpit.config.currChap = 0;
	}
	
	function trackSegmentDelvePlayer(milestone, playerId, _timePositionSeconds) {
		switch (milestone) {
			case 'start':
				var eventsValue = "event51=" + Math.floor(_timePositionSeconds);
				eventsValue = "event6,event54," + eventsValue;
				if (_timePositionSeconds <= 100) {
				eventsValue = "event52," + eventsValue;
				var e51 = "event6,event54,event51,event52";
				}
				else {var e51 = "event6,event54,event51";}		
				var e49 = "1:M:0-25";
				break;
			case 'complete':
				var eventsValue = "event51=" + Math.floor(_timePositionSeconds);
				eventsValue = "event53,event70," + eventsValue;
				if (_timePositionSeconds > 354000) {
				eventsValue = "event54," + eventsValue;
				var e51 = "event53,event70,event51,event54";
				}
				else {var e51 = "event53,event70,event51";}		
				var e49 = "2:M:75-100";
				break;
		}
		window.s.linkTrackVars = window.s.apl(window.s.linkTrackVars, "eVar16", ",", 1);
		window.s.linkTrackVars = window.s.apl(window.s.linkTrackVars, "eVar49", ",", 1);
		window.s.linkTrackVars = window.s.apl(window.s.linkTrackVars, "eVar33", ",", 1);
		window.s.linkTrackVars = window.s.apl(window.s.linkTrackVars, "events", ",", 1);
		window.s.linkTrackEvents = e51;
		window.s.events = eventsValue;
		window.s.eVar49 = e49;
		window.s.eVar33 = "video";
		window.s.eVar16 = _delvePlayerMedia[playerId].mediaTitle;		//SGS 
		SetPageConversionVariable("media");
		LowerCaseVars();
		window.s.tl(this, 'o', 'delveMedia');
		clearVideoVarsEvents();
	}

    // video player
    function playVideoInit() {
        $('.hero .playVid').on('click', function(e) {
            e.preventDefault();
            
            $('.the-video.active').each(function(index) {
                $(this).find('.vidWrapper').remove().end().removeClass('active');
            });
            
            if (!onMobile() && !onIpad() && !isIE8) {
                if ($('#hero video').length) {
                    $("#hero video")[0].pause();
                } else {
                //console.log('NO VIDEO');
                }
            }
            $('html').addClass('noScroll');
            $('#ll-overlay').fadeIn(500, function() {
                var vidContent = '<object type="application/x-shockwave-flash" id="limelight_player_239897" name="limelight_player_239897" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//assets.delvenetworks.com/player/loader.swf">';
                vidContent += '<param name="movie" value="//assets.delvenetworks.com/player/loader.swf"/>';
                vidContent += '<param name="wmode" value="transparent"/>';
                vidContent += '<param name="allowScriptAccess" value="always"/>';
                vidContent += '<param name="allowFullScreen" value="true"/>';
                vidContent += '<param name="flashVars" value="playerForm=HoverPlayer&amp;channelId=c315bfc4a8c345af807b2887698549f6&amp;autoplay=true"/>';
                vidContent += '</object>';
                
                $('#ll-overlay #ll-player').html(vidContent);
                LimelightPlayerUtil.initEmbed('limelight_player_239897');
            });
            
            omniTrack({
                eventLink: $(this).attr('href'),
                eventName: $(this).attr('href').replace('#', ''),
                eventType: 'hero video play'
            });
        });

        // close button
        $('.closeVid').on('click', function(e) {
            e.preventDefault();
            
            try {
                DelvePlayer.doPause();
            } catch (err) {
            //console.log('DelvePlayer error: ', err);
            }
            
            resetVideoStates();
            $('html').removeClass('noScroll');
            
            $('#ll-overlay')
            .find('#ll-player').html('')
            .end()
            .fadeOut(500, function() {
                if (!onMobile() && !onIpad() && !isIE8) {
                    if ($('#hero video').length) {
                        $(".hero video")[0].play();
                    } else {
                    //console.log('NO VIDEO');
                    }
                }
            });
        });

        // video chapters
        $('.chapters a')
        .on('click', function(e) {
            e.preventDefault();
            clearTimeout(chapterClicked);
            hpit.config.justClicked = true;
            var cNum = $(this).text();
            var skipTo = hpit.config.chapters[cNum].position / 1000;
            if (onProduction()) {
				FlashLinkAnalysis($(this).attr('href'), "Video Chapter " + cNum, "linkanalysis");
			}
            
            try {
                DelvePlayer.doSeekToSecond(skipTo);
            } catch (err) {
            	//console.log('DelvePlayer error: ', err);
            }
            
            chapterClicked = setTimeout(function() {
                hpit.config.justClicked = false;
            //console.log('justClicked cleared');
            }, 4000);
        })
        .on('mouseenter', function(e) {
            var thisNum = $(this).text();
            //console.log('thisNum: ', thisNum);
            $('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[thisNum].title).show();
        })
        .on('mouseleave', function(e) {
            $('#ll-overlay .chapters .contentRow').hide().text('');
        //console.log('clear description');
        });
        
        $('.the-video a').on('click', function(e) {
            e.preventDefault();
            
            $('.the-video.active').each(function(index) {
                $(this).find('.vidWrapper').remove().end().removeClass('active');
            });
            
            var target = $(this).parent();
            target.addClass('active');
            //var origContent = target.html();
            
            var insightID = $(this).attr('href').replace('#', '');
            var vidID = 'limelight_player_' + hpit.config.limelightVideos[insightID].uid;
            //var chID = hpit.config.limelightVideos[insightID].channelId
            var mediaId = hpit.config.limelightVideos[insightID].mediaId;
            
            var vidContent = '<div class="vidWrapper">'; //<script src="//assets.delvenetworks.com/player/embed.js"></script>
            vidContent += '<object type="application/x-shockwave-flash" id="' + vidID + '" name="' + vidID + '" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//assets.delvenetworks.com/player/loader.swf">';
            vidContent += '<param name="movie" value="//assets.delvenetworks.com/player/loader.swf"/>';
            vidContent += '<param name="wmode" value="transparent"/>';
            vidContent += '<param name="allowScriptAccess" value="always"/>';
            vidContent += '<param name="allowFullScreen" value="true"/>';
            vidContent += '<param name="flashVars" value="mediaId=' + mediaId + '&amp;playerForm=HoverPlayer&amp;autoplay=true"/>';
            vidContent += '</object></div>';
            
            target.append(vidContent);
            LimelightPlayerUtil.initEmbed(vidID);
            
            if (onProduction()) {
				FlashLinkAnalysis($(this).attr('href'), "Insight" + insightID + " Video Play", "linkanalysis");
			}
            
        });
    }
    
    function updateSidemenu() {
        //console.log('scrH:', hpit.config.scrH);
        
        var scrH = parseInt(hpit.config.scrH);
        var availH = scrH - 62;
        var menuH = $('#sideMenu > ul').outerHeight();
        
        var $target = $('#sideMenu');
        $target.css({"height": hpit.config.scrH - 62});
        
        
        
        var $diff = menuH - availH;
        //console.log('$diff:', $diff);
        $target.removeClass('height-xxs height-xs height-sm height-md height-lg');
        
        if ($diff > 0) {
            if ($diff > 300) {
                $('#sideMenu').addClass('height-xxs');
            } else if ($diff > 200) {
                $('#sideMenu').addClass('height-xs');
            } else if ($diff > 100) {
                $('#sideMenu').addClass('height-sm');
            } else if ($diff > 50) {
                $('#sideMenu').addClass('height-md');
            } else {
                $('#sideMenu').addClass('height-lg');
            }
        }
    }

    // sidemenu toggle method
    function toggleMenuInit() {
        //updateSidemenu();
        var $target = $('#sideMenu');
        
        $('#controls a').on('click', function(e) {
            e.preventDefault();
            if ($('#controls .control-info').is(':visible')) {
                $('#controls .control-info').fadeOut();
                setCookie('hasUsedControls', true);
            }
        });
        
        $('#toggleMenu,#sideMenu .closeX').on('click', function(e) {
            e.preventDefault();
            var th = $(this);
            
            if ($target.hasClass("opened")) {
                $target.animate({"right": "-275px"}, "normal");
                $target.removeClass("opened");
                if (th.hasClass("closeX")) {
                	if (onProduction()) {
						FlashLinkAnalysis(th.attr('href'), "menu-closed", "linkanalysis");
					}
                }
            } else {
                $target.animate({"right": "0px"}, "normal");
                $target.addClass("opened");
                if (th.attr("id") == "toggleMenu") {
                	if (onProduction()) {
						FlashLinkAnalysis(th.attr('href'), "menu-opened", "linkanalysis");
					}
                }
            }
        });
    }
    
    function injectStuff() {
        //$('.insight').each(function (index) {
        //$(this).attr('data-insight', index+1);			
        //});
        $('li.state').each(function(index) {
            //$(this).attr('data-insight-nav', index+1);
            $(this).on('click', function(e) {
                hpit.config.state = parseInt($(this).attr('data-insight-nav'));
            })
        });
        //$('.bgImg').each(function (index) {
        //$(this).attr('data-insight', index+1);			
        //});
        $('.navbar-toggle').on('click', function(e) {
            e.preventDefault();
            if (onProduction()) {
				FlashLinkAnalysis("mobile", "menu-toggle", "linkanalysis");
			}
        });
        //$('.navbar-toggle')
        //.attr('data-toggle','collapse')
        //.attr('data-target','.navbar-collapse');
        
        if (!onMobile() && !onIpad() && !isIE8) {
            initVideo();
        }
    }
    
    function initVideo() {
        //poster="http://www.accenture.com/microsites/high-performance-it/PublishingImages/video-still.jpg"
        $('#hero .video-wrapper').html('<video id="theVideo" width="100%" height="auto" preload="auto" autoplay><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.mp4" type="video/mp4" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.ogg" type="video/ogg" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.webm" type="video/webm" /><img src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/video-still.jpg" /></video>');
        
        var video = document.getElementById('theVideo');
        if (video.addEventListener) {
            video.addEventListener('ended', function() {
                $('.video-wrapper').html('');
            });
        //console.log('addEventListener - IF');
        } else if (video.attachEvent) {
            video.attachEvent('ended', function() {
                $('.video-wrapper').html('');
            });
            $('html').addClass('ie8');
            $('head').append('<link href="/Microsites/high-performance-it/Documents/css/ie8.css" rel="stylesheet" media="screen" />');
        //console.log('addEventListener - ELSE IF');
        } else {
            video.addEventListener('ended', function() {
                $('.video-wrapper').html('');
            });
        //console.log('addEventListener - ELSE');
        }
    }
    
    function updateDimensions() {
        hpit.config.scrW = $(window).width();
        hpit.config.scrH = $(window).height();
    }
    
    function updateArrows(from) {
        $('.arrows').removeClass('noClick');
        //console.log('from: ', from);
        //console.log('hpit.config: ', hpit.config);
        if (hpit.config.state > 0 && hpit.config.state < $('.insight').length) {
        //$('.arrows').removeClass('noClick');
        //console.log('updateArrows - IF');
        } else if (hpit.config.state === $('.insight').length) {
            $('.nxt').addClass('noClick');
        //console.log('updateArrows - ELSE IF');
        } else {
            $('.prev').addClass('noClick');
        //console.log('updateArrows - ELSE');
        }
    }
    
    function omniTrackPageView(num) {
        //console.log('function omniTrackPageView: ', num);
		if (onProduction()) {
            CleanUpLtVars();
        }
        var newPageName = 'acn:microsites:high-performance-it:home:insight' + num;
        //console.log('newPageName: ', newPageName);
        if (onProduction()) {
            triggerOmniturePageView(newPageName, "event29,event20,event55");
        } 
        else {
            console.log("Omniture Page View: " + newPageName);
        }
    }

    /* omniture tracking function */
    function omniTrack(obj) {
        //console.log('Object: ', obj);

		if (onProduction()) {
			try {
	            FlashLinkAnalysis(obj.eventLink, obj.eventName, obj.eventType);
	        } catch (err) {
	        	//console.log('Tracking error: ', err);
	        }
		}
    }
    
    function isTouchDevice() {
        return hpit.config.desktopORtouch == 'touch';
    }
    
    function touchOrientationChange() {
    //
    }
    
    return {
        init: init
    }
}());

$(window).on('orientationchange', function() {
// Functionality to execute upon an orientation change (touch devices only)
// hpit.core.touchOrientationChange();
});

// jQuery extensions
$.extend({
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) 
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});

$(document).ready(function() {
    // Initialize
    hpit.core.init();
});
