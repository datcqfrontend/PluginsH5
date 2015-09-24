(function () {
    $('#slider').on('ready', '.P03_T05_S03', function (e, el) {
        var slide = $('#container', el);
	
	startTracking("Mutation_identification");//tracking screen
	
	
	
	setTimeout(function()
	{ 	
		$("#chart",slide).show('slide',{
			direction : 'down'
		},1200,function(){ 
			$(".txt1, .txt2, .txt3, .txt4, .txt5, .txt6",slide).fadeIn(500);
		})
		
		
	
	},800);
});

})();