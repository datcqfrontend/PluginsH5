// Marching Squares Edge Detection: this is a "marching ants" algorithm used to calc the outline path
(function() {
   	geom = {}; 
	geom.contour = function(grid, start) { 
	var s = start || d3_geom_contourStart(grid), // starting point 
	    c = [],    // contour polygon 
	    x = s[0],  // current x position 
	    y = s[1],  // current y position 
	    dx = 0,    // next x direction 
	    dy = 0,    // next y direction 
	    pdx = NaN, // previous x direction 
	    pdy = NaN, // previous y direction 
	    i = 0; 

	do { 
	  // determine marching squares index 
	  i = 0; 
	  if (grid(x-1, y-1)) i += 1; 
	  if (grid(x,   y-1)) i += 2; 
	  if (grid(x-1, y  )) i += 4; 
	  if (grid(x,   y  )) i += 8; 

	  // determine next direction 
	  if (i === 6) { 
	    dx = pdy === -1 ? -1 : 1; 
	    dy = 0; 
	  } else if (i === 9) { 
	    dx = 0; 
	    dy = pdx === 1 ? -1 : 1; 
	  } else { 
	    dx = d3_geom_contourDx[i]; 
	    dy = d3_geom_contourDy[i]; 
	  } 

	  // update contour polygon 
	  if (dx != pdx && dy != pdy) { 
	    c.push([x, y]); 
	    pdx = dx; 
	    pdy = dy; 
	  } 

	  x += dx; 
	  y += dy; 

	  //console.log(x,y);
	  //console.log(s[0],s[1]);
	} while (s[0] != x || s[1] != y); 

	console.log("break");

	//console.log(c.length);
	return c; 
	}; 

	// lookup tables for marching directions 
	var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN], 
	  d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN]; 

	function d3_geom_contourStart(grid) { 
		var x = 0, 
		    y = 0; 

		// search for a starting point; begin at origin 
		// and proceed along outward-expanding diagonals 
		while (true) { 
		  if (grid(x,y)) { 
		    return [x,y]; 
		  } 
		  if (x === 0) { 
		    x = y + 1; 
		    y = 0; 
		  } else { 
		    x = x - 1; 
		    y = y + 1; 
		  } 
		} 
	} 
})();

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

	      	this.$canvas = $("<canvas width='"+this.config.width+"' height='"+this.config.height+"'></canvas>");
	      	//console.log(this.canvas);
	      	this.canvas = this.$canvas[0];
	      	this.context = this.canvas.getContext('2d');
	      	this.$elem.append(this.$canvas);

	      	//this.displayMessage();
	      
	      	return this;
	    },

	    checkTransparent:function(data){
			for(var i = 0, n = data.length; i < n; i += 4) {
	            var alpha = data[i + 3];
	            if(alpha==0){
	            	return true;
	            }
	        }
	        return false;
		},

	    drawAvatarToBackground:function(options, callback){
	    	var _this = this,
	    		url = options.url,
	    		avatars = options.avatars,
	    		x = options.x || this.config.x,
	    		y = options.y || this.config.y,
	    		w = options.w || this.config.width,
	    		h = options.h || this.config.height,
	    		delay = options.delay || 0;

	    	var areas=[],points,imgData,data,countArea=0;

	    	var defineTransparent=function(x,y){
			  var a=data[(y*w+x)*4+3];
			  return(a==0);
			}

			console.log(url);

			var imgOrigin=new Image();
			imgOrigin.crossOrigin="anonymous";
			imgOrigin.onload=function(){
				_this.context.drawImage(imgOrigin,x,y,w,h);
				
			   	getAreaTransparent();
			}
			imgOrigin.src=url;

			function getAreaTransparent(){
				console.log("Check transparent");
				imgData=_this.context.getImageData(x,y,w,h);
				data=imgData.data;

				if(_this.checkTransparent(data)){

					points=geom.contour(defineTransparent);

					_this.context.save();
					_this.context.beginPath();
				    _this.context.moveTo(points[0][0],points[0][4]);
				    for(var i=1;i<points.length;i++){
				      var point=points[i];
				      _this.context.lineTo(point[0],point[1]);
				    }
				    _this.context.closePath();

				    _this.context.fillStyle = '#fff';
			      	_this.context.fill();
			      	//ctx.lineWidth = 10;
			      	//ctx.stokeStyle = '#fff';
				    //ctx.stroke();
				    _this.context.clip();

					var arrX = [], arrY = [];
			  		for(var j=0;j<points.length;j++){
			  			arrX.push(points[j][0]);
			  			arrY.push(points[j][1]);
			  		}

			  		var minX = Math.min.apply(Math,arrX);
			  		var maxX = Math.max.apply(Math,arrX);
			  		var minY = Math.min.apply(Math,arrY);
			  		var maxY = Math.max.apply(Math,arrY);

			  		areas.push({x:minX,y:minY,w:maxX-minX,h:maxY-minY});	  		
			  		
			  		areas[countArea].url = avatars[countArea];
			  		_this.drawImage(areas[countArea],function(){
			  			_this.context.restore();

			  			countArea++;
			  			getAreaTransparent();
			  		});

			  		
			  		//ctx.strokeStyle = '#f00';
			    	//ctx.strokeRect(minX+0.5, minY+0.5, maxX-minX, maxY-minY);	  		
			  	}else{
			  		console.log("End get area");
			  		console.log(areas);

			  		//ctx.drawImage(imgOrigin,canvas.width/2-imgOrigin.width/2,canvas.height/2-imgOrigin.height/2);
			  	}
			}	

    		/*if (callback && typeof(callback) === "function") {
			    callback();
			}*/
	    },

	    //Declare function
	    drawImage:function(options, callback){
	    	//console.log("Draw Image:"+url);

	    	var _this = this,
	    		imgObj = new Image(),
	    		x = options.x || this.config.x,
	    		y = options.y || this.config.y,
	    		w = options.w || this.config.width,
	    		h = options.h || this.config.height,
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
			var screenshot = Canvas2Image.saveAsPNG(this.$canvas[0], true);

			// This is a little trick to get the SRC attribute from the generated <img> screenshot
			this.$canvas[0].parentNode.appendChild(screenshot);
			screenshot.id = "canvasimage";		
			data = $('#canvasimage').attr('src');
			this.$canvas[0].parentNode.removeChild(screenshot);

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