var controller = new ScrollMagic();
		
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
		points = [], //holds our series of x/y values for anchors and control points,
		pointsString = data.toString(),
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
		
		var startTop = 690; dropTo = startTop + 42, tolerance = 1, target = 90,
			$egg = $('<div class="egg"></div>'); //w=28, h=37
		
		var last = 0;
		$('#cover .boo').append($egg);
		new TimelineMax({paused:true, onCompleteScope:$egg, onComplete:function(){$(this).remove();}})
			.fromTo($egg, 0.9, {opacity:1, rotation:0, top:startTop, left:'50%'}, {top:dropTo, ease:Bounce.easeOut})
			.to($egg, 10.5, {rotation:450, onUpdate:function(){
				//console.log('progress:', this.totalProgress() % 0.25, 'dur: '+  this.totalDuration());
				
				var r = this.target[0]._gsTransform.rotation;
				var mark = r % target;
				
				
				//console.log(this.target[0]._gsTransform.rotation, mark, rMin, rMax);//Math.floor(this.target[0]._gsTransform.rotation) + ' deg', this.totalProgress()*100 + '%');
				
				
				if ((mark >= 0 && mark <= tolerance) || (mark >=(target-tolerance) && mark <= (target+tolerance))){
					//console.log(this.target[0]._gsTransform.rotation, this.totalProgress()*100 + '%' );//Math.floor(this.target[0]._gsTransform.rotation) + ' deg', this.totalProgress()*100 + '%');
					
					
					start = 0;
					change = r;
					totalTime = this.totalDuration();
					currentTime = totalTime * this.totalProgress();
					
					//-c * t*(t-2) + b;
					
					time = currentTime / totalTime;
					pos = - change * time*(time-2) + start;
					
					console.log('start' + start, 'change:' + change, 'time:'+ time, 'prog:' + this.totalProgress(), 'currentTime:' + currentTime, 'result=' + pos);
					//c*t*t + b
					
					
					// c = r - last;
					
					// t = (this.totalProgress() * 100) * this.totalDuration();
					
					// d = this.totalDuration();
					
					// t = t/d;
					// console.log('r=' + c, 't=' + t, ' ttt = ' + (c * t * t), 'prog:' + (this.totalProgress() * 100));
					// $('.egg').css('border','1px solid red');
					
					// last = r;
				} else
				{
				$('.egg').css('border','none');
				}
				
				
				
				
				// if (Math.floor(Math.round(this.target[0]._gsTransform.rotation) % 90) == 0){
					// console.log('beep ', Math.round(Math.round(this.target[0]._gsTransform.rotation) % 90) + 'deg', this.totalProgress()*100 + '%');
				// }
				// if (Math.round((this.totalProgress()*100) % 25) == 0){
					// console.log('mark ', Math.round(this.target[0]._gsTransform.rotation % 360));
					// //console.log('progress:', this.totalProgress(), 'dur: '+  this.totalDuration());
				// }
				
				
			}}, '=-0.6')
			.timeScale(1)
			.play();
			
			
			// console.log(this.target[0]._gsTransform);
				// var r = Math.round(this.target[0]._gsTransform.rotation % 360);
				// var q;
				// var t, p;
				// switch (true){
					
					// case (r > 0 && r <= 90):
					// case (r > 180 && r <= 270):
						// //console.log('a');
						// threshold = r <= 90 ? 90 : 270
						
						// r = r % threshold;
						// if (r==0) r = threshold;
						// p = (r == threshold) ? 1 : (r < threshold) ? r / threshold : 1-(((r/threshold)-1));
						// //console.log(r, p);
						// p = p % 15;
						// d = '+';
						// t = parseFloat((15 * p));
						
						// break;
						
					// case (r > 90 && r <= 180):
						// // console.log('b');
						// threshold = 180;
						// r = 1 - (threshold % r);
						// if (r==0) r = threshold;
						// p = (r == threshold) ? 0 : (r < threshold) ? r / threshold : 1-(((r/threshold)-1));
						
						// p = p % 17;
						// d = '-';
						// t = parseFloat((17 * -p));
						// break;
						
					// // case (r > 270 && r <= 360):
						// // // console.log('b');
						// // threshold = r <= 180 ? 180 : 359.9
						
						// // r = 1 - (threshold % r);
						// // if (r==0) r = threshold;
						// // p = (r == threshold) ? 0 : (r < threshold) ? r / threshold : 1-(((r/threshold)-1));
						
						// // p = p % 6;
						// // d = '-';
						// // t = parseFloat((6 * -p));
						// // break;
				// };
				
				//console.log(r, p, t);
				
				//TweenMax.set(this.target, {top: dropTo + t});
				//console.log(threshold, r.toFixed(2) + 'deg', p.toFixed(2) + '%', t.toFixed(2), 'actual top: ' + this.target.position().top.toFixed(2));
				//console.log('u', this.target[0]._gsTransform.rotation);
				
				
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
		