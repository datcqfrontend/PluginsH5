$(document).bind('ready',function(){
	
	ko.bindingHandlers.allowBindings = {
		init: function(elem, valueAccessor) {
			//console.log(elem, valueAccessor());
		
			// Let bindings proceed as normal *only if* my value is false
			var shouldAllowBindings = ko.unwrap(valueAccessor());
			return { controlsDescendantBindings: !shouldAllowBindings };
		}
	};
	
	var viewModel1 = function(){
		var self = this;
				
		//self.editingName = ko.observable();
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);
		
});