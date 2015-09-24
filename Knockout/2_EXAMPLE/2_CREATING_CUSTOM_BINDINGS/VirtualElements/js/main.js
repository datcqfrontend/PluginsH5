$(document).bind('ready',function(){
	
	ko.bindingHandlers.randomOrder = {
		init: function(elem, valueAccessor) {
			// Pull out each of the child elements into an array
			var childElems = [];
			while(elem.firstChild)
				childElems.push(elem.removeChild(elem.firstChild));
	 
			// Put them back in a random order
			while(childElems.length) {
				var randomIndex = Math.floor(Math.random() * childElems.length),
					chosenChild = childElems.splice(randomIndex, 1);
				elem.appendChild(chosenChild[0]);
			}
		}
	};	
	
	ko.bindingHandlers.randomOrder2 = {
		init: function(elem, valueAccessor) {
			// Build an array of child elements
			var child = ko.virtualElements.firstChild(elem),
				childElems = [];
			while (child) {
				childElems.push(child);
				child = ko.virtualElements.nextSibling(child);
			}
	 
			// Remove them all, then put them back in a random order
			ko.virtualElements.emptyNode(elem);
			while(childElems.length) {
				var randomIndex = Math.floor(Math.random() * childElems.length),
					chosenChild = childElems.splice(randomIndex, 1);
				ko.virtualElements.prepend(elem, chosenChild[0]);
			}
		}
	};
	ko.virtualElements.allowedBindings.randomOrder2 = true;
	
	var viewModel1 = function(){
		var self = this;
				
		
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);
		
});