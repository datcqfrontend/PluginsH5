$(document).bind('ready',function(){
	//********************************** VISIBLE *******************************************
	var viewModelVisible1 = {
        shouldShowMessage: ko.observable(true) // Message initially visible
    };
	ko.applyBindings(viewModelVisible1,$('#message1')[0]);	
	var viewModelVisible2 = {
        myValues: ko.observableArray([]) // Message initially visible
    };
	ko.applyBindings(viewModelVisible2,$('#message2')[0]);
	viewModelVisible2.myValues.push("some value"); 
	
	setTimeout(function(){
		console.log("Hidden");
		viewModelVisible1.shouldShowMessage(false); // ... now it's hidden
		
		setTimeout(function(){
			console.log("Visible");
			viewModelVisible1.shouldShowMessage(true); // ... now it's visible again
		},2000);
	},2000);	

	//********************************** TEXT *******************************************
	var viewModelTest1 = {
		myMessage: ko.observable()
	}
	ko.applyBindings(viewModelTest1,$('#bindingText1')[0]);
	viewModelTest1.myMessage("Hello world!");
	
	var viewModelTest2 = {
        price: ko.observable(24.95)
    };
    viewModelTest2.priceRating = ko.pureComputed(function() {
		setTimeout(function(){
			viewModelTest2.price(100);
		},5000);
	
        return this.price() > 50 ? "expensive" : "affordable";
    }, viewModelTest2);
	ko.applyBindings(viewModelTest2,$('#bindingText2')[0]);
	
	//********************************** HTML *******************************************
	var viewModelHTML = {
		detailHTMLs: ko.observable()
	}
	ko.applyBindings(viewModelHTML,$('#bindingHTML')[0]);
	viewModelHTML.detailHTMLs("<em>For further details, view the report <a href='report.html'>here</a>.</em>");
	
	//********************************** CSS *******************************************
	var viewModelCSS1 = {
		currentProfit: ko.observable(150000)
	}
	ko.applyBindings(viewModelCSS1,$('#bindingCSS1')[0]);	
	viewModelCSS1.currentProfit(-50);
	
	var viewModelCSS2 = {
		currentProfit: ko.observable(150000)
	}
	viewModelCSS2.profitStatus = ko.pureComputed(function(){
		return this.currentProfit() < 0 ? "profitWarning" : "profitPositive";
	},viewModelCSS2);
	
	ko.applyBindings(viewModelCSS2,$('#bindingCSS2')[0]);	
	viewModelCSS2.currentProfit(-50);
	
	//********************************** STYLE *******************************************
	var viewModelStyle = {
		currentProfit: ko.observable(150000)
	}
	ko.applyBindings(viewModelStyle,$('#bindingStyle')[0]);	
	viewModelStyle.currentProfit(-50);
	
	//********************************** ATTR *******************************************
	var viewModelAttr = {
		url: ko.observable("year-end.html"),
        details: ko.observable("Report including final year-end statistics")
	}
	ko.applyBindings(viewModelAttr,$('#bindingAttr')[0]);	
});