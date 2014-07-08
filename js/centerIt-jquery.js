;(function($,document,window){

	$.centerIt = function(el,options){
	
		q = this;
		q.$el = $(el);
		q.el = el;
	
		q.init = function(){
			q.options = $({},$.centerIt.defaults,options);
			
			q.$el.css({
				'position':'absolute',
			});
			
			q.setProps(document);
			q.watch();
		};
	
		q.update = function(){
		
			q.$el.css({
				'top':q.winProps[0],
				'left':q.winProps[1]
			});
		
		};
		
		q.setProps = function(what){
		
			var w = q.$el.width();
			var h = q.$el.height();
			var winH	= $(what).height();
			var winW = $(what).width();	
		
			q.winProps = [ 
				(winH/2)-(h/2) ,
				(winW/2)-(w/2)
				];
				
			q.update();
		}
	
		q.watch = function(){
		
			$(window).resize(function(){
				q.setProps(document);
				q.update();
			});
		
		};
		
		q.init();
	
	};
	
	$.fn.centerIt = function(options){
		if(this.length){
			return this.each(function(){
				(new $.centerIt(this,options));
			});
		}
	}

}(jQuery,document,window));