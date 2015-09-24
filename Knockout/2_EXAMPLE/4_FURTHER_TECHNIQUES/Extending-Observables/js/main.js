$(document).bind('ready',function(){
		
	ko.extenders.logChange = function(target, option) {
		target.subscribe(function(newValue) {
		   console.log(option + ": " + newValue);
		});
		return target;
	};	
		
	var viewModel1 = {
		firstName : ko.observable("Bob").extend({logChange: "first name"})
	}
	
	setTimeout(function(){
		viewModel1.firstName("Kate");
	},2000);
	
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);	
	
	//------------------------------------------------------------------------------------------
	ko.extenders.numeric = function(target, precision) {
		//create a writable computed observable to intercept writes to our observable
		var result = ko.pureComputed({
			read: target,  //always return the original observables value
			write: function(newValue) {
				var current = target(),
					roundingMultiplier = Math.pow(10, precision),
					newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
					valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
	 
				//only write if it changed
				if (valueToWrite !== current) {
					target(valueToWrite);
				} else {
					//if the rounded value is the same, but a different value was written, force a notification for the current field
					if (newValue !== current) {
						target.notifySubscribers(valueToWrite);
					}
				}
			}
		}).extend({ notify: 'always' });
	 
		//initialize with current value to make sure it is rounded appropriately
		result(target());
	 
		//return the new computed observable
		return result;
	};
	 
	function AppViewModel(one, two) {
		var self = this;
	
		self.myNumberOne = ko.observable(one).extend({ numeric: 0 });
		self.myNumberTwo = ko.observable(two).extend({ numeric: 2 });
	}	 
	ko.applyBindings(new AppViewModel(221.2234, 123.4525),$('#viewModel2')[0]);
	
	//------------------------------------------------------------------------------------------
	ko.extenders.required = function(target, overrideMessage) {
		//add some sub-observables to our observable
		target.hasError = ko.observable();
		target.validationMessage = ko.observable();
	 
		//define a function to do validation
		function validate(newValue) {
		   target.hasError(newValue ? false : true);
		   target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
		}
	 
		//initial validation
		validate(target());
	 
		//validate whenever the value changes
		target.subscribe(validate);
	 
		//return the original observable
		return target;
	};
	 
	function AppViewModel2(first, last) {
		this.firstName = ko.observable(first).extend({ required: "Please enter a first name", logChange: "first name"  });
		this.lastName = ko.observable(last).extend({ required: "" });
	}
	 
	ko.applyBindings(new AppViewModel2("Bob","Smith"),$('#viewModel3')[0]);
});