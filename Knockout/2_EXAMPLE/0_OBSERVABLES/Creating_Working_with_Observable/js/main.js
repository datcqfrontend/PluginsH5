$(document).bind('ready',function(){

	//alert("READY");
	
	var person1 = {
		personName: ko.observable('Dat Chau'),
		personAge: ko.observable(30)
	};
	
	var person2 = {
		personName: ko.observable('Ngoc Ha'),
		personAge: ko.observable(27)
	};

	ko.applyBindings(person1, $('#person1')[0]);
	ko.applyBindings(person2, $('#person2')[0]);
	
	/*personl.personName.extend({ 
		notify: 'always', 
		rateLimit: 50 //delay 50 mili-second
	});*/
	
	person1.personName.subscribe(function(oldValue) {
		alert("The person's previous name is " + oldValue);
		
		//Dispose subscription notify
		//subscription.dispose();
	}, null, "beforeChange");
	
	var subscription = person1.personName.subscribe(function(newValue) {
		alert("The person's new name is " + newValue);
	},null, "change");
		
	setTimeout(function(){
		person1.personName('Dat Chau Quoc').personAge(31);
	},2000);
	
	
	var anotherObservableArray = ko.observableArray([
		{ name: "Bungle", type: "Bear" },
		{ name: "George", type: "Hippo" },
		{ name: "Zippy", type: "Unknown" }
	]);
	console.log('The length of the array is ' + anotherObservableArray().length);
	console.log('The first element is ' + anotherObservableArray()[0].name);
	
});