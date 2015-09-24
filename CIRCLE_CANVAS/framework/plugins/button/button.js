$.Controller("Drcom.Button",{
},{

	".button click":function(el,ev){
		var button=el;
		if(button.hasClass("disable")==true)//button is disabled
			return;
		button.data("tapone").apply(this,[button.hasClass("active"),ev]);
	},
	add:function(buttonId,buttonFunction){
		$('<div class="button" id="navbutton-' + buttonId + '" ></div>').data("tapone",buttonFunction).appendTo(this.element);
		this.deactive(buttonId);
		this.disable(buttonId);
	},
	remove:function(buttonId)
	{
		$("#navbutton-"+buttonId,this.element).remove();
	},
	active:function(buttonId)
	{
		$("#navbutton-"+buttonId,this.element).addClass("active");
	},
	deactive:function(buttonId)
	{
		$("#navbutton-"+buttonId,this.element).removeClass("active");
	},
	enable:function(buttonId)
	{
		$("#navbutton-"+buttonId,this.element).removeClass("disable");
	},
	disable:function(buttonId)
	{
		$("#navbutton-"+buttonId,this.element).addClass("disable");
	}
});
drcom.button=$("<div class='buttons'></div>").appendTo("#stage").drcom_button().controller();