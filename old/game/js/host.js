
function Host(){
	var geometry = new THREE.CubeGeometry( 18, 6, 8 );
	var material = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xffffff, wireframe:true, visible:false} ), friction, restitution );
	var host = new Physijs.BoxMesh( geometry, material, 500 );
	scene.add( host );
	
	this.hostID = host.id;
	
	var engine, engineAnimator, engineTextureXZ, shipTextureAnimator;
	
	host.add( ship );
	
	var shipMaterial = ship.material.materials[0];
	shipMaterial.envMap = textureCube;
	shipMaterial.combine = THREE.MixOperation;
	shipMaterial.reflectivity = 0.15;
	
	var windowMaterial = ship.material.materials[1];
	windowMaterial.envMap = textureCube;
	windowMaterial.combine = THREE.MixOperation;
	windowMaterial.reflectivity = 2.95;
		
	shipTextureAnimator = new TextureAnimator( shipMaterial.map, 2, 2, 4, 180 );
	
	engine = new THREE.Object3D();
	ship.add(engine);
	
	engineTextureXZ = new THREE.ImageUtils.loadTexture( "textures/engine_xz.png" );
	var textureY = new THREE.ImageUtils.loadTexture( "textures/engine_y.png" );
	var geo = new THREE.PlaneGeometry(2,4);
	var mat = new THREE.MeshBasicMaterial({color:0xffffff, map:engineTextureXZ, transparent:true, blending:THREE.AdditiveBlending, depthTest:true, depthWrite:false});
	mat.side = THREE.DoubleSide;
	var meshx = new THREE.Mesh(geo,mat);
	var meshz = new THREE.Mesh(geo,mat);
	
	engineAnimator = new TextureAnimator( engineTextureXZ, 3, 1, 3, 30 );
	
	var geo = new THREE.PlaneGeometry(1,1);
	var mat = new THREE.MeshBasicMaterial({color:0xffffff, map:textureY, transparent:true, blending:THREE.AdditiveBlending, depthTest:true, depthWrite:false});
	mat.side = THREE.DoubleSide;
	var meshy = new THREE.Mesh(geo,mat);
	meshy.rotation.x = Math.PI/2;
	meshz.rotation.y = Math.PI/2;
	
	meshx.position.y=meshz.position.y=-2;
	
	engine.add(meshx);
	engine.add(meshz);
	engine.add(meshy);
	
	engine.rotation.x -= Math.PI/2;
	engine.position.z = 2.45;
	engine.position.y = 0.4;
	
	var flameFlare = new FlameFlare( host, 0,1,7.1 );	
	
	function particleGeometry(){
		var pos = new THREE.Vector3();
		pos.getPositionFromMatrix( host.matrixWorld );
		var particles = [];
		var particleCount = 15,
		particles = new THREE.Geometry();
		for(var i = 0; i < particleCount; i++) {
			var x = pos.x + Math.random() * 8 - 4;
			var y = pos.y + Math.random() * 8 - 4;
			var z = pos.z + Math.random() * 8 - 4;
			var particle = new THREE.Vector3(x,y,z);
			//particle.multiplyScalar(3);
		  particles.vertices.push(particle);
		}
		return particles;
	}
	
	function collisionParticles(){
		collisionSound.play();
		
		var collisionParticles = new THREE.ParticleSystem(
			particleGeometry(),
			new THREE.ParticleBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/star_blue_texture.png'), transparent: true, size: 5, depthTest:true, depthWrite:false, blending: THREE.AdditiveBlending })
		);
		scene.add(collisionParticles);
		delay(500,function(){scene.remove(collisionParticles)});
	}
	
	var cameraBehind = new THREE.Object3D();
	cameraBehind.position.set(0,15,50);
	host.add(cameraBehind);
	
	var cameraTop = new THREE.Object3D();
	cameraTop.position.set(0,50,worldRadius*1.5);
	host.add(cameraTop);
	
	this.__cameraBehind = cameraBehind;
	this.__cameraTop = cameraTop;
	
	this.__object = host;
	
	this.turnRight = function(){
		new TWEEN.Tween({
			z:ship.rotation.z,
			posB:cameraBehind.position.x,
			posT:cameraTop.position.x
		}).to({
			z:-0.5,
			posB:10,
			posT:10
		},500).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			ship.rotation.z=this.z;
			cameraBehind.position.x=this.posB;
			cameraTop.position.x=this.posT;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	this.turnLeft = function(){
		new TWEEN.Tween({
			z:ship.rotation.z,
			posB:cameraBehind.position.x,
			posT:cameraTop.position.x
		}).to({
			z:0.5,
			posB:-10,
			posT:-10
		},500).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			ship.rotation.z=this.z;
			cameraBehind.position.x=this.posB;
			cameraTop.position.x=this.posT;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	this.turnForward = function(){
		new TWEEN.Tween({
			posZ:cameraBehind.position.z
		}).to({
			posZ:70
		},200).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			cameraBehind.position.z=this.posZ;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	this.turnBackward = function(){
		new TWEEN.Tween({
			posZ:cameraBehind.position.z
		}).to({
			posZ:30
		},200).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			cameraBehind.position.z=this.posZ;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	this.turnBack = function(){
		new TWEEN.Tween({
			z:ship.rotation.z,
			posX:cameraBehind.position.x,
			posZ:cameraBehind.position.z,
			posT:cameraTop.position.x
		}).to({
			z:0,
			posZ:50,
			posX:0,
			posT:0
		},500).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			ship.rotation.z=this.z;
			cameraBehind.position.x=this.posX;
			cameraBehind.position.z=this.posZ;
			cameraTop.position.x=this.posT;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	
	var startPoints = [];
	for(var i=0; i<5; i++){
		var startPoint = new THREE.Mesh( new THREE.CubeGeometry( 2, 2, 2, 1,1,1 ),material);
		startPoint.rotation.copy(host.rotation);
		startPoint.position.x = 4*i-8;
		startPoint.position.y -= 3;
		startPoint.position.z -= 2;
		host.add(startPoint);
		startPoints.push(startPoint);
	}
	
	this.__startPoint = startPoints;
	
	var endPoint = new THREE.Object3D();
	endPoint.position.z = -100000;
	//endPoint.position.y = 100;
	host.add(endPoint);
	
	this.__endPoint = endPoint;
	
	var reflector = new THREE.SpotLight( 0xffd429, 10 );
	host.add(reflector);
	reflector.position.set(0,0,10);
	reflector.castShadow = true;
	reflector.shadowDarkness = 0.6;
	reflector.shadowMapWidth = 1024;
	reflector.shadowMapHeight = 1024;
	//reflector.shadowBias = 0.03;
	reflector.shadowCameraRight = 0.1;
	reflector.shadowCameraLeft = -0.1;
	reflector.shadowCameraTop = 0.1;
	reflector.shadowCameraBottom = -0.1;
	reflector.shadowCameraNear = 10;
	reflector.shadowCameraFar = 500;
	reflector.shadowCameraFov = 30;
	
	reflector.target = endPoint;
	
	this.__reflector = reflector;
	
	this.turnOnReflector = function(){
		if(reflector.intensity<100){
			reflector.intensity++;
		}
	}
	this.turnOffReflector = function(){
		new TWEEN.Tween({
			r:100
		}).to({
			r:10
		},1000).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
			reflector.intensity = this.r;
		}).onStart(function(){}).onComplete(function(){}).start();
	}
	
	var punched = false;
	host.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		if((other_object.geometry instanceof THREE.CubeGeometry) && punched==false){
			punched = true;
			var punchMaterial = new THREE.SpriteMaterial({
				map: new THREE.ImageUtils.loadTexture( "textures/punch_texture.png" ),
				blending:THREE.AdditiveBlending,
				/*alignment: THREE.SpriteAlignment.topLeft,*/
				useScreenCoordinates: false
			});
			var punch = new THREE.Sprite(punchMaterial);
			
			punch.position.set(0,0,-1);
			punch.scale.set( window.innerWidth / window.innerHeight, 1, 1 );
			
			var otherObjPos = new THREE.Vector3();
			otherObjPos.getPositionFromMatrix(other_object.matrixWorld);
			var velocity = otherObjPos.sub(camera.position).normalize().multiplyScalar(20);
			
			new TWEEN.Tween({
				x:camera.position.x,
				y:camera.position.y,
				z:camera.position.z
			}).to({
				x:camera.position.x-(velocity.x),
				y:camera.position.y-(velocity.y),
				z:camera.position.z-(velocity.z)
			},500).easing( TWEEN.Easing.Quadratic.Out ).onUpdate(function (){
				camera.position.x = this.x;
				camera.position.y = this.y;
				camera.position.z = this.z;
				host.position.x = this.x;
				host.position.y = this.y;
				host.position.z = this.z;
			}).onStart(function(){
				collisionParticles();
				controls.freeze = true;
				host.add(punch);
			}).onComplete(function(){
				controls.freeze = false;
				host.remove(punch);
				punched = false;
			}).start();
			
			hud.reduceSheld();
		}
		/*controls.freeze = true;
		delay(1000,function(){controls.freeze = false});*/
	});
	
	this.update = function(delta){
		host.__dirtyPosition = true;
		host.__dirtyRotation = true;
		host.position.copy( camera.position );
		host.rotation.copy( camera.rotation );

		engine.rotation.y+=1;
		engineAnimator.update(1000 * delta);
		shipTextureAnimator.update(1000 * delta);
		
		var distance = camera.position.distanceTo( scene.position );
		if( distance > worldRadius ){
			var oldPos = camera.position.clone();
			//var vector = oldPos.sub(scene.position);
			var newPos = oldPos.multiplyScalar( 0.9 );
			var velocity = scene.position.clone().sub(camera.position).normalize().multiplyScalar(-10);
			//camera.position.set( newPos.x,newPos.y,newPos.z );
			
			new TWEEN.Tween({
				x:oldPos.x,
				y:oldPos.y,
				z:oldPos.z
			}).to({
				x:oldPos.x-velocity.x,
				y:oldPos.y-velocity.y,
				z:oldPos.z-velocity.z
			},1000).easing( TWEEN.Easing.Back.Out ).onUpdate(function (){
				camera.position.x = this.x;
				camera.position.y = this.y;
				camera.position.z = this.z;
				host.position.x = this.x;
				host.position.y = this.y;
				host.position.z = this.z;
			}).onStart(function(){
				//controls.freeze = true;
			}).onComplete(function(){
				//controls.freeze = false;
			}).start();
			//camera.position.set( newPos.x*0.99,newPos.y*0.99,newPos.z*0.99 );
			//camera.lookAt( scene.position );
		}
	}
}