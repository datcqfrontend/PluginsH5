(function () {
    $('#slider').on('ready', '.P03_T06_S01', function (e, el) {
        var slide = $('#container', el);
	$('.btn_methodology',slide).bind('tapone',function(){
		startTracking("PE/PI_SD");//tracking methodology
		$('.btn_methodology',slide).hide();
		$('.bg_methodology',slide).show();	
	});
	
	$('.bg_methodology .close',slide).bind('tapone',function(){
		endTracking("PE/PI_SD");
		$('.bg_methodology',slide).hide();	
		$('.btn_methodology',slide).show();
	});	
	
		
	
	startTracking("PE/PI");//tracking screen
	setTimeout(function()
	{ 	
		$(".chart",slide).show('slide',{
			direction : 'down'
		},1200,function(){ 
			$(".txt1, .txt2, .txt3, .txt4, .txt5, .txt6,",slide).fadeIn(500);
		});
		
		$(".box",slide).show('drop',{
			direction : 'down'
		},500,function(){ 
			$(".txt_box,",slide).fadeIn(500);
		});
	
	},800);

	$(".btn_lib",slide).bind('tapone',function(){
		drcom.navigator.gotoSlide(17);	
	});
	
	showPopupPlus(function(){
		startTracking("PE/PI_PU");	//tracking PU	
	},function(){
		endTracking("PE/PI_PU");
	});

    });
})();
