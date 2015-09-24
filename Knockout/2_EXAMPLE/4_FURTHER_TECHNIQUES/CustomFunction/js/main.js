$(document).bind('ready',function(){

	ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
		return ko.pureComputed(function() {
			var allItems = this(), matchingItems = [];
			for (var i = 0; i < allItems.length; i++) {
				var current = allItems[i];
				if (ko.unwrap(current[propName]) === matchValue)
					matchingItems.push(current);
			}
			return matchingItems;
		}, this);
	}
	 
	function Task(title, done) {
		this.title = ko.observable(title);
		this.done = ko.observable(done);
	}
	 
	function AppViewModel() {
		this.tasks = ko.observableArray([
			new Task('Find new desktop background', true),
			new Task('Put shiny stickers on laptop', false),
			new Task('Request more reggae music in the office', true)
		]);
	 
		// Here's where we use the custom function
		this.doneTasks = this.tasks.filterByProperty("done", true);
		
		/*this.doneTasks = ko.pureComputed(function() {
			var all = this.tasks(), done = [];
			for (var i = 0; i < all.length; i++)
				if (all[i].done())
					done.push(all[i]);
			return done;
		}, this);*/
	}
	 
	ko.applyBindings(new AppViewModel(),$('#viewModel1')[0]);

	
});