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
		
		$.fn.shuffleElements = function() {
 
			var allElems = this.get(),
				getRandom = function(max) {
					return Math.floor(Math.random() * max);
				},
				shuffled = $.map(allElems, function(){
					var random = getRandom(allElems.length),
						randEl = $(allElems[random]).clone(true)[0];
					allElems.splice(random, 1);
					return randEl;
			   });
	 
			this.each(function(i){
				$(this).replaceWith($(shuffled[i]));
			});
	 
			return $(shuffled);
		};
		
		$.fn.shuffleArray = function(){	
			var array = $(this);
			var currentIndex = array.length, temporaryValue, randomIndex ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		  }

		  return array;
		}
		
		function cover(){
			
			var 
				t = new TimelineMax({delay:0.25, paused:true}),
				audio = $('#animalSounds')[0],
				title = $('#cover .letter'),
				ladybird = $('#cover .ladybird'),
				animalsToSlideIn = $('#cover .animal:not(.hen)'),
				hen = $('#cover .hen'),
				feathers = $('#cover .hen .feather'),
				flightPath = $('#cover .flightPath'),
				data = Snap.path.toCubic(flightPath.attr('d')),
			    dataLength = data.length,
			    points = [], //holds our series of x/y values for anchors and control points,
			    pointsString = data.toString(),
				zoom = 3; //orig svg 100, viewbox 300
			
			function _removeEgg(){
				$(this).remove();
			}
			
			function _layEgg(){
				var $egg = $('<div class="egg"></div>');
					$('#cover .hen').before($egg);
					var tEgg = new TimelineMax({paused:true, onCompleteScope:$egg, onComplete:_removeEgg});
					tEgg
						.fromTo($egg, 0.3, {opacity:1, rotation:0, top:690, left:'50%'}, {top:'+=42', ease:Bounce.easeOut})
						.to($egg, 10.5, {left:'+=200'})
						.to($egg, 0.9, {top:'+=4', yoyo:true, repeat:1, delay:0.3}, '-=10.5') //0.3
 						.to($egg, 1.3, {top:'+=4', delay:3.2}, '-=10.5')  //3.5
						.to($egg, 3.3, {top:'-=4', delay:4.8}, '-=10.5')  //3.5
						.to($egg, 1.0, {top:'+=1', delay:8.5}, '-=10.5')  //3.5
						.to($egg, 10.5, {rotation:400}, '-=10.5')
						.to($egg, 0.5, {opacity:0, delay:10.5}, '-=10.5')
						
				tEgg.timeScale(4).play();
			}
			
			function wobbleTitle(){
				TweenMax.staggerFromTo(title, 0.5, {rotation:-2}, {rotation:2, yoyo:true, repeat:-1,  ease:Power1.easeInOut}, 0.05);
				TweenMax.set(title, {css:{transformPerspective:500, perspective:500, transformStyle:'preserve-3d'}});
				 $.each(title, function(i, o){
					 TweenMax.fromTo(o, 1, {css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
				 });
			}
			
			function _playAudio(audio){
				var
					$this = $(this),
					start = $this.data('audiostart'),
					length = $this.data('audiolength') * 1000,
					hasAudio = !isNaN(start) && !isNaN(length);
				
				if (hasAudio){
					audio.currentTime = start;
					audio.play();
					setTimeout(function(){
						audio.pause();
					}, length);
				}
			}
			
			function _pressBounce(){
				var
					$this = $(this),
					ta = new TimelineMax({paused:true});
					
				ta
					.to($this, 0.2, {scale:1.5, ease:Back.easeIn})
					.to($this, 0.5, {scale:1, ease:Bounce.easeOut},'0.2' );	
				ta.play();
			}
			
			function _pressVanish(){
				var
					$this = $(this),
					ta = new TimelineMax({paused:true});
					
				ta
					.to($this, 0.2, {scale:0, ease:Back.easeIn})
					.to($this, 0.5, {scale:1, ease:Bounce.easeOut},'0.2' );
				ta.play();
			}
			
			function _pressSpin(){
				var
					$this = $(this);
					console.log($this.is('.animating'));
				
			if ($this.is(':not(.animating)')){
				ta = new TimelineMax({paused:true});
				$this.addClass('animating');		
				ta
					.to($this, 1.5, {rotation: 720, ease:Back.easeInOut})
					.set($this, {rotation:0})
					.addCallback(function(){
						console.log('done');
						$this.removeClass('animating');
					});
					
				ta.play();
				} else{
					console.log('gotta wait');
				}
			}
						
			$('#cover .animal').click(function(){
				_pressBounce.call(this);
				_playAudio.call(this, $('#animalSounds')[0]);
				if ($(this).is('.hen')){
					_layEgg();
				}
			});
			
			function _titleClick(){
				// var rnd = Math.round(Math.random() * 2);
					// switch(rnd){
						// case 0: _pressBounce.call(this); break;
						// case 1: _pressVanish.call(this);break;
						// case 2: _pressSpin.call(this);break;
					// }
					_pressSpin.call(this);
			}
			
			Draggable.create(title, {
				bounds:$('#container'),
				throwProps: true,
				type:'x,y',
				edgeResistance:1,
				zIndexBoost:true,
				cursor:'move',
				force3D: true,
				onDragEnd:function(){
					var 
						velocityX = ThrowPropsPlugin.getVelocity(this.target, 'x'),
						velocityY = ThrowPropsPlugin.getVelocity(this.target, 'y'),
						max = Math.max(Math.abs(velocityX), Math.abs(velocityY)),
						rotate = Math.ceil(max/500) * 360;
					
					if (max > 500){
						var a = new TimelineMax({paused:true});
						a.to(this.target, 3.5, {rotation: rotate})
						a.play();
					}
				},
				onThrowComplete: function(){
					TweenMax.to($(this.target),4,{x:0,y:0,ease:Elastic.easeOut});
				}, 
				onClick:function(){
					_titleClick.call(this.target);	
				}
			});

			// convert cubic data to GSAP bezier
			for (var i = 0; i < dataLength; i++) {
			  var seg = data[i];
			  if (seg[0] === "M") { // move (starts the path)
			    var point = {};
			    point.x = seg[1] * zoom;
			    point.y = seg[2] * zoom;
			    points.push(point);
			  } else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
			    for (var j = 1; j < 6; j+=2) {
			      var point = {};
			      point.x = seg[j] * zoom;
			      point.y = seg[j+1] * zoom;
			      points.push(point);
			    }
			  }
			}
			
			for (var i = 0; i < 24; i++){
				var temp = flightPath.clone()
				$(temp).attr('class', 'flightPath').appendTo('#cover svg');
			}
				
			t
				.addCallback(wobbleTitle, 0.9)
				.add(TweenMax.staggerFrom(title, 1, {scale:0, ease:Back.easeOut}, 0.05))
			
			for (var i=0; i<=24; i++){
				x = i *4;
				y = i * 4 + 2;
				start = x + '% ' + x + '%';
				end = x + '% ' + y + '%';
				time = 2/24;
				t.add(TweenMax.fromTo($('#cover .flightPath').eq(i), time, {drawSVG:start}, {drawSVG:end, ease:Power0.easeOut}));
			}
		
			t
				.set(ladybird, {visibility:'visible', x:points[0].x, y:points[0].y}, '-=2.2')
				.to(ladybird, 2.2, {bezier:{type:"cubic", values:points}, ease:Power0.easeOut}, '-=2.2')
				.staggerTo(animalsToSlideIn, 0.2, {margin:0, ease:Back.easeOut}, 0.1)
				.staggerFromTo(animalsToSlideIn, 1, {scale:0.5}, {scale:1, ease:Elastic.easeOut}, 0.1, '-=1')
				.staggerFromTo(hen, 0.75, {scale:0}, {scale:1, ease:Elastic.easeOut}, 0.1);
				
			var delay = 0.65;
			$.each(feathers, function(i, o){
				var angle = (Math.random() * -90 -45).toFixed(1),
				time = 3,
				velocity = Math.random() * 100 + 500,
				direction = angle < -90 ? -1 : 1,
				rotate = direction * 90;
				
				//console.log('angle:', angle, 'delay:', delay, 'rotate:', rotate, 'direction:' + direction + ', velocity:' + velocity);
				
				//t.set(o, {transform:'scaleX(' + direction + ')'});
				t.fromTo(o, time, {scale:0.3}, {scale:3, physics2D:{velocity:velocity, angle: angle, gravity:500}, directionalRotation:rotate + '_short'}, '-=' + delay);
				
				//t.fromTo(o, 2, {left:'-=200'}, {left:'+=200', yoyo:true,repeat:3, ease:Sine.easeInOut}, '-=2');
				//t.to(o, 1, {throwProps:{physics2D:{angle: '270'}}}, '-=1');
				
				
				//t.to(o, 3, {throwProps:{y:{velocity:velocity/4}}}, '-=1.75');
				//t.fromTo(o, 4, {throwProps:{marginLeft:'-2px'}}, {throwProps:{marginLeft:'2px'}, yoyo:true, repeat:3, ease:Sine.easeInOut}, '-=0.5');
				
				//t.fromTo(o, 4, {border:'1px solid red', left:'-=150'}, {border:'1px solid green', left:'+=150', yoyo:true, repeat:1}, '-=3');
				//t.to(o, 4, {border:'1px solid red', bottom:'0px'}, '-=3');
				//t.to(o, 2, {physicsProps:{y:{friction:0.2}}}, '-=2');
				delay = time;// - (i * 0.01);; //0.01);
			});
				
			t.play();
			
			var s = new ScrollScene({triggerElement: '#cover', offset: 400, duration:6000})//triggerElement:'#page1', duration:1500, offset:160})
				//.setTween(t)
				.setPin('#cover')
				.addTo(controller);

			s.addIndicators({zindex:100, suffix:"cover"});
		}

		function page1(){
			var t = new TimelineMax(),
				leftFish = $('#page1 .fish.left'),
				rightFish = $('#page1 .fish.right'),
				pads = $('#page1 .pad');
			
			t.add(TweenMax.staggerFromTo(pads, 3, {x:'-=10'}, {x:'+=10', repeat:4, yoyo:true}, 0.5));
			t.add(TweenMax.staggerFromTo(leftFish, 3, {x:'+=10', y:'+=5'}, {x:'-=10', y:'-=3', repeat:4, yoyo:true}, 0.8), '-=15');
			t.add(TweenMax.staggerFromTo(rightFish, 3, {x:'-=15', y:'-=2'}, {x:'+=15', y:'+=6', repeat:4, yoyo:true}, 1.3), '-=15');
			
			//{css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
			
			var s = new ScrollScene({triggerElement: '#page1', offset: 384, duration:3000})//triggerElement:'#page1', duration:1500, offset:160})
				 .setTween(t)
				.setPin('#cover')
				.setPin('#page1')
				.addTo(controller);
			//t.play();
			s.addIndicators({zindex:100, suffix:"page1"});
		}
		
		cover();
		page1();