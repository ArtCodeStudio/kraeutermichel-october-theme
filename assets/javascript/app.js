$(document).ready(function(){

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
	console.log('sidebar:, ', $('#sidebar'))



});