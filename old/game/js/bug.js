var bugs = [];
function Bug(bugOPT){
	var lives = bugOPT.lives || 1;
	var size = bugOPT.size || 10;
	
	var self = this;
	
	var bugSize = 5;
	var posRange = worldRadius-10*bugSize;
	
	var geometry = new THREE.CubeGeometry( size, size, size, 1,1,1 );
	var material = new Physijs.createMaterial( new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:true, visible:false }), friction, restitution );
	var bug = new Physijs.BoxMesh(geometry,material, 500);
	
	var loader = new THREE.JSONLoader( true );
	loader.load( "models/rock.js", function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 7, 7, 7 );
		bug.add( mesh );
	});
	/*var wfMaterial = new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:true });
	var bugWireframe = new THREE.Mesh(geometry, wfMaterial);
	bug.add(bugWireframe);*/
	
	bug.position.x = Math.random() * 2 - 1;
	bug.position.y = Math.random() * 2 - 1;
	bug.position.z = Math.random() * 2 - 1;
	bug.position.normalize();
	bug.position.multiplyScalar( posRange );
	bug.rotation.z = Math.PI/4;
	bug.rotation.y = Math.PI/4;
	
	scene.add(bug);	
	bugs.push({object:this, __object:bug, lives:lives});
	
	fadeIn(bug, 10000);
	
	this.__object = bug;		
	
	this.removeBug = function(){
		scene.remove(bug);
		for(var i=0; i<bugs.length; i++){
			if(bugs[i].__object == bug){
				bugs.splice(i,1);
			}
		}
	}
	this.hitBug = function(){
		/*var hitSound = new Sound(['sfx/hit.mp3','sfx/hit.ogg'], 300, 1, bug);
		hitSound.play();*/
		bug.material.color.setHex(0xff0000);
		delay(100,function(){
			bug.material.color.setHex(0x020202);
		});
	}
	this.explodeBug = function(){
		
		var g = new THREE.IcosahedronGeometry( size, 0 );
		var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true, transparent:true, visible:false, opacity:0.0, blending:THREE.AdditiveBlending}), friction,	restitution );
		var expl = new Physijs.BoxMesh(g,m,100);
		expl.position.copy(bug.position);
		scene.add(expl);
		
		this.removeBug();
		
		var v = host.__endPoint.matrixWorld.getPosition().clone().normalize().multiplyScalar( 500 );
		expl.setLinearVelocity( v );
		
		var flare = new lensFlare( 0xffffff*Math.random(), expl.position.x, expl.position.y, expl.position.z );
		
		new TWEEN.Tween({
			x:0.1,
			y:0.1,
			z:0.1,
			op:0
		}).to({
			x:1.2,
			y:1.2,
			z:1.2,
			op:1
		}, 2000).easing( TWEEN.Easing.Back.Out ).onUpdate(function (){
			expl.scale.x = this.x;
			expl.scale.y = this.y;
			expl.scale.z = this.z;
			expl.material.opacity = this.op;
			if(expl.position.distanceTo(scene.position)>worldRadius){
				var v = expl.position.clone().sub(scene.position).normalize().multiplyScalar(-1);
				expl.setLinearVelocity( v.multiplyScalar(300) );
			}
			flare.updatePosition(expl.position.x, expl.position.y,expl.position.z);
		}).onStart(function(){
			/*var bugExplode = new Sound(['sfx/bugExplode.mp3','sfx/bugExplode.ogg'], 200, 1, expl);
			bugExplode.play();*/
		}).onComplete(function(){	
			fadeOut(expl, 5000, false, function(){
				if(expl.position.distanceTo(scene.position)>worldRadius){
					var v = expl.position.clone().sub(scene.position).normalize().multiplyScalar(-1);
					expl.setLinearVelocity( v.multiplyScalar(300) );
				}
				flare.updatePosition(expl.position.x, expl.position.y,expl.position.z);
			}, function(){
				scene.remove(expl);
				flare.remove();
				delete self;
			});
		}).start();
	}
	
	this.removeLive = function(){
		if(lives>0){
			this.hitBug();
			lives--;
			hitSound.play();
		}else{
			this.explodeBug();			
		}
	}
	this.update = function(){
		if(bug.position.distanceTo(scene.position)>=worldRadius){
			var v = bug.position.clone().sub(scene.position).normalize().multiplyScalar(-1);
			var velocity = v;
			bug.setLinearVelocity( velocity.multiplyScalar(100) );
		}
		
	}
}