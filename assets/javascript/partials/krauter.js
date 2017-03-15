$(document).ready( function() {
    console.log('Krauter init');

		/**
		 * INIT Masonry
		 * @param {*} selector 
		 */
		var krauterListInit = function (selector) {

			$('.grid').masonry({
				itemSelector: '.grid-item',
				columnWidth: 300,
				isFitWidth: true,
				gutter:30
			});
			
		}	
        //krauterListInit();
			
})