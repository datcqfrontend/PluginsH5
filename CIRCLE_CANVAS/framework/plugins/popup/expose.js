$.Controller.extend("Drcom.Expose", {
    defaults: {
        effect: "fade",
        duration: 500,
        color: "#fff",
        opacity: 0.8,
        zIndex: 101,
        className:"expose",
        onBeforeShow:function(ui){},
        onBeforeHide:function(ui){},
        onShow: function(ui){},
        onHide: function(ui){},
		parent:"body"
    },
    listensTo: ['show', 'hide', 'toggle']
}, {
    init: function(el, options){
        this.createElements();
    },
    createElements: function(){
        this.mask = $("<div></div>").css({
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            "z-index": this.options.zIndex,
            "background-color": this.options.color,
            opacity: this.options.opacity,
            display: "none"
        }).addClass(this.options.className).appendTo(this.options.parent);
    },
    isVisible: function(){
        if (this.mask.css("display") == "none") 
            return 0;
        return 1;
    },
    show: function(){
        $.effects.save(this.element, ['z-index']);
        this.element.css({
            "z-index": this.options.zIndex + 1
        });
        this.onBeforeShow();
        var instance = this;
        this.mask.show(this.options.effect, null, this.options.duration, function(){
            instance.onShow();
        });
    },
    hide: function(){
        this.onBeforeHide();
        var instance = this;
        this.mask.hide(this.options.effect, null, this.options.duration, function(){
            $.effects.restore(instance.element, ['z-index']);
            instance.onHide();
        });
    },
    toggle: function(){
        if (this.isVisible() == true) 
            this.hide();
        else 
            this.show();
    },
    onHide:function()
    {
        this.options.onHide.apply(this.mask,[this]);
    },
    onShow:function()
    {
        this.options.onShow.apply(this.mask,[this]);
    },
    onBeforeShow:function()
    {
        this.options.onBeforeShow.apply(this.mask,[this]);
    },
    onBeforeHide:function()
    {
        this.options.onBeforeHide.apply(this.mask,[this]);
    },
    destroy: function(){
    	this.mask.remove();
        this._super(); //make sure you call super!
    }
});


