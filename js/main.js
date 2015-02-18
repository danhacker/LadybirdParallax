var controller = new ScrollMagic();
		
		eggPoints = [];
		points = []; //holds our series of x/y values for anchors and control points,
		commonTweens = {
			bounceOut : function(el){
				return { name: 'bounceOut', tweens:[
					TweenMax.to(el, 0.2, {scale:1.8, ease:Back.easeIn}),
					TweenMax.to(el, 0.5, {scale:1, ease:Bounce.easeOut, delay: '0.2'})
				]}
			},
			bounceIn : function(el){
				return { name: 'bounceIn', tweens:[
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
		
		zoom = 3; //orig svg 100, viewbox 300
		
	
	function _layEgg(){
		var $egg = $('<div class="egg"></div>'), 
			initialRotation=200,
			rotations = 1, 
			totalDuration = 3,
				
			rotate = (rotations * 360) - 20,
			duration = rotations * totalDuration,
			distance = rotations * 100,
			tolerance = 3,
			lineCue = [
				{
					angle:45,
					pc:4.5,
					time: 0.31,
					vars:{top:'+=4'},
					mark:false
				}, {
					angle:90,
					pc:7.9,
					time: 0.34,
					vars:{top:'-=1'},
					mark:false
				}, {
					angle:135,
					pc:11.6,
					time: 0.37,
					vars:{top:'-=8'},
					mark:false
				}, {
					angle:180,
					pc:15.9,
					time:0.43,
					vars:{top:'+=7'},
					mark:false
				},	{
					angle:225,
					pc:20.9,
					time: 0.5,
					vars:{top:'+=2'},
					mark:false
				}, {
					angle:270,
					pc:27.3,
					time: 0.64,
					vars:{top:'-=4'},
					mark:false
				}, {
					angle:315,
					pc:36.3,
					time: 0.9,
					vars:{top:'-=6'},
					mark:false
				},	{
					angle:360,
					pc:0,
					time:0.9,
					vars:{top:'+=1', yoyo:true, repeat:1},
					mark:false
				}
			];
	
			
		
		$('#cover .animals').append($egg);	
		new TimelineMax({paused:true})
			//.set($egg, {rotation:180})
			.fromTo($egg, 0.2, {y:'-=30', rotation:initialRotation-50},{y:'+=30', x:'+=20', rotation:initialRotation, ease:Linear.easeNone})
			.to($egg, duration, {
				left:'+=' + distance,
				startAt: {y:'+=3'},
				directionalRotation:'+=' + rotate + '_cw',
				ease:Back.easeOut,
				onUpdate: function(){
					var p = this.totalProgress();
					var d = this.target[0]._gsTransform.rotation - initialRotation;
					
					var action = $.grep(lineCue, function(item){
						var min = item.angle-tolerance-20,
							max = item.angle+tolerance-20;
						min = min < 0 ? 0 : min;
						max = max < 0 ? tolerance : max;
						
						return (d > min 
							&&  d <= max
							&& item.mark != true)
					})[0];
					
					if (action != null){
						action.mark = true;
						TweenMax.killTweensOf(this.target, {top:''});
						TweenMax.to(this.target, action.time*(duration/3), action.vars);
					}
				}, onComplete:function(){
					TweenMax.set(this.target, {rotation:180});
					TweenMax.to($egg, 2.5, {directionalRotation:'180_short', ease:Elastic.easeIn});
					TweenMax.to($egg, 2, {opacity:0, delay:5, onComplete:function(){
						$(this.target).remove();
					}})
				}
				})
			.play();
		
		Draggable.create($egg, {
				bounds:$('#cover .animals'),
				throwProps: true,
				type:'x,y',
				edgeResistance:1,
				zIndexBoost:true,
				cursor:'move',
				onDragStart:function(){
					TweenMax.killTweensOf(this.target);
					TweenMax.to(this.target, 0.3, {rotation:180+80, ease:Quad.easeOut});
					TweenMax.to(this.target, 1, {rotation:180-80, delay:0.3, ease:Quad.easeInOut, yoyo:true, repeat:-1});
				},
				onRelease:function(){
					var direction = $(this.target)[0]._gsTransform.rotation-180 < 0 ? '-' : '+';
					TweenMax.to(this.target, 3, {rotation:direction+'=360', ease:Quad.easeOut});
				},
				onDrag:function(){
					var scale = 1 + (1/768 * Math.abs(this.y));
					TweenMax.to(this.target, 0.01, {scale: scale});
				},
				onDragEnd:function(){
					var duration = (1/768 * Math.abs(this.y)) + 0.1;
					
					new TimelineMax({paused: true})
						.to(this.target, duration, {scale:1, y:0, ease:Power3.easeIn})
						.addCallback(function(){
							TweenMax.to($egg, 2.5, {directionalRotation:'180_short', ease:Elastic.easeOut});
							TweenMax.to($egg, 0.5, {opacity:0, delay:5, onComplete:function(){
								$(this.target).remove();
							}})
						}).play();
				}
		});
	}
	
	function wobble(){
		var $this = $(this);
		TweenMax.staggerFromTo($this, 0.5, {rotation:-2}, {rotation:2, yoyo:true, repeat:-1,  ease:Power1.easeInOut}, 0.05);
		TweenMax.set($this, {css:{transformPerspective:500, perspective:500, transformStyle:'preserve-3d'}});
		$.each($this, function(i, o){
			TweenMax.fromTo(o, 1, {css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
		});
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
		_pressAnimate.call(this, coTweens.bounce(this), function(){
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
			effectsCount = Object.keys(commonTweens).length - 1,
			rndEffectNo = Math.round(Math.random() * effectsCount),
			effectName = Object.keys(commonTweens)[rndEffectNo];
				
		_pressAnimate.call($letter, commonTweens[effectName]($letter), function(){
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
		onDragEnd:function(){
			var $el = $(this.target),
				velocityX = ThrowPropsPlugin.getVelocity($el, 'x'),
				velocityY = ThrowPropsPlugin.getVelocity($el, 'y'),
				max = Math.max(Math.abs(velocityX), Math.abs(velocityY)),
				rotate = Math.ceil(max/500) * 360;
				
			if (max > 500){
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
		pads = $('#page1 .pad'),
		bush = $('#page1 .bush'),
		fence = $('#page1 .fence'),
		pond = $('#page1 .pond'),
		hen = $('#page1 .hen'),
		duck = $('#page1 .duck'),
		waves = $('#page1 .waves'),
		goose = $('#page1 .goose'),
		sheep = $('#page1 .sheep'),
		hog = $('#page1 .hog')
		horse = $('#page1 .horse'),
		dog = $('#page1 .dog'),
		cat1 = $('#page1 .cat1'),
		cat1tail = $('#page1 .cat1tail'),
		cat2 = $('#page1 .cat2'),
		cow = $('#page1 .cow'),
		arm = $('#page1 .arm'),
		text = $('#page1 .text'),
		words = text.find('>div div');
		//tempTime = new TimelineMax();
		
		function bounceWord(e){
		TweenMax.to(e, 0.1, {scale:1.5, color:'red', ease:Back.easeIn}),
			TweenMax.to(e, 0.3, {scale:1, color:'black', ease:Bounce.easeOut, delay: '0.1'})
		}
		words.click(function(e){
			bounceWord(e.target);
		});
		
		text.mousedown(function(e){
			console.log('mouseDown', e.target);
				text.on('mouseover', function(e){
					console.log('mouseover');
					bounceWord(e.target);
				});
		});
		
		$('body').mouseup(function(e){
			console.log('page1 mouseUp');
			text.off('mouseover')
		});
		

	t.fromTo(hen, 2, {left:'-150px'},{left:'50px',top:'50%', ease:Cubic.easeOut});
	//cluck
	t.add(commonTweens.bounceOut(hen).tweens, '+=1.5','sequence', 0.2);
	t.add(function(){
		_playAudio.call(hen, $('#animalSounds')[0]);
	},'-=1')
	
	//hen exit stage left
	.to(hen, 2, {left:'-150px'}, '+=2')
	
	//pond enter stage right
	.from(pond, 6, {right:'-350px', top:'30px'}, '-=2')
	
	//duck drop from stage top
	
	t.fromTo(duck, 1.5, {top:'-150%', opacity:0},{top:'30px', opacity:1, ease:Quint.easeIn})
	.addCallback(function(){

		setTimeout(function(){
			_playAudio.call(duck, $('#animalSounds')[0]);
			new TimelineMax().add(commonTweens.bounceOut(duck).tweens, '-=9','sequence', 0.05);
		},1500);
		TweenMax.to(duck, 1, {rotationY:'+=180', yoyo:true, repeat:-1, repeatDelay:9, delay:10})
		TweenMax.to(duck, 10, {left:'+=180px', ease:Linear.easeNone, yoyo:true, repeat:-1});
		TweenMax.fromTo(duck, 2, {rotation:'+=10'},{rotation:'-=10', yoyo:true, repeat:-1, ease:Sine.easeInOut},'-=10')
		
		TweenMax.staggerFromTo(pads, 3, {x:'-=10'}, {x:'+=10', repeat:-1, yoyo:true}, 0.5);
		TweenMax.staggerFromTo(leftFish, 3, {x:'+=10', y:'+=5',opacity:0.3}, {x:'-=10', y:'-=3', opacity:0.7, repeat:-1, yoyo:true}, 0.8);
		TweenMax.staggerFromTo(rightFish, 3, {x:'-=15', y:'-=2', opacity:0.4}, {x:'+=15', y:'+=6', opacity:0.6, repeat:-1, yoyo:true}, 1.3);
	});
		
	t.to(pond, 3, {right:'60%'}, '+=6')
	
	//show fence, goose & bush
	 .to(fence, 7, {right:'-90px'},'-=0.25')
	 .fromTo(bush, 5, {right:'-415px', bottom:'-317px'},{right:'0', bottom:'0', ease:Bounce.easeOut}, '-=8.5')
	 .to(goose, 4, {right:'+=220'})
	 .addCallback(function(){
		_playAudio.call(goose, $('#animalSounds')[0])
	 }, '+=0.75')
	 
	 //remove the bush, fence and
	 .to(bush, 1, {right:'-415px', bottom:'-20%'}, '+=3.5')
	 .to(fence, 2, {right:'-100%'}, '-=1')
	 
	 //move the pond
	 .to(pond, 4, {right:'-350px', top:'160px'}, '-=2')
	 
	//introduce sheep, hog, horse, dog and cat1
	.from(sheep, 2.5, {opacity:0, transformOrigin:'50% 400px', rotation:-40})
	.from(hog,3.5,{opacity:0, bottom:'-=250px',left:'-=50px', ease:Bounce.easeOut})
	.from(horse,5.5,{opacity:0, left:'-=643px', ease:Quart.easeInOut})
	.fromTo(hen, 6, {top:'100%'},{left:'493px',top:'231px'})
	.from(dog, 10, {opacity:0, transformOrigin:'50% 100%', scale:0, ease:Elastic.easeOut})
	.from(cat1, 5, {opacity:0, bottom:'182px', ease: Circ.easeIn})
	//wag the cat's tail
	.set(cat1tail, {opacity:1, transformOrigin:'20% 0%'})
	.fromTo(cat1tail, 3, {rotation:-45, rotationY:40}, {rotation:10, rotationY:0})
	.to(cat1tail, 3, {rotation:-25, rotationY:30, yoyo:true, repeat:3, ease:Linear.easeNone})
	.set(cat1tail, {left:'205px'})
	
	
	//move animals to right & scale
	.to(sheep, 5, {transformOrigin:'100% 100%', left:'-=250px', scale:1.2})
	.to(hog, 5, {transformOrigin:'0 100%', left:'-=520px', scale:1.2, delay:-1})
	.to(horse, 5, {transformOrigin:'50% 100%', left:'-=455px', scale:1.2, delay:-5})
	
	
	//reposition hen
	.to(hen, 5, {top:'60%', transformOrigin:'50% 90%', rotation:'400', rotationY:'180', ease:Cubic.easeInOut})
	.to(hen, 15, {top:'146px', left:'65px', rotation:'-30', ease:Cubic.easeOut})
	.to(hen, 5, {rotation:'0', rotationY:'0', left:'76px', ease:Elastic.easeOut})
	
	
	.to(cat1, 5, {transformOrigin:'60% 346px', left:'-=455px', scale:1.2, delay:-30})
	.to(cat1tail, 5, {left:'-=455px', top:'-=80px', scale:1.2, delay:-30})
	.to(dog, 5, {transformOrigin:'0% 100%', left:'-=455px', scale:1.2, delay:-25})
	.to(cat1, 5, {left:'+=140px'})
	
	//move pond, reintroduce fence & bush
	.to(pond, 6, {transformOrigin:'0% 0%', left:'50%', marginLeft:'-350px', top:'+=100px', scale:1, delay:-2})
	.to(fence, 8, {right:'-12%', scale:0.7, delay:-4})
	.to(bush, 8, {right:'-22px', bottom:'-18px', scale:0.9, delay:-4})
	
	//introduce cat 2 & cow / farmer
	.from(cat2, 7, {left:'+=150px', bottom:'-128px',opacity:0})
	.from(cow, 7, {left:'+=50px', bottom:'0px',opacity:0})
	
	
	//farmer to stroke & pat cow
	.from(arm, 7, {opacity:0, delay:-7})
	.to(cat2, 20, {left:'-=65px', delay:10})
	.fromTo(arm, 4, {transformOrigin:'60% 10%', rotation:-20}, {rotation:20, ease:Linear.easeNone, repeat:2, yoyo:true, delay:-30})
	.fromTo(arm, 6, {transformOrigin:'60% 10%', rotationX:0}, {rotationX:-50, ease:Linear.easeNone, repeat:3, yoyo:true, delay:-22})
	
	
	
	//.to(pond, 6, {transformOrigin:'0% 0%', left:'-=200px', top:'+=200px', scale:0.5})
	
		
	/*t.fromTo(fence,14, {right:'-350px'},{right:'0px'});
	t.fromTo(bush, 5, {right:'-415px'},{right:'0px'}, '-=14');
	t.fromTo(pond, 1, {left:'-700px'},{left:'20px'}, '-=4')
	t.fromTo(pond, 1, {left:'-700px'},{left:'20px'}, '-=4')
	t.fromTo(pond, 1, {left:'-700px'},{left:'20px'}, '-=4')
	t.add(TweenMax.staggerFromTo(pads, 3, {x:'-=10'}, {x:'+=10', repeat:4, yoyo:true}, 0.5), '-=14');
	t.add(TweenMax.staggerFromTo(leftFish, 3, {x:'+=10', y:'+=5'}, {x:'-=10', y:'-=3', repeat:4, yoyo:true}, 0.8), '-=14');
	t.add(TweenMax.staggerFromTo(rightFish, 3, {x:'-=15', y:'-=2'}, {x:'+=15', y:'+=6', repeat:4, yoyo:true}, 1.3), '-=14');
	*/
	//{css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
	
	var s = new ScrollScene({triggerElement: '#page1', offset: 400, duration:30000})//triggerElement:'#page1', duration:1500, offset:160})
		.setTween(t)
		//.setPin('#cover')
		.setPin('#page1')
		.addTo(controller);
	//t.play();
	s.addIndicators({zindex:100, suffix:"page1"});
}

cover();
page1();