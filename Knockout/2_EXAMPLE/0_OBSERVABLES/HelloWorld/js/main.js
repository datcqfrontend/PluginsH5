$(document).bind('ready',function(){
	// Here's my data model
	var ViewModel = function() {
		var self = this;
	
		//HELLO WORLD VIEWMODEL
			self.firstName = ko.observable("Dat");
			self.lastName = ko.observable("Chau");
		 
			/*self.fullName = ko.computed(function() {
				// Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
				return self.firstName() + " " + self.lastName();
			});*/
			
			/*self.fullName = ko.pureComputed(function() {
				// Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
				return self.firstName() + " " + self.lastName();
			});*/
			
			self.fullName = ko.computed({
				read: function(){
					return self.firstName() + " " + self.lastName();
				},
				write: function(value){
					var firstSpacePos = value.indexOf(" ");
					var lastSpacePos = value.lastIndexOf(" ");
									
					if (lastSpacePos > 0) { // Ignore values with no space character
						self.firstName(value.substring(0, firstSpacePos)); // Update "firstName"
						self.lastName(value.substring(firstSpacePos + 1)); // Update "lastName"
					}
				},
				owner: self
			});
		//END HELLO WORLD VIEWMODEL
		
		//START RAW VIEWMODEL
			self.price = ko.observable(25.99); 
			self.formattedPrice = ko.pureComputed({
				read: function () {
					return '$' + self.price().toFixed(2);
				},
				write: function (value) {
					// Strip out unwanted characters, parse as float, then write the
					// raw data back to the underlying "price" observable
					value = parseFloat(value.replace(/[^\.\d]/g, ""));
					self.price(isNaN(value) ? 0 : value); // Write to underlying storage
				},
				owner: self
			});
		//END RAW VIEWMODEL
		
		//START Filtering and validating user input VIEWMODEL
			
			

			 
		//END Filtering and validating user input VIEWMODEL
	};
	 
	var modelFilteringValidating = function (){
		var self = this;
	
		self.oldValue = ko.observable(123);
		self.acceptedNumericValue = ko.observable(123);
		self.lastInputWasValid = ko.observable(true);
	 
		self.attemptedValue = ko.pureComputed({
			read: self.acceptedNumericValue,
			write: function (value) {
				if (isNaN(value)){
					
					self.lastInputWasValid(false);
					self.acceptedNumericValue('').acceptedNumericValue(self.oldValue());
					
				}else {
					
					self.lastInputWasValid(true);
					self.acceptedNumericValue(value); // Write to underlying storage
					self.oldValue(value);					
				}
				
				//console.log("After: "+self.oldValue());
			},
			owner: self
		});
	}
	
	ko.applyBindings(new ViewModel(),$('#formOne')[0]); // This makes Knockout get to work
	ko.applyBindings(modelFilteringValidating,$('#formFilter')[0]); 
	
	
});