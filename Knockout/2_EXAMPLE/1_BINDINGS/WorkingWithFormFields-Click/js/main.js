$(document).bind('ready',function(){
	
	var viewModelClick1 = function(params){
		var self = this;
		
		self.numberOfClicks = ko.observable(0);
		self.incrementClickCounter = function() {
            var previousCount = self.numberOfClicks();
            self.numberOfClicks(previousCount + 1);
        };
	}		
	ko.applyBindings(viewModelClick1,$('#viewModelClick1')[0]);	
	
	var viewModelClick2 = function(params){
		var self = this;
		
		self.places = ko.observableArray(['London', 'Paris', 'Tokyo']);
 
        // The current item will be passed as the first parameter, so we know which place to remove
        self.removePlace = function(place) {
            self.places.remove(place)
        }
		
		self.clickData = ko.observable('');
		self.myFunction = function(data, event) {
            if (event.shiftKey) {
                //do something different when user has shift key down
				self.clickData('do something different when user has shift key down');
            } else {
                //do normal action
				self.clickData('do normal action');
            }
        }
		
		
		self.clickBubbleData = ko.observable('');
		self.myDivHandler = function(data, event) {
			self.clickBubbleData('Click Div');
			
		}
		self.myButtonHandler = function(data, event) {
			self.clickBubbleData('Click Button');
			
		}
		
	}		
	ko.applyBindings(viewModelClick2,$('#viewModelClick2')[0]);	
});