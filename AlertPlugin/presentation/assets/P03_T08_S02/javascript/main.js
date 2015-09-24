(function () {
    $('#slider').on('ready', '.P03_T08_S02', function (e, el) {
        var slide = $('#container', el);
	startTracking("aHUS_registry");//tracking screen
	
    
	$("#switchtransition",slide).drcom_flipflap2({
        scale: {
            from: 0.7,
            to: 1
        },
        current: -1,
        duration: 1000,
        click: function () {
            return false;
        },
        onBeforeSwitch: function () {
        }
    });
    $("#switchtransition",slide).controller().current = 0;

});

})();