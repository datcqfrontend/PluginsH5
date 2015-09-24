(function (drcom) {
    drcom.ready(function ($) {
		drcom.related=$("<div id='related'></div>").appendTo("#stage").drcom_related({
			beforeShow:function(){
				drcom.button.active("related");
			},
			beforeHide:function(){
				drcom.button.deactive("related");
			}
		}).controller(Drcom.Related);
		//add related button
		drcom.button.add("related", function(actived,event) {
			drcom.related.stop();
			if (actived == true)
			{
				drcom.related.hide();
			}
			else
			{
				drcom.related.show();
			}
			event.stopImmediatePropagation();
		});
		$('#slider').on('ready', '.slide', function (ev, el)
		{
			drcom.related.element.hide().empty();
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