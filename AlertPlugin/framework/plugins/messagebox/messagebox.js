steal("./css/main.css");
$.Class("Drcom.Messagebox", {
	show : function (options) {
		var buttonsConfig = {
			ABORT_RETRY_IGORNE : this.ABORTRETRYIGORNE,
			CANCEL_OK : this.OKCANCEL,
			RETRY_CANCEL : this.RETRYCANCEL,
			NO_YES : this.YESNO,
			NO_CANCEL_YES : this.YESNOCANCEL,
			OK : this.OK,
			CANCEL : this.CANCEL,
			YES : this.YES,
			NO : this.NO,
			ABORT : this.ABORT,
			RETRY : this.RETRY,
			IGORNE : this.IGORNE
		};
		
		function getButtonsName(number) {
			for (var name in buttonsConfig) {
				if (buttonsConfig[name] == number)
					return name;
			}
			return "";
		}
		options = $.extend({
				msg : "",
				title : "",
				buttons : this.OK,
				fn : function (result) {},
				lang : "en",
				container : $("body"),
				mask : true,
				id:"messagebox"
			}, options);
		var title = $("<div class='title'></div>").html(options.title);
		var msg = $("<div class='msg'></div>").html(options.msg);
		
		//buttons
		var buttonsHTML = "";
		var pattern = getButtonsName.apply(this, [options.buttons]).split("_");
		for (var i = 0; i < pattern.length; i++) {
			var buttonName = pattern[i];
			buttonsHTML = buttonsHTML + "<div class='button " + buttonName + "' buttons='" + buttonsConfig[buttonName] + "'>" + this.languages[options.lang][buttonName] + "</div>";
		}
		var buttons = $("<div class='buttons'>").html(buttonsHTML);
		var element = $("<div class='messagebox'>").attr("id",options.id).append(title, msg, buttons).appendTo(options.container);
		element.css({
			position : "absolute"
		}).position({
			of : options.container
			
		});
		if (options.mask != null)
			element.drcom_expose({
				color : "#000",
				opacity:0.2
			}).controller().show();
		$(".button", element).bind("tapone", function () {
			var result = options.fn.apply(this.element, [$(this).attr("buttons")]);
			if (result == 1 || result == undefined) {
				$(".button", element).unbind("tapone");
				
				element.remove();
			}
		});
	},
	languages : {
		en : {
			ABORT : "Abort",
			RETRY : "Retry",
			IGORNE : "Igorne",
			OK : "Ok",
			CANCEL : "Cancel",
			YES : "Yes",
			NO : "No"
		}
	},
	ABORTRETRYIGORNE : 1,
	OK : 2,
	OKCANCEL : 3,
	RETRYCANCEL : 4,
	YESNO : 5,
	YESNOCANCEL : 6,
	CANCEL : 7,
	YES : 8,
	NO : 9,
	ABORT : 10,
	RETRY : 11,
	IGORNE : 12
}, {});