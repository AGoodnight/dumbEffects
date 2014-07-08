 ;(function($,window,document,undefined){

	var pluginName = 'spectrum',
			defaults={
				range:[]
			};
 
	function Plugin(element,options){
		this.element = element
		this.options = $.extend({},defaults,options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init(this.element,this.options);
	};
	
	Plugin.prototype.init = function(ele,opt){
	
		var rangePos = 0;
		var mainLoop = function(){

			var tag = $(ele).get(0).tagName;
			var clr = '#';
			var prop;	
			
			for(var i = 0 ; i<6 ; i++){
				var num = Math.round(Math.random()*9);	
				clr+=	num.toString();
			}
				
			if(opt.range.length > 2){
			
				if(rangePos < opt.range.length-1 ){rangePos++}else{rangePos = 0};
				clr = opt.range[rangePos]
			}
			
			if( tag === 'DIV' || 
				tag === 'BODY' ||
				tag === 'SECTION' ||
				tag === 'FIGURE'
			){
				$(ele).animate({'background-color':clr},400, function(){mainLoop();})
			}else{
				$(ele).animate({'color':clr},400, function(){mainLoop();})
			}

		};
		
		mainLoop();
		
	};
	
	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this, 'plugin_'+pluginName,
				new Plugin(this,options));
			}
		});
	}
	

}(jQuery,window,document));
