var controller = new ScrollMagic();
		
		eggPoints = [];
		points = []; //holds our series of x/y values for anchors and control points,
		
function cover(){
	
	var 
		mainTimeline = new TimelineMax({delay:0.25, paused:true}),
		audio = $('#animalSounds')[0],
		title = $('#cover .letter'),
		ladybird = $('#cover .ladybird'),
		animalsToSlideIn = $('#cover .animal:not(.hen)'),
		hen = $('#cover .hen'),
		feathers = $('#cover .hen .feather'),
		flightPath = $('#cover .flightPath'),
		data = Snap.path.toCubic(flightPath.attr('d')),
		dataLength = data.length,
		
		pointsString = data.toString(),
		
		eggPath = $('#cover .eggPath'),
		eggPathData = Snap.path.toCubic(eggPath.attr('d')),
		eggPathLength = eggPathData.length,
		
		eggPointsString = eggPathData.toString(),
		
		zoom = 3, //orig svg 100, viewbox 300
		coverTweens = {
			bounce : function(el){
				return { name: 'bounce', tweens:[
					TweenMax.to(el, 0.2, {scale:1.8, ease:Back.easeIn}),
					TweenMax.to(el, 0.5, {scale:1, ease:Bounce.easeOut, delay: '0.2'})
				]}
			},
			vanish : function(el){
				return { name: 'vanish', tweens:[
					TweenMax.to(el, 0.2, {scale:0, ease:Back.easeIn}),
					TweenMax.to(el, 0.5, {scale:1, ease:Bounce.easeOut, delay:0.2})
				]}
			},
			spin : function(el){
				return{name:'spin', tweens:[
					TweenMax.to(el, 1.5, {rotation: 720, ease:Back.easeInOut}),
					TweenMax.set(el, {rotation:0, delay:1.5})
				]}
			},
			stretch : function(el){
				return {name : 'stretch', tweens:[
					TweenMax.to(el, 1.0, {transform:'scaleX(3) scaleY(0.3)', ease:Back.easeInOut}),
					TweenMax.to(el, 0.7, {transform:'scaleX(1) scaleY(1)', ease:Elastic.easeOut, delay:1.3})
				]}
			},
			squeeze : function(el){
				return {name : 'squeeze', tweens:[
					TweenMax.to(el, 1.0, {transform:'scaleX(0.3) scaleY(3)', ease:Back.easeInOut}),
					TweenMax.to(el, 0.7, {transform:'scaleX(1) scaleY(1)', ease:Elastic.easeOut, delay:1.3})
				]}
			},
			spinX : function(el){
				return {name : 'spinX', tweens:[
					TweenMax.to(el, 1.6, {rotationX:720, ease:Back.easeOut}),
					TweenMax.set(el, {rotationX:0, delay:1.6})
				]}
			},
			spinY : function(el){
				return {name : 'spinY', tweens:[
					TweenMax.to(el, 1.6, {rotationY:720, ease:Back.easeOut}),
					TweenMax.set(el, {rotationY:0, delay:1.6})
				]}
			}
			
		};
	
	function _removeEl(){
		$(this).remove();
	}
	
	function _layEgg(){
		TweenMax.killTweensOf($('.egg'))
		$('.egg').remove();
		
		var $egg = $('<div class="egg"></div>'), 
			initialRotation=200,
			rotations = 1, 
			totalDuration = 10,
			
			
			rotate = (rotations * 360) - 20,
			duration = rotations * totalDuration,
			distance = rotations * 100,
			tolerance = 3,
			lineCue = {
				zero: false,
				one:false,
				two:false,
				three:false,
				four:false
			};
		
		$('#cover .boo').append($egg);
				
		new TimelineMax({paused:true})
			.set($egg, {rotation:initialRotation})
			.to($egg, duration, {
				left:'+=' + distance,
				startAt:{y:'+=65'},
				directionalRotation:'+=' + rotate + '_cw',
				ease:Back.easeOut,
				onUpdate: function(){
					var p = this.totalProgress();
					var d = this.target[0]._gsTransform.rotation - initialRotation;
							//console.log(p, d);			
					switch (true){
						case (d > (1-tolerance) && d < (1+tolerance)): //-22, 1+3-20 = -16
							if (!lineCue.zero){
							//alert('a');
								lineCue.zero = true;
								console.log('0', p);
								TweenMax.to($egg, 1.4, {top:'+=23'});
							};break;
						
						case (d > (45-tolerance-20) && d < (45+tolerance-20)):  //45-3-20= 22, 45+3-20 = 28
							if (!lineCue.one){
								lineCue.one = true;
								console.log('45', p, d);
								TweenMax.to($egg, 3.1, {top:'-=23'});
							};break;
							
						case (d > (90-tolerance-20) && d < (90+tolerance-20)):
							if (!lineCue.two){
								lineCue.two = true;
								console.log('90', p, d);
								TweenMax.to($egg, 3.3, {y:'+=23'});
							};break;
							
						case (d > (135-tolerance-20) && d < (135+tolerance-20)):
							if (!lineCue.three){
								lineCue.three = true;
								console.log('135', p, d);
								TweenMax.to($egg, 3.84, {y:'-=23'});
							};break;
							
						case (d > (180-tolerance-20) && d < (180+tolerance-20)):
							if (!lineCue.four){
								lineCue.four = true;
								console.log('180', p);
								TweenMax.to($egg, 4.16, {y:'-=23'});
							};break;	
							
						case (d > (225-tolerance-20) && d < (225+tolerance-20)):
							if (!lineCue.five){
								lineCue.five = true;
								console.log('225', p);
							};break;
						
						case (d > (270-tolerance-20) && d < (270+tolerance-20)):
							if (!lineCue.six){
								lineCue.six = true;
								console.log('270', p);
							};break;
							
						case (d > (315-tolerance-20) && d < (315+tolerance-20)):
							if (!lineCue.seven){
								lineCue.seven = true;
								console.log('315', p);
							};break;
							
						case (d > (360-tolerance-20) && d < (360+tolerance-20)):
							if (!lineCue.eight){
								lineCue.eight = true;
								console.log('360', p);
							};break;
					}
				}
			})
			.play();
		
		
				
	// new TimelineMax({paused:true})
			// .set($egg, {visibility:'visible', x:eggPoints[eggPoints.length-1].x, y:eggPoints[eggPoints.length-1].y, rotation:90})
			// .add(TweenMax.to($egg, 3, {rotation:-270, bezier:{type:"cubic", values:eggPoints}, ease:Quad.easeIn}).reverse())
			
			// .play();
				
			//.to($egg, 10.5, {left:'+=200'})
			//.to($egg, 0.9, {top:'+=4', yoyo:true, repeat:1, delay:0.3}, '-=10.2') //0.3
			//.to($egg, 1.3, {top:'+=4', delay:3.2}, '-=10.5')  //3.5
			//.to($egg, 3.3, {top:'-=4', delay:4.8}, '-=10.5')  //3.5
			//.to($egg, 1.0, {top:'+=1',delay:8.5}, '-=10.5')  //3.5
			//.to($egg, 10.5, {rotation:450}, '-=10.5')
			//.to($egg, 0.5, {opacity:0, delay:1110.5}, '+=10.5')
			
			
			Draggable.create($egg, {
				bounds:$('#cover .boo'),
				throwProps: true,
				type:'x,y',
				edgeResistance:1,
				zIndexBoost:true,
				cursor:'move',
				onDrag:function(){
					//console.log('dragx:', this);
					var rotation = this.x < 0 ? '-=1' : '+=1'
					var scale = 1 + (1/768 * Math.abs(this.y));
					TweenMax.killTweensOf(this.target, {rotation:0, left:0});
					TweenMax.to(this.target, 0.01, {scale: scale, rotation:rotation});
				},
				onDragEnd:function(){
					//console.log(this.y);
					var duration = (1/768 * Math.abs(this.y)) + 0.1;
					//console.log(duration);
					
					
					
					new TimelineMax({paused: true})
						.to(this.target, duration, {scale:1, y:0, rotation:'+=125', ease:Power3.easeIn})
						.addCallback(function(){
							var currentRotation = $egg[0]._gsTransform.rotation;
							var closestSide = Math.round(currentRotation/180);
							var distDeg = currentRotation - closestSide;
								
								
							
							console.log('currentRotation:', currentRotation, 'closestSide:', closestSide, 'distDeg:', distDeg);
							TweenMax.to(this.target, 2, {directionalRotation:distDeg+'_short', x:(5*distDeg)});
							
							
							//TweenMax.to(this.target, 2, {directionalRotation:'-90_short', delay:duration});
						}).play();
						
					
					
					// ThrowPropsPlugin.to(this.target,{
						
						// throwProps:{ 
							// resistance:3000,
							// //x: { end:'auto'},
							// y:{ end:'0', min:-600, max:0}
						// }, ease:Linear.easeIn}, 4, 0.1);
				}
		});
	}
	
	function wobble(){
		// var $this = $(this);
		// TweenMax.staggerFromTo($this, 0.5, {rotation:-2}, {rotation:2, yoyo:true, repeat:-1,  ease:Power1.easeInOut}, 0.05);
		// TweenMax.set($this, {css:{transformPerspective:500, perspective:500, transformStyle:'preserve-3d'}});
		 // $.each($this, function(i, o){
			 // TweenMax.fromTo(o, 1, {css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
		 // });
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
	
	function _pressAnimate(effect, callback){
		var	$this = $(this);
		new TimelineMax({paused:true, tweens:effect.tweens, overwrite:'none'})
			.addCallback(function(){
				if (typeof callback === 'function'){
					callback();
				}
			})
			.play();
	}
				
	$('#cover .animal').click(function(callback){
		_pressAnimate.call(this, coverTweens.bounce(this), function(){
			if (callback === 'function'){
				callback();
			}
		});
		_playAudio.call(this, $('#animalSounds')[0]);
		if ($(this).is('.hen')){
			_layEgg();
		}
	});
				
	function _titleClick(callback){
		var $letter = $(this),
			effectsCount = Object.keys(coverTweens).length - 1,
			rndEffectNo = Math.round(Math.random() * effectsCount),
			effectName = Object.keys(coverTweens)[rndEffectNo];
				
		_pressAnimate.call($letter, coverTweens[effectName]($letter), function(){
			if (typeof callback === 'function'){
				callback();
			}
		});
	}
			
	Draggable.create(title, {
		bounds:$('#container'),
		throwProps: true,
		type:'x,y',
		edgeResistance:1,
		zIndexBoost:true,
		cursor:'move',
		force3D: true,
		// onDragStart: function(){
			// var $el = $(this.target);
			// $el.data('throwing', true);
		// },
		onDragEnd:function(){
			var $el = $(this.target),
				velocityX = ThrowPropsPlugin.getVelocity($el, 'x'),
				velocityY = ThrowPropsPlugin.getVelocity($el, 'y'),
				max = Math.max(Math.abs(velocityX), Math.abs(velocityY)),
				rotate = Math.ceil(max/500) * 360;
				
			if (max > 500){
				//console.log('rotate: ', rotate);
				new TimelineMax({paused:true})
					.to($el, 3.5, {rotation: rotate})
					.play();
			}
		},
		onThrowComplete: function(){
			var $el = $(this.target);
			
			new TimelineMax({paused:true})
				.to($el, 3, {x:0, y:0, ease:Back.easeInOut})
				.addCallback(function(){
					wobble.call($el)
				})
				
				.play();
		}, 
		onClick:function(){
			_titleClick.call($(this.target));
		}
	});
	
	// eggPath convert cubic data to GSAP bezier
	for (var i = 0; i < eggPathLength; i++) {
	  var seg = eggPathData[i];
	  if (seg[0] === "M") { // move (starts the path)
		var point = {};
		point.x = seg[1];
		point.y = seg[2];
		
		point.x = point.x;
		point.y = point.y;
		console.log(eggPathData);
		eggPoints.push(point);
	  } else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
		for (var j = 1; j < 6; j+=2) {
		  var point = {};
		  point.x = seg[j];
		  point.y = seg[j+1];
		  
		  point.x = point.x;
		  point.y = point.y;
		
		 eggPoints.push(point);
		}
	  }
	}

	// flightPath convert cubic data to GSAP bezier
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
		
	mainTimeline
		.addCallback(function(){wobble.call(title);}, 0.9)
		.add(TweenMax.staggerFrom(title, 1, {scale:0, ease:Back.easeOut}, 0.05))
	
	for (var i=0; i<=24; i++){
		x = i *4;
		y = i * 4 + 2;
		start = x + '% ' + x + '%';
		end = x + '% ' + y + '%';
		time = 2/24;
		mainTimeline.add(TweenMax.fromTo($('#cover .flightPath').eq(i), time, {drawSVG:start}, {drawSVG:end, ease:Power0.easeOut}));
	}

	mainTimeline
		.set(ladybird, {visibility:'visible', x:points[0].x, y:points[0].y}, '-=2.2')
		.to(ladybird, 2.2, {bezier:{type:"cubic", values:points}, ease:Power0.easeOut}, '-=2.2')
		.staggerTo(animalsToSlideIn, 0.2, {margin:0, ease:Back.easeOut}, 0.1)
		.staggerFromTo(animalsToSlideIn, 1, {scale:0.5}, {scale:1, ease:Elastic.easeOut}, 0.1, '-=1')
		.staggerFromTo(hen, 0.75, {scale:0}, {scale:1, ease:Elastic.easeOut}, 0.1 ,'=-1');
		
	var delay = 0.65;
	$.each(feathers, function(i, o){
		var angle = (Math.random() * -90 -45).toFixed(1),
		time = 3,
		velocity = Math.random() * 100 + 500,
		direction = angle < -90 ? -1 : 1,
		rotate = direction * 90;
		
		//console.log('angle:', angle, 'delay:', delay, 'rotate:', rotate, 'direction:' + direction + ', velocity:' + velocity);
		
		//t.set(o, {transform:'scaleX(' + direction + ')'});
		mainTimeline.fromTo(o, time, {scale:0.3}, {scale:3, physics2D:{velocity:velocity, angle: angle, gravity:500}, directionalRotation:rotate + '_short'}, '-=' + delay);
		
		//t.fromTo(o, 2, {left:'-=200'}, {left:'+=200', yoyo:true,repeat:3, ease:Sine.easeInOut}, '-=2');
		//t.to(o, 1, {throwProps:{physics2D:{angle: '270'}}}, '-=1');
		
		
		//t.to(o, 3, {throwProps:{y:{velocity:velocity/4}}}, '-=1.75');
		//t.fromTo(o, 4, {throwProps:{marginLeft:'-2px'}}, {throwProps:{marginLeft:'2px'}, yoyo:true, repeat:3, ease:Sine.easeInOut}, '-=0.5');
		
		//t.fromTo(o, 4, {border:'1px solid red', left:'-=150'}, {border:'1px solid green', left:'+=150', yoyo:true, repeat:1}, '-=3');
		//t.to(o, 4, {border:'1px solid red', bottom:'0px'}, '-=3');
		//t.to(o, 2, {physicsProps:{y:{friction:0.2}}}, '-=2');
		delay = time;// - (i * 0.01);; //0.01);
	});
		
	mainTimeline.play();
	
	var s = new ScrollScene({triggerElement: '#cover', offset: 400, duration:500})//triggerElement:'#page1', duration:1500, offset:160})
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
	
	var s = new ScrollScene({triggerElement: '#page1', offset: 100, duration:3000})//triggerElement:'#page1', duration:1500, offset:160})
		 .setTween(t)
		.setPin('#cover')
		.setPin('#page1')
		.addTo(controller);
	//t.play();
	s.addIndicators({zindex:100, suffix:"page1"});
}

cover();
page1();
		