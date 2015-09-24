$(document).bind('ready',function(){
	
	var viewModalForeach = function(){
		var self = this;
		self.people = [
            { firstName: 'Bert', lastName: 'Bertington' },
            { firstName: 'Charles', lastName: 'Charlesforth' },
            { firstName: 'Denise', lastName: 'Dentiste' }
        ]
	}
	ko.applyBindings(viewModalForeach,$('#viewModalForeach')[0]);
	
	var viewModalForeach2 = function(){
		var self = this;
		
		self.people = ko.observableArray([
			{ name: 'Bert' },
			{ name: 'Charles' },
			{ name: 'Denise' }
		]);
	 
		self.yellowFadeIn = function(element, index, data) {
			console.log($(element).filter('li'));
				
			$(element).filter('li').hide().fadeIn(1000);
            //$(element).filter('li').animate({ backgroundColor: 'yellow' }, 200).animate({ backgroundColor: 'white' }, 800);
        };
	 
		self.addPerson = function() {
			self.people.push({ name: "New at " + new Date() });
		};
	 
		self.removePerson = function() {
			self.people.remove(this);
		};
		
		
	}
	ko.applyBindings(viewModalForeach2,$('#viewModalForeach2')[0]);
	
	var viewModalForeach3 = function(){
		var self = this;
		
		self.months = [ 'Jan', 'Feb', 'Mar', 'etc'];
	}
	ko.applyBindings(viewModalForeach3,$('#viewModalForeach3')[0]);
	
	var viewModalForeach4 = {
        categories: ko.observableArray([
            { name: 'Fruit', items: [ 'Apple', 'Orange', 'Banana' ] },
            { name: 'Vegetables', items: [ 'Celery', 'Corn', 'Spinach' ] }
        ])
    };
    ko.applyBindings(viewModalForeach4,$('#viewModalForeach4')[0]);
	
	
	var viewModalForeach5 = {
        myItems: [ 'Apple', 'Orange', 'Banana' ] 
    };
    ko.applyBindings(viewModalForeach5,$('#viewModalForeach5')[0]);
	
	
});