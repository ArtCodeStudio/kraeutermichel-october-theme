var cache = {
	lastElementClicked: null,
	
	$navbarMain: $('#navbar-main'),
	$sidebar: $("#sidebar"),
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

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var initSidebar = function() {
	/**
	 * @see http://dcdeiv.github.io/simpler-sidebar/
	 */
	$('#sidebar').show();
	$('#sidebar').simplerSidebar({
		opener: '.navbar-toggler',
		animation: {
			duration: 500,
			easing: 'easeOutQuint'
		},
		sidebar: {
			align: 'left',
			width: 320,
			closingLinks: 'a'
		},
		mask: {
			display: true
		}
	});
}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

/**
 * SLIDESHOW / Leistungen
 */
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var initSlideshow = function (selector) {
	var $slideshow = $(selector);
	if( !$slideshow.hasClass('slick-initialized') ) { // only init if slick is not already initialized
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
		});
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
	console.log('init home');
	initSlideshowHome("#slideshowHomeHTML");
	// if(! cache.homeInitialized ) { // just add ONE event listener
	// 	//slideshowHomeJavaSciptInit('#slideshowHomeHTML');
	// 	$(window).on('scrollstop', function () {
	// 		console.log('-----onscrollstop');
	// 		// changeNavbar(dataset);
	// 	});
	// 	cache.homeInitialized = true;
	// }
};


var initLeistungenKrauter = function (dataset) {
	
	initLeistungenSubnav();
	initSlideshow("#slideshowLeistungKrauterHTML");

	var initCarousel = function () {
		var $latestKrauterCarousel = $(".latest-krauter-carousel");
		// only init if slick is not already initialized
		if( !$latestKrauterCarousel.hasClass('slick-initialized') ) {
			console.log('init slideshow');
			$latestKrauterCarousel.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 2000,
				centerMode: false,
				centerPadding: '0',
				infinite: true,
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
	initCarousel();	
}
var initLeistungenVerwendung = function (dataset) { 
	initLeistungenSubnav();
	initSlideshow("#slideshowLeistungVerwendungHTML");
}
var initLeistungenGrabpflege = function (dataset) { 
	initLeistungenSubnav();
	initSlideshow("#slideshowLeistungGrabpflegeHTML");
}


var initEvents = function (dataset) { 
	//$('.navbar-nav .events a').addClass( '_active' );
	$('#events .nav-link').addClass( '_white' );
}


var initKräutervonabisz = function (dataset) { 
	$('.navbar-nav .kräutervonabisz a').addClass( '_active' );
	var krauterListInit = function (selector) {
		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: 300,
			isFitWidth: true,
			gutter:30
		});
	}	
	krauterListInit();
}

var initKrautpage = function (dataset) { 
	$('.navbar-nav .kräutervonabisz a').addClass( '_active' );
}

var initBlog = function (dataset) { 
	$('.navbar-nav .blog a').addClass( '_active' );
}

var initBlogPost = function (dataset) { 
	$('.navbar-nav .blog a').addClass( '_active' );
}

var initKontakt = function (dataset) { 
	$('.navbar-nav .kontakt a').addClass( '_active' );
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
	'kräutervonabisz': initKräutervonabisz,
	'krautpage': initKrautpage,
	'blog': initBlog,
	'blogpost': initBlogPost,
	'kontakt': initKontakt,
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
	  .all([this.newContainerLoading, this.fadeOut()])
	  .then(this.fadeIn.bind(this))
	  .then(	$('html,body').animate({ scrollTop: 0 }, 'slow') );
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
  Barba.Prefetch.init();
  initTemplates();
  Barba.Pjax.start();
};





$(document).ready(function(){
	initBarba();
	// console.log('app init');
});