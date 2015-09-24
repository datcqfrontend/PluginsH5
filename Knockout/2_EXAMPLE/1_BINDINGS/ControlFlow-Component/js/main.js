$(document).bind('ready',function(){
	
	var viewModelComponent1 = function(params){
		var self = this;
		
		self.text = ko.observable(params && params.initialText || '');
	}
	
	ko.components.register('message-editor', {
		viewModel: viewModelComponent1,
		template: 'Message: <input data-bind="value: text" /> '
				+ '(length: <span data-bind="text: text().length"></span>)'
	});
	
	ko.applyBindings(viewModelComponent1,$('#viewModelComponent1')[0]);	
	
	
});