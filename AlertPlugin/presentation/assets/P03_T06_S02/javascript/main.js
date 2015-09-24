(function () {
    $('#slider').on('ready', '.P03_T06_S02', function (e, el) {
        var slide = $('#container', el);
	startTracking("Kidney_transplant");//tracking screen
	setTimeout(function(){  
		$(".chart",slide).delay(100).show('slide',{
        direction : 'down'
    },1200,function(){ 
            $(".txt4",slide).fadeIn(500);
        });
	},800);
	
	
    $(".btn_lib",slide).bind('tapone',function () {
        drcom.navigator.gotoSlide(17);
    });
	
	showPopupPlus(function(){
		startTracking("Kidney_transplant_PU");//tracking PU
	},function(){
		endTracking("Kidney_transplant_PU");
	});
	
	$('.btn_methodology',slide).bind('tapone',function(){
		startTracking("Kidney_transplant_SD");//tracking methodology
		$('.btn_methodology',slide).hide();
		$('.bg_methodology',slide).show();	
	});
	
	$('.bg_methodology .close',slide).bind('tapone',function(){
		endTracking("Kidney_transplant_SD");
		$('.bg_methodology',slide).hide();	
		$('.btn_methodology',slide).show();
	});
	});
})();