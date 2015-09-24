$(document).bind('ready',function(){
	ko.components.register('like-widget', {
		viewModel: { require: 'js/plugin/component-like-widget' },
		template: { require: 'js/text!js/plugin/component-like-widget.html' }
	});	
	
	function Product(name, rating) {
		this.name = name;
		this.userRating = ko.observable(rating || null);
	}	
	
	var viewModel1 = function(){
		var self = this;
				
		self.products = [
			new Product('Garlic bread'),
			new Product('Pain au chocolat'),
			new Product('Seagull spaghetti', 'like') // This one was already 'liked'
		];
		
		self.products2 = ko.observableArray(); // Start empty
		self.addProduct = function() {
			var name = 'Product ' + (self.products2().length + 1);
			self.products2.push(new Product(name));
		};
	}	
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);


});