$.Controller("Drcom.Circle",{
	defaults:{
		value:-1,
		duration:1000,
		listener:null,
		onBeforceChange:function(ui,oldValue,newValue){},
		onAfterChange:function(ui,oldValue,newValue){}
	}
},{
	init:function()
	{
		this.isMove=false;
		this.isDisable=false;
		this.render();
		if(this.options.value!=-1)
			this.val(this.options.value);
	},
	render:function () {
		var clock=$("div:first",this.element);
		clock.rotateLeft=clock.find('.rotate.left');
		clock.rotateRight=clock.find('.rotate.right');
		this.clock=clock;
		this.element.append(clock);
	},
	"{listener} touchstart":function(el,event) {
		
		this.isMove = true;
		this.move(event.originalEvent.layerX,event.originalEvent.layerY);
	},
	"{window} touchend":function(el,event) {
		
		this.isMove = false;
	},
	"{listener} touchmove":function(el,event)
	{
		if (this.isMove == false)
			return;
		this.move(event.originalEvent.layerX,event.originalEvent.layerY);
	},
	disable:function(bDisable)
	{
		this.isDisable=bDisable;
	},
	val:function(value,isAni)
	{
		if(this.isDisable==true)
			return;
		if(arguments.length==0)//get
			return this.value;
		else
		{
			if(isAni==null)
				isAni=true;
			this.change(arguments[0],isAni);
		}
			
	},
	move:function(x,y)
	{
		var degree=this.getDegree(x,y);
		this.val(degree,false);
	},
	change:function(value,isAni)
	{
		var instance=this;
		this.options.onBeforceChange.apply(this.element,[this,this.value,value]);
		this.animation(value,function(){
			instance.options.onAfterChange.apply(instance.element,[instance,instance.value,value]);
			instance.value=value;
		},isAni);
		
	},
	getDegree:function(x,y)
	{
		function getWidthFromPoint(p1, p2) {
			return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
		};
		function changeAxis(point) 
		{

			var width = this.element.width();
			var height = this.element.height();
			var R = width / 2;
			var position = this.element.position();
			var x = position.left + R;
			var y = position.top + R;
			var newPoint = {
				x : point.x - x,
				y : -(point.y - y)
			};
			return newPoint;
		};
		
		var width = this.element.width();
		var height = this.element.height();
		var R = width / 2;
		var current = {
			x : x,
			y : y
		};
		var B = changeAxis.apply(this,[current]);
		var O = {
			x : 0,
			y : 0
		};
		var A = {
			x : 0,
			y : R
		};
		var a = getWidthFromPoint(O, A);
		var c = getWidthFromPoint(A, B);
		var b = getWidthFromPoint(O, B);
		var cosC = (a * a + b * b - c * c) / (2 * a * b);
		var degree = Math.round((Math.acos(cosC) * 180) / Math.PI);
		if (B.x < 0)
			degree = 360 - degree;
		return degree;
	},
	
	animation:function (current,callback,isAnimation) 
	{
		
		var total=360;
		var clock=this.clock;
		var instance=this;
		// Calculating the current angle:
		var angle = (360 / total) * (current + 1);
		var element;
		if (current == 0) {
			// Hiding the right half of the background:
			clock.rotateRight.hide();

			// Resetting the rotation of the left part:
			clock.rotateLeft.css('transform', 'rotate(' + 0 + 'deg)');
		}
		if (angle <= 180) {
			// The left part is rotated, and the right is currently hidden:
			element = clock.rotateLeft;

			// Hiding the right half of the background:
			clock.rotateRight.hide();

			// Resetting the rotation of the left part:
			clock.rotateLeft.css('transform', 'rotate(' + 0 + 'deg)');
		} else {
			// The first part of the rotation has completed, so we start
			// rotating the right part:
			//clock.rotateRight.show();
			clock.rotateLeft.show();
			element = clock.rotateRight;
			angle = angle - 180;
			if(isAnimation==true)
			{
				clock.rotateLeft.animate({'transform':'rotate(' + 180 + 'deg)'},(180*this.options.duration)/current,"linear",function(){
					clock.rotateRight.show();
					animate(element,angle,( (current-180)*instance.options.duration)/current,callback);
				});	
				return;
			}
			else
			{
				clock.rotateRight.show();
				clock.rotateLeft.css('transform', 'rotate(' + 180 + 'deg)');
			}
			
		}
		animate(element,angle,this.options.duration,callback);
		
		
		function animate(el,angle,duration,callback)
		{
			if(isAnimation==true)
				el.animate({
					transform:'rotate(' + angle + 'deg)'
				},duration,"linear",function(){callback();});
			else
			{
				el.css('transform', 'rotate(' + angle + 'deg)');
				callback();
			}
		}

	}
});

