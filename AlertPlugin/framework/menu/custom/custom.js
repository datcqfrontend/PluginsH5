steal('//menu/custom/css/menu.css').then(function () {

    drcom.Controllers.Menu.Submenu('drcom.Controllers.Menu.Custom',
    /** @Static */
    {
        pluginName: 'customMenu',
        defaults: {
            template: '//menu/custom/views/asset.ejs'
        }
    },
    /** @Prototype */
    {
        defaultHeight: 0,
        
        init: function () {
            this.clickTime = 0;
            this._super();            
        },
        
        '{window} tapone': function () {
            this.hideSubMenu();
        },
        
        '.asset:not(.disabled) tapone': function (el, ev) {
        	if(ev.isPropagationStopped()) return;
			var asset = el.model();
			
			if(asset.level == 0) {
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
			} else {
				asset.select();
			}
        },
        
        '.asset:not(.disabled) longtap': function (el, ev) {
            return false;
        }

    });
});