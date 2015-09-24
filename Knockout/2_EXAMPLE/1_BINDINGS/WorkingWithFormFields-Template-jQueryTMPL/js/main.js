$(document).bind('ready',function(){
	
	var viewModelValue1 = function(params){
		var self = this;
		
		self.people = ko.observableArray([
            { name: 'Rod', age: 123 },
            { name: 'Jane', age: 125 },
        ])
	}		
	ko.applyBindings(viewModelValue1,$('#viewModelValue1')[0]);	
	
	
});