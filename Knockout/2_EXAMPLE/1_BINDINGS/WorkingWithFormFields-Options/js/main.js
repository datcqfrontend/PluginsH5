$(document).bind('ready',function(){
	// Constructor for an object with two properties
	var Country = function(name, population) {
		this.countryName = name;
		this.countryPopulation = population;
	};
		
	var viewModelOptions1 = function(params){
		var self = this;
		
		self.availableCountries = ko.observableArray(['France', 'Germany', 'Spain']);
		setTimeout(function(){
			self.availableCountries.push('China');
		},2000);
		   
        self.availableCountries2 = ko.observableArray([
            new Country("UK", 65000000),
            new Country("USA", 320000000),
            new Country("Sweden", 29000000)
        ]);
        self.selectedCountry = ko.observable(); // Nothing selected by default
    
	
	
		self.myItems = [
            { name: 'Item 1', id: 1, disable: ko.observable(false)},
            { name: 'Item 3', id: 3, disable: ko.observable(true)},
            { name: 'Item 4', id: 4, disable: ko.observable(false)}
        ];
        self.setOptionDisable = function(option, item) {
            ko.applyBindingsToNode(option, {disable: item.disable}, item);
        };
	
	}		
	ko.applyBindings(viewModelOptions1,$('#viewModelOptions1')[0]);	
});