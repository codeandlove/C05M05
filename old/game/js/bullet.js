var bullets = [];
function Bullet(velocity, type, startPoint){

	this.startPoint = startPoint || host.__startPoint[2];
	this.type = type || 'dot';
	
	self = this;
	
	this.velocity = velocity || '600';
	var bulletsGroup = [];
	
	switch(this.type){
		case 'dot':
			var g = new THREE.SphereGeometry( 2, 1, 1 )
			var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xffffff, transparent:true, visible:true} ), 0, 0 );
			var bullet = new Physijs.SphereMesh( g, m, 1000);
			
			/*var g = new THREE.PlaneGeometry(2,2);
			var m = new THREE.MeshBasicMaterial( {color:0xffffff, transparent:true, map: new THREE.ImageUtils.loadTexture('textures/bullet_texture.png'), depthWrite:false, depthTest:false, blending:THREE.AdditiveBlending} )
			var mesh = new THREE.Mesh(g,m);
			bullet.add(mesh);*/
			//bullet.setCcdMotionThreshold(1);
		break;
	}
	
	var startPos = new THREE.Vector3();
	startPos.getPositionFromMatrix(this.startPoint.matrixWorld);
	bullet.position.copy( startPos );

	scene.add( bullet );
	
	var endPos = new THREE.Vector3();
	endPos.getPositionFromMatrix(host.__endPoint.matrixWorld);
	
	var v = endPos.normalize().multiplyScalar( this.velocity );
	bullet.setLinearVelocity( v );
	
	var arrayObject = { object:this, __object:bullet }
	bullets.push( arrayObject );

	function removeBullet(){
		scene.remove( bullet );
		bullets.splice( bullets.indexOf( arrayObject ), 1);
		delete self;
	}
	
	this.update = function(){
		bullet.__dirtyPosition = true;
		bullet.__dirtyRotation = true;
		bullet.lookAt(currentCamera.position);
		if(bullet.position.distanceTo( scene.position )>worldRadius*2 ){
			removeBullet();
		}
	}
	delay(5000,function(){removeBullet()});
	/*	
	bullet.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		if((other_object.geometry instanceof THREE.CubeGeometry)){
			for(var i=0; i<bugs.length; i++){
				if(bugs[i].__object == other_object){
					bugs[i].object.removeLive();
					removeBullet();
				};
			}
		}
	});	*/
}
function doubleBullet(velocity, type){
	var sp1 = host.__startPoint[1];
	var sp2 = host.__startPoint[3];
	var bullet1 = new Bullet(velocity, type, sp1);
	var bullet2 = new Bullet(velocity, type, sp2);
	
}
function tripleBullet(velocity, type){
	var sp1 = host.__startPoint[0];
	var sp2 = host.__startPoint[2];
	var sp3 = host.__startPoint[4];
	var bullet1 = new Bullet(velocity, type, sp1);
	var bullet2 = new Bullet(velocity, type, sp2);
	var bullet3 = new Bullet(velocity, type, sp3);
}
function quadroBullet(velocity, type){
	var sp1 = host.__startPoint[0];
	var sp2 = host.__startPoint[1];
	var sp3 = host.__startPoint[3];
	var sp4 = host.__startPoint[4];
	var bullet1 = new Bullet(velocity, type, sp1);
	var bullet2 = new Bullet(velocity, type, sp2);
	var bullet3 = new Bullet(velocity, type, sp3);
	var bullet4 = new Bullet(velocity, type, sp4);
}

