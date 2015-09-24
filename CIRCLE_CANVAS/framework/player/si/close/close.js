steal("plugins/popup").then(function(){
	/**
	 * @class drcom.Controllers.SI.CloseButton
	 * @parent player.si
	 * @inherits jQuery.Controller
	 * @constructor
	 * 
	 * Display a close button over the presentation and call [drcom.Class.Connector.SI.close close] method at click.
	 */
	drcom.Controllers.SI.CloseButton('drcom.Controllers.SI.CustomCloseButton',
	/** @Static */
	{
		pluginName: 'siCustomeCloseButton',
	},
	/** @Prototype */
	{
		init: function(){
			this._super.apply(this,arguments);
			var popup=this.element.attr("rel","#dialogClosePresentation").drcom_popup({
				mask:{
					color:"#000",
					opacity:0.3,
					zIndex:2001
				},
				closeInside: false,
				position: {
		            of: "body",
		            my: "center",
		            at: "center"
		        },
		        zIndex:2001
			}).controller(Drcom.Popup);
			$("#dialogClosePresentation .button").bind("click",function(){
				popup.hide();
			});
			var instance=this;
			$("#dialogClosePresentation .button.YES").bind("click",function(){
				$([drcom]).trigger('presentation:close');
				instance.connector.close();
			});	
		},
		//overwrite click|tapone
		'click': function(){},
		'tapone': function(){}
	});
});