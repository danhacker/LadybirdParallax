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
			
			var audio = $('#animals')[0];
			
			$('#cover .animal').click(function(){
				console.log($(this));
				var $this = $(this);
				var animal = $this.attr('class').substr(7, $this.attr('class').length);
				
				var start = $this.data('audiostart');
				var length = $this.data('audiolength') * 1000;
				console.log(audio, animal, start, length);
				
				audio.currentTime = start;
				audio.play();
				setTimeout(function(){
					console.log('pause');
					audio.pause();
				}, length);
				
			});
			
			var t = new TimelineMax({delay:1.5, paused:true})
				
			function ladybirdComplete(){
				console.log('ladybirdCOmplete');
				//t.killAllTweens();
			}
			
			function flightPathUpdate(a){
				console.log('fpu',a.getTotalLength());			
			}
			
			function wobbleTitle(){
				TweenMax.staggerFromTo(title, 0.5, {rotation:-2}, {rotation:2, yoyo:true, repeat:-1,  ease:Power1.easeInOut}, 0.05);
				TweenMax.set(title, {css:{transformPerspective:500, perspective:500, transformStyle:'preserve-3d'}});
				$.each(title, function(i, o){
					TweenMax.fromTo(o, 1, {css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
				});
			}
			
			//title = $('#cover .whatword>div, #cover .theword, #cover .ladybirdword>div, #cover .heardword>div'),
			title = $('#cover .letter')
			ladybird = $('#cover .ladybird'),
			animals = $('#cover .animal'),
			flightPath = $('#cover .flightPath');
		
			var data = Snap.path.toCubic(flightPath.attr('d'))
			    dataLength = data.length,
			    points = [], //holds our series of x/y values for anchors and control points,
			    pointsString = data.toString(),
				zoom = 3; //orig svg 100, viewbox 300

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
		
			t.set(ladybird, {visibility:'visible', x:points[0].x, y:points[0].y}, '-=2.2')
			 .to(ladybird, 2.2, {bezier:{type:"cubic", values:points}, onComplete:ladybirdComplete, ease:Power0.easeOut}, '-=2.2')
			 .staggerTo(animals, 0.2, {margin:0, ease:Back.easeOut}, 0.1);
			t.play();
		}

		cover();