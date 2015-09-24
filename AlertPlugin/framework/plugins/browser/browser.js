(function (drcom) {
	drcom.ready(function ($) {
		if ('ontouchstart' in document.documentElement)
			return;
		//--------------Begin:webview-----------
		drcom.player.connector.createWebview = function (name, x, y, w, h) {
			$("<iframe></iframe>").attr("id", name).appendTo("body").css({
				left : x,
				top : y,
				position : "relative",
				"z-index" : 1
			}).width(w).height(h);
		}
		drcom.player.connector.showWebview = function (name, url) {
			$("iframe#" + name).attr("src", url);
		}
		drcom.player.connector.removeWebview = function (name) {
			$("iframe#" + name).remove();
		}
		//--------------End:webview-----------
	});
})(drcom || {});
