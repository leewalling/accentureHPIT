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

hpit.config = {
    isTopPageView: false,
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
    isIE: false,
    easing: 'easeOutQuart', //easeOutExpo'
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
                desc: 'High performing CIOs know you can\'t think like a database. You have to think like a customer. Discover other business IT insights in Accenture\’s High Performance IT Research report',
                alt: 'Share via LinkedIn: Your new boss? Your customer.'
            },
            twitter: {
                title: 'CIO Action Item #1: Your new boss? Your customer. For more, read Accenture\'s IT Research report',
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
                desc: 'High performing CIOs know IT doesn\'t exist in a vacuum. If something impacts the business, it impacts IT, and vice versa. View top 10 insights from the Accenture High Performance IT Research report.',
                alt: 'Share via LinkedIn: Context is king'
            },
            twitter: {
                title: 'CIO Action Item #2: Context is king. View Accenture\'s High Performance IT Research ',
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
                desc: 'High performing CIOs know your strategy IS your technology. End of story. Get more digital IT insights in Accenture’s High Performance IT Research report.',
                alt: 'Share via LinkedIn: Business strategy and IT now work as one'
            },
            twitter: {
                title: 'CIO Action Item #3: Biz strategy and IT now work as one. View Accenture’s IT research report',
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
                desc: 'High performing CIOs are master orchestrators of managing new and existing IT. They are leading the way in the new hybrid world. Read the IT research report.',
                alt: 'Share via LinkedIn: Bringing harmony to hybrid IT'
            },
            twitter: {
                title: 'CIO Action Item #4: Bringing harmony to hybrid IT. See Accenture\'s High Performance IT Research',
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
                desc: 'High performing CIOs know the time has come to make the leap to digital. Every business is now a digital business. Explore top 10 insights from the Accenture High Performance IT Research report',
                alt: 'Share via LinkedIn: Fearlessly digital'
            },
            twitter: {
                title: 'CIO Action Item #5: Fearlessly digital. For more, view Accenture\'s High Performance IT Research',
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
                desc: 'High performing CIOs know that being truly digital means many more customers, suppliers and employees can answer their own questions—so you don\'t have to. View the IT research report.',
                alt: 'Share via LinkedIn: The power of self-service'
            },
            twitter: {
                title: 'CIO Action Item #6: The power of self-service. See Accenture\'s High Performance IT Research',
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
                desc: 'High performing CIOs know what \'Big Data\' is all about—creating actionable insights out of data, wherever it comes from. For more, view Accenture\'s High Performance IT Research',
                alt: 'Share via LinkedIn: Unearthing data gems'
            },
            twitter: {
                title: 'CIO Action Item #7: Unearthing data gems. For more, read Accenture\'s High Performance IT Research',
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
                desc: 'High performing CIOs know if you\'re not making change happen on the run, then instead of being agile, you could be increasingly vulnerable. For more, read Accenture\'s High Performance IT Research',
                alt: 'Share via LinkedIn: Agility and speed. The new normal'
            },
            twitter: {
                title: 'CIO Action Item #8: Agility and speed are table stakes. View Accenture\'s IT Research report',
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
                desc: 'High performing CIOs know that talent will drive future success. Figuring out where your opportunities are—and finding the right people to work on them—will pay off. For more, read Accenture\'s High Performance IT Research',
                alt: 'Share via LinkedIn: Plug-and-play talent'
            },
            twitter: {
                title: 'CIO Action Item #9: Plug-and-play talent. For more, read Accenture\'s High Performance IT Research',
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
                desc: 'High performing CIOs know that risk management and IT security must be in the same room and on the same page. For more, read Accenture\'s High Performance IT Research',
                alt: 'Share via LinkedIn: Uniting business risk and IT security'
            },
            twitter: {
                title: 'CIO Action Item #10: Uniting biz risk and IT security. For more, read Accenture\'s IT Research',
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
            position: 33000
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

hpit.core = (function() {
    
    var $userAgent = navigator.userAgent.toLowerCase();
    var $Android = /android/i.test($userAgent);
    var $iOS = /iphone|ipod|ios/i.test($userAgent);
    var $iPad = /ipad/i.test($userAgent);
    var $Nexus = /nexus/i.test($userAgent);
    var $GalaxyTab = /sch-i905/i.test($userAgent);

    var chapterClicked, trackPageViewDelay;

    var haveDeepLink = false;
    var waitBeforeCallingAnalyticsCall = 4000;

    function init() {

        var debug = $.getUrlVar('debug');
        if (debug == 'true') {
            $('#diagnostics').show();
        }

        // needed for fixing back button position
        if( $(window).scrollTop() > 0 ){
        	setTimeout(function() {
	        	window.scrollTo(0, 0);
	        }, 100);
        }
	
/* ANALYTICS DISABLED
		overridePageView = true;
*/
		hpit.config.desktopORtouch = ( 'ontouchstart' in window || 'onmsgesturechange' in window ) ? 'touch' : 'desktop';
        
        if ( isIE8 ) {
            $('html').addClass('ie8');
        }
        
        checkAndHandleDeepLink();
        
        if (!onMobile() && !onIpad() && !isIE8) {

            if ( onProduction() ) {
                preload([
                    '/Microsites/high-performance-it/PublishingImages/01.png', 
                    '/Microsites/high-performance-it/PublishingImages/02.png', 
                    '/Microsites/high-performance-it/PublishingImages/03.png', 
                    '/Microsites/high-performance-it/PublishingImages/04.png', 
                    '/Microsites/high-performance-it/PublishingImages/05.png', 
                    '/Microsites/high-performance-it/PublishingImages/06.png', 
                    '/Microsites/high-performance-it/PublishingImages/07.png', 
                    '/Microsites/high-performance-it/PublishingImages/08.png', 
                    '/Microsites/high-performance-it/PublishingImages/09.png', 
                    '/Microsites/high-performance-it/PublishingImages/10.png'
                ]);
            }
            else {
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
            }
        }
        
        //$('#diagnostics').html('<div>' + $userAgent + '</div>' + '<div>w: ' + $(window).width() + '</div>' + '<div>h: ' + $(window).height() + '</div>' + '<div>onMobile: ' + onMobile() + '</div>' + '<div>onIpad: ' + onIpad() + '</div>' + '<div>onNexus: ' + onNexus() + '</div>');

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

        //check if the user is on IE
        hpit.config.isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;

        // check if the user is on IE7
        hpit.config.isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.") != -1;
        
        var validHashValue = false;
        
        footerLock($('#footer'));
        
        if ( !onMobile() && !onIpad() ) {
            paneLock();
        }
        
        if ( onMobile() && !onGalaxyTab() ) {
            arrangeTopNav();
        }

/* ANALYTICS DISABLED
        $('.download a').on('click', function(e) {

			if ( onProduction() ) {
                CleanUpLtVars();
				FlashDownload($(this).attr('href'), "download study:topnav", "linkanalysis");
			}

        });

		$('.download-link a').on('click', function(e) {
			
            var $trgt = $(this).parent().parent().parent().parent().parent()
            var $title = $trgt.find(".insightTitle");
             
            if ( onProduction() ) {
                if ( $trgt.hasClass('open') ) {
                    CleanUpLtVars();
                    FlashDownload($(this).attr('href'), "download study:insight" +  $.trim($title.text()).replace('\n', ''), "linkanalysis");
                }
                else {
                    CleanUpLtVars();
                    FlashDownload($(this).attr('href'), "download study:insight" + hpit.config.currInsight, "linkanalysis");
                }
            }

        });
*/

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

        $win.scroll(function(event) {

        	// fade out the control message upon initial scroll
        	if ( $hasFired == 0 ) {
        		if ( $cntrlMess == undefined || $cntrlMess == null || $cntrlMess == '' ) {
		            $conInf.fadeOut(2000);
		        }
        		$hasFired = 1;
        	}
        	
        	// if the hero video exists remove it upon initial window scroll
            if ( $theVid.length ) {
                $vidWr.html('');
            } 
            
            if ( !onMobile() && !onIpad() ) {
                // determine if we need to lock the background images in place
                if ( $win.scrollTop() > $ins.eq(0).offset().top - 1 ) { 

                    if (!$bgImg.hasClass('fixed')) {
                        $bgImg.addClass('fixed');
                    }
                    if (!$wh.hasClass('fixed')) {
                        $wh.addClass('fixed');
                    }
                    if (!$bl.hasClass('fixed')) {
                        $bl.addClass('fixed');
                    }

                } 
                else {

                    var toGo = $ins.eq(0).offset().top - $win.scrollTop();
                    if ( toGo > -1 && toGo < 226 ) {
                        if ( $bl.hasClass('fixed') ) {
                            $bl.removeClass('fixed');
                        }
                        $bl.css({'bottom': -toGo});
                    } 
                    else {
                        $bl.removeClass('fixed').removeAttr('style');
                    }
                    
                    if ( $bgImg.hasClass('fixed') ) {
                        $bgImg.removeClass('fixed');
                    }

                    if ( $wh.hasClass('fixed') ) {
                        $wh.removeClass('fixed');
                    }

                    if ( $bl.hasClass('fixed') ) {
                        $bl.removeClass('fixed').removeAttr('style');
                    }

                    $foot.removeClass('fixed');
                    $smUlLi.removeClass('hilited');
                    $bgImgImg.removeClass('activate');
                    
                    if ( !onIpad() && !isIE8 ) {
                        var $newT = $win.scrollTop() / 3.5;
                        $hero.css({'top': -$newT});
                    }

                }
            }
        });
        
        $win.resize(function() {
            updateDimensions();
            updateSidemenu();
            
            if ( onMobile() ) {
                if ( !onIpad() && $win.width() > 767 ) {
                    $('html').addClass('exception');
                    if( onGalaxyTab() ){
                    	$('html').addClass('galaxyTab');
                    }
                };
                $('html').removeClass('desktop').addClass('onMobile');
            } 
            else {
                $('html').removeClass('onMobile exception').addClass('desktop');
            }
            
            if ( onIpad() ) {
                $('html').addClass('onIpad');
            } 
            else {
                $('html').removeClass('onIpad');
            }
        });
        
        $win.resize();

        togglerInit();

        renderSocialShareButtonsOnPage();
    }
    
    function onMobile() {
        return (($(window).width() < 768) || $Android || $iOS && !$iPad);
    }
    
    function onIpad() {
        return ($iPad);
    }
    
    function onNexus() {
        return ($Nexus);
    }
    
    function onGalaxyTab() {
        return ($GalaxyTab);
    }
    
    function onProduction() {
        return (location.hostname.indexOf("accenture.com") > -1);
    }
    
    function footerLock(element) {

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
            if ( winOffset >= (vpStart - scH) ) {
                hpit.config.footerInView = true;
                var diff = vpEnd - scH;
                var scrollDiff = -(winOffset - diff);
                var margOffset = scrollDiff - footerH;
                $$('.bgImages .bgImg img.activate').css({"margin-top": margOffset / 2});
            } 
            else {
                hpit.config.footerInView = false;
            }
        });
    }

    // method to re-arrange the top nav items - only called on mobile
	function arrangeTopNav() {
        var $par = $('.navbar-nav');
        var $child1 = $par.find('li').first();
        var $child2 = $par.find('li').last();
        $par.append($child1).prepend($child2);
    }
   
    function paneLock() {

        $('#controls .arrows').removeClass('noClick');

        $(window).scroll(function() {

            var winOffset = $(window).scrollTop();

            if ( winOffset <= 1 && ( typeof isTopPageView != 'undefined' && !isTopPageView ) ) {
               
/* ANALYTICS DISABLED
                clearTimeout(trackPageViewDelay);

                trackPageViewDelay = setTimeout(function() {
                    omniTrackPageView('home');
                }, waitBeforeCallingAnalyticsCall );
*/

                isTopPageView = true;
                hpit.config.state = 0;
                hpit.config.currPageView = 0;
                
                updateArrows();

            }
            else {
                isTopPageView = false;
            }
 
            $('.insight').each(function(index) {
               paneLockUpdate($(this), index, winOffset);
           });

        });
    }

    function paneLockUpdate(element, index, winOffset) {

        var currEle = element;
        var currFixedEle = element.find('.marker');
        var bgPxToMove = 25;
         
        if ( currFixedEle.length <= 0 ) {
            return false;
        }

        var vpStart = currEle.offset().top - 1; // - 62
        var vpEnd = vpStart + currEle.height();
        var currEleEnd = currEle.height();
        var currEleHgt = currEle.height();
         
        if ( index === parseInt(hpit.config.currInsight) ) { // && vpStart > winOffset
             
            var currEleTitle = $$('.insight[data-insight="' + index + '"] .insightTitle', 'context-get', '.container.main');
            if ( currEleTitle.hasClass('lockedBottom') ) {
                currEleTitle.removeClass('lockedBottom');
            }
            var titleEnd = parseInt(currEleTitle.css('top')) + currEleTitle.height() + 75;
            var diff = vpStart - winOffset;
             
            if ( !isIE8 && (diff < titleEnd) ) {
                if (!currEleTitle.hasClass('lockedBottom')) {
                    currEleTitle.addClass('lockedBottom');
                }
            }
             
            var scH = parseInt(hpit.config.scrH);
            var $per = diff / scH;
                
            if ( diff >= -1 && diff < scH + 1 ) {
                 $$('.bgImg[data-insight="' + index + '"]', 'context-get', '.container.main').css({"opacity": $per});
            } 
            else {
                $$('.insight .insightTitle', 'context-get', '.container.main').css({"opacity": 1});
            }

         }

         // is the element in the viewport?
         if ( winOffset >= vpStart && winOffset < vpEnd ) {

            $$('.insight.current', 'context-get', '.container.main').removeClass('current');
            $('#sideMenu ul li.hilited').removeClass('hilited'); 
            $$('.bgImg img.activate', 'context-get', '.container.main').removeClass('activate');
             
            currEle.addClass('current');
             
            var menuItem = parseInt( $('.insight.current', '.container.main').data('insight') );

            $('#sideMenu ul li[data-insight-nav="' + menuItem + '"]').addClass('hilited'); //XXX no cache
            $$('.bgImg[data-insight="' + menuItem + '"] img', 'context-get', '.container.main').addClass('activate');
 
  /* ANALYTICS DISABLED               
            if ( !hpit.config.locked && (hpit.config.currPageView != menuItem) && !isTopPageView ) { 
 
                clearTimeout(trackPageViewDelay);
                trackPageViewDelay = setTimeout(function() {

                    if ( !haveDeepLink ) {
                        omniTrackPageView( menuItem );
                    } 
                    else {
                        haveDeepLink = false;
                    }

                }, waitBeforeCallingAnalyticsCall);

            }
*/ 

            hpit.config.currInsight = menuItem;
            hpit.config.state = menuItem;
            hpit.config.currPageView = menuItem;
            
            if ( !hpit.config.locked ) {
                updateArrows(1);
            }

            var prevImgNum = parseInt(menuItem) - 1;
            var nextImgNum = parseInt(menuItem) + 1;
            $$('.bgImg', 'context-get', '.container.main').css({"opacity": 0});
            $$('.bgImg[data-insight="' + menuItem + '"]', 'context-get', '.container.main').css({"opacity": 1});
            $$('.bgImg[data-insight="' + nextImgNum + '"]', 'context-get', '.container.main').css({"opacity": 1});

            if ( !isIE8 ) {
                var diffToMove = (1 - ((vpEnd - winOffset) / currEleHgt)) * bgPxToMove;
                if ( !hpit.config.footerInView ) {
                    $$('.bgImages .bgImg img', 'context-get', '.container.main').css({"margin-top": 0});
                    $$('.bgImages .bgImg img.activate', 'context-get', '.container.main').css({"margin-top": -diffToMove});
                }
            }

        } 
        else {
          currEle.removeClass('current');
        }
    }
    
    function cntrlMessInit() {
        var cntrlMess = getCookie('hasUsedControls');
        if ( cntrlMess == undefined || cntrlMess == null || cntrlMess == '' ) {
            $('#controls .control-info').fadeIn();
        }
    }

    function addFavicon() {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'http://www.accenture.com/Microsites/high-performance-it/PublishingImages/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function checkAndHandleDeepLink() {

        var groupParamValue = $.getUrlVar('group');
        
        if ( groupParamValue && groupParamValue.indexOf('insight') != -1 ) {

            var specifiedInsightNumber = parseInt( groupParamValue.replace('insight', '') );

            if ( specifiedInsightNumber > 0 && specifiedInsightNumber < $('.insight').length + 1 ) {

                var specifiedInsightDeepLink = hpit.config.groups[ 'insight' + specifiedInsightNumber ].newHash;
                var selectedInsight = $( specifiedInsightDeepLink );
                var animationDurationInMilliseconds = 2000;

                hpit.config.locked = true;

                if ( onMobile() ) {

                    setTimeout( function() {

                        // SGS 10/24: Added a class for flagging the click event was just forced 
                        $('.insight[data-insight="' + specifiedInsightNumber + '"] .toggler').addClass("forcedClick");
                        $('.insight[data-insight="' + specifiedInsightNumber + '"] .toggler').trigger("click");
                        $('.insight[data-insight="' + specifiedInsightNumber + '"] .toggler').removeClass("forcedClick");

                        $('body').animate({
                                scrollTop: selectedInsight.offset().top - $('.navbar').outerHeight( true )
                            }, {
                                duration: animationDurationInMilliseconds,                        
                                complete: function() {
                                    hpit.config.locked = false;
                                }
                        });

                    }, 750);
                    
                }
                else {

                    $('body, html').animate({
                            scrollTop: selectedInsight.offset().top
                        }, {
                            duration: animationDurationInMilliseconds,
                            complete: function() {
                                hpit.config.locked = false;
                            }
                    });
                
                }

            } 
        
        } 

    }

    function sideMenuInit() {

        $('#sideMenu ul li a').on('click', function(e) {

            e.preventDefault();
            var $th = $(this);
            var selectedInsightId = $th.attr('href');
            
            $('#toggleMenu').trigger("click");
            $('#controls .arrows').removeClass('noClick');
            
            $(window).scrollTo( selectedInsightId, {
	                duration: hpit.config.duration[hpit.config.desktopORtouch],
	                easing: hpit.config.easing,
	                onAfter: function() {
	                    hpit.config.locked = false;
	                    if ( hpit.config.desktopORtouch == 'desktop' ) {
	                        if ( $(window).scrollTop() < $('.insight').eq(0).offset().top ) {

	                            hpit.config.currInsight = 0;
	                            hpit.config.state = 0;
	                            hpit.config.currPageView = 0;

	                            setTimeout(function() {
	                                updateArrows(3);
	                            }, 100);

	                        } 
	                    }
	                }
	       });

        });
    
    }

    function arrowsInit() {
        
        $('#controls .arrows').on('click', function(e) {

            e.preventDefault();
            var $cur = parseInt(hpit.config.currInsight);
            var $th = $(this);

            var newNum;
            
            $('#controls .arrows').removeClass('noClick');

            if ( $th.hasClass("prev") ) {

                var previousInsight;

                if ( $th.hasClass("noClick") ) {
                    return false;
                }
                else {

                    if ( $cur > 1 ) {
                        newNum = ($cur - 1);
                        previousInsight = $('#sideMenu ul li[data-insight-nav="' + newNum + '"] > a').attr('href');
                    } 
                    else {
                        newNum = 0;
                        previousInsight = '#theTop';
                    }

                    $(window).scrollTo(
                        previousInsight, 
                        hpit.config.duration[hpit.config.desktopORtouch],
                        { 
                            axis: 'y' 
                        },
                        {
                            easing: hpit.config.easing,
                            duration: 100,
                            onAfter: function() {

                                hpit.config.state = newNum;
                                $('.bgImg[data-insight="' + newNum + '"]').css({"opacity": 1});

                                if (newNum < 1) {
                                    $th.addClass('noClick');
                                }
                            }
                    });

/* ANALYTICS DISABLED
                    if ( onProduction() ) {

                        /* SGS 
                        groupParam = $.getUrlVar('group');
                        var targetPage = groupParam ? 'home.aspx#' + groupParam : 'home.aspx';

						if ( newNum == 0 ) {
                            CleanUpLtVars();
							FlashLinkAnalysis(targetPage, "Menu Up:home", "linkanalysis");
						}
						else {
                            CleanUpLtVars();
                            FlashLinkAnalysis(targetPage, "Menu Up:insight" + newNum, "linkanalysis");
                        }

                    }   
*/
                }
            } 
            else {

                if ( $cur < $('.insight').length ) {

                    newNum = $cur + 1;
                    var nextInsight = $('#sideMenu ul li[data-insight-nav="' + newNum + '"] > a').attr('href');
                    
                    $(window).scrollTo(
                        nextInsight, 
                        hpit.config.duration[hpit.config.desktopORtouch], 
                        {
                            easing: hpit.config.easing,
                            duration: 100,
                            onAfter: function() {

                                hpit.config.state = newNum;
                                $('.bgImg[data-insight="' + newNum + '"]').css({"opacity": 1});

                                if (newNum > $('.insight').length - 1) {
                                    $th.addClass('noClick');
                                }
                            }
                    });

/* ANALYTICS DISABLED
                    if ( onProduction() ) {
                        /* SGS
                        CleanUpLtVars();
                        FlashLinkAnalysis(targetPage, "Menu Down:insight" + newNum, "linkanalysis");
                    }
*/

                } 
                else {
                    return false;
                }
            }
            hpit.config.currInsight = newNum;
        });

    }

    // insight toggler
    function togglerInit() {
        
        $('.onMobile .insight .insightTitle').on('click', function(e) {
            
            e.preventDefault();
            var $th = $(this);
            var $trgt = $th.parent();
            var $cont = $trgt.find('.container.content');
            
            if ( $trgt.hasClass('open') ) {
                
                $cont.show(0, function() {
                    $trgt.removeClass('open');
                });

                removeClass('open');
        		   
                if ( onProduction() ) {
                    CleanUpLtVars();
					FlashLinkAnalysis('home:insight', "mobile:close:" + $.trim($(this).text()).replace('\n', ''), "linkanalysis");
				}
            } 
            else {
                $cont.hide(0, function() {
                    $trgt.addClass('open');
                });

/* ANALYTICS DISABLED
                /* SGS 10/24
                var wasForcedClick = $(this).find('.toggler').hasClass('forcedClick');

                if ( onProduction() && !wasForcedClick ) {
                    CleanUpLtVars();
				    FlashLinkAnalysis('home:insight', "mobile:open:" + $.trim($(this).text()).replace('\n', ''), "linkanalysis");
			     }
*/

            }
        });
    }

    function bindClicktoSocialLinks() {

/* ANALYTICS DISABLED - Tracked when clicking add this...
            // tracking social clicks
            if (inTopNav) {
                omniTrack({
                    eventLink: $linkUrl,
                    eventName: 'Share - Top Nav',
                    eventType: 'Social'
                });
            } 
            else {
                omniTrack({
                    eventLink: $linkUrl,
                    eventName: 'Share - ' + $trackName,
                    eventType: 'Social'
                });
            }
*/

    }

    function renderSocialShareButtonsOnPage(){

        $('.social.inHeader').each(function (index) {
       
        	var headerSocialBar = $(this);
            var ind = index+1;
            var linkToShare = 'http://bit.ly/1gNZdKR';

            var addthisSocialButtons  = '<div class="addthis_toolbox addthis_default_style addthis_16x16_style" addthis:url="' + linkToShare + '">';
                addthisSocialButtons += '<a class="addthis_button_linkedin socialButton linkedin inHead" url="' + linkToShare + '" title="High Performance IT Research: Defined by Digital - Accenture" addthis:title="High Performance IT Research: Defined by Digital - Accenture" addthis:description="Accenture\'s fourth High Performance IT research report identifies 10 key findings to help IT leaders drive their organizations into the digital future."><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" /></a>';
                addthisSocialButtons += '<a class="addthis_button_twitter socialButton twitter inHead" url="' + linkToShare + '#.UmbhQ44lyeh.twitter" addthis:url="' + linkToShare + '#.UmbhQ44lyeh.twitter" addthis:title="Drive your organization into the digital future with Accenture\'s High Performance IT Research." title="Drive your organization into the digital future with Accenture\'s High Performance IT Research."><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" /></a>';
                addthisSocialButtons += '<a class="addthis_button_facebook socialButton facebook inHead" url="' + linkToShare + '" title="Share via Facebook: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png"  class="sprites"/></a>';
                addthisSocialButtons += '<a class="addthis_button_google_plusone_share socialButton google inHead" url="' + linkToShare + '" title="Share via Google+: Accenture High Performance IT Research 2013"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" /></a>';
                addthisSocialButtons += '</div>';
            
            headerSocialBar.html( addthisSocialButtons );

        });

        var renderSocialButtonsForClass = function( className ) {

            $( className ).each(function (index) {

                var targetSocialDiv = $(this);
                var ind = index+1;
                var selectedInsight = hpit.config.groups['insight'+ind];

                var addthisSocialButtons  = '<div class="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:url="' + selectedInsight.bitly + '">';
                    addthisSocialButtons += '<a class="addthis_button_linkedin socialButton linkedIn" addthis:title="' + selectedInsight.linkedIn.title + '" url="' + selectedInsight.bitly + '" title="' + selectedInsight.linkedIn.title + '"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" alt="' + selectedInsight.linkedIn.alt + '" /></a>';
                    addthisSocialButtons += '<a class="addthis_button_twitter socialButton twitter" addthis:title="' + selectedInsight.twitter.title + '" url="' + selectedInsight.bitly + '" title="' + selectedInsight.twitter.title + '"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" alt="' + selectedInsight.twitter.alt + '" /></a>';
                    addthisSocialButtons += '<a class="addthis_button_facebook socialButton facebook" addthis:title="' + selectedInsight.facebook.title + '" url="' + selectedInsight.bitly + '" title="' + selectedInsight.facebook.title + '"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" alt="' + selectedInsight.facebook.alt + '" /></a>';
                    addthisSocialButtons += '<a class="addthis_button_google_plusone_share socialButton google" addthis:title="' + selectedInsight.google.title + '" url="' + selectedInsight.bitly + '" title="' + selectedInsight.google.title + '"><img src="http://www.accenture.com/Microsites/high-performance-it/PublishingImages/trans.png" class="sprites" alt="' + selectedInsight.google.alt + '" /></a>';
                    addthisSocialButtons += '</div>';

                targetSocialDiv.html( addthisSocialButtons );

            });

        };

        renderSocialButtonsForClass('.social.hidden-xs');
        renderSocialButtonsForClass('.social.visible-xs');

        addthis.toolbox('.addthis_toolbox');
        
    }

    function initDelvePlayer() {

		window.delvePlayerCallback = function delvePlayerCallback(playerId, eventName, data) {
		    if ( playerId ) {
		        var id = playerId;
		    } 
            else {
		        var id = "limelight_player_239897";
		    }
		    if ( eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0) ) {
		        DelvePlayer.registerPlayer(id);
		    }

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
/* ANALYTICS DISABLED
	    if (data.isPlaying) {
	        var videoTitle = DelvePlayer.doGetCurrentMedia().title;
	        if (onProduction()) {
                CleanUpLtVars();
                FlashLinkAnalysis($(this).attr('href'), videoTitle, "linkanalysis");
			}
	    }
*/
	}

	function doonPlayheadUpdate(data) {

	    var currPos = data.positionInMilliseconds;
	    
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

        }
	    
	    if (hpit.config.currChap != hpit.config.activeChap) {
            hpit.config.activeChap = hpit.config.currChap;	        
	        $('#ll-overlay .chapters .topRow a')
	        .removeClass('active')
	        .eq(hpit.config.activeChap - 1)
	        .addClass('active');
	        
	        $('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[hpit.config.activeChap].title).fadeIn(500).delay(4000).fadeOut(500);
	    } 

	}

	function doOnMediaComplete(data) {
        trackDelvePlayer("complete", "limelight_player_239897", data.title);
        resetVideoStates();
	}

	function resetVideoStates() {
	    $('#ll-overlay .chapters .topRow a').removeClass('active');
	    hpit.config.activeChap = 0;
	    hpit.config.currChap = 0;
	}
	
	function trackSegmentDelvePlayer(milestone, playerId, _timePositionSeconds) {
/* ANALYTICS DISABLED
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
*/
	}

    function playVideoInit() {
        $('.hero .playVid').on('click', function(e) {
            e.preventDefault();
            
            $('.the-video.active').each(function(index) {
                $(this).find('.vidWrapper').remove().end().removeClass('active');
            });
            
            if (!onMobile() && !onIpad() && !isIE8) {
                if ($('#hero video').length) {
                    $("#hero video")[0].pause();
                } 
            }
            $('html').addClass('noScroll');
            $('#ll-overlay').fadeIn(500, function() {
                var vidContent = '<object type="application/x-shockwave-flash" id="limelight_player_239897" name="limelight_player_239897" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//assets.delvenetworks.com/player/loader.swf">';
                vidContent += '<param name="movie" value="//assets.delvenetworks.com/player/loader.swf"/>';
                vidContent += '<param name="wmode" value="transparent"/>';
                vidContent += '<param name="allowScriptAccess" value="always"/>';
                vidContent += '<param name="allowFullScreen" value="true"/>';
                vidContent += '<param name="flashVars" value="playerForm=HoverPlayer&amp;mediaId=e86824f76d844d0ea0f46cd3df780c3f&amp;autoplay=true"/>';
                vidContent += '</object>';
                
                $('#ll-overlay #ll-player').html(vidContent);
                LimelightPlayerUtil.initEmbed('limelight_player_239897');
            });
        });

        // close button
        $('.closeVid').on('click', function(e) {
            e.preventDefault();
            
            try {
                DelvePlayer.doPause();
            } 
            catch (err) {

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
                    } 
                }
            });
        });

        // video chapters
        $('.chapters a')
	        .on('click touchstart', function(e) {
	            e.preventDefault();
	            clearTimeout(chapterClicked);
	            hpit.config.justClicked = true;
	            var cNum = $(this).text();
	            var skipTo = hpit.config.chapters[cNum].position / 1000;
/* ANALYTICS DISABLED
	            if (onProduction()) {
                    CleanUpLtVars();
                    FlashLinkAnalysis($(this).attr('href'), "Video Chapter " + cNum, "linkanalysis");
				}
*/	            
	            try {
	                DelvePlayer.doSeekToSecond(skipTo);
	            } 
                catch (err) {

	            }
	            
	            chapterClicked = setTimeout(function() {
	                hpit.config.justClicked = false;
	            }, 4000);

	           })
	           .on('mouseenter touchstart', function(e) {
                    var thisNum = $(this).text();
                    $('#ll-overlay .chapters .contentRow').text(hpit.config.chapters[thisNum].title).show();
	           })
	           .on('mouseleave touchend', function(e) {
                    $('#ll-overlay .chapters .contentRow').hide().text('');
        });
        
        $('.the-video a').on('click', function(e) {
            e.preventDefault();
            
            $('.the-video.active').each(function(index) {
                $(this).find('.vidWrapper').remove().end().removeClass('active');
            });
            
            var target = $(this).parent();
            target.addClass('active');
            
            var insightID = $(this).attr('href').replace('#', '');
            var vidID = 'limelight_player_' + hpit.config.limelightVideos[insightID].uid;
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
        });
    }
    
    function updateSidemenu() {
        
        var scrH = parseInt(hpit.config.scrH);
        var availH = scrH - 62;
        var menuH = $('#sideMenu > ul').outerHeight();
        
        var $target = $('#sideMenu');
        $target.css({"height": hpit.config.scrH - 62});
    
        var $diff = menuH - availH;

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

    function toggleMenuInit() {

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
/* ANALYTICS DISABLED                    
                	if ( onProduction() ) {
                        CleanUpLtVars();
                        FlashLinkAnalysis(th.attr('href'), "menu-closed", "linkanalysis");
					}
*/
                }
            } 
            else {
                $target.animate({"right": "0px"}, "normal");
                $target.addClass("opened");
                if (th.attr("id") == "toggleMenu") {
/* ANALYTICS DISABLED
                	if ( onProduction() ) {
                        CleanUpLtVars();
                        FlashLinkAnalysis(th.attr('href'), "menu-opened", "linkanalysis");
					}
*/
                }
            }
        });
    }
    
    function injectStuff() {

        $('li.state').each(function(index) {
            $(this).on('click', function(e) {
                hpit.config.state = parseInt($(this).attr('data-insight-nav'));
            })
        });

		var initClick = true;
        $('.navbar-toggle').on('click', function(e) {
            e.preventDefault();

/* ANALYTICS DISABLED
            if ( onProduction() ) {

                CleanUpLtVars();

				if ( $(this).hasClass("navbar-toggle collapsed") ) {		
					FlashLinkAnalysis("mobile", "menu-toggle-on", "linkanalysis");
                }
				else if ( initClick ) {
					FlashLinkAnalysis("mobile", "menu-toggle-on", "linkanalysis");
					initClick = false;
				}
				else {
                    FlashLinkAnalysis("mobile", "menu-toggle-off", "linkanalysis");
                }
            }
*/
        });
        
        if ( !onMobile() && !onIpad() && !isIE8 ) {
            initVideo();
        }
    }
    
    function initVideo() {

        $('#hero .video-wrapper').html('<video id="theVideo" width="100%" height="auto" preload="auto" autoplay><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.mp4" type="video/mp4" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.ogg" type="video/ogg" /><source src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/0471_Accenture HPIT_100413_Loop_FinalRev_23sec.webm" type="video/webm" /><img src="http://www.accenture.com/microsites/high-performance-it/PublishingImages/video-still.jpg" /></video>');
        
        var video = document.getElementById('theVideo');
        if ( video.addEventListener ) {

            video.addEventListener('ended', function() {
                $('.video-wrapper').html('');
            });

        } 
        else if ( video.attachEvent ) {

            video.attachEvent('ended', function() {
                $('.video-wrapper').html('');
            });
            $('html').addClass('ie8');
            $('head').append('<link href="/Microsites/high-performance-it/Documents/css/ie8.css" rel="stylesheet" media="screen" />');

        } 
        else {

            video.addEventListener('ended', function() {
                $('.video-wrapper').html('');
            });

        }
    }
    
    function updateDimensions() {
        hpit.config.scrW = $(window).width();
        hpit.config.scrH = $(window).height();
    }
    
    function updateArrows(from) {

        $('#controls .arrows').removeClass('noClick');
        if ( hpit.config.state > 0 && hpit.config.state < $('.insight').length ) {
        
        } 
        else if ( hpit.config.state === $('.insight').length ) {

            $('.nxt').addClass('noClick');

        } 
        else {

            $('.prev').addClass('noClick');

        }
    }
       
    function omniTrackPageView(num) {
/* ANALYTICS DISABLED
        if ( onProduction() ) {
            CleanUpLtVars();
        }

		if ( num == "home" ) {
            var newPageName = 'acn:microsites:high-performance-it:home';
        }
        else {
            var newPageName = 'acn:microsites:high-performance-it:home:insight' + num;
        }

        if ( onProduction() ) {
            triggerOmniturePageView(newPageName, "event29,event20,event68");
        } 
        else {
            console.log("Omniture Page View: " + newPageName);
        }
*/
    }


    function omniTrack(obj) {
/* ANALYTICS DISABLED
		if ( onProduction() ) {
			try {
                CleanUpLtVars();
	            FlashLinkAnalysis(obj.eventLink, obj.eventName, obj.eventType);
	        } 
            catch (err) {
	        	//console.log('Tracking error: ', err);
	        }
		}
*/
    }
    
    function isTouchDevice() {
        return hpit.config.desktopORtouch == 'touch';
    }
    
    return {
        init: init
    }
}());

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

$(window).load(function() {
    hpit.core.init();
});
