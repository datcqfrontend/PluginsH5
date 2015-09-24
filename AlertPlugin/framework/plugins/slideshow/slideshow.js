$.fn.changeEffect = function (effect, opts, duration, callback) {
	if (opts == null)
		opts = {};
	var change = this.data("effects.change");
	if (change == null)
		change = {
			current : 0,
			lock : false,
			next : 1
		};
	var current = change.current;
	var lock = change.lock;
	var index = change.next;
	if (lock == true) {
		return false;
	}
	change.lock = true;
	this.data("effects.change", change);
	var defaultOptions = {
		changeParallel : 0,
		changeIncrease : 1,
		effect : "fade",
		duration : 1000,
		callback : function () {}

	};
	var options = $.extend(false, defaultOptions);
	if (duration != null)
		options.duration = duration;
	if (callback != null)
		options.callback = callback;
	if (effect != null)
		options.effect = effect;
	if (opts.changeParallel != null)
		options.changeParallel = opts.changeParallel;
	if (opts.changeIncrease != null)
		options.changeIncrease = opts.changeIncrease;
	var items = $(this).children();
	function getNext(current) {
		var index = current;
		if (options.changeIncrease == 1) {
			if (current < items.length - 1)
				index = index + 1;
			else {
				index = 0;
			}
		} else {
			if (current > 0)
				index = index - 1;
			else
				index = items.length - 1;
		}
		return index;
	}
	function onEndChange(current, index) {
		var next = getNext(index);
		this.data("effects.change", {
			current : index,
			lock : false,
			next : next
		});
		options.callback.apply(this, [items[current], items[index]]);
	}
	var instance = this;
	var optsHide = $.extend(false, opts, {
			el : items[index]
		});
	var optsShow = $.extend(false, opts, {
			el : items[current]
		});
	if (options.changeParallel == 0) {
		$(items[current]).hide(options.effect, optsHide, options.duration, function () {
			$(items[index]).show(options.effect, optsShow, options.duration, function () {
				onEndChange.apply(instance, [current, index]);
			});
		});
	} else {
		var count = 0;
		$(items[current]).hide(options.effect, optsHide, options.duration, function () {
			count++;
			if (count == 2)
				onEndChange.apply(instance);
		});
		$(items[index]).show(options.effect, optsShow, options.duration, function () {
			count++;
			if (count == 2)
				onEndChange.apply(instance);
		});
	}
	return true;
};
var _setup = function () {
	if (this.attrs != null) {
		var instance = this;
		var setget = function (name) {
			var str = name[0] + "";
			var setter = "set" + str.charAt(0).toUpperCase()
				+name.substr(1);
			var getter = "get" + str.charAt(0).toUpperCase()
				+name.substr(1);
			if (instance.prototype[setter] == null) {
				instance.prototype[setter] = function (value) {
					this[name] = value;
				};
			}
			if (instance.prototype[getter] == null) {
				instance.prototype[getter] = function () {
					return this[name];
				};
			}
		};
		for (var i = 0; i < this.attrs.length; i++) {
			var name = this.attrs[i];
			setget(name);
		}
	}
};
$.Class("Drcom.Class", {
	setup : function () {
		_setup.apply(this);
		this._super.apply(this, arguments);
	},
	plugin : {
		add : function (module, option, set) {
			var proto = module.prototype;
			if (proto.plugins == null)
				proto.plugins = {};
			for (var i in set) {
				proto.plugins[i] = proto.plugins[i] || [];
				proto.plugins[i].push([option, set[i]]);
			}
		},
		call : function (instance, name, args) {
			var set = instance.plugins[name];
			if (set == undefined)
				return;
			for (var i = 0; i < set.length; i++) {
				if (instance.options[set[i][0]] == undefined || instance.options[set[i][0]] === null)
					continue;
				else
					if (set[i][1].apply(instance, args) === false)
						return false;
			}
		}
	}
}, {});
$.Controller("Drcom.Controller", {
	setup : function () {
		_setup.apply(this);
		this._super.apply(this, arguments);
	},
	plugin : Drcom.Class.plugin
}, {
	_trigger : function (type, event, data) {
		var callback = this.options[type],
		args;
		event = $.Event(event);
		event.type = (type === this.Class._fullName ? type : this.Class._fullName + type).toLowerCase();
		data = data || {};
		if (event.originalEvent) {
			for (var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[--i];
				event[prop] = event.originalEvent[prop];
			}
		}
		this.element.trigger(event, data);
		args = $.isArray(data) ? [event].concat(data) : [event, data];
		return !($.isFunction(callback) && callback.apply(this.element[0], args) === false || event.isDefaultPrevented());
	}
});
Drcom.Controller("Drcom.slideshow", {
	defaults : {
		delay : 500,
		effect : "fade",
		duration : 500,
		onBeforeShow : function (event, ui, current, next) {},
		onShow : function (event, ui, current, next) {},
		cycle : true,
		current : 0,
		effectOptions : {},
		events : [],
		disableSwipe : true
	},
	listensTo : ['next', 'prev', 'play', 'pause', 'stop', 'select']
}, {
	init : function (el, options) {
		this.current = this.options.current;
		this.items = this.element.children();
		this.timer = null;
		this.lock = false;
		this._bindEvents();
	},
	_bindEvents : function () {
		if (this._checkEvents("swipe") == true) {
			this.bind("swipeoneleft", this.callback("swipeLeft"));
			this.bind("swipeoneright", this.callback("swipeRight"));
			this.bind("swipeoneup", this.callback("swipeUp"));
			this.bind("swipeonedown", this.callback("swipeDown"));
		}
	},
	swipeLeft : function () {},
	swipeRight : function () {},
	swipeUp : function () {},
	swipeDown : function () {},
	_checkEvents : function (name) {
		for (var i = 0; i < this.options.events.length; i++) {
			if (this.options.events[i] == name)
				return true;
		}
		return false;
	},
	play : function () {
		var instance = this;
		if (this.timer != null)
			clearInterval(this.timer);
		this.timer = setInterval(function () {
				if (instance.getNext() == -1) {
					instance.pause();
				}
				instance.next();
			}, this.options.delay);
	},
	pause : function () {
		clearInterval(this.timer);
	},
	stop : function () {
		this.pause();
		if (this.lock == true) {
			var instance = this;
			var hander = function () {
				instance.change(0);
				instance.element.unbind("slideshow.onShow");
			};
			this.element.bind("slideshow.onShow", hander);
		} else
			this.change(0);
	},
	change : function (index) {
		if (this.lock == true)
			return false;
		this.lock = true;
		var current = this.current;
		var change = this.element.data("effects.change");
		if (change == null) {
			change = {
				current : current,
				lock : false,
				next : index
			};
		}
		change.current = current;
		change.next = index;
		this.element.data("effects.change", change);
		this.current = index;
		var instance = this;
		this._trigger("onBeforeShow", null, [this, current, index]);
		this.element.changeEffect(this.options.effect, this.options.effectOptions, this.options.duration, function () {
			instance.lock = false;
			instance._trigger("onShow", null, [instance, current, index]);
		});
		return true;
	},
	next : function () {
		var index = this.getNext();
		if (index != -1)
			this.change(index);
	},
	prev : function () {
		var index = this.getPrev();
		if (index != -1)
			this.change(index);
	},
	getNext : function () {
		var index = this.current;
		if (this.current < this.items.length - 1)
			index = index + 1;
		else {
			if (this.options.cycle == true)
				index = 0;
			else
				index = -1;
		}
		return index;
	},
	getPrev : function () {
		var index = this.current;
		if (this.current > 0)
			index = index - 1;
		else {
			if (this.options.cycle == true)
				index = this.items.length - 1;
			else
				index = -1;
		}
		return index;
	},
	gotoSlide : function (index) {
		return this.change(index);
	},
	select : function (index) {
		return this.change(index);
	},
	destroy : function () {
		clearTimeout(this.timer);
		this._super();
	}
});