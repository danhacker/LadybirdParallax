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
			
			function ladybirdUpdate(){
				console.log('ladybirdUpdate');
				
			}
			
			// function boo(){
				// console.log('boo');
			// }
			
			function wobbleTitle(){
				TweenMax.staggerFromTo(title, 0.5, {rotation:-2}, {rotation:2, yoyo:true, repeat:-1,  ease:Power1.easeInOut}, 0.05);
				TweenMax.set(title, {css:{transformPerspective:500, perspective:500, transformStyle:'preserve-3d'}});
				$.each(title, function(i, o){
					TweenMax.fromTo(o, 1, {css:{rotationY:0, z:0}}, {css:{rotationX:0,z:-40}, yoyo:true, repeat:-1, delay:i*0.3, ease:Power1.easeInOut});
				});
			}
			
			//var ladybirdPath = [{x:62, y:44}, {x:225, y:70}, {x:210, y:85}, {x:190, y:75}, {x:206, y:62}, {x:480, y:130}],
				//trailPath = "62,44 225,70 210,85 190,75 206,62 480,130",
				title = $('#cover .whatword>div, #cover .theword, #cover .ladybirdword>div, #cover .heardword>div'),
				ladybird = $('#cover .ladybird'),
				animals = $('#cover .animal');
			
			//var ladybirdPathData = [640,0, -25,-4, -63,25, -99,76], //, -78, 114, -59, 118, -99, 134, -47, 21, -65, -34, -21, -44, 44, -10, 40, 36, 24, 70, -18, 40, -19,44, -42, 61, -34, 26, -69, -24, -69, -24],
			//var ladybirdPathData = [0,0, -615,-4, -577,-25, -541,-76], //, -78, 114, -59, 118, -99, 134, -47, 21, -65, -34, -21, -44, 44, -10, 40, 36, 24, 70, -18,
 //40, -19,44, -42, 61, -34, 26, -69, -24, -69, -24],
 
			//var ladybirdPathData= [0,0, -25,-4, -63,25, -99,76, -78,114,       -137,117, -137,117, -175,134, -125,155, -143,83],
			var ladybirdPathData= [ 
									-25,-4,   -63,25, -99,76,   -78,114,
									-137,231, -175,248, -125,135,
									-190,101, -146,91, -81,125],
			//m 640,1 c -24,-4 -63,25 -99,76 -78,114 -59,117 -97,134 -47,21 -65,-34 -21,-44 44,-10 40,36 24, 70 -18,40 -19,44 -42,61 -34,26 -69,-24 -69,-24
			//d="m 640,1 c-25,-4 -63,25 -99,76 -78,114 -59,117 -97,134 -47,21 -65,-34 -21,-44 44,-10 40,36 24,70 -18,40 -19,44 -42,61 -34,26 -69,-24 -69,-24"
 
			points =[],
			pointsString = "";
			
			for (var i = 0; i < ladybirdPathData.length; i +=2){
				var point = {};
				point.x = ladybirdPathData[i];
				point.y = ladybirdPathData[i+1];
				 
				points.push(point);
				pointsString += '{x:' + point.x + ', y:' + point.y + '},'
			}
			console.log(pointsString);
			//var path = BezierPlugin.bezierThrough(ladybirdPath);
			//console.log(path);
			//console.log(path.x.length);
			//console.log({bezier:ladybirdPath});
			//$('#trailPath').attr('points', {bezier:{values:trailPath}});
			//var d = 'M' = path.x[0].a + ' ' + path.y[0].a;
			// for (i = 0; i < path.x.length; i++){
			//	console.log(i);
			//	var Qx = BezierPlugin.cubicToQuadratic(path.x[i].a, path.x[i].ba, path.x[i].ca, path.x[i].d);
			//	var Qy = BezierPlugin.cubicToQuadratic(path.y[i].a, path.y[i].ba, path.y[i].ca, path.y[i].d);
			//	console.log('Qx:', Qx, 'length: ' + Qx.length);
			//	for(j = 0; j < Qx.length; j++){
			//		console.log('Qx[' + i + ']', Qx[j]);
			//		var d = 'M' + Qx[j].a.toFixed(0) + ',' + Qy[j].a.toFixed(0) + ' Q' + Qx[j].b.toFixed(0) + ',' + Qy[j].b.toFixed(0) + ' ' + Qx[j].c.toFixed(0) + ',' + Qy[j].c.toFixed(0);
			//		$('svg').append('<path id="p' + i+j + '" d="' + d + '" stroke="red" stroke-width="5" />')
			//	}
			//	console.log('done');
				//$('#trailPath' +i).attr('d', 'M' + Qx.a + ',' + Qy.a + ' Q' + Qx.b + ',' + Qy.b + ' ' + Qx.c + ',' + Qy.c)
				
				// d = ' q ' path[i].x + ' ' + path[i].y
				// $('#trailPath' +i).attr('d', 'M' + path.x[i].a + ',' + path.y[i].a + ' c' + path.x[i].ba + ',' + path.y[i].ba + ' ' + path.x[i].da + ',' + path.y[i].da + ' ' + path.x[i].d + ',' + path.y[i].d)
				
			//}
			//console.log('really done');
			
			
			//TweenMax.ticker.addEventListener("tick", boo, this, true, 1);
			
			var t = new TimelineMax({delay:1.5})
				
				//.addCallback(wobbleTitle, 0.9)
				.add(TweenMax.staggerFrom(title, 1, {scale:0, ease:Back.easeOut}, 0.05))
				//.add(TweenMax.from(ladybird, 0.01, {display:'block'}))
				.set(ladybird, {display:'block'})
				//.add(TweenMax.from(ladybird, 3, {display:'block', bezier:ladybirdPath, onUpdate:ladybirdUpdate}))
				.add(TweenMax.to(ladybird, 3, {display:'block', bezier:{type:'cubic', values:points}, onUpdate:ladybirdUpdate}))
				.fromTo($('#tp, circle'), 3, {drawSVG:'0%'}, {drawSVG:'100%'}, '-=3')
				
				
				
				//.add(TweenMax.fromTo($('#trailPath'), 1, {drawSVG:'0%'}, {drawSVG:'100%'}))
					
				.add(TweenMax.staggerTo(animals, 0.2, {margin:0, ease:Back.easeOut}, 0.1))
		}

		cover();