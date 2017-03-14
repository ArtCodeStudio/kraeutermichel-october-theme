/**
 * Jumplink Media Query monitor
 * autor: marc Wensauer marc@jumplink.me
 */

(function ($) {

	$.fn.jumplinkMediaqueryMonitor = function (options) {
		
		var self = this;
		
		var $monitor;
		
		var current = '';

		var $settings = $.extend({
            // These are the defaults.
			id:"monitor",
		    width: "149px",
		    height: "38px",
		    display: "block",
		    backgroundColor: "black",
		    position: "fixed",
		    top: "78px",
		    left: 0,
		    padding: "5px",
		    color: false,
			console: false,
			breakpoints: {
				xs: {
					value:'0',
					color:"red"
				},
				sm: {
					value:'544px',
					color:"orange"
				},
				md: {
					value:'768px',
					color:"yellow"
				},
				lg: {
					value:'992px',
					color:"green"
				},
				xl: {
					value:'1200px',
					color:"blue"
				}
			}
    	}, options );


		var check = function () {

			/* XS  */
			if ( window.matchMedia( "(max-width:"+$settings.breakpoints.sm.value+")" ).matches) {
				if ($settings.console && current !== 'XS') {
					console.log('XS ', '<',$settings.breakpoints.sm.value);
				}
				//$monitor.html('XS','<',$settings.breakpoints.sm.value );
				if ($settings.color) {
					setColor($settings.breakpoints.xs.color);
				}
				current = "XS";
			}

			/* SM  */
		  	if (window.matchMedia( "(min-width: "+$settings.breakpoints.sm.value+") and (max-width:  "+$settings.breakpoints.md.value+")" ).matches) {
				if ($settings.console && current !== 'SM') {
			  		console.log('SM ',$settings.breakpoints.sm.value ,' - ',$settings.breakpoints.md.value);
				}
			 	//$monitor.html('SM');
				if ($settings.color) {
			  		setColor($settings.breakpoints.sm.color);
				}
				current = "SM";
			} 

			/* MD  */
			if (window.matchMedia( "(min-width: "+$settings.breakpoints.md.value+") and (max-width:  "+$settings.breakpoints.lg.value+")" ).matches) {
				if ($settings.console && current !== 'MD') {
			  		console.log('MD ',$settings.breakpoints.md.value ,' - ',$settings.breakpoints.lg.value);
				}
				//$monitor.html('MD');
				if ($settings.color) {
			  		setColor($settings.breakpoints.md.color);
				}
				current = "MD";
			} 

			/* LG  */
			if (window.matchMedia( "(min-width: "+$settings.breakpoints.lg.value+") and (max-width:  "+$settings.breakpoints.xl.value+")" ).matches) {
				if ($settings.console && current !== 'LG') {
					console.log('LG ',$settings.breakpoints.lg.value ,' - ',$settings.breakpoints.xl.value);
				}
				//$monitor.html('LG');
				if ($settings.color) {
			  		setColor($settings.breakpoints.lg.color);
				}
				current = "LG";
			} 

			/*XL  */
			if (window.matchMedia( "(min-width: "+$settings.breakpoints.xl.value+")" ).matches) {
				if ($settings.console && current !== 'XL') {
					console.log('XL ',$settings.breakpoints.xl.value);
				}
				//$monitor.html('XL');
				if ($settings.color) {
			  		setColor($settings.breakpoints.xl.color);
				}
				current = "XL";
			} 
			
		}

		var setColor = function ( color ) {
			var _border = "2px solid " + color;
			$monitor.css( "border" , _border);
			$monitor.css("background-color", color );
		}

		var setStyle = function () {
			$monitor.css( "width" , "28px");
			$monitor.css( "opacity" , "0.6");
			$monitor.css( "padding" , "4px");
			$monitor.css( "padding" , "4px");
			$monitor.css( "text-align" , "center");
			$monitor.css( "z-index" , "9999999");
		}

		var addResizeListener = function () {
			$( window ).resize( function(e) {
				check();
			});
		}

		function init(){
			//$('body').append("<div id='"+$settings.id+"'></div>");
			//$monitor = $("#monitor");
			// setStyle();
			addResizeListener();
			check();
		}
		init();

		return this;
	}


}(jQuery));

$(document).ready( function() {

		var mon = $(this).jumplinkMediaqueryMonitor({
			console: true
		});
});