$(document).bind('ready',function(){
	var viewModelCheckbox = function() {
		var self = this;
		self.produce = [ 'Apple', 'Banana', 'Celery', 'Corn', 'Orange', 'Spinach' ];
		self.selectedProduce = ko.observableArray([ 'Corn', 'Orange' ]);
		self.selectedAllProduce = ko.pureComputed({
			read: function(){
				// Comparing length is quick and is accurate if only items from the
				// main array are added to the selected array.
				return self.selectedProduce().length === self.produce.length;
			},
			write: function (value) {
				console.log(value);
			
				self.selectedProduce(value ? self.produce.slice(0) : []);
			},
			owner: self
		});
	}
	ko.applyBindings(new viewModelCheckbox());
	
});