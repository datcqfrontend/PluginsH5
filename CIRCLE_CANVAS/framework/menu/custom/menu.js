steal('//menu/custom/css/menu.css').then(function () {

	drcom.Controllers.Menu.Submenu('drcom.Controllers.Menu.Custom',
		/** @Static */
	{
		pluginName : 'customMenu',
		defaults : {
			template : '//menu/custom/views/asset.ejs'
		}
	},
		/** @Prototype */
	{
		defaultHeight : 0,
		init : function () {
			this.clickTime = 0;
			this._super();
		},
		'{window} tapone' : function () {
			this.hideSubMenu();
		},
		//add scroller
		dragAssets : function () {
			if (this.scrollermainmenu == null) {
				this.scrollermainmenu = new iScroll(this.menutarget[0], {
						scrollbarClass : "menu_scroller",
						hideScrollbar : true,
						vScroll : false,
						hScroll : true,
						bounce : false
					});
			} else
				this.scrollermainmenu.refresh();

			return this;
		},
		setMenuPosition : function () {},
		hideSubMenu : function () {
			this.element.find("li.submenu").parent().hide();
			this.changeHeight(parseInt(this.defaultHeight));

		},
		showSubmenu : function (a, b) {
            $.isFunction(b) || (b = function () {});
            a = a.find("ul:first");
            this.changeHeight(parseInt(a.height()) + parseInt(this.defaultHeight));
            if (a.length) {
                a.is(":hidden") ? a.show(this.config.subMenuEffect, this.config.subMenuEffectOption, this.config.subMenuEffectDuration, b()) : a.hide(this.configf.subMenuEffect, this.config.subMenuEffectOption,
                    this.config.subMenuEffectDuration, b())
            }
        },
		
		//save position
		setAssetPosition : function (asset) {
			if ($(asset.elements().selector, this.element).length == 0)
				return;

			var selected = $(asset.elements().selector, this.element);
			if (asset.level == 1) {
				var parentPath = asset.path.split('.')[0] + '.0';
				var parentAsset = this.assets.findByPath(parentPath);
				selected = $(parentAsset.elements().selector, this.element);
			}
			var left = selected[0].offsetLeft;

			var width = selected.width();
			var viewWidth = this.menutarget.width();
			if (left + width + this.scrollermainmenu.x - viewWidth >= 0) {

				var x =  - ((left - viewWidth) + width); //-left;

				this.scrollermainmenu._pos(x, 0);
			} else {
				if (left + this.scrollermainmenu.x <= 0) {
					var x = -left;
					if (x > 0)
						x = 0;
					this.scrollermainmenu._pos(x, 0);

				}
			}

			this.store('menuPos', this.scrollermainmenu.x);
			return this;
		},
		//reload position
		reloadAssetPosition : function (asset) {
			this.scrollermainmenu._pos(this.options.store.menuPos, 0);
		},
		'.asset:not(.disabled) tapone' : function (el, ev) {
			
			if (ev.isPropagationStopped())
				return;
			console.log("a");
			var self = this;
			self.clickTime++;
			if (self.clickTime == 1) {
				setTimeout(function () {
					if (self.clickTime == 1) {
						self.hideSubMenu();
						
						drcom.navigation.goToAsset(el.data('models').asset.path);
					} else {
						self.hideSubMenu();
						self.showSubmenu(el);
					}
					self.clickTime = 0;
				}, 300);
			}
		},
		'.asset:not(.disabled) longtap' : function (el, ev) {
			return false;
		}
	});
});
