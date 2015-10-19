/* 	Plugin GenerateImage
	Edited by: Dat Chau
	Version: 1.0.0.1
*/

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

	//console.log("break");
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

	      	this.$canvas.hide();
	      
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

		measureText:function(text,style,font,size){
			var str = text + ':' + style + ':' + font + ':' + size;
		    if (typeof(__measuretext_cache__) == 'object' && __measuretext_cache__[str]) {
		        return __measuretext_cache__[str];
		    }

		    var div = document.createElement('DIV');
		        div.innerHTML = text;
		        div.style.position = 'absolute';
		        div.style.top = '-100px';
		        div.style.left = '-100px';
		        div.style.fontFamily = font;
		        div.style.fontWeight = style ? style : 'normal';
		        div.style.fontSize = size;
		    document.body.appendChild(div);
		    
		    var size = [div.offsetWidth, div.offsetHeight];

		    document.body.removeChild(div);
		    
		    // Add the sizes to the cache as adding DOM elements is costly and can cause slow downs
		    if (typeof(__measuretext_cache__) != 'object') {
		        __measuretext_cache__ = [];
		    }
		    __measuretext_cache__[str] = size;
		    
		    return size;
		},

	    drawAvatarToBackground:function(options, callback){
	    	var _this = this,
	    		url = options.url,
	    		avatars = options.avatars,
	    		usernames = options.usernames,
	    		x = options.x || this.config.x,
	    		y = options.y || this.config.y,
	    		w = options.w || this.config.width,
	    		h = options.h || this.config.height,
	    		delay = options.delay || 0;

	    	var areas=[],points,imgData,data,countArea=0;

	    	var defineTransparent=function(x,y){
			  var a=data[(y*w+x)*4+3];
			  return(a<=120);
			}

			//console.log(url);

			var imgOrigin=new Image();
			imgOrigin.crossOrigin="anonymous";
			imgOrigin.onload=function(){
				//console.log(this.width, this.height);
				h = Math.round(this.height*w/this.width);
				_this.$canvas.attr('height',h);

				_this.context.drawImage(imgOrigin,x,y,w,h);
				
			   	getAreaTransparent();
			}
			imgOrigin.src=url;

			function getAreaTransparent(){
				
				imgData=_this.context.getImageData(x,y,w,h);
				data=imgData.data;

				if(_this.checkTransparent(data)){
					//console.log("Check transparent: "+countArea);
					points=geom.contour(defineTransparent);

					_this.context.save();
					_this.context.beginPath();
				    _this.context.moveTo(points[0][0],points[0][1]);
				    for(var i=1;i<points.length;i++){
				      var point=points[i];
				      _this.context.lineTo(point[0],point[1]);
				    }
				    _this.context.closePath();

				    _this.context.fillStyle = '#fff';
			      	_this.context.fill();

			      	//_this.context.lineWidth = 1;
			      	//_this.context.strokeStyle = '#fff';
				    //_this.context.stroke();

				    //_this.context.clip();

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

			  		//console.log(minX, maxX, minY, maxY);  		
			  		
			  		usernames[countArea].x = minX + (maxX-minX)/2;
			  		usernames[countArea].y = maxY;

			  		usernames[countArea].wrapRectW = maxX-minX;
			  		//usernames[countArea].wrapRectH = maxY-minY;
			  		//_this.drawText(usernames[countArea]);

			  		areas[countArea].url = avatars[countArea];
			  		
			  		_this.drawImage(areas[countArea],function(){
			  			//console.log(countArea, avatars.length);
			  			//console.log('Restore');
			  			_this.context.restore();

			  			countArea++;
			  			getAreaTransparent();
			  		});
			  	}else{
			  		_this.context.drawImage(imgOrigin,x,y,w,h);
			  		_this.$canvas.show();

			  		setTimeout(function(){
			  			for(var i=0;i<countArea;i++){
			  				
			  				if(usernames[i].texts){
			  					_this.drawTexts(usernames[i]);
			  				}else{
			  					_this.drawText(usernames[i]);	
			  				}				  			
				  		}

				  		//console.log("End get area");
				  		//console.log(areas);	
			  		},100);
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

	    drawTexts:function(options,callback){
	    	//console.log('Draw texts');

	    	var _this = this,
	    		obj = {};

    		obj.texts = options.texts;
    		obj.x = options.x;
    		obj.y = options.y;

    		obj.textAlign = options.textAlign || 'center';
    		obj.textBaseline = options.textBaseline || '',

    		obj.wrapRect = options.wrapRect || '';
    		obj.wrapRectPaddingX = options.wrapRectPaddingX || 10;
    		obj.wrapRectPaddingY = options.wrapRectPaddingY || 10;
    		obj.wrapRectW = 0;
    		obj.wrapRectH = 0;

    		obj.delay = options.delay || 0;

    		if(obj.texts){
	    		//Count width arr text
	    		for(var i = 0;i<obj.texts.length;i++){
	    			var _text = obj.texts[i].text.replace(/\s/g,'&nbsp;');
	    			//console.log(_text);
	    			var _measureText = _this.measureText(_text,obj.texts[i].fontWeight,obj.texts[i].fontFamily,obj.texts[i].fontSize);

	    			if (i==0) {
	    				obj.wrapRectW += obj.wrapRectPaddingX;
	    			}
	    			obj.wrapRectW += parseInt(_measureText[0]);

	    			if(obj.wrapRectH < parseInt(_measureText[1]/2)){
	    				obj.wrapRectH = parseInt(_measureText[1]/2) + obj.wrapRectPaddingY;
	    			}

	    			//console.log(obj);
	    			
	    			obj.texts[i].x = obj.x;
	    			obj.texts[i].y = obj.y;
	    			obj.texts[i].width = parseInt(_measureText[0]);

	    			//_this.drawText(obj._texts[i], function(){}, obj);
	    		}

	    		//Draw Wrap Rect
	    		if (obj.wrapRect!=''){
	    			_this.context.beginPath();

	    			_this.context.fillStyle = obj.wrapRect;
	    			switch(obj.textAlign){
	    				case "center":
	    					obj._realX = obj.x-obj.wrapRectW/2 +obj.wrapRectPaddingX/2;
	    					_this.context.rect(obj.x-obj.wrapRectW/2,obj.y,obj.wrapRectW,obj.wrapRectH+obj.wrapRectPaddingY/2);	    				
	    					break;

	    				case "left":
	    				case "start":
	    					obj._realX = obj.x;
	    					_this.context.rect(obj.x-obj.wrapRectPaddingX/2,obj.y,obj.wrapRectW,obj.wrapRectH+obj.wrapRectPaddingY/2);	
	    					break;

	    				case "right":
	    				case "end":
	    					obj._realX = obj.x-obj.wrapRectW+obj.wrapRectPaddingX;
	    					_this.context.rect(obj.x-obj.wrapRectW+obj.wrapRectPaddingX/2,obj.y,obj.wrapRectW,obj.wrapRectH+obj.wrapRectPaddingY/2);	
	    					break;
	    			}
	    			
	    			//console.log(obj._realX);

	    			_this.context.fill();					
	    		}

	    		//console.log(obj.texts);
	    		//Draw Text
	    		setTimeout(function(){
	    			for(var i = 0;i<obj.texts.length;i++){
	    				//console.log(obj._realX, obj.texts[i].width);

	    				if(i>0){
	    					obj.texts[i].x = obj.texts[i-1].x + obj.texts[i-1].width;
	    				}else{
	    					obj.texts[i].x = obj._realX;	
	    				}
	    				
		    			_this.context.font = obj.texts[i].fontWeight + ' ' + obj.texts[i].fontSize + ' ' + obj.texts[i].fontFamily;
		    			//console.log(obj.texts[i].fontWeight + ' ' + obj.texts[i].fontSize + ' ' + obj.texts[i].fontFamily);

			    		_this.context.textAlign = 'left';
			    		//_this.context.textBaseline = obj.textBaseline;

			    		//Draw fill text
						_this.context.fillStyle = obj.texts[i].style;
			    		_this.context.fillText(obj.texts[i].text,obj.texts[i].x,obj.texts[i].y+obj.wrapRectH);

			    		//Draw stroke text
			    		if(obj.texts[i].strokeStyle){
			    			_this.context.strokeStyle = obj.texts[i].strokeStyle;
			    			_this.context.strokeText(obj.texts[i].text,obj.texts[i].x,obj.texts[i].y+obj.wrapRectH);	
			    		}			    		
		    		}
	    		},100);
	    		
	    	}

	    	//console.log(options);
	    },

	    drawText:function(options, callback){
	    	//console.log(options);

	    	var _this = this,
	    		text = options.text || '',
	    		x = options.x || 0,
	    		y = options.y || 0,

	    		fontFamily = options.fontFamily || 'Arial',
	    		fontSize = options.fontSize || '20px',
	    		fontWeight = options.fontWeight || 'normal',

	    		style = options.style || 'black',
	    		strokeStyle = options.strokeStyle || 'transparent',

	    		textAlign = options.textAlign || 'center',
	    		textBaseline = options.textBaseline || '',

	    		wrapRect = options.wrapRect || '',
	    		wrapRectPaddingX = options.wrapRectPaddingX || 10,
	    		wrapRectPaddingY = options.wrapRectPaddingY || 10,
	    		wrapRectW = options.wrapRectW || 0,
	    		wrapRectH = options.wrapRectH || 0,

	    		delay = options.delay || 0;

	    	setTimeout(function(){
	    		
	    		//Draw Wrap Rect
	    		if (wrapRect!=''){
	    			var _measureText = _this.measureText(text,fontWeight,fontFamily,fontSize);
	    			wrapRectW = _measureText[0] + wrapRectPaddingX;
	    			wrapRectH = _measureText[1]/2 + wrapRectPaddingY;

	    			_this.context.beginPath();

	    			_this.context.fillStyle = wrapRect;
	    			switch(textAlign){
	    				case "center":
	    					_this.context.rect(x-wrapRectW/2, y,wrapRectW, wrapRectH);	    				
	    					break;

	    				case "left":
	    				case "start":
	    					_this.context.rect(x-wrapRectPaddingX/2, y,wrapRectW, wrapRectH);	
	    					break;

	    				case "right":
	    				case "end":
	    					_this.context.rect(x-wrapRectW+wrapRectPaddingX/2, y,wrapRectW, wrapRectH);	
	    					break;
	    			}
	    			
	    			_this.context.fill();
					
	    		}

	    		//Draw Text
	    		setTimeout(function(){
	    			_this.context.font = fontWeight + ' ' + fontSize + ' ' + fontFamily;

		    		_this.context.textAlign = textAlign;
		    		_this.context.textBaseline = textBaseline;

		    		//Draw fill text
					_this.context.fillStyle = style;
		    		_this.context.fillText(text,x,y+wrapRectH-wrapRectPaddingY/2);

		    		//Draw stroke text
		    		_this.context.strokeStyle = strokeStyle;
		    		_this.context.strokeText(text,x,y+wrapRectH-wrapRectPaddingY/2);

			    	if (callback && typeof(callback) === "function") {
					    callback();
					}
	    		},100);
	    		
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