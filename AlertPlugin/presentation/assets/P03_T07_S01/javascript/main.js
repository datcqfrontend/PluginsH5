(function () {
    $('#slider').on('ready', '.P03_T07_S01', function (e, el) {
        var slide = $('#container', el);
	
	startTracking("iceberg");//tracking screeen
	
	
	showPopupPlus(function(){
		startTracking("Diagnosis_PU");	//tracking PU	
	},function(){
		endTracking("Diagnosis_PU");
	});
	
	var stage = new Kinetic.Stage({
        container: "canvas",
        width: 1024,
        height: 768
      });
      var layer = new Kinetic.Layer();
      var image=null;
      var imageObj = new Image();
      imageObj.onload = function() {
         image = new Kinetic.Image({
			x: -955,
			y: -57,
			width: 2400,
			height: 1400,
			scale:{
				x:1.2,
				y:1.2
			},
			image: imageObj
        });
        layer.add(image);
        stage.add(layer);
      };
      imageObj.src = "presentation/assets/P03_T07_S01/images/main.jpg";
	  
     
     
     var counter=0;
  	$("#main_container",slide).bind('tapone',function()
	{
  		if(counter==0)
  		{
			image.transitionTo({
  	  			x: -1310,
				y: -210,
				scale:{
					x:1.5,
					y:1.5
				},
  	  			duration: 1,
  	            easing: "ease-in-out"
  	  		});
  			$(".top_white_text",slide).hide();
  			$(".above_water_area",slide).fadeIn(800);
  		}
  		if(counter==1)
  		{
  			$(".above_water_area",slide).hide();
			$(".btn_plus",slide).animate({top:440},1000);
  	  		image.transitionTo({
  	  			x: -10,
				y: 0,
				scale: {
					x: 0.45,
					y: 0.45
				},
  	  			duration: 1,
  	            easing: "ease-in-out"
  	  		});
			setTimeout(function(){
				$(".above_water_area",slide).show();
				$('.above_water_area .text_row', slide).css("font-size",18);
				$('.above_text_1',slide).removeClass('above_text_1',slide).addClass('above_text_1a');
				$('.above_text_2',slide).removeClass('above_text_2',slide).addClass('above_text_2a');
				$('.above_text_3',slide).removeClass('above_text_3',slide).addClass('above_text_3a');
				$('.above_text_4',slide).removeClass('above_text_4',slide).addClass('above_text_4a');
				$('.above_text_5',slide).removeClass('above_text_5',slide).addClass('above_text_5a');
				$('.above_text_6',slide).removeClass('above_text_6',slide).addClass('above_text_6a');
				$('.above_text_7',slide).removeClass('above_text_7',slide).addClass('above_text_7a');
				$('.above_text_8',slide).removeClass('above_text_8',slide).addClass('above_text_8a');
				$('.above_text_9',slide).removeClass('above_text_9',slide).addClass('above_text_9a');
				$('.above_text_10',slide).removeClass('above_text_10',slide).addClass('above_text_10a');
				$('.above_text_11',slide).removeClass('above_text_11',slide).addClass('above_text_11a');
				$('.below_water_area, .above_water_area .text_area, .top_box_text',slide).show();	
			},1000);
			
  		}
  		
  		counter++;
	});
     
	$('.below_water_area',slide).bind('tapone',function(){
		$('.below_text_area, .bot_box_text',slide).show();
	});  
    
	  
});


})();