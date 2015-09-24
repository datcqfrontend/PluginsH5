steal("./expose.js").then(function()
{
	$.Controller.extend("Drcom.Popup", {
		defaults: {
			close: ".close",//class close popup
			closeInside: true,
			closeOutside: false,//close clicked outside area
			effect: "fade",
			duration: 500,//during affect
			mask: false,//mask
			oneInstance: true,// true allows you to have multiple overlay instances.
			position: null,//http://jqueryui.com/demos/position/default.html
			wrapper: false,
			classWrapper:"",
			classContainer:"",
			zIndex: 102,
			window:window,
			container:"",
			onShow: function(){},
			onHide: function(){},
			onBeforeShow: function(){},
			onBeforeHide: function(){}
		},
		listensTo: ['show', 'hide', 'toggle']
	}, {


		init: function(el, options){
			this.triggerInside = false;
			this.mask = null;
			this.wrapper = null;
			this.preventDefault=false;
			
			/**
			 * Create Container
			 */
			var rel = this.element.attr("rel");
			if (rel.indexOf(".html") != -1) {
				this.container = $("<div style='display:none;position:absolute;left:0px;top:0px;z-index:" + this.options.zIndex + "'></div>");
				var parent=this.element.attr("parent");
				if(parent==undefined)
					parent=$("body");
				else
					parent=$(parent);
				parent.append(this.container);
				var instance = this;
				instance.beforeCreateContainer();
				this.container.attr("loadeddata", 0);
			}
			else {
				this.container = $(rel);
				this.beforeCreateContainer();
				this.bindEvents();
			}
			this.container.addClass(this.options.classContainer);
			
			this.options.container=this.container;
		},
		beforeCreateContainer: function(){
			if (this.options.mask == true) {
				this.mask = this.container.drcom_expose({
					color: "#000",
					zIndex:this.options.zIndex
				}).controller();
			};
			if (typeof this.options.mask=="object") {
				this.mask = this.container.drcom_expose(this.options.mask).controller();
			};			
			if (this.options.wrapper == true) {
				this.wrapper = $("<div></div>");
				this.wrapper.css({
					"z-Index": this.options.zIndex,
					position: "absolute",
					left: 0,
					top: 0
				});
				this.wrapper.addClass(this.options.classWrapper);
				this.wrapper.append(this.container);
				var parent=this.element.attr("parent");
				if(parent==undefined)
					parent=$("body");
				else
					parent=$(parent);
				parent.append(this.wrapper);
			}
		},
		"{window} tapone":function()
		{
			if (this.options.closeOutside == true && this.triggerInside == true) {
				if (this.container[0] !== event.target && !this.container.has(event.target).length && this.element[0] !== event.target && !this.container.has(event.target).length) {
					this.hide();
				}
			}
		},

		bindEvents: function(){
			var instance = this;
			var close = $(this.options.close, this.container);
			if (close.length > 0) {
				this.bind(close, "click", function(){
					instance.hide();
				});
			}
			if (this.options.closeInside == true) {
				this.bind(this.container, "click", function(){
					instance.hide();
				});
			};
		},
		"tapone": function(el, ev){
			this.toggle();
		},
		/**
		 * Close all popup
		 * @param {Object} ignore
		 */
		closeAllPopup: function(ignore){
			var popups = $(".drcom_popup");
			for (var i = 0; i < popups.length; i++) {
				var exist = false;
				for (var j = 0; j < ignore.length; j++) {
					if (ignore[j] == popups[i]) {
						exist = true;
						break;
					}
				}
				if (exist == true) 
					continue;
				var popup = $(popups[i]).controller();
				if (popup.isVisible() == true) 
					popup.hide();
			}
		},
		/**
		 * Check visible popup
		 */
		isVisible: function(){
			if (this.container.css("display") == "none") 
				return 0;
			return 1;
		},
		/**
		 * set posiotion: http://jqueryui.com/demos/position/default.html
		 */
		setPosition: function(){
			var position = {
				of: this.element
			};
			position = $.extend(false, position, this.options.position);
			if (this.options.position != null) {
				$.effects.save(this.container, ['top', 'bottom', 'left', 'right']); //save state
				this.container.position(position);
			}
		},
		onAfterShow:function()
		{
			this.options.onShow.apply();
		},
		show: function(){
			function showPopup(){
				this.options.onBeforeShow.apply();
				this.triggerInside = true;
				if (this.options.oneInstance == true)//if multi popup, we close all
					this.closeAllPopup([this.element[0]]);
				this.setPosition();
				
				var instance = this;
				this.container.show(this.options.effect, null, this.options.duration, function(){
					instance.onAfterShow();
				});
				if (this.mask != null) {
					this.mask.show();
				};
			}
			
			if(this.element.attr("rel").indexOf(".html") != -1 )
			{
				var instance=this;
				var reload=0;
				var arel=this.element.attr("rel").split("#");
				if(arel.length>=2)
					reload=arel[1];
				if(this.container.attr("loadeddata")=="0" || reload==1)
				{
					this.container.empty();
					this.container.load(this.element.attr("rel"),function(){
						instance.bindEvents();
						showPopup.apply(instance);
					});
					this.container.attr("loadeddata",1);			
				}
				else//if loaded
				{
					showPopup.apply(this);
				}

			}
			else
				showPopup.apply(this);
			
			
			
		},
		onAfterHide:function()
		{
			if(this.element.attr("rel").indexOf(".html") != -1 )
			{

				var reload=0;
				var arel=this.element.attr("rel").split("#");
				if(arel.length>=2)
					reload=arel[1];
				if(reload==1)
					this.container.empty();
			}
			this.options.onHide.apply();
		},
		hide: function(){
			this.options.onBeforeHide.apply(this);
			if(this.preventDefault==true)
				return;
			this.triggerInside = false;
			this.container.hide();
			this.onAfterHide();
			$.effects.restore(this.container, ['top', 'bottom', 'left', 'right']);//restore state 
			if (this.mask != null) {
				this.mask.hide();
			}
		},
		toggle: function(){
			if (this.isVisible() == true) 
				this.hide();
			else 
				this.show();
		},
		destroy: function(){
			this._super(); //make sure you call super!
		}
		
	});
});