$(document).bind('ready',function(){
	
	ko.bindingHandlers.withProperties = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			// Make a modified binding context, with a extra properties, and apply it to descendant elements
			var innerBindingContext = bindingContext.extend(valueAccessor);
			
			ko.applyBindingsToDescendants(innerBindingContext, element);
	 
			// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
			return { controlsDescendantBindings: true };
		}
	};
		
	var viewModel1 = function(){
		var self = this;
				
		
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);
		
});