function Rocket(){
	var armed = false;
	var exploded = false;
	
	var g = new THREE.CylinderGeometry(2, 2, 4, 8, 1, false);
	g.applyMatrix(new THREE.Matrix4().rotateX(Math.PI/2) );
	var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xffffff, transparent:true, visible:false} ), 0, 0 );
	var rocket = new Physijs.CylinderMesh( g, m, 500);
	var position = new THREE.Vector3();
	position.getPositionFromMatrix(host.__startPoint[2].matrixWorld);
	rocket.position.copy(position);
	rocket.lookAt(camera.position);
	//rocket.rotation.x -= Math.PI/2;
	scene.add(rocket);
	
	var loader = new THREE.JSONLoader( true );
	loader.load( "models/missle.js", function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 1, 1, 1 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		
		rocket.add( mesh );
	});
	
	var endPos = new THREE.Vector3();
	endPos.getPositionFromMatrix(host.__endPoint.matrixWorld);
	var v = endPos.normalize().multiplyScalar(100);
	rocket.setLinearVelocity( v );
	
	function particleGeometry(){
		var pos = new THREE.Vector3();
		pos.getPositionFromMatrix( rocket.matrixWorld );
		var particles = [];
		var particleCount = 1,
		particles = new THREE.Geometry();
		for(var i = 0; i < particleCount; i++) {
			var x = pos.x + Math.random() * 2 - 1;
			var y = pos.y + Math.random() * 2 - 1;
			var z = pos.z + Math.random() * 2 - 1;
			var particle = new THREE.Vector3(x,y,z);
			//particle.multiplyScalar(3);
		  particles.vertices.push(particle);
		}
		return particles;
	}
	
	function rocketParticles(){
		
		var rocketParticles = new THREE.ParticleSystem(
			particleGeometry(),
			new THREE.ParticleBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/star_yellow_texture.png'), transparent: true, opacity:0.8, size: 10, depthWrite:false, depthTest:true, blending: THREE.AdditiveBlending })
		);
		scene.add(rocketParticles);
		delay(2000,function(){scene.remove(rocketParticles)});
	}
	
	function explode(){
		exploded = true;
		explodeSound.play();		
		
		explosionTexture.wrapS = explosionTexture.wrapT = THREE.RepeatWrapping;
		explosionTexture.repeat.set( 1 / 4, 1 / 6 );
		var geometry = new THREE.PlaneGeometry( 25, 25 );
		var material = new THREE.MeshBasicMaterial( { map: explosionTexture, transparent:true, depthTest:true, depthWrite:false, blending:THREE.AdditiveBlending } );
		
		var explodeSprite = new THREE.Mesh( geometry, material );
		explodeSprite.position.copy(rocket.position);
		
		scene.add(explodeSprite);
		scene.remove(rocket);
		
		var lensLight = new lensFlare( 0xfff6c4, explodeSprite.position.x, explodeSprite.position.y, explodeSprite.position.z );
		
		new TWEEN.Tween({
			tile:1
		}).to({
			tile:24
		},960).interpolation( TWEEN.Interpolation.Linear ).easing( TWEEN.Easing.Linear.None ).onUpdate(function (){
			var currentTile = Math.floor(this.tile);
			var currentColumn = currentTile % 4;
			var currentRow = 6-Math.floor( currentTile / 4 );
			explosionTexture.offset.x = currentColumn / 4;
			explosionTexture.offset.y = currentRow / 6;
			explodeSprite.lookAt(currentCamera.position);
		}).onStart(function(){}).onComplete(function(){
			scene.remove(explodeSprite);
			lensLight.remove();
		}).start();
		
	}
	
	var targets = [];
	for(var i=0;i<rocks.length;i++){
		if(rocks[i]!=0){
			targets.push(rocks[i]);
		}
	}
	for(var i=0;i<enemies.length;i++){
		if(enemies[i]!=0){
			targets.push(enemies[i]);
		}
	}
	
	if(targets.length>0){
	
		var enemy = targets[Math.floor(Math.random()*targets.length)];

		delay(1000,function(){
			armed = true;
			var rocketLight = new lensFlare( 0xe01b1b, rocket.position.x, rocket.position.y, rocket.position.z );
			
			new TWEEN.Tween({s:0}).to({s:1}, 2500).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
				rocketParticles();
				rocketLight.updatePosition(rocket.position.x, rocket.position.y, rocket.position.z);
				rocket.lookAt(enemy.__object.position);
				var endPos = new THREE.Vector3();
				endPos.getPositionFromMatrix(enemy.__object.matrixWorld);
				var v = rocket.position.clone().sub(endPos).normalize().multiplyScalar(-100);
				rocket.setLinearVelocity( v );
			}).onStart(function(){
			}).onComplete(function(){
				if(!exploded) explode();
				rocketLight.remove();
			}).start();
		});
	
	}else{
		delay(1000,function(){
			armed = true;
			var rocketLight = new lensFlare( 0xe01b1b, rocket.position.x, rocket.position.y, rocket.position.z );
			
			new TWEEN.Tween({s:0}).to({s:1}, 2500).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
				rocketParticles();
				rocketLight.updatePosition(rocket.position.x, rocket.position.y, rocket.position.z);
			}).onStart(function(){
			}).onComplete(function(){
				if(!exploded) explode();
				rocketLight.remove();
			}).start();
		});
	}
	
	rocket.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		if((other_object.id != host.hostID) && !(other_object.geometry instanceof THREE.CylinderGeometry) && armed){
			explode();
		}
	});
	
}

