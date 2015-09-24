(function (drcom) {
    drcom.ready(function ($) {
    	
    	
		
		//add related button
		drcom.button.add("related", function(actived,event) {
			//stop event
			event.stopImmediatePropagation();
			drcom.related.stop();
			if (actived == true)
			{
				drcom.related.hide();
			}
			else
			{
				drcom.related.show();
			}
			
		});
		//release memory
		$('#slider').on('reset', '.slide', function (ev, el)
		{
			var related=$("#related",el);
			if(related.controller(Drcom.Related)!=undefined)
				related.controller(Drcom.Related).destroy();
			
		});
		$('#slider').on('ready', '.slide', function (ev, el)
		{
			drcom.related=$("<div id='related'></div>").appendTo(el).drcom_related({
				beforeShow:function(){
					drcom.button.active("related");
				},
				beforeHide:function(){
					drcom.button.deactive("related");
				}
    		}).controller(Drcom.Related);
			
			var related=drcom.navigation.currentAsset().related;
			drcom.button.deactive("related");
			if(related.length==0)
			{
				drcom.button.disable("related");
			}
			else
			{
				drcom.button.enable("related");
				drcom.related.load();
			}
				
		});
    });
})(drcom || {});