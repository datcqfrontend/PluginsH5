//************* framework ready tmp function ****************

var drcom = drcom || {};

drcom.config = drcom.config || {};

drcom.readyTmp = [];
drcom.ready = function(){
    //store all ready call before framework is loaded
    var func = Array.prototype.slice.call(arguments);
    drcom.readyTmp = drcom.readyTmp.concat(func);
};

//**************** init steal ******************

(function(){

    //get current file location
    var scripts = document.getElementsByTagName('script'), script = null, path = '', match = [];
    for(var index = 0; index < scripts.length ; index++){
        script = scripts.item(index);
        if(/lightness\.js/.test(script.src)){
            match = script.src.match('(.*\/)[^\/]*$');
            path = match && match[1] || '';
        }
    }
    
    //add stealjs script
    script = document.createElement('script'); 
    script.type = "text/javascript";
    script.src = path + 'steal/steal.js';
    script.onload = function(){
        
        //load the framework
        if(window.stealLoaded){
            window.stealLoaded.apply(this, [steal, window.location]);
        }
        else {
            steal.options.env = 'production';
            steal('production');
        }        
    };
    script.onerror = function(){
        throw new Error('stealjs can be found in ' + path + 'steal/steal.js');
    };
    document.getElementsByTagName("head")[0].appendChild(script);    
})();

