(function(drcom) {
	drcom.ready(function($) {
		// add button
		drcom.button.add("act", function(actived) {});
		
		drcom.button.add("spc", function(actived) {
			drcom.navigation.goToAsset("s51");
		});
		
		$('#slider').on('ready', '.slide', function(ev, el) {
			$(".buttons .button.active").removeClass("active");
		});
		
		drcom.button.enable("spc");
		drcom.button.enable("related");

	});
})(drcom || {});