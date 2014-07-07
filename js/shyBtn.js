 ;(function($,window,document,undefined){
	var pluginName = 'shyButton',
			defaults={
				speed:600,
				ease:'easeInOut',
				labels:['Haha!','No, no touch','excuse me']
			},
			attributes={
				windowH:0,
				windowW:0,
				btnH:0,
				btnW:0
			}
 
	function Plugin(element,options){
		this.element = element;
		this.options = $.extend({},defaults,options);
		this.attributes = attributes
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};
	
	Plugin.prototype.init = function(){
	
		var el = this.element
		var op = this.options
		var atr = this.attributes;
		
		atr.windowH = $(document).height();
		atr.windowW = $(document).width();
		atr.btnW = $(el).width();
		atr.btnH = $(el).height();
		
		$(el).css({
				'top':(atr.windowH/2)-(atr.btnH/2),
				'left':(atr.windowW/2)-(atr.btnW/2)
		});
		
		$(el).mouseover(function(e){
		
			var t =Math.round(Math.random()*(atr.windowH-atr.btnH));
			var l = Math.round(Math.random()*(atr.windowW-atr.btnW));
			
			$(this).empty();
			$(this).append(op.labels[  Math.round(Math.random()*op.labels.length-1)  ]);
		
			$(this).stop().animate({
				'top':t,
				'left':l
			},op.speed)
		});
		
		this.watch();
	
	
	};
	
	Plugin.prototype.watch =function(){
	
		var el = this.element
		var op = this.options
		var atr = this.attributes;
	
		$(window).resize(function(){
			atr.windowH = $(document).height();
			atr.windowW = $(document).width();
			
			$(el).css({
				'top':(atr.windowH/2)-(atr.btnH/2),
				'left':(atr.windowW/2)-(atr.btnW/2)
			});
			
		});
	}
	
	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this, 'plugin_'+pluginName,
				new Plugin(this,options));
			}
		});
	}
	

}(jQuery,window,document));