function specialWeaponStarter(color){
	this.color = color || 0x000000;
	var position = new THREE.Vector3();
	position.getPositionFromMatrix(host.__startPoint[2].matrixWorld);
	
	var self = this;
	
	var g = new THREE.IcosahedronGeometry( 5, 1 );
	var m = new THREE.MeshBasicMaterial({color:this.color, transparent:true, opacity:1, wireframe:true, blending:THREE.AdditiveBlending});
	var weaponStarter = new THREE.Mesh(g, m);
	weaponStarter.position.copy(position);
	
	for(var i=0; i<weaponStarter.geometry.vertices.length; i++){
		var g = new THREE.SphereGeometry( 0.1, 12, 12 );
		var m = new THREE.MeshBasicMaterial({color:0xffffff});
		var point = new THREE.Mesh(g,m);
		point.position.set(	weaponStarter.geometry.vertices[i].x, weaponStarter.geometry.vertices[i].y,	weaponStarter.geometry.vertices[i].z);
		weaponStarter.add(point);
	}
	
	scene.add(weaponStarter);
	
	this.__object = weaponStarter;
	
	this.remove = function(){
		scene.remove(weaponStarter);
		delete self;
	}
}
function Armagedon(){
	armagedonArmedSound.play();
	
	var armgdn;
	var armgdnArray=[];
	
	var self = this;
	
	var armgdnStarter = new specialWeaponStarter(0x1c0b73);
	
	var flare = new lensFlare( 0x4513b5, armgdnStarter.__object.position.x, armgdnStarter.__object.position.y, armgdnStarter.__object.position.z );
	
	delay(5000,function(){
		var i = 0;
		new TWEEN.Tween({s:1}).to({s:5}, 5000).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
			if(i>25){
				var g = new THREE.SphereGeometry( this.s*20, 32, 32 );
				var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0x4800ff, transparent:true, opacity:0.8, blending:THREE.AdditiveBlending}), 0, 0 );
				armgdn = new Physijs.SphereMesh( g, m, /*this.s*10*/0);
				armgdn.material.side = THREE.DoubleSide;
				armgdn.position.copy(armgdnStarter.__object.position);
				scene.add(armgdn);
				
				armgdn.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
					if(!(other_object.geometry instanceof THREE.SphereGeometry)){
						for(var i=0; i<bugs.length; i++){
							if(bugs[i].__object == other_object){
								bugs[i].object.removeLive();
							};
						}
					}
				});
				armgdnArray.push(armgdn);
				i = 0;
			}else{
				i++;
			}
		}).onStart(function(){
			armagedonExplodeSound.play();
		}).onComplete(function(){
			fadeOut(armgdnStarter.__object, 2000, true, function(){
				armgdnStarter.__object.rotation.y +=0.1;
				armgdnStarter.__object.scale.x +=0.1;
				armgdnStarter.__object.scale.y +=0.1;
				armgdnStarter.__object.scale.z +=0.1;
			},function(){
				armgdnStarter.remove();
				flare.remove();
				delete self;
			});
			for(var i=0; i<armgdnArray.length; i++){
				scene.remove(armgdnArray[i]);
			}
		}).start();
	});
}

function AtomDestroyer(){
	var atoms = [];	
	
	var atomStarter = new specialWeaponStarter(0x2CCb70);
	
	var self = this;
	
	var flare = new lensFlare( 0x2CCb70, atomStarter.__object.position.x, atomStarter.__object.position.y, atomStarter.__object.position.z );
	
	for(var i=0; i<3; i++){
		var g = new THREE.SphereGeometry( 10, 32, 32 );
		var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xFFFFFF, transparent:true, opacity:1, blending:THREE.AdditiveBlending}), 0, 0 );
		atom = new Physijs.SphereMesh( g, m, 0);
		atom.position.copy(atomStarter.__object.position);
		scene.add(atom);
		atoms.push(atom);
		
		atom.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
			if(!(other_object.geometry instanceof THREE.SphereGeometry)){
				for(var i=0; i<bugs.length; i++){
					if(bugs[i].__object == other_object){
						bugs[i].object.removeLive();
					};
				}
			}
		});
	}
		
	for(var i=0; i<atoms.length; i++){
		fadeIn(atoms[i], 50000);
	}
	delay(10000,function(){
		new TWEEN.Tween({theta:0}).to({theta:50}, 20000).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
			for(var i=0; i<atoms.length; i++){
				atoms[i].__dirtyPosition = true;
				atoms[i].__dirtyRotation = true;
				switch(i){
					case 0:
						atoms[i].position.x = atomStarter.__object.position.x + (i+1)*(this.theta) * Math.sin(this.theta);
						atoms[i].position.y = atomStarter.__object.position.y + (i+1)*(this.theta) * Math.cos(this.theta);
					break;
					case 1:
						atoms[i].position.x = atomStarter.__object.position.x + (i+1)*(this.theta) * Math.cos(this.theta);
						atoms[i].position.z = atomStarter.__object.position.z + (i+1)*(this.theta) * Math.sin(this.theta);
					break;
					case 2:
						atoms[i].position.y = atomStarter.__object.position.y + (i+1)*(this.theta) * Math.cos(this.theta);
						atoms[i].position.z = atomStarter.__object.position.z + (i+1)*(this.theta) * Math.sin(this.theta);
					break;
				}
				
			}
			
		}).onStart(function(){
			
		}).onComplete(function(){
			for(var i=0; i<atoms.length; i++){
				scene.remove(atoms[i]);
			}
			fadeOut(atomStarter.__object, 2000, false, function(){
				atomStarter.__object.rotation.y +=0.1;
				atomStarter.__object.scale.x +=0.1;
				atomStarter.__object.scale.y +=0.1;
				atomStarter.__object.scale.z +=0.1;
			},function(){
				atomStarter.remove();
				flare.remove();
				delete self;
			});
		}).start();
	});
}