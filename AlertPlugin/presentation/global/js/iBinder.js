(function(drcom) {
	drcom.ready(function($) {
		function showPdf(name) {
			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, true);
			var link = $("<a>" + name + "</a>").attr("href","ibinder2://action=push&filename=" + name + ".pdf")[0];
			link.dispatchEvent(event);
		}
		//pdf ;isl
		var pdfs = ["s39","s40","s41","s42","s43","s44","s45","s46","s47","s48","s49","s50","s51","s52","s53","s54","s55"];
		$("#stage").on("swipeleft", "#slider", function(e) {
			var nextAsset = drcom.navigation.models.assets.next();
			if (_.indexOf(pdfs, nextAsset.name) != -1) {
				showPdf(nextAsset.thumb);
				e.stopPropagation();
				return false;
			}
		});
		$("#stage").on("swiperight", "#slider", function(e) {
			var nextAsset = drcom.navigation.models.assets.prev();
			if (_.indexOf(pdfs, nextAsset.name) != -1) {
				showPdf(nextAsset.thumb);
				e.stopPropagation();
				return false;
			}
		});
		var _gotoAsset = drcom.navigation.goToAsset;
		drcom.navigation.goToAsset = function(asset) {
			var nextAsset = drcom.navigation.models.assets.getModel(asset);
			if (_.indexOf(pdfs, nextAsset.name) != -1) {
				showPdf(nextAsset.thumb);
			} else
				_gotoAsset.apply(this, arguments);
		};
	});
})(drcom || {});