(function(drcom) {
	drcom.ready(function($) {
		console.log("Add alert button!");
	
		// add button
		var el = $("<div class='alert'></div>").appendTo("#stage"),
			alert = el.drcom_alert({
				// alert time
				time: 60,

				// sound path
        		// sound: 'presentation/global/images/alert/bell-ringing.mp3'
			}).controller();

		alert.addAlertButton('alert-btn');
	});
})(drcom || {});