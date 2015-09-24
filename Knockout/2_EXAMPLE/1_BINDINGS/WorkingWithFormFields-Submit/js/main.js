$(document).bind('ready',function(){
	
	var viewModelSubmit1 = function(params){
		var self = this;
		
		self.doSomething = function(formElement) {
			console.log("Do something by submit!");
		};
	}		
	ko.applyBindings(viewModelSubmit1,$('#viewModelSubmit1')[0]);	
	
	
});