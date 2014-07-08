 ;(function($,window,document,undefined){
	
	var pluginName = 'slots',
			defaults={
				windows:3,
				speed:1000,
				ease:'easeInOut'
			},
			attributes={
				score:0,
				gameOver:false,
				running:false,
				imgH:200,
				cells:0
			}
 
	function Plugin(element,options){
		this.element = element;
		this.options = $.extend({},defaults,options);
		this.attributes = attributes
		this.defaults = defaults;
		this.name = pluginName;
		this.init();
	};
	
	Plugin.prototype.init = function(){
		
		// reference stuff -----------
		var el = this.element; var op = this.options; var atr = this.attributes;
		var w = this.defaults.windows; var speed = this.defaults.speed; var ease = this.defaults.ease;
		atr.cells = $(el).find('img').length;
		//----------------------------
		
		$(el).append("<div class='reel' id='slotWindows'></div>");
		$("#slotWindows").append("<div class='reel' id='reel0'></div>");
		
		for( var i = 0 ; i<atr.cells ; i++){
			var img = $(el).find('img')[0];
			$("#reel0").append(img);
		};		
		for(var j = 1 ; j<w ; j++){
			$('#reel0').clone().prop({id:"reel"+j}).appendTo("#slotWindows");
		};
		
		// Event Listeners
		//-------------------------------------
		
		var MathRandom =function(){
			num = Math.round(Math.random()*atr.cells)
			if(num>=atr.cells){
				Math.random();
			}else{
				return num;
			}
		}	
		var getRandom = function(){

			var h = parseInt( $("#slotWindows").css('height') );
			
			var rand = MathRandom();
			var rand = rand*-1;
			
			var num = String(h*rand+'px');
			
			return num;
		};		
		var spin = function( what, rando){
			
			var num = 0;
			var revs = 0;
			var reelH = $(what).height()
			
			var a = 20;
			var b = 0;
			var c = 0;
			var reverse;
			
			var go = setInterval(
				function(){
						
						if(c<9){
								
								if(b===0){
									reverse = false;
								}
								if(b===5){
									reverse = true;
								}
								
								if(!reverse){
									b++
								}else{
									b--
								}
						c++
						}
						
						num = b*reelH/10;
						while(num > reelH){
							num = num-reelH;
						}
											
						if(c==9){
							clearInterval(go);
						}
						console.log(num,b);
			
				},100);
						
				var watch(){
				
				}
				
			
			/*var go = setInterval(
				function(){
				
					if(num<reelH-atr.imgH){
						num+=atr.imgH/2;
					}else{
						num=0;
						revs+=1;
					}
					
					$(what).css('top','-'+num+'px');
					console.log(atr.imgH);
					
					if(revs == 3){
						clearInterval(go)
						$(what).animate({'top':rando},300,function(){atr.running = false;});
					}
					
				},50
			)*/

		};
		var run = function(){
			atr.running = true;
			
			for( var j = 0 ; j<w ; j++){
				rando = getRandom();
				spin("#reel"+j, rando);
			}
		}
		
		$("#lever").click(function(){
			if(atr.running !== true){
				run();
			}
		});
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
