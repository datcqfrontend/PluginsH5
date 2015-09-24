steal(
	'jquery/controller/view',
	'jquery/view',
	'jquery/view/ejs',
	'../../../plugins/iscroll/iscroll.js'
)
.then(
	'../../../player/si/switchPresentation/views/presentation.ejs',
	'../../../player/si/switchPresentation/css/presentation.css'
).
then(function(){

/**
 * @class drcom.Controllers.SI.SwitchPresentation
 * @parent player.si
 * @inherits jQuery.Controller
 * @constructor
 * 
 * Display a paperclip an the list of presentation selected for the meeting based on <code>drcom.player.models.meeting.presentations</code> model.
 * 
 * When a presentation is selected, call the [drcom.Class.Connector.SI.loadPresentation loadPresentation] method with 
 * the presentation id in parameter.
 * 
 */
drcom.Controllers.SI.SwitchPresentation('drcom.Controllers.SI.CustomSwitchPresentation',
/** @Static */
{
	pluginName: 'siCustomeSwitchPresentation',
	
	/*
	 * @attribute defaults
	 * 
	 * default configuration:
     * 
     * @codestart
     * {
     *  //default html template for the paperclip and the presentation list
     *  template: '//drcom/player/si/switchPresentation/views/presentation.ejs',
     * 
     *  config: {
     *      clip:   '', // paperclip image path
     *      layout: {}  // layout config (width, height,...)
     *  },
     *   
     *  // css properties applied on clip and presentation list elements
     *  css: {
     *      clip: {  
     *        width: '10px',
     *        height: '10px',
     *        position: 'absolute'
     *     },
     *     list: {
     *        position: 'absolute'
     *     }
     *   }
     * }
     * @codeend
     * 
	 */
	defaults: {
		template: '../../player/si/switchPresentation/views/presentation.ejs',
	}
},
/** @Prototype */
{
	

	/*
	 * Render the paperclip + list and apply the layout/css configuration.
	 */
	render: function(){
		    this.element.append(
				this.view(this.options.template, { 
					presentations: this.models,
					current_presentation:this.options.meeting.current_presentation
				})
			);

			new iScroll($(".siPresentationList .section")[0],{
				checkDOMChanges:true,
				hideScrollbar:false
			});
			this.clip = $('.siPresentationClip', this.element);
			this.list = $('.siPresentationList', this.element);
			
			
			this.clip.css($.extend(this.options.css.clip, this.options.config.layout.clip));
			this.clip.css({
				backgroundImage: 'url(' + this.options.config.clip + ')'
			});
			this.list.css($.extend(this.options.css.list, this.options.config.layout.list));
			
			$("h3",this.element).html($("#siPresentationTitle").html());
				
			var el=$("popover",this.element);
			if(this.options.css.list.left && this.options.css.list.top)
				el.addClass("lefttop");
			if(this.options.css.list.right && this.options.css.list.top)
				el.addClass("righttop");
			if(this.options.css.list.left && this.options.css.list.bottom)
				el.addClass("leftbottom");
			if(this.options.css.list.right && this.options.css.list.bottom)
				el.addClass("rightbottom");

	},
	/*
     * When the paperclip is tapped, show/hide the presentation list
     * 
     * @param {jQuery.Element} el clicked element
     * @param {jQuery.Event} e jquery event
     */
    ".siPresentationClip tapone": function(el, ev){
		this.list.toggle();
		return false;
	},
	/*
     * When a presentation item is tapped, call the [drcom.Class.Connector.SI.loadPresentation loadPresentation] method with 
     * the presentation id in parameter.
     *
     * @param {jQuery.Element} el clicked element
     * @param {jQuery.Event} e jquery event
     */
    ".siPresentationLink tapone": function(el, e){
		$([drcom]).trigger('presentation:switch');
		this.connector.loadPresentation(el.model().id);
	},
	"{window} tapone":function()
	{
		this.list.hide();
	}
});

});
