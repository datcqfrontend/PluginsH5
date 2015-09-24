$(document).bind('ready',function(){
	
	var viewModelHasFocus1 = function(params){
		var self = this;
		
		self.isSelected = ko.observable(false);
		self.setIsSelected = function() { self.isSelected(true) };
		
		
		// Data
		self._name = ko.observable('Dat Chau');
		self.editing = ko.observable(false);
			 
		// Behaviors
		self.editTrue = function(){ 
			
			self.editing(true); 		
		};
		self.editFalse = function(data, event){ 
			console.log(data);
			console.log(event);
		
			self.editing(false);
			self._name($('#txtName').val());
		};
	}		
	ko.applyBindings(viewModelHasFocus1,$('#viewModelHasFocus1')[0]);	
	
	
});