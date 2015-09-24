(function(window, $){
  	var GenerateImage = function(elem, options){
      	this.elem = elem;
      	this.$elem = $(elem);
      	this.options = options;
    };

	GenerateImage.prototype = {
	    defaults: {
	    	x: 0,
	    	y: 0,
	    	width: 1024,
	    	height: 768,
	    	url: 'server/export.php',
	      	message: 'Hello world!'
	    },
	    init: function() {
	      	this.config = $.extend({}, this.defaults, this.options);
	      	//console.log(this.config);

	      	this.canvas = $("<canvas width='"+this.config.width+"' height='"+this.config.height+"'></canvas>");
	      	//console.log(this.canvas);

	      	this.context = this.canvas[0].getContext('2d');
	      	this.$elem.append(this.canvas);

	      	//this.displayMessage();
	      
	      	return this;
	    },

	    //Declare function
	    drawImage:function(options, callback){
	    	//console.log("Draw Image:"+url);

	    	var _this = this,
	    		imgObj = new Image(),
	    		x = options.x || this.config.x,
	    		y = options.y || this.config.y,
	    		w = options.width || this.config.width,
	    		h = options.height || this.config.height,
	    		delay = options.delay || 0;

	    	//this.drawingImage = true;
	    	imgObj.onload = function() {
	    		setTimeout(function(){
	    			_this.context.drawImage(imgObj, x, y, w, h);
	    			if (callback && typeof(callback) === "function") {
					    callback();
					}
	    		},delay);		        		        
		    };
	    	imgObj.src = options.url;	    	

	    	return this;
	    },

	    drawText:function(options, callback){
	    	var _this = this,
	    		text = options.text || '',
	    		x = options.x || 0,
	    		y = options.y || 0,
	    		font = options.font || '20px Arial',
	    		style = options.style || 'black',
	    		strokeStyle = options.strokeStyle || 'transparent',
	    		delay = options.delay || 0;

	    	setTimeout(function(){
	    		_this.context.font = font;

	    		//Draw fill text
				_this.context.fillStyle = style;
	    		_this.context.fillText(text,x,y);

	    		//Draw stroke text
	    		_this.context.strokeStyle = strokeStyle;
	    		_this.context.strokeText(text,x,y);

		    	if (callback && typeof(callback) === "function") {
				    callback();
				}
			},delay);

	    	return this;	    	
	    },

	    saveImage:function(){
	    	var _this = this;

	    	// Get the canvas screenshot as PNG
			var screenshot = Canvas2Image.saveAsPNG(this.canvas[0], true);

			// This is a little trick to get the SRC attribute from the generated <img> screenshot
			this.canvas[0].parentNode.appendChild(screenshot);
			screenshot.id = "canvasimage";		
			data = $('#canvasimage').attr('src');
			this.canvas[0].parentNode.removeChild(screenshot);

			//console.log(data);

			// Send the screenshot to PHP to save it on the server
			//console.log(this.config.url);

			var request = $.ajax({ 
			    type: "POST", 
			    url: this.config.url,
			    dataType: 'text',
			    data: {
			        base64data : data
			    }
			});

			request.done(function( msg ) {
			  	console.log("Done: "+msg);
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  	//alert( "Request failed: " + textStatus );
			  	console.log("Request failed: " + textStatus);
			});
	    }
	    

	};
  	GenerateImage.defaults = GenerateImage.prototype.defaults;

  	$.fn.generateImage = function(options) {
    	return this.each(function() {
      		new GenerateImage(this, options).init();
    	});
  	};

  	window.GenerateImage = GenerateImage;
})(window, jQuery);