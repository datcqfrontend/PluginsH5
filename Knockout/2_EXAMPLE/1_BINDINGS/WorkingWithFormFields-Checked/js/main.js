$(document).bind('ready',function(){
	
	var viewModelChecked1 = function(params){
		var self = this;
		
		self.wantsSpam = ko.observable(true);
		self.spamFlavors = ko.observableArray(["cherry","almond"]);
		self.spamFlavor = ko.observable("almond");
		
		self.items = ko.observableArray([
            { itemName: 'Choice 1' },
            { itemName: 'Choice 2' }
        ]),
        self.chosenItems = ko.observableArray(['Choice 1']);
		
		self.checkChecked = function(itemName){
			//console.log(_val);
			//console.log(self.chosenItems());
			//console.log(_val.indexOf(self.chosenItems()));
			
			if(itemName.indexOf(self.chosenItems())>-1){						
				return true;
			}
			return false;
		}
		
		setTimeout(function(){
			self.spamFlavors.push('msg');			
			self.spamFlavor("msg");
						
			//console.log(self.chosenItems);
			
			setTimeout(function(){
				self.wantsSpam(false);
			},2000);
		},2000);
	}		
	ko.applyBindings(viewModelChecked1,$('#viewModelChecked1')[0]);	
	
	
});