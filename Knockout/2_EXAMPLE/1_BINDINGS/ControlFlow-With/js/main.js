$(document).bind('ready',function(){
	
	var viewModelWith1 = function(){
		var self = this;
		self.city = ko.observable("Ho Chi Minh");
		self.coords = {
			latitude: 100000000,
			longitude: 200000000
		};
		
	}
	ko.applyBindings(viewModelWith1,$('#viewModelWith1')[0]);	
	
	
	var viewModelWith2 = function(){
		var self = this;
		
		self.twitterName = ko.observable('@example');
		self.resultData = ko.observable(); // No initial value
	 
		self.getTweets = function() {
			var name = self.twitterName(),
				simulatedResults = [
					{ text: name + ' What a nice day.' },
					{ text: name + ' Building some cool apps.' },
					{ text: name + ' Just saw a famous celebrity eating lard. Yum.' }
				];
	 
			self.resultData({ retrievalDate: new Date(), topTweets: simulatedResults });
		}
	 
		self.clearResults = function() {
			self.resultData(undefined);
		}
	}
	ko.applyBindings(viewModelWith2,$('#viewModelWith2')[0]);	
		
});