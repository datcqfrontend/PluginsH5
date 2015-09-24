drcom.Controllers.SI.LoadingPage('drcom.Controllers.SI.CustomLoadingPage',
/** @Static */
{
	pluginName: 'siCustomLoadingPage'
},
/** @Prototype */
{	
	/*
	 * When the framework is ready, remove the <code>#loadingPage</code> DOM element and 
	 * call [drcom.Class.Connector.SI.loadingPage loadingPage] with <code>false</code> parameter.
	 */
	'{drcom} slide:ready': function(){		
		var self = this;
		
		setTimeout(function(){						
			self.connector.loadingPage(false);
			self.element.remove();
		}, self.options.config.waiting ? self.options.config.waiting : 0);
		
	}
});

