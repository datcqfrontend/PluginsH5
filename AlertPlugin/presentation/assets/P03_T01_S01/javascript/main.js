(function () {
    $('#slider').on('ready', '.P03_T01_S01', function (e, el) {
        var slide = $('#container', el);
	startTracking("Homepage");//tracking screen
	
    
	
	$(".btn_hand",slide).bind('tapone',function () {
       drcom.navigation.goToAsset('s2');
    });
	
    if (drcom.helpers.storage.get('P03_T01_S01:isAnimated') == 'true') {        		
		$('.dash_white_circle, .mask',slide).css('display', 'block');
        $('.vessel_bg',slide).show().css({transform:"scale(1) translate(59px,62px)"});
        $('.text_main',slide).css('visibility', 'visible');
        $('.dash_white_circle',slide).addClass('animation');
		$('.typer, .subtext, .shadow',slide).show();
    } else {
        drcom.helpers.storage.set('P03_T01_S01:isAnimated', 'true');
		 
        setTimeout(function () {
            $('.vessel_bg',slide).show().animate({
				transform:"scale(1) translate(59px,62px)"
			}, 2000, function () {
                $('.mask',slide).css('display', 'block');
            });
        }, 500);
		
        setTimeout(function () {
            $('.dash_white_circle',slide).show();
            $('.text_main',slide).css('visibility', 'visible');
        }, 2700);

        setTimeout(function () {
            $('.dash_white_circle',slide).addClass('animation');
        }, 3700);
		setTimeout(function(){
			var type=new Drcom.Typer( $(".typer"));
			type.run(function(){
				$('.shadow',slide).show();
				$('.subtext',slide).fadeIn(800);
			});		
		},4000);	
    }

    
	
	
});


$.Class("Drcom.Typer",{},{
	init:function(elements)
	{
		this.elements=elements;
	},
	run:function(complete)
	{
		var instance=this;
		function runLine(i)
		{
			instance.typeLine(i,function(){
				if(i<instance.elements.length-1)
					runLine(i+1);
				else
				{
					complete();
				}
					
			});
		}
		runLine(0);
	},
	typeLine:function(index,complete)
	{
		var element=$(this.elements[index]);
		var line=element.text().replaceAll("  "," ");
		console.log(line);
		element.empty().show();
		function type(i)
		{
			var character=line[i];
			var html=element.text()+character;
			element.text(html);
			setTimeout(function(){
				if(i<line.length-1)
					type(i+1);
				else
					complete();
			}, 50);
		}
		type(0);
	}
});

String.prototype.replaceAll = function(stringToFind,stringToReplace)
{
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while(index != -1)
    {
        temp = temp.replace(stringToFind,stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp+"";
};



})();
