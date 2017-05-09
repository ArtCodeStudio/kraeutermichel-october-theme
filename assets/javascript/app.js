var cache = {
	lastElementClicked: null,
	
	$navbarMain: $('#navbar-main'),
	
	$sidebar: $("#sidebar"),
	sidebarInitialized:false,

	$body: $('body'),
	homeInitialized: false,

	leistungenKrauterInitialized: false,
	leistungenVerwendungInitialized: false,
	leistungenGrabpflegeInitialized: false,
	
	eventsInitialized:false,
	krauterLexiconInitialized:false,
	blogInitialized:false,
	kontaktInitialized:false,

};

var currentNamespace = null;



var prevButton = `
	<button type="button" class="slick-prev">
		<svg version="1.1" id="left-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 29.6 58.1" style="enable-background:new 0 0 29.6 58.1;" xml:space="preserve">
			<g>
			<path class="fill-color" d="M28.9,0c0.1,0,0.3,0,0.4,0.1c0.2,0.2,0.2,0.5,0,0.7L1.4,28.7l28.1,28.6c0.2,0.2,0.2,0.5,0,0.7s-0.5,0.2-0.7,0L0,28.7
			L28.5,0.1C28.6,0,28.8,0,28.9,0z"/>
			</g>
		</svg>
	</button>
`;
var nextButton = `
	<button type="button" class="slick-next">
		<svg version="1.1" id="right-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 29.6 58.1" style="enable-background:new 0 0 29.6 58.1;" xml:space="preserve">
			<g>
				<path class="fill-color" d="M0.7,58.1c-0.1,0-0.3,0-0.4-0.1c-0.2-0.2-0.2-0.5,0-0.7l27.8-27.8L0.1,0.9c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l28.8,29.3 L1.1,58C1,58.1,0.9,58.1,0.7,58.1z"/>
			</g>
		</svg>
	</button>
`;


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var changeNavbar = function () {
    var windowScrollTop = $(window).scrollTop();
    var viewportHeight = $( window ).height();
    var mainNavbarHeight = 54; //$('#main-navbar').height();
    var actionPosition = viewportHeight - mainNavbarHeight;
    // if(windowScrollTop >= actionPosition ) {
    //     $('#main-navbar, #sidebar').removeClass('navbar-big');
    //     $('#main-navbar').removeClass('bg-white-transparent');
    //     $('#main-navbar').addClass('bg-white');
    //     console.log('bigger')
    // } else {
    //     $('#main-navbar, #sidebar').addClass('navbar-big');
    //     $('#main-navbar').addClass('bg-white-transparent');
    //     $('#main-navbar, #sidebar').removeClass('bg-white');
	// 	 console.log('smaler')
    // }

    if (windowScrollTop === 0) {
        $('#main-navbar').removeClass('bg-white-transparent');
    }else{
         $('#main-navbar').addClass('bg-white-transparent');
    }
     console.log('actionPosition',actionPosition);
     console.log('windowScrollTop',windowScrollTop);
}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var initSidebar = function() {

	if (cache.sidebarInitialized == false ) {
		/**
		 * @see http://dcdeiv.github.io/simpler-sidebar/
		 */
		cache.$sidebar.show();
		cache.$sidebar.simplerSidebar({
			opener: '.navbar-toggler',
			animation: {
				duration: 500,
				easing: 'easeOutQuint'
			},
			sidebar: {
				align: 'right',
				width: 320,
				closingLinks: 'a'
			},
			mask: {
				display: true
			}
		});
		cache.sidebarInitialized = true;
	}
}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

