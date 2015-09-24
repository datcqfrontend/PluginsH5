steal("./css/main.css");//include pdf css
function showPdf(url)//show pdf with url
{
	$(".siCustomeCloseButton").hide();
	var el=$("."+drcom.navigation.currentAsset().thumb);
	if(drcom.navigation.isSlideSorter()==true)//for slide sorter
		el=$("."+drcom.navigation.currentAsset().name);
	drcom.navigation.disableSwipe();
	var isHidden=drcom.navigation.controllers.menu.isHidden;
	if(isHidden==false)
	{
		drcom.helpers.storage.set("isForcedHideMenu",1);
		drcom.navigation.hideMenu();
	}
	$("#pdf_back",el).bind("click",function()
	{
		$(".siCustomeCloseButton").show();
		if(drcom.navigation.isSlideSorter()==true)
		{
			drcom.player.connector.removeWebview("pdfView");
			drcom.navigation.prev();
		}
		else
		{
			drcom.player.connector.removeWebview("pdfView");
			var prevAsset=drcom.helpers.storage.get("prevAsset");
			if(prevAsset)
				drcom.navigation.goToAsset(prevAsset);
		}
	});
	$("#pdf_top",el).bind("click",function()
	{
		drcom.player.connector.showWebview('pdfView',url);	
	});
	drcom.player.connector.createWebview('pdfView', 0, 0, 985, 768);
	drcom.player.connector.showWebview('pdfView',url);	
	//close, switch presentation
	$([drcom]).off('presentation:switch presentation:close').on('presentation:switch presentation:close',function()
	{
		drcom.player.connector.removeWebview('pdfView');
	});
	
	//add next button
	if(drcom.navigation.isSlideSorter()==true)
	{
		$("#pdf_next",el).show().bind("click",function(){
			drcom.player.connector.removeWebview("pdfView");
			$(".siCustomeCloseButton").show();
			drcom.navigation.next();
		});
	}

}
