$(document).bind('ready',function(){
	
	var viewModelEvent1 = function(params){
		var self = this;
		
		self.detailsEnabled = ko.observable(false);
		
		self.enableDetails = function(){
			self.detailsEnabled(true);
		}
		self.disableDetails = function(){
			self.detailsEnabled(false);
		}
	}		
	ko.applyBindings(viewModelEvent1,$('#viewModelEvent1')[0]);	
	
	var viewModelEvent2 = function(params){
		var self = this;
		
		self.lastInterest = ko.observable();
        self.places = ko.observableArray(['London', 'Paris', 'Tokyo']);
 
        // The current item will be passed as the first parameter, so we know which place was hovered over
        self.logMouseOver = function(place) {
             self.lastInterest(place);
        }
	}		
	ko.applyBindings(viewModelEvent2,$('#viewModelEvent2')[0]);	
	
	var viewModelEvent3 = function(params){
		var self = this;
		
		self.dataEvent3 = ko.observable();
		self.myFunction = function(data, event) {
            if (event.shiftKey) {
                self.dataEvent3('do something different when user has shift key down');
            } else {
                self.dataEvent3('do normal action');
            }
        }
	}
	ko.applyBindings(viewModelEvent3,$('#viewModelEvent3')[0]);	
});