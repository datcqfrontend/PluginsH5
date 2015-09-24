$(document).bind('ready',function(){
	
	var viewModelTextInput1 = function(params){
		var self = this;
		
		self.userName = ko.observable("");        // Initially blank
        self.userPassword = ko.observable("abc");
		//console.log(ko.toJSON($root, null, 2));
	}		
	ko.applyBindings(viewModelTextInput1,$('#viewModelTextInput1')[0]);	
	
	
});