$(document).bind('ready',function(){
	
	var viewModelValue1 = function(params){
		var self = this;
		
		self.buyer = { name: 'Franklin', credits: 250 };
        self.seller = { name: 'Mario', credits: 5800 };
		
		self.people = [
			{ name: 'Franklin', credits: 250 },
			{ name: 'Mario', credits: 5800 }
		];		
		
		self.seasons = ko.observableArray([
            { name: 'Spring', months: [ 'March', 'April', 'May' ] },
            { name: 'Summer', months: [ 'June', 'July', 'August' ] },
            { name: 'Autumn', months: [ 'September', 'October', 'November' ] },
            { name: 'Winter', months: [ 'December', 'January', 'February' ] }
        ]);
		
		
		self.employees = ko.observableArray([
            { name: "Kari", active: ko.observable(true) },
            { name: "Brynn", active: ko.observable(false) },
            { name: "Nora", active: ko.observable(false) }
        ]),
        self.displayMode = function(employee) {
            // Initially "Kari" uses the "active" template, while the others use "inactive"
            return employee.active() ? "active" : "inactive";
        }
		self.employees()[1].active(true);
	}		
	ko.applyBindings(viewModelValue1,$('#viewModelValue1')[0]);	
	
	
});