/**
 * SLIDESHOW / Leistungen
 */
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var initSlideshow = function (selector) {
	var $slideshow = $(selector);
	if( !$slideshow.hasClass('slick-initialized') ) { // only init if slick is not already initialized
		console.log('init slideshow ');
		$slideshow.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			centerMode: true,
			centerPadding: '0',
			infinite: true,
			dots: true,
			arrows: false,
		});
	}
}
var initSlideshowHome = function (selector) {

	var $slideshow = $(selector);
	if( !$slideshow.hasClass('slick-initialized') ) { // only init if slick is not already initialized
		console.log('init slideshow home');		
		$slideshow.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			centerMode: true,
			centerPadding: '0',
			infinite: true,
			dots: false,
			arrows: true,
			prevArrow: prevButton,
    		nextArrow: nextButton,
		}).on('afterChange', function(event, slick, currentSlide, nextSlide){
			var tmpBodyClass = $(slick.$slides.get(currentSlide)).data('section');
			if (tmpBodyClass !== 'blog'){
				tmpBodyClass = 'leistungen'+tmpBodyClass;
			}
			//console.log(tmpBodyClass);
			cache.$body.removeClass();
			cache.$body.addClass(tmpBodyClass);
		})
	}
}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var initLeistungenSubnav = function () {

	$('.leistungen-subnav nav a').removeClass();
	
	var currentActiveSection = $('body').attr('id');
	console.log('currentActiveSection', '#_'+currentActiveSection);

	$('#_'+currentActiveSection).addClass('_active');

	var $elem = $('.leistungen-subnav nav a');
	var $mainNav = $('.navbar-nav li a');

	// main navigation active,  TODO : move in its own function
	if ( currentActiveSection === 'leistungenkrauter' || 
		 currentActiveSection === 'leistungenverwendung' ||
		 currentActiveSection === 'leistungengrabpflege'  ) 
	{
		$('.navbar-nav .leistungen a').addClass( '_active' ); 
	}

	if ( !cache.leistungInitialized ) {
		$(document).on('click', '.leistungen-subnav nav a' , function(e) {
			//var $target = $(e.target);
			//$elem.removeClass();
			// $target.addClass( $target.data('section') );
			//$target.addClass('_active');
		});
		cache.leistungInitialized= true;
	}

}

/**
 * INIT TEMPLATE FUNCTIONS
 */
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var initHome = function (dataset) {
	initSlideshowHome("#slideshowHomeHTML");
};

var initLeistungenKrauter = function (dataset) {
	
	initLeistungenSubnav();

	var initCarousel = function () {
		var $latestKrauterCarousel = $(".latest-krauter-carousel");
		// only init if slick is not already initialized
		if( !$latestKrauterCarousel.hasClass('slick-initialized') ) {
			console.log('init carousel');
			$latestKrauterCarousel.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 2000,
				centerMode: false,
				centerPadding: '0',
				infinite: true,
				prevArrow: prevButton,
    			nextArrow: nextButton,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					},
					{
						breakpoint: 992,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
					},
					{
						breakpoint: 576,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
					}
				]
			});
		}
	};

	initSlideshow("#slideshowLeistungKrauterHTML");
	initCarousel();	
	$('#sidebar-wrapper .list-group .leistungen').addClass( '_active' );	
}
var initLeistungenVerwendung = function (dataset) { 
	initLeistungenSubnav();
	initSlideshow("#slideshowLeistungVerwendungHTML");
	$('#sidebar-wrapper .list-group .leistungen').addClass( '_active' );		
}
var initLeistungenGrabpflege = function (dataset) { 
	initLeistungenSubnav();
	initSlideshow("#slideshowLeistungGrabpflegeHTML");
	$('#sidebar-wrapper .list-group .leistungen').addClass( '_active' );	
}

var initEvents = function (dataset) { 
	$('.navbar-nav .events a').addClass( '_active' );
	$('#events .nav-link').addClass( '_white' );
	$('#sidebar-wrapper .list-group .events').addClass( '_active' );
}

var initKräuterABC = function (dataset) { 
	$('.navbar-nav .kräuterabc a').addClass( '_active' );
	$('#sidebar-wrapper .list-group .kräuterabc').addClass( '_active' );
	// if (!cache.krauterLexiconInitialized) {
		var krauterListInit = function (selector) {
			$('.grid').masonry({
				itemSelector: '.grid-item',
				columnWidth: 300,
				isFitWidth: true,
				gutter:30
			});
		}	
		krauterListInit();
		// cache.krauterLexiconInitialized = true;
	// }
}

var initKrautpage = function (dataset) { 
	$('.navbar-nav .kräuterabc a').addClass( '_active' );
	$('#sidebar-wrapper .list-group .blog').addClass( '_active' );
}

var initBlog = function (dataset) { 
	$('.navbar-nav .blog a').addClass( '_active' );
	$('#sidebar-wrapper .list-group .blog').addClass( '_active' );
}

var initBlogPost = function (dataset) { 
	$('.navbar-nav .blog a').addClass( '_active' );
	$('#sidebar-wrapper .list-group .blog').addClass( '_active' );
}

