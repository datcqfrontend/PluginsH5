(function () {
    $('#slider').on('ready', '.P03_T02_S01', function (e, el) {
        var slide = $('#container', el);
		startTracking("Catastrophic_disease");//tracking screen
	setTimeout(function(){  
		$(".chart_red",slide).show('blind',{direction : 'horizon'},1500,function(){});
	},800);
	
    
	
	showPopupPlus(function(){
		startTracking("aHUS_patients");//tracking PU
	},function(){
		endTracking("aHUS_patients");
	});
	
	$('.btn_methodology',slide).bind('tapone',function(){
		startTracking("Catastrophic_disease_SD");//tracking methodology
		$('.btn_methodology',slide).hide();
		$('.bg_methodology',slide).show();	
	});
	
	$('.bg_methodology .close',slide).bind('tapone',function(){
		endTracking("Catastrophic_disease_SD");
		$('.bg_methodology',slide).hide();	
		$('.btn_methodology',slide).show();
	});

});

})();
