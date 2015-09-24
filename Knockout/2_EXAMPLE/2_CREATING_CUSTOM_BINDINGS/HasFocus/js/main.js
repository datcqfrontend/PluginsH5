$(document).bind('ready',function(){
	
	ko.bindingHandlers.hasFocus = {
		init: function(element, valueAccessor) {
			$(element).focus(function() {
				var value = valueAccessor();
				value(true);
			});
			$(element).blur(function() {
				var value = valueAccessor();
				value(false);
			});
		},
		update: function(element, valueAccessor) {
			var value = valueAccessor();
			if (ko.unwrap(value))
				element.focus();
			else
				element.blur();
		}
	};
	
	var viewModel1 = function(){
		var self = this;
				
		self.editingName = ko.observable();
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);		
		
});