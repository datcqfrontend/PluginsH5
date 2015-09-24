$(document).bind('ready',function(){

	var Person = function(name, children) {
		this.name = ko.observable(name);
		this.children = ko.observableArray(children || []);
	};
		
	var PeopleModel = function() {
		this.people = ko.observableArray([
			new Person("Bob", [
				new Person("Jan"),
				new Person("Don", [
					new Person("Ted"),
					new Person("Ben", [
						new Person("Joe", [
							new Person("Ali"),
							new Person("Ken")
						])
					]),
					new Person("Doug")
				])
			]),
			new Person("Ann", [
				new Person("Eve"),
				new Person("Hal")
			])
		]);
	 
		this.addChild = function(name, parentArray) {
			parentArray.push(new Person(name));
		};
	};
	 
	ko.applyBindings(new PeopleModel(),$('#viewModel1')[0]);

	//attach event handlers
	$("#people").on("click", ".remove", function() {
		//retrieve the context
		var context = ko.contextFor(this),
			parentArray = context.$parent.people || context.$parent.children;
	 
		//remove the data (context.$data) from the appropriate array on its parent (context.$parent)
		parentArray.remove(context.$data);
	 
		return false;
	});
	 
	$("#people").on("click", ".add", function() {
		//retrieve the context
		var context = ko.contextFor(this),
			childName = context.$data.name() + " child",
			parentArray = context.$data.people || context.$data.children;
	 
		//add a child to the appropriate parent, calling a method off of the main view model (context.$root)
		context.$root.addChild(childName, parentArray);
	 
		return false;
	});
});