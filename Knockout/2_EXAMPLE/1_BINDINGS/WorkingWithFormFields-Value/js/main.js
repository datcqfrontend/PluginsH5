$(document).bind('ready',function(){
	
	var viewModelValue1 = function(params){
		var self = this;
		
		self.userName = ko.observable("");        // Initially blank
        self.userPassword = ko.observable("abc"); // Prepopulate
		
		self.countries = ['Japan', 'Bolivia', 'New Zealand','Latvia'];
        self.selectedCountry = ko.observable('Latvia');
		
		self.firstValue = ko.observable("hello"); // Observable
        self.secondValue = ko.observable("hello, again");         // Not observable
		/*self.thirdValue = ko.computed(function() {
			console.log(self.secondValue().length);
		
			if(self.secondValue().length>8){
				return true;
			}
			return false;
		});*/
		
	}		
	ko.applyBindings(viewModelValue1,$('#viewModelValue1')[0]);	
	
	
});