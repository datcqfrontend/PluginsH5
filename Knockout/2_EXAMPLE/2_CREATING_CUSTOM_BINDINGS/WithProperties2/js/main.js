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
	
	ko.bindingHandlers.withProperties2 = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			// Make a modified binding context, with a extra properties, and apply it to descendant elements
			var childBindingContext = bindingContext.createChildContext(
				bindingContext.$rawData,
				null, // Optionally, pass a string here as an alias for the data item in descendant contexts
				function(context) {
					ko.utils.extend(context, valueAccessor());
				});
			ko.applyBindingsToDescendants(childBindingContext, element);
	 
			// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
			return { controlsDescendantBindings: true };
		}
	};
	
	var viewModel1 = function(){
		var self = this;
				
		
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);
		
});