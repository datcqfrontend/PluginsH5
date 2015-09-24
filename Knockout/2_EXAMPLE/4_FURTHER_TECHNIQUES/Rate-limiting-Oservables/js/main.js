$(document).bind('ready',function(){		
	var viewModel1 = function(){
		var self = this;
		
		self.instantaneousValue = ko.observable();
		self.delayedValue = ko.pureComputed(this.instantaneousValue).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });
	 
		// Keep a log of the throttled values
		this.loggedValues = ko.observableArray([]);
		this.delayedValue.subscribe(function (val) {
			if (val !== '')
				this.loggedValues.push(val);
		}, this);
	}

	ko.applyBindings(viewModel1,$('#viewModel1')[0]);	
});