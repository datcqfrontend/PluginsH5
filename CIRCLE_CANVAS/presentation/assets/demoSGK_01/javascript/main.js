(function () {
    $('#slider').on('ready', '.demoSGK_01', function (e, el) {
        var slide = $('#container',el);

        
		drcom.navigation.disableSwipe();
		$("#circle",slide).drcom_circle({
			"src":"presentation/assets/demoSGK_01/images/circle_active.png",
			change:function(value){
				
				/*if(this.block==true && value<=50)
				{
					$("#circle",slide).controller().change(100);
					return false;
				}
				if(this.block2==true && value>=50)
				{
					$("#circle",slide).controller().change(0)
					return false;
				}
				this.block=false;
				this.block2=false;
				if(value>=80)
				{
					this.block=true;
				}
				if(value<=20)
				{
					this.block2=true;
				}*/
				
				//$(".percent").html(Math.round(value));
				
				
			},
			release:function(){
				//this.block=false;
			},
			loadCompleted:function()
			{	
				//$("#circle",slide).controller().scrollTo(15);
			}
		});


      

    });
})();