var initKontakt = function (dataset) { 
	$('.navbar-nav .kontakt a').addClass( '_active' );
	$('#sidebar-wrapper .list-group .kontakt').addClass( '_active' );

	$(document).on('submit','.contactForm', function(e) {
		e.preventDefault();
		var dataString = $('.contactForm').serialize();

        jQuery.ajax({
            url: "/send-mail",
            data: dataString,
            type: "POST",
            success: function(data) {
				console.log('result',data);
            },
            error: function (e) {
				console.log(e);
			}
        });
    
    
	});
}

var initImpressum = function (dataset) { 
	// $('.navbar-nav .kontakt a').addClass( '_active' );
	// $('#sidebar-wrapper .list-group .kontakt').addClass( '_active' );



}


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

/**
 * Run JavaScript for for special template
 * E.g. templates/product.liquid
 */
var initTemplate = {
	'home': initHome,
	'leistungenkrauter': initLeistungenKrauter,
	'leistungenverwendung': initLeistungenVerwendung,
	'leistungengrabpflege': initLeistungenGrabpflege,
	'events': initEvents,
	'kräuterabc': initKräuterABC,
	'krautpage': initKrautpage,
	'blog': initBlog,
	'blogpost': initBlogPost,
	'kontakt': initKontakt,
	'impressum': initImpressum
};


/**
 * Init Javascripts insite of barba.js
 */
var initTemplates = function () {

  Barba.Dispatcher.on('linkClicked', function (el) {
	cache.lastElementClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {

	currentNamespace = currentStatus.namespace;

	//console.log("currentStatus", currentStatus.namespace);
	$('.navbar-nav a').removeClass( '_active' );
	$('#sidebar-wrapper a').removeClass( '_active' );

	//$('#events .nav-link').removeClass( 'color', 'white' );
		
	if ( currentStatus.namespace.substring(0, 10) === 'leistungen' ) {
		var temp = currentStatus.namespace.replace("/", "-");
		cache.$body.attr( 'id', temp );

	}else{
		cache.$body.attr( 'id', currentNamespace );
	}
	
	if(typeof(initTemplate[currentStatus.namespace]) === 'function' ) {
	  initTemplate[currentStatus.namespace](container.dataset);
	} else {
	  console.error("Template not defined: "+currentStatus.namespace);
	}

  });
};



/**
 * Custom Transition
 */
var FadeTransition = Barba.BaseTransition.extend({
  start: function () {
	/**
	 * This function is automatically called as soon the Transition starts
	 * this.newContainerLoading is a Promise for the loading of the new container
	 * (Barba.js also comes with an handy Promise polyfill!)
	 */

	// As soon the loading is finished and the old page is faded out, let's fade the new page
	Promise
	  .all( [this.newContainerLoading, this.fadeOut()] )
	  .then( this.fadeIn.bind(this) )
	  .then( $('html,body').animate({ scrollTop: 0 }, 'slow') );
  },

  fadeOut: function () {
	/**
	 * this.oldContainer is the HTMLElement of the old Container
	 */

	return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function () {
	/**
	 * this.newContainer is the HTMLElement of the new Container
	 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	 * Please note, newContainer is available just after newContainerLoading is resolved!
	 */
	var _this = this;
	var $el = $(this.newContainer);

	$(this.oldContainer).hide();

	$el.css({
	  visibility : 'visible',
	  opacity : 0
	});

	$el.animate({ opacity: 1 }, 400, function () {
	  /**
	   * Do not forget to call .done() as soon your transition is finished!
	   * .done() will automatically remove from the DOM the old Container
	   */

	  _this.done();
	});
  }
});


/**
 * Barba Constructor
 */
var initBarba = function () {
  /**
   * Next step, you have to tell Barba to use the new Transition
   */
  Barba.Pjax.getTransition = function () {
	/**
	 * Here you can use your own logic!
	 * For example you can use different Transition based on the current page or link...
	 */
	return FadeTransition;
  };
  // activate precache
  //Barba.Prefetch.init();
  initTemplates();
  Barba.Pjax.start();
};


$(document).ready(function() {
	initSidebar();
	initBarba();
	changeNavbar();
	$(window).on('resize scrollstop', function() {
		changeNavbar();
	});
	// console.log('app init');
});