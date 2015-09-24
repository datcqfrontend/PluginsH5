$.Controller("Drcom.flipflap3",
{
    defaults:
    {
        duration: 1000,
        scale:
        {
            from: 1,
            to: 1.5
        },
        css: [], // {zoomIn:{},zoomOut:{}}
        current: -1,
        disable: false,
        // zoom in(phong to)
        create: function (ui, current) { },
        onZoomIn: function (ui, current) { },
        onBeforeZoomIn: function (ui, current) { },
        // zoom out(thu nho)
        onZoomOut: function (ui, current) { },
        onBeforeZoomOut: function (ui, current) { }
    },
    listensTo: []
},
{
    init: function (el, options) {
        this.items = this.element.children();
        this.current = this.options.current;
        this.disable = this.options.disable;
        this.zIndex = 0;
        this.block = false;
        for (var i = 0; i < this.items.length; i++) {
            var zIndex = parseInt($(this.items[i]).css("z-index"));
            $(this.items[i]).data("drcom.flipflap.zIndex", zIndex);
            if (zIndex > this.zIndex)
                this.zIndex = zIndex;
        }

        this.create(this.items[this.current], this.current);

        // --------------Begin:fix missing options css----------
        for (var i = 0; i < this.items.length; i++) {
            if (this.options.css.length < this.items.length)
                this.options.css.push({ zoomIn: {}, zoomOut: {} });
            else
                break;
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.options.css[i].zoomOut == null)
                this.options.css[i].zoomOut = {};
            if (this.options.css[i].zoomIn == null)
                this.options.css[i].zoomIn = {};
        }
        // --------------Begin:fix missing options csss----------


        if (this.current != -1)
            this.select(this.current);
        this.bindEvents();
    },
    /*
     * Bind event
     */
    bindEvents: function () {

        var instance = this;
        for (var i = 0; i < this.items.length; i++) {
            this.bind(this.items[i], "click", function (ev) {
                for (var j = 0; j < instance.items.length; j++) {
                    if (instance.items[j] == this)// disable click
                    {
                        instance.select(j);
                        return;
                    }
                }
            });
        }
    },
    /**
     * select screen
     */
    select: function (index) {
        if (index == this.current)// if zoom out
        {
            return;
        }
        if (this.disable) {
            return;
        }
        function extendCss(obj1, obj2) {
            if (obj1.transform == null)
                obj1.transform = "";
            if (obj2.transform == null)
                obj2.transform = "";
            var obj = $.extend(false, obj1, obj2);
            obj.transform = obj1.transform + " " + obj2.transform;
            return obj;
        }
        var instance = this;
        if (this.block == true)
            return;
        this.block = true;
        var current = this.current;
        this.current = index;
        if (index == current)// if zoom out
        {

            this.onBeforeZoomOut(this.items[index], index);
            // zoom out
            var css = extendCss(this.options.css[index].zoomOut, { transform: "scale(" + this.options.scale.from + ")" });
            $(this.items[index]).animate(css, this.options.duration, function () {
                $(this).css("z-index", $(this).data("drcom.flipflap.zIndex"));
                instance.block = false;
                instance.onZoomOut(this, index);
            });
            this.current = -1;
            return;
        }
        // if zoom in
        if (current != -1) {// zoom out

            counter = -1;
            $(this.items[current]).css("z-index", $(this.items[current]).data("drcom.flipflap.zIndex"));
            var css = extendCss(this.options.css[index == 1 ? 0 : 1].zoomOut, { transform: "scale(" + this.options.scale.from + ")" });
            $(this.items[current]).animate(css, this.options.duration, function () {
                $(this).trigger("drcom.flipflap.onZoomOut");
            });
        }
        this.onBeforeZoomIn(this.items[index], index);
        $(this.items[index]).css("z-index", this.zIndex + 1);
        // zoom in
        var css = extendCss(this.options.css[index].zoomIn, { transform: "scale(" + this.options.scale.to + ")" });
        $(this.items[index]).animate(css, this.options.duration, function () {
            instance.onZoomIn(instance.items[index], index);
            instance.block = false;
        });
    },
    create: function (obj, current) {
        this.options.create.apply($(obj)[0], [this, current]);
        $(obj).trigger("drcom.flipflap.create", this, current);
    },
    onBeforeZoomIn: function (obj, current) {
        this.options.onBeforeZoomIn.apply($(obj)[0], [this, current]);
        $(obj).trigger("drcom.flipflap.onBeforeZoomIn", this, current);
    },
    onZoomIn: function (obj, current) {
        this.options.onZoomIn.apply($(obj)[0], [this, current]);
        $(obj).trigger("drcom.flipflap.onZoomIn", this, current);
    },
    onBeforeZoomOut: function (obj, current) {
        this.options.onBeforeZoomOut.apply($(obj)[0], [this, current]);
        $(obj).trigger("drcom.flipflap.onBeforeZoomOut", this, current);
    },
    onZoomOut: function (obj, current) {
        this.options.onZoomOut.apply($(obj)[0], [this, current]);
        $(obj).trigger("drcom.flipflap.onZoomOut", this, current);
    }
});


