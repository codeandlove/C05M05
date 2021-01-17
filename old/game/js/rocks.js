'use strict';

var rocks = [];

var levelRocks = 0;
function clearRocks(){
	rocks = [];
}
function Rock(type, lives, size, startPosition){
	
	levelRocks++;
	
	var self = this;
	
	var type = type || 'first';
	
	var lives = lives || 10;
	var startLives = lives;
	
	var size = size || Math.random()*20+20;
	var positionRange = 2*worldRadius/*+2*size*/;
	
	var geometry = new THREE.CubeGeometry( size, size, size, 1,1,1 );
	var material = new Physijs.createMaterial( new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:true, visible:false, deepWrite:true }), friction, restitution );
	var rock = new Physijs.BoxMesh(geometry,material, 5000);
	
	var arrayObject = {object:this, __object:rock, lives:lives};
	rocks.push(arrayObject);
	
	for(var i=0;i<rocks.length; i++){
		if(rocks[i]==arrayObject){
			var arrayIndex = i;
		}
	}
	
	this.__object = rock;
	
	scene.add(rock);
	
	var model;
	switch(type){
		case 'first':
			model = firstRock.clone();
			rock.add(model);
			rock.__dirtyPosition = true;
			rock.position.set(Math.random() * 2 - 1,Math.random() * 2 - 1,Math.random() * 2 - 1);
			rock.position.normalize();
			rock.position.multiplyScalar( positionRange );
		break;
		case 'second':
			model = secondRock.clone();
			rock.add(model);
			rock.__dirtyPosition = true;
			var range = Math.random()*10-5;
			rock.position.set(startPosition.x + range, startPosition.y + range, startPosition.z + range);
		break;
		case 'third':
			model = thirdRock.clone();
			rock.add(model);
			rock.__dirtyPosition = true;
			var range = Math.random()*10-5;
			rock.position.set(startPosition.x + range, startPosition.y + range, startPosition.z + range);
		break;
	}
	
	/*function loadModel(model){
		var loader = new THREE.JSONLoader( true );
		loader.load( "models/"+model, function( geometry, materials ) {
			var material = new THREE.MeshFaceMaterial(materials);
			material.materials[0].bumpMap = asteroidTexture;
			material.materials[0].bumpScale = 1;
			var mesh = new THREE.Mesh( geometry, material);
			mesh.scale.set( size/2, size/2, size/2 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			rock.add( mesh );
		});
	}*/
	
	function removeRock(){
		scene.remove(rock);
		levelRocks--;
		rocks[arrayIndex] = 0;
	}
	
	function separateRock(){
		switch(type){
			case 'first':
				for(var i=0;i<2;i++){
					new Rock('second', startLives, size/2, rock.position);
				}
				explode();
			break;
			case 'second':
				for(var i=0;i<2;i++){
					new Rock('third', startLives, size/2, rock.position);
				}
				explode();
			break;
			case 'third':
				explode();
			break;
		}
	}
	
	function removeLive() {
		lives--;
		hitRock();
	}
	
	function hitRock(){
		hitSound.play();
		
		var geometry = new THREE.CubeGeometry( 6, 6, 6, 1,1,1 );
		var smallRock = new Physijs.BoxMesh(geometry, material, 10);
		smallRock.__dirtyPosition = true;
		smallRock.position.copy(rock.position);
		scene.add(smallRock);
		if(Math.random()>0.5){var model = "rock3_textured.js"}else{var model = "rock2_textured.js"}
		var loader = new THREE.JSONLoader( true );
		loader.load( "models/"+model, function( geometry, materials ) {
			var material = new THREE.MeshFaceMaterial(materials);
			var mesh = new THREE.Mesh( geometry, material);
			mesh.scale.set( 2,2,2 );
			smallRock.add( mesh );
		});
		delay(1000,function(){scene.remove(smallRock)});
	}
	
	function explode(){
		explodeSound.play();		
		
		explosionTexture.wrapS = explosionTexture.wrapT = THREE.RepeatWrapping;
		explosionTexture.repeat.set( 1 / 4, 1 / 6 );
		var geometry = new THREE.PlaneGeometry( 50, 50 );
		var material = new THREE.MeshBasicMaterial( { map: explosionTexture, transparent:true, depthTest:true, depthWrite:false, blending:THREE.AdditiveBlending } );
		
		var explodeSprite = new THREE.Mesh( geometry, material );
		explodeSprite.position.copy(rock.position);
		
		scene.add(explodeSprite);
		
		removeRock();
		
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
	
	rock.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		if((other_object.geometry instanceof THREE.SphereGeometry ||
			other_object.geometry instanceof THREE.CylinderGeometry
		) && lives>=0){
			if(lives>0){
				removeLive();
			}else if(lives==0){
				lives = -1;
				separateRock();
				hitRock();
			}
		}
	});
	
	this.update = function(){
		if(typeof rock !== 'undefined' && rock.position.distanceTo(scene.position)>=worldRadius){
			var v = rock.position.clone().sub(scene.position).normalize();
			rock.setLinearVelocity( v.multiplyScalar(-50) );
		}
	}
	
}