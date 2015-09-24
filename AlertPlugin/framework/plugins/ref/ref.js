$.Controller("Drcom.Ref",
{
	defaults:
	{
		close:".close",
		scroller:".inner_wapper",
		main:".ref_warpper",
		effect:
		{
			name:"slide",
			options:
			{
				direction:"left"
			},
			duration:1000
		},
		afterHide:function(){},
		afterShow:function(){},
		beforeHide:function(){},
		beforeShow:function(){}
		
	}
},
{
	init:function()
	{
		this.set(this.options.main);
	},
	set:function(selector)
	{
		if(this.container!=null)
		{		
			this.container.hide();
			//drcom.navigator.hideRef();
		}
		var instance=this;
		$(this.options.close,this.container).unbind("click.ref");
		this.container=$(selector,this.element);
		this.container.on("click.ref",this.options.close,function(ev)
		{	
			instance.toggle();
		});
		//scroll content
		if($(this.options.scroller,this.container).length>0)
		{
			new iScroll($(this.options.scroller,this.container)[0],{
                scrollbarClass: "ref_scroller",
                hideScrollbar: false,
                checkDOMChange: true,
                checkDOMChanges: true,
                vScrollbar: true
			});			
			$(this.container).drcom_disableswipe();
		}
	},
	hide:function()
	{
		this.options.beforeHide.apply(this.container);
		this.container.hide(this.options.effect.name,this.options.effect.options,this.options.effect.duration,this.options.afterHide);
	},
	show:function()
	{
		this.options.beforeShow.apply(this.container);
		this.container.show(this.options.effect.name,this.options.effect.options,this.options.effect.duration,this.options.afterShow);		
	},
	toggle:function()
	{
		if(this.container.is(":visible")==true)
			this.hide();
		else
			this.show();
	}
});