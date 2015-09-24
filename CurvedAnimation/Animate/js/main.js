(function ($) {
	console.log("Ready");

	function animate() {
		var path = {
			start : {
				x : 50,
				y : 50,
				angle : -90,
				length : 0.2
			},
			end : {
				x : 50,
				y : 540,
				angle : 90,
				length : 0.2
			}
		};

		$('.animatingDiv').animate({
			path : new $.path.bezier(path)
		},2000);
		
		/*$('.animatingDiv').animate({
			path : new $.path.bezier(path)
		},2000,animate);*/
	}

	animate();
})(jQuery);
