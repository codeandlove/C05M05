var enemies = [];

function Enemy(lives){
	
	var lives = lives || 50;
	var focus = true;
	var shootInterval  = 'null';
	var cycleInterval = 'null';
	
	var geometry = new THREE.CubeGeometry( 18, 6, 8 );
	var material = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xffffff, wireframe:true, visible:false} ), friction, restitution );
	var enemy = new Physijs.BoxMesh( geometry, material, 50000 );
	scene.add( enemy );
	
	var arrayObject = {object:this, __object:enemy, lives:lives};
	enemies.push(arrayObject);
	
	for(var i=0;i<enemies.length; i++){
		if(enemies[i]==arrayObject){
			var arrayIndex = i;
		}
	}
	
	var bulletPoint = new THREE.Object3D();
	enemy.add(bulletPoint);
	bulletPoint.position.z = 5;
	
	enemy.position.set(0,0,0);
	
	var engine, engineAnimator, engineTextureXZ, shipTextureAnimator;
	
	var enemyModel = enemyShip.clone();
	enemy.add( enemyModel );
	
	var shipMaterial = enemyModel.material.materials[0];
	shipMaterial.envMap = textureCube;
	shipMaterial.combine = THREE.MixOperation;
	shipMaterial.reflectivity = 0.15;
	
	var windowMaterial = enemyModel.material.materials[1];
	windowMaterial.envMap = textureCube;
	windowMaterial.combine = THREE.AddOperation;
	windowMaterial.reflectivity = 0.95;
	
	engine = new THREE.Object3D();
	enemyModel.add(engine);
	
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
	
	engine.rotation.x = Math.PI/2;
	engine.position.z -= 2.0;
	engine.position.y = 0.8;
	
	/*var loader = new THREE.JSONLoader( true );
	loader.load( "models/enemyShip.js", function( geometry, materials ) {
		
		var material = new THREE.MeshFaceMaterial(materials);
		
		ship = new THREE.Mesh( geometry, material );
		ship.scale.set( 3, 3, 3 );
		enemy.add( ship );
		
	});*/
	
	function particleGeometry(){
		var pos = new THREE.Vector3();
		pos.getPositionFromMatrix( enemy.matrixWorld );
		var particles = [];
		var particleCount = 15,
		particles = new THREE.Geometry();
		for(var i = 0; i < particleCount; i++) {
			var x = pos.x + Math.random() * 8 - 4;
			var y = pos.y + Math.random() * 8 - 4;
			var z = pos.z + Math.random() * 8 - 4;
			var particle = new THREE.Vector3(x,y,z);
		  particles.vertices.push(particle);
		}
		return particles;
	}
	
	function hitParticles(){
		
		var hitParticles = new THREE.ParticleSystem(
			particleGeometry(),
			new THREE.ParticleBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/star_red_texture.png'), transparent: true, size: 5, depthTest:true, depthWrite:false, blending: THREE.AdditiveBlending })
		);
		scene.add(hitParticles);
		
		delay(500,function(){scene.remove(hitParticles)});
	}
	
	this.update = function(delta){
		if(focus){
			enemy.lookAt(host.__object.position);
			enemy.__dirtyPosition = true;
			enemy.__dirtyRotation = true;
		}else{
			enemy.__dirtyPosition = false;
			enemy.__dirtyRotation = false;
		}

		engine.rotation.y+=1;
		engineAnimator.update(1000 * delta);

	}
	function attack(){
		if(shootInterval=='null'){
			shootInterval = setInterval(shoot, 1000);
		}	
	}
	function stopAttack(){
		clearInterval(shootInterval);
		shootInterval = 'null';
	}
	
	function shoot(){
		var g = new THREE.CubeGeometry( 1, 1, 1 );
		var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:0xffffff, transparent:true, wireframe:true, visible:false} ), 0, 0 );
		var bullet = new Physijs.BoxMesh( g, m, 500);
		
		var g = new THREE.PlaneGeometry( 2, 2 );
		var texture = new THREE.ImageUtils.loadTexture('textures/enemy_bullet_texture.png');
		var m = new THREE.MeshBasicMaterial( {color:0xffffff, transparent:true, map:texture, depthTest:true, depthWrite:false, blending: THREE.AdditiveBlending} );
		var m = new THREE.Mesh(g, m);
		
		bullet.add(m);
		
		var startPos =  new THREE.Vector3();
		startPos.getPositionFromMatrix(bulletPoint.matrixWorld);
		bullet.position.set(startPos.x,startPos.y,startPos.z);
		bullet.__drityPosition = true;
		scene.add(bullet);
		var endPos = new THREE.Vector3();
		endPos.getPositionFromMatrix(host.__object.matrixWorld);
		var v = enemy.position.clone().sub(endPos).normalize().multiplyScalar(-100);
		bullet.setLinearVelocity( v );
		
		new TWEEN.Tween({}).to({
		
		}, 2000).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
			bullet.lookAt(currentCamera.position);
		}).onStart(function(){}).onComplete(function(){
			scene.remove(bullet);
		}).start();
		//delay(3000, function(){scene.remove(bullet)});
	}
	var maxRange = worldRadius*4
	var minRange = worldRadius/2;
	var enemyMovement = new TWEEN.Tween({
		x:Math.random()*maxRange-maxRange/2,
		y:Math.random()*maxRange-maxRange/2,
		z:Math.random()*maxRange-maxRange/2
	}).to({
		x:Math.random()*minRange-minRange/2,
		y:Math.random()*minRange-minRange/2,
		z:Math.random()*minRange-minRange/2
	}, 10000).easing( TWEEN.Easing.Sinusoidal.InOut ).onUpdate(function (){
		enemy.position.x = this.x;
		enemy.position.y = this.y;
		enemy.position.z = this.z;
	}).onStart(function(){}).onComplete(function(){
		delay(1000,function(){
			attack();
			cycleInterval = setInterval(function(){
				new TWEEN.Tween({
					x:enemy.position.x,
					y:enemy.position.y,
					z:enemy.position.z
				}).to({
					x:Math.random()*worldRadius-worldRadius/2,
					y:Math.random()*worldRadius-worldRadius/2,
					z:Math.random()*worldRadius-worldRadius/2
				}, 2500).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
					enemy.__dirtyPosition = true;
					enemy.__dirtyRotation = true;
					enemy.setLinearVelocity(new THREE.Vector3(0,0,0));
					enemy.position.x = this.x;
					enemy.position.y = this.y;
					enemy.position.z = this.z;
				}).onStart(function(){}).onComplete(function(){
				}).start();
			},5000);
		});
	}).start();
	
	function hit(){
		enemyHitSound.play();
		hitSound.play();
		
		hitParticles();
		
		focus = false;
		stopAttack();
		delay(2000,function(){
			var v = new THREE.Object3D();
			v.position.copy(enemy.position);
			scene.add(v);
			v.lookAt(host.__object.position);
			new TWEEN.Tween({
				x:enemy.rotation.x,
				y:enemy.rotation.y,
				z:enemy.rotation.z
			}).to({
				x:v.rotation.x,
				y:v.rotation.y,
				z:v.rotation.z
			}, 1000).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
				enemy.__dirtyPosition = true;
				enemy.__dirtyRotation = true;
				enemy.rotation.x = this.x;
				enemy.rotation.y = this.y;
				enemy.rotation.z = this.z;
			}).onStart(function(){}).onComplete(function(){
				scene.remove(v);
				focus = true;
				if(lives>0)	attack();
			}).start();
		});
	}
	
	function removeLive(){
		lives--;
	}
	
	function removeEnemy(){
		enemyMovement.stop();
		stopAttack();
		scene.remove(enemy);
		enemies.splice( enemies.indexOf( arrayObject ), 1);
	}
	
	enemy.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		if(other_object.geometry instanceof THREE.SphereGeometry ||	other_object.geometry instanceof THREE.CylinderGeometry){
			if(lives>=0){
				if(lives>0){
					hit();
					removeLive();
				}else if(lives==0){
					lives = -1;
					removeEnemy();
					explode(enemy.position.x,enemy.position.y,enemy.position.z, 50);
				}
			}
		}
	});
	
}