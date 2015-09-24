$.Controller("drcom.circle",{
	defaults:{
		src:"",
		angle:0,
		rotation:-90,
		duration:0,
		change:function(value){},
		loadCompleted:function(){},

	}
},{
	init:function()
	{
		var instance=this;
		this.render(this.options.loadCompleted);
		this.animating=false;
		
		var touch='ontouchstart' in document.documentElement;
		this.events={
			mousedown:touch==true?"touchstart.circle":"mousedown.circle",
			mousemove:touch==true?"touchmove.circle":"mousemove.circle",
			mouseup:touch==true?"touchend.circle":"mouseup.circle",
		};
		this.touch=touch;
		
		this.bind(this.events.mousedown,this.callback("_mousedown"));
	},
	render:function(callback)
	{
        var stage = new Kinetic.Stage({
            container: this.element[0],
            width: this.element.width(),
            height: this.element.height()
        });
        this.layer = new Kinetic.Layer();
		stage.add(this.layer);
		this.loadImage(this.options.src,callback);
	},
	getDeg:function()
	{
		return this.circle.getAngle();
	},
	setDeg:function(deg)
	{
		this.change(deg*100/360);
	},
	loadImage:function(src,callback)
	{
		var instance=this,layer=this.layer;
		var image = new Image();
		image.onload = function () {
			var radius=instance.element.width()/2;
			instance.circle = new Kinetic.Wedge2({
				width: instance.element.width(),
				height: instance.element.height(),
				radius: radius,
				rotationDeg:instance.options.rotation,
				angleDeg:instance.options.angle,
				fillPatternImage: image,
				fillPatternOffset: [-radius, -radius],
				x: radius,
                y:radius,
                onSetAngleDeg:function(deg){
                	var percent=deg*100/360;
                	instance.options.change(percent);
                }
			});
			layer.add(instance.circle);
			layer.draw();
			if(callback)
				callback();


		};
		image.src = src;		
	},
	_mousedown:function(e)
	{
		var ev=e.originalEvent.touches ? e.originalEvent.touches[0] : e;
		if(this.animating==true)
			return;
		$(window).bind(this.events.mousemove,this.callback("_mousemove"));
		$(window).bind(this.events.mouseup,this.callback("_mouseup"));
	},
	_mousemove:function(e)
	{
		var ev=e.originalEvent.touches ? e.originalEvent.touches[0] : e;
		var pos={
			x:ev.pageX-this.element.offset().left,
			y:ev.pageY-this.element.offset().top
		};
		var deg=this.getAngleFromPoint(parseInt(pos.x),parseInt(pos.y));
		this.setDeg(deg);
	},
	_mouseup:function(e)
	{
		var ev=e.originalEvent.touches ? e.originalEvent.touches[0] : e;
		$(window).unbind(this.events.mousemove);
		$(window).unbind(this.events.mouseup);		
		this.options.release();
	},

	change:function(percent)
	{
	
		var deg=percent*3.6;
		if(this.options.change(percent)==false)
			return false;

		this.circle.setAngleDeg(deg);
		this.layer.draw();			
	},
	
	scrollTo:function(percent,callback)
	{
		
		var deg=percent*3.6;
		this.animating=true;
		var value=this.circle.getAngleDeg(),instance=this;
		
		var tween = new Kinetic.Tween({
	        node: this.circle, 
	        duration: 2,
	        angleDeg: deg,
	        easing: Kinetic.Easings.Linear,
	        onFinish: function() {
	        	instance.animating=false;
	        }
	        
	     });
	     tween.play();
	},
	
	getAngleFromPoint:function (mouseX, mouseY) {
		var cx,cy;
		cx=cy=this.element.width()/2;
		var radian=  Math.atan2(mouseY - cy, mouseX - cx)  ;
		var deg=radian* (180/Math.PI)+90;
		if(deg<0)
			deg=360+deg;
		return deg
	},
	destroy:function()
	{
		this._super();
		this.unbind("mousedown.circle");
	}
});