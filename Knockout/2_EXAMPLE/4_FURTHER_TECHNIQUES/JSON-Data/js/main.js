$(document).bind('ready',function(){
		
	var viewModel = {
		firstName : ko.observable("Bert"),
		lastName : ko.observable("Smith"),
		pets : ko.observableArray(["Cat", "Dog", "Fish"]),
		type : "Customer"
	};	
	
	viewModel.hasALotOfPets = ko.computed(function() {
		return this.pets().length > 2
	},viewModel);
	
	//var jsonData = ko.toJSON(viewModel);	
	//console.log(jsonData);
		
	var viewModel1 = function(){
		var self = this;
		
		self.firstName = ko.observable("Bert");
		self.lastName = ko.observable("Smith");
		self.pets = ko.observableArray(["Cat", "Dog", "Fish"]);
		self.type = "Customer";
		
		self.hasALotOfPets = ko.computed(function() {
			return this.pets().length > 2
		});
		
		self.jsonData = ko.toJSON(viewModel);	
		
	}
	ko.applyBindings(viewModel1,$('#viewModel1')[0]);	
	
	var plainJs = ko.toJS(viewModel1);
	console.log(plainJs);
		
});