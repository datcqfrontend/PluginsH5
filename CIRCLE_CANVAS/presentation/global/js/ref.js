(function (drcom) {
    drcom.ready(function ($) {
    	
    	//add ref button
    	drcom.button.add("ref", function(actived) {
    		console.log("aaaaaaaaaa:",actived)
			drcom.ref.container.stop();
			if (actived == true)
			{
				drcom.ref.hide();
			}
			else
			{
				drcom.ref.show();
			}	
		});
    	//release memory
		$('#slider').on('reset', '.slide', function (ev, el)
		{
			if(el.controller(Drcom.Ref)!=undefined)
				el.controller(Drcom.Ref).destroy();
		});
    	$('#slider').on('ready', '.slide', function (ev, el)
		{
    		var refs=["demoSGK_02","demoSGK_03","demoSGK_04","demoSGK_05","demoSGK_06","demoSGK_07","demoSGK_08","demoSGK_09","demoSGK_10","demoSGK_13","demoSGK_14"];//ref list
    		var currentAssetId=drcom.navigation.currentAsset().thumb;
    		if(drcom.navigation.isSlideSorter()==true)//for slide sorter
    			currentAssetId=drcom.navigation.currentAsset().name;
    		var exist=_.indexOf(refs,currentAssetId);
    		
    		drcom.button.deactive("ref");
    		if(exist==-1)
    		{
    			
    			drcom.button.disable("ref");
    		}
    		else
    			drcom.button.enable("ref");
    		
    		drcom.ref=el.drcom_ref({
    			close:".right",
    			effect:
    			{
    				name:"slide",
    				duration:500,
    				options:{
    					direction:"down"
    				}
    			},
    			beforeHide:function()
    			{
    				drcom.button.deactive("ref");
    			},
    			beforeShow:function()
    			{
    				drcom.button.active("ref");

    			}
    		}).controller(Drcom.Ref);

	    });
    });
})(drcom || {});

