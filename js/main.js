var controller = new ScrollMagic();
		
		$.fn.wrapChars = function(){
			console.log('wrapChars:', this);
			var elCharArray = $(this.text().split('')).map(function(i,o){return '<span>' + o + '</span>';})
			var elNewHtml = elCharArray.toArray().join('').replace(/ /g, '\u00a0')
			this.html(elNewHtml);
			return this;
		}
		
		$.fn.wrapWords = function(){
			console.log('wrapWords:', this);
			var elCharArray = $(this.text().split(' ')).map(function(i,o){return '<span>' + o + '</span>';})
			var elNewHtml = elCharArray.toArray().join(' ');//.replace(/ /g, '\u00a0')
			this.html(elNewHtml);
			return this;
		}
		
		function cover(){
			
			//var a = new TimelineMax()
				//.add(TweenMax.fromTo($('#cover .whatword>div'), 1.5, {skew:-180}, {skew:180}));

			function ladybirdUpdate(){
				console.log('ladybirdUpdate');
			}
			
			var ladybirdPath = [{x:62, y:-44}, {x:225, y:-70}, {x:210, y:-85}, {x:190, y:-75}, {x:206, y:-62}, {x:480, y:-130}],
				title = $('#cover .whatword>div, #cover .theword, #cover .ladybirdword>div, #cover .heardword>div'),
				ladybird = $('#cover .ladybird'),
				animals = $('#cover .animal');
				//goose = $('#cover .goose'),
				//sheep = $('#cover .sheep'),
				//horse = $('#cover .horse')
				//duck = $('#cover .duck'),
				//cow = $('#cover .cow'),
				//pig = $('#cover .pig');
				
			TweenMax.staggerFromTo(title, 0.5, {rotation:-3}, {rotation:3, yoyo:true, repeat:-1, ease:Power1.easeInOut}, 0.1);
			
			var t = new TimelineMax({delay:1.5})
				.add(TweenMax.staggerFrom(title, 1, {scale:0, ease:Elastic.easeInOut}, 0.05))
				
				//.add(TweenMax.staggerFrom($('#cover .theword'), 0.2, {scale:0, ease:Power2.easeOut}, 0))
				//.add(TweenMax.staggerFrom($('#cover .ladybirdword>div'), 0.2, {scale:0, ease:Power3.easeOut}, 0.05))
				//.add(TweenMax.staggerFrom($('#cover .heardword>div'), 0.2, {scale:0, ease:Power4.easeOut}, 0.05))
				.add(TweenMax.from(ladybird, 0.01, {display:'block'}))
				.add(TweenMax.from(ladybird, 4, {display:'block', bezier:{values:ladybirdPath}, onUpdate:ladybirdUpdate}))
				.add(TweenMax.staggerFrom(animals, 1, {left:0, ease:Power1.easeOut}, 0.2))
				//.add(TweenMax.from(goose, 0.2, {right:-99, ease:Power4.easeOut}, 4.2))
				//.add(TweenMax.from(sheep, 0.2, {right:-162, ease:Power4.easeOut}, 4.3))
				//.add(TweenMax.from(horse, 0.2, {right:-150, ease:Power4.easeOut}, 4.4))
				//.add(TweenMax.from(duck, 0.2, {left:-83, ease:Power4.easeOut}, 4.5))
				///.add(TweenMax.from(cow, 0.2, {left:-175, ease:Power4.easeOut}, 4.6))
				//.add(TweenMax.from(pig, 0.2, {left:-113, ease:Power4.easeOut}, 4.7))
					
				//.add(TweenMax.from($('#cover .ladybirdword', 500, {x:40, y:0, immediateRender:false})));
			
			/*var s = new ScrollScene({duration:2000})
				.setTween(t)
				.setPin('#cover')
				.addTo(controller);
			
			s.addIndicators({zindex:100, suffix:'cover'});
		
			/*var theme = $('#theme')[0];
			theme.volume = 1.0;
		
			setTimeout(function(){
				theme.play();
			}, 100);
			
			$('#intro h1').wrapChars();
			//var path = [{x:-500,y:100}, {x:100, y:0}, {x:200, y:150}, {x:300, y:30}, {x:500, y:100}];
			
			var elements = $('#intro h1').find('span').get().reverse();
			var path = [{left:'+=20%', top:'0'}, {left:'+=40%', top:'+=40%'}, {left:'+=75%', top:'-=5%'}];
			//var position = {left:path[0].left, top:path[0].top}
			var position = {x:-480, y:100};
			var ti = new TimelineMax()
				.add(TweenMax.fromTo('#intro .logo', 500, {scale:0.1,opacity:0.6},{scale:1, opacity:1, transformOrigin:'50% 35%'}))
				.add(TweenMax.staggerFromTo(elements, 400, {x:-480, y:100, rotation:-280}, {bezier:{values: path, autoRotate:false}, rotation:0, ease:Power1.easeInOut},50))
				
				
			var s = new ScrollScene({duration:1500})
				.setTween(ti)
				.setPin('#intro')
				.addTo(controller)
			s.addIndicators({zindex:100, suffix:'intro'});*/
		}

		
		cover();