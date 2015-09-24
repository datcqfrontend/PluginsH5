$(document).bind('ready',function(){
	
	var viewModelIf1 = function(){
		var self = this;
		self.displayMessage = ko.observable(false);
		
	}
	ko.applyBindings(viewModelIf1,$('#viewModelIf1')[0]);	
	
	
	
	var viewModelIf2 = function(){
		var self = this;
		
		self.planets = [
            { name: 'Mercury', capital: null },
            { name: 'Earth', capital: { cityName: 'Barnsley' } }       
        ];
		
		self.someExpressionGoesHere = ko.observable(false);
		
		setTimeout(function(){
			self.someExpressionGoesHere(true);
		},2000);
	}
	ko.applyBindings(viewModelIf2,$('#viewModelIf2')[0]);
		
});