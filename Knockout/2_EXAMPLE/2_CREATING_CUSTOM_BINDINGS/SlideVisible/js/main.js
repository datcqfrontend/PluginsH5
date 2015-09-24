$(document).bind('ready',function(){
	
	ko.bindingHandlers.slideVisible = {
		init: function(element, valueAccessor) {
			var value = ko.unwrap(valueAccessor()); // Get the current value of the current property we're bound to
			$(element).toggle(value); // jQuery will hide/show the element depending on whether "value" or true or false
		},
		update: function(element, valueAccessor, allBindings) {
			// First get the latest data that we're bound to
			var value = valueAccessor();
	 
			// Next, whether or not the supplied model property is observable, get its current value
			var valueUnwrapped = ko.unwrap(value);
	 
			// Grab some more data from another binding property
			var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
	 
			// Now manipulate the DOM element
			if (valueUnwrapped == true)
				$(element).slideDown(duration); // Make the element visible
			else
				$(element).slideUp(duration);   // Make the element invisible
		}
	};
	
	var viewModel1 = function(){
		var self = this;
				
		self.giftWrap = ko.observable(true);
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);		
		
});