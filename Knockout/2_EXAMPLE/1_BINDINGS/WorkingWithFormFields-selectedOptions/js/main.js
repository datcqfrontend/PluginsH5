$(document).bind('ready',function(){
	// Constructor for an object with two properties
		
	var viewModelSelectedOptions1 = function(params){
		var self = this;
		
		self.availableCountries = ko.observableArray(['France', 'Germany', 'Spain']);
		self.chosenCountries = ko.observableArray(['France']);
		
		setTimeout(function(){
			self.chosenCountries.push('Spain');
		},2000);
		
	
	}		
	ko.applyBindings(viewModelSelectedOptions1,$('#viewModelSelectedOptions1')[0]);	
});