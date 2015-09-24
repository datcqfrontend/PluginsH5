var drcom = drcom || {};

drcom.config = {};

drcom.config.include = {
	core: ['../../../presentation/global/css/font.css'],
    navigation: ['menu/custom'],
    content: ["plugins/plugins.js","../../../presentation/global/js/js.js"],
    player:["player/si/switchPresentation","player/si/close"]
};

drcom.config.debug = {
    host: 'int-dev.drcom.asia',
    enabled: false
};

drcom.config.navigation = {
    name: '13_1_SENSODYNE_DEMO',
    slides: {
        data: 'presentation/slides.json',
        folder: 'presentation/assets/%slide.name%/',
        index: 'index.html'
    },
    flows: {
        list: {
            main: "presentation/flows/menu.json"
        }
    },
    stage: {
        layout: { width: 1024, height: 768 }
    },
    slider: {
        layout: { width: 1024, height: 768 },
        duration: 700,
        animation: false
    },
    menu: {
	    slideSorterPath : "presentation/captures/%slide.name%.jpg",
	    layout: { width: 'auto', height: 'auto', bottom: 0, left: 0,top:"initial" },
        thumbPath: "presentation/thumbnails/%slide.name%.png",
        showTitle: true,
        autoShowSubmenu: true,
        plugin: 'customMenu',
        type: 'custom' //add this if using custom menu
    }
};

drcom.config.SI = {
  url : 'presentation/si.json',
  loadingPage : {
  	file : null
  },
  switchPresentation : {
  	clip : 'icons/clip.png',
  	layout : {
  		clip : {
  			width : 290,
  			height : 42,
  			right : 40,
  			top : 0,
			"z-index":2000
  		},
  		list : {
  			width : 315,
  			right : 60,
  			top : 50,
			"z-index":2000
  		}
  	},
  	type: 'custom',
  	plugin : 'siCustomeSwitchPresentation',
    limitation: ['slidesorter','presentation']
  },
  closeButton : {
  	icon : 'icons/close.png',
  	background: '',
  	layout : {
  		width : 32,
  		height : 32,
  		right : 4,
  		top : 6
  	},
  	type:"custom",
  	plugin:"siCustomeCloseButton"
  }
};