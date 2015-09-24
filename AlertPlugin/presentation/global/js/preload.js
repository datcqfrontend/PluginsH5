$.Class("Drcom.PreloadFont",
    {
      getStyle:function(href,callback)
      {
    	  if($('link[href*="'+href+'"]').length==0) 
	      	return callback();
	      var link=$('link[href*="'+href+'"]')[0];
	      function checkComplete()
	      {
	    	  if(link.sheet!=null)
	    		  if(link.sheet.cssRules!=null)
		        		return callback(link.sheet);
	          setTimeout(checkComplete, 20);
	       }
	       checkComplete.apply(this);
      },
      preloadFont:function(css,callback,type)
      {
		  if(type==null)
    		  type=/[^\("]+\.(otf|ttf|fon|fnt)/g;
	  	  var urls=this.parseFont(css,type);
	  	  this.loadFonts(urls,callback);  	
      },
     
      loadFonts : function(urls,callback){
    	  var self=this;
    	  var loaded=0;
    	  if(urls.length==0)
    		  callback();
    	  for(var i=0;i<urls.length;i++)
    	  {
    		  function load(i,callback)
    		  {
    			  var fontFamily=urls[i].fontFamily;
    			  var url=urls[i].src;
    			  $("<div style='position:absolute;left:0px;font-size:12px;top:0px;text-indent: -1024px;font-family:"+fontFamily+"'>a</div>").appendTo("body");
    			  $.ajax({
    				  url:url,
    				  complete:callback
    			  });
    		  }
    		  load(i,function(){
    			  loaded++;
    			  if(loaded==urls.length)
    				  if(callback!=null)
    					  callback();
    		  });

    	  }
      },
      parseFont : function(sheets,pattern){
     	 
          var self = this,
          w3cImport = false,
          urls=[],
          imported = [],
          importedSrc = [],
          baseURL,thisSheetRules;
          var sheetIndex = sheets.length;
          while(sheetIndex--){//loop through each stylesheet
            var cssPile = '';//create large string of all css rules in sheet

              var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
              var baseURLarr = csshref.split('/');//split href at / to make array
              baseURLarr.pop();//remove file path from baseURL array
              baseURL = baseURLarr.join('/');//create base url for the images in this sheet (css file's dir)
              if (baseURL) {
                baseURL += '/'; //tack on a / if needed
              }

            if(sheets[sheetIndex].cssRules || sheets[sheetIndex].rules){
              thisSheetRules = (sheets[sheetIndex].cssRules) ? //->>> http://www.quirksmode.org/dom/w3c_css.html
                sheets[sheetIndex].cssRules : //w3
                  sheets[sheetIndex].rules; //ie 
              var ruleIndex = thisSheetRules.length;
              while(ruleIndex--){
                if(thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText){
                  var text = thisSheetRules[ruleIndex].style.cssText;

                  if(text.toLowerCase().indexOf('url') != -1){ // only add rules to the string if you can assume, to find an image, speed improvement
                   // cssPile += text; // self.thisSheetRules[ruleIndex].style.cssText instead of self.thisSheetRules[ruleIndex].cssText is a huge speed improvement
                  	  //parse cssPile for image urls
                      var tmpImage = text.match(pattern);//reg ex to get a string of between a "(" and a ".filename" / '"' for opera-bugfix
                       if(tmpImage){
                         var i = tmpImage.length;
                         while(i--){ // handle baseUrl here for multiple stylesheets in different folders bug
                           var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? // protocol-bug fixed
                             tmpImage[i] : 
                               baseURL + tmpImage[i];
                           if(jQuery.inArray(imgSrc, urls) == -1){
                             urls.push({
                            	 src:imgSrc,
                            	 fontFamily:thisSheetRules[ruleIndex].style['font-family']
                             });
                          
                           }
                         }
                       }
                    
                  }
                } else if(thisSheetRules[ruleIndex].styleSheet) {
                  imported.push(thisSheetRules[ruleIndex].styleSheet);
                  w3cImport = true;
                }
              }
            }
            
          
             if(!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
               for(var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++){
                 var iHref = sheets[sheetIndex].imports[iImport].href;
                 iHref = iHref.split('/');
                 iHref.pop();
                 iHref = iHref.join('/');
                 if (iHref) {
                   iHref += '/'; //tack on a / if needed
                 }
                 var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? // protocol-bug fixed
                   iHref : 
                     baseURL + iHref;
                 importedSrc.push(iSrc);
                 imported.push(sheets[sheetIndex].imports[iImport]);
               }
             }
          }//loop

          return urls;


      }
});