/*
* jQuery jSlots Plugin
* http://matthewlein.com/jslot/ 
 */

 ;(function($){
	
	$.jSlots = function(el,options){
		
		var base = this;
		base.$el = $(el);
		base.el = el;
		
		base.$el.data("jSlots",base);
		
		base.init = function(){
		
			base.options = $.extend({},$.jSlots.defaultOptions,options);
			base.setup();
			base.bindEvents();
		
		};
		
		// -------------------------------------------------------------------------
		// DEFAULT OPTIONS
		// -------------------------------------------------------------------------
		
		$.jSlots.defaultOptions = {
		
			winnerNumber:1,
			spinner:'',
			onStart:$.noop,
			onEnd:$.noop,
			onWin:$.noop,

		};
		
		// -------------------------------------------------------------------------
		// HELPERS
		// -------------------------------------------------------------------------
		
		base.randomRange = function(low,high){
			return Math.floor( Math.random()*(1+high-low) )+low;
		};
		
		// -------------------------------------------------------------------------
		// VARIABLES
		// -------------------------------------------------------------------------
		
		base.isSpinning = false;
		base.spinSpeed = 0;
		base.winCount = 0;
		base.doneCount = 0;
		
		base.$liHeight = 0;
		base.$liWidth = 0;
		
		base.winners = [];
		base.allSlots = [];
		
		// -------------------------------------------------------------------------
		// FUNCTIONS
		// -------------------------------------------------------------------------
		
		base.setup = function(){
			
			// aliases [ functions and static ]
			var $list = base.$el;
			var $li = $list.find('li').first();
			base.$liHeight = $li.outerHeight();
			base.$liWidth = $li.outerWidth();
			base.liCount = base.$el.children().length;
			
			// we calculate the height of the list BEFORE we add the clone, so the clone is not taken into affect, when spinning, maintaining the illusion that it is looping
			base.listHeight = base.$liHeight * base.liCount;
			// no matter how many loops you add, in this case 6, it will always take the same amount of time you give it to complete the gamble, because of the following
			base.increment = (7000 / 6) / 6;

			
			$list.css('position','relative');
			
			// makes the extra one on the end of $list, so that when you set the css to 'top:0' it looks like it never moved.
			$li.clone().appendTo($list);
			
			base.$wrapper = $list.wrap('<div class="jSlots-wrapper"></div>').parent();
			
			// remove original $list leaving the wrapper
			base.$el.remove();
			
			// clone $list
			for(var i = 3 -1;i>=0;i--){
				base.allSlots.push( new base.Slot() );
			}
		};
		
		base.bindEvents = function(){
			$(base.options.spinner).bind('click', function(e){
				if(!base.isSpinning){
					base.playSlots();
				}
			});
		};
		
		base.Slot = function(){
			this.spinSpeed = 0;
			this.el = base.$el.clone().appendTo(base.$wrapper)[0];
			this.$el = $(this.el);
			this.loopCount = 0;
			this.number = 0;
		};
		
		base.Slot.prototype = {
			
			spinEm:function(){
				var that = this;
				that.$el
					.css( 'top', -base.listHeight ) // top is used so that we do not go beyond the last cell, it aligns it with the top of the wrapper
					.animate( { 'top' : '0px' }, that.spinSpeed, 'linear',function(){
						//the first time this executes it is just as if we made a css call, because it happens in 0 ms. it is as if nothing happened.
						that.lowerSpeed();
					});
			},
			
			lowerSpeed:function(){
			
				// now the spin speed has an actual lenght so that the animate function in spinEm() is not instantanious
				this.spinSpeed += Math.round(base.increment);
				
				this.loopCount++;
				if( this.loopCount < 6 ){
					this.spinEm();
					 console.log("Spin Speed = "+this.spinSpeed);
				} else {
					this.finish();
				}
			},
			
			finish:function(){
				var that = this;
				var endNum = base.randomRange( 1,base.liCount );
				
				console.log('---------------------');
				var finalPos = - ( (base.$liHeight*endNum)-base.$liHeight); console.log( "Final Position = ("+base.$liHeight+" * "+endNum+")-"+base.$liHeight);
				var finalSpeed = ( (this.spinSpeed * 0.5)*(base.liCount) ) / endNum; 	console.log( "Final Speed = ("+this.spinSpeed +" * 0.5"+")*("+base.liCount+") ) / "+endNum );
				
				that.$el
					.css( 'top',-base.listHeight )
					.animate( {'top':finalPos}, finalSpeed, 'swing', function(){
						base.checkWinner(endNum, that);
					});
				
			}
		};
			
		base.checkWinner = function(endNum, slot){
				base.doneCount++;
				slot.number = endNum;
				
				if(
					($.isArray( base.options.winnerNumber ) && base.options.winnerNumber.indexOf(endNum) > -1 )||
					endNum === base.options.winnerNumber
					){
					
					base.winCount++;
					base.winners.push(slot.$el);
					
				};
				
				if (base.doneCount === 3){
					
					var finalNumbers = []; 
					
					$.each(base.allSlots, function(index, val){
						finalNumbers[index] = val.number;
					});
					
					if ( $.isFunction(base.options.onEnd) ){
						base.options.onEnd(finalNumbers);
					};
					
					if( base.winCount && $.isFunction(base.options.onWin) ){
						base.options.onWin(base.winCount, base.winners, finalNumbers);
					};
					
					base.isSpinning = false;
				};
			};
			
		base.playSlots = function(){
				base.isSpinning = true;
				base.winCount = 0;
				base.doneCount = 0;
				base.winners = [];
				
				if($.isFunction(base.options.onStart) ){
					base.options.onStart();
				};
				
				$.each(base.allSlots, function(index, val){
					this.spinSpeed = 0;
					this.loopCount = 0;
					this.spinEm();
				});
		};
			
		base.onWin = function(){
				if($.isFunction(base.options.onWin) ){
					base.options.onWin();
				}
		};
			
		base.init();
			
	};
	
		//------------------------------------------------------------------
		// JQuery Function
		//------------------------------------------------------------------
		
	$.fn.jSlots = function(options){
		if(this.length){
			return this.each(function(){
				(new $.jSlots(this, options));
			});
		}
	};
		

}(jQuery));
