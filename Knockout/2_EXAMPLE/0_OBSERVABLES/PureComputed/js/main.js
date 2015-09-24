$(document).bind('ready',function(){
	// Here's my data model
	var ViewModel = function() {
		var self = this;		
		self.firstName = ko.observable('John');
		self.lastName = ko.observable('Burns');
		self.prefix = ko.observable('Dr.');
		self.computedLog = ko.observable('Log: ');
		self.fullName = ko.pureComputed(function () {
			var value = self.prefix() + " " + self.firstName() + " " + self.lastName();
			// Normally, you should avoid writing to observables within a pure computed
			// observable (avoiding side effects). But this example is meant to demonstrate
			// its internal workings, and writing a log is a good way to do so.
			self.computedLog(self.computedLog.peek() + value + '; ');
						
			var isFirstEvaluation = ko.computedContext.isInitial(),
				dependencyCount = ko.computedContext.getDependenciesCount();
				
			console.log("Evaluating " + (isFirstEvaluation ? "for the first time" : "again"));
			console.log("By now, this computed has " + dependencyCount + " dependencies");
						
			return value;
		}, self);
	 	 
		//this.step is special to show object has observable
		self.step = ko.observable(0);
		self.next = function () {
			self.step(self.step() === 2 ? 0 : self.step()+1);
		};
		
		
	};	
	
	ko.applyBindings(new ViewModel());
	
	
});