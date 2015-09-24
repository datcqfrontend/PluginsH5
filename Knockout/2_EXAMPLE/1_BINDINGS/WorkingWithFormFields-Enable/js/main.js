$(document).bind('ready',function(){
	
	var viewModelEnable1 = function(params){
		var self = this;
		
		self.hasCellphone = ko.observable(false);
        self.cellphoneNumber= "";
		
		self.parseAreaCode = function(_phoneNumber){
			var code = "";
			var arrCode = _phoneNumber.split('-');
			code = arrCode[0];
			
			return code;
		}
		
		self.doSomething = function(_value){
			console.log(_value);
		}
	}		
	ko.applyBindings(viewModelEnable1,$('#viewModelEnable1')[0]);	
	
	
});