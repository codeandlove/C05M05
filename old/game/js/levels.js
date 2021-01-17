/*
level is:
	- rocks parms,
	- enemies parms,
	- world parms,
	- galaxy parms
*/

var world, worldRadius;

var currentLevel = 0;

var levels = [
	{rocks:{amount:1, lives:1},
	enemies:{amount:0, lives:0},
	world:{radius:150}, galaxy:'stage_0'
	},
	{rocks:{amount:2, lives:1},
	enemies:{amount:1, lives:10},
	world:{radius:200}, galaxy:'stage_1'
	},
	{rocks:{amount:2, lives:1},
	enemies:{amount:3, lives:25},
	world:{radius:300}, galaxy:'stage_2'
	},
	{rocks:{amount:3, lives:3},
	enemies:{amount:5, lives:50},
	world:{radius:300}, galaxy:'stage_3'
	},
	{rocks:{amount:3, lives:3},
	enemies:{amount:2, lives:100},
	world:{radius:200}, galaxy:'stage_4'
	}
];

function Level(n){
	worldRadius = levels[n].world.radius;
	//world
	world = new World(worldRadius);
	
	//host
	host = new Host();

	//addRocks
	clearRocks();
	for(var i=0; i<levels[n].rocks.amount; i++){
		new Rock('first',levels[n].rocks.lives);
	}

	//addEnemies
	for(var i=0; i<levels[n].enemies.amount; i++){
		new Enemy(levels[n].enemies.lives);
	}

	//Cross
	cross = new Cross();

	//scene galaxy
	galaxy = new createGalaxy(levels[n].galaxy);

	//addBonus
	var bonus = new Bonus('2xfaster');

	var bonus = new Bonus('ultraFaster');

	var bonus = new Bonus('doubleFire');

	var bonus = new Bonus('tripleFire');

	var bonus = new Bonus('quadroFire');

	this.nextLevel = function(){
		stageClearSound.play();

		if(currentLevel+1<levels.length){
			currentLevel++;
		}else{
			currentLevel = 0;
		}
		scene.clear();
		level = new Level(currentLevel);
		controls.freeze = false;
	}

	var gates, gatesLoaded = false;
	this.attachGates = function(){

		var loader = new THREE.JSONLoader( true );
		loader.load( "models/gates.js", function( geometry, materials ) {
			var material = new THREE.MeshFaceMaterial(materials);
			gates = new THREE.Mesh( geometry, material);
			gates.scale.set( 10, 10, 10 );
			gates.position.set(0,0,0);
			scene.add( gates );
		});

		loader.onLoadComplete = function(){
			gatesLoaded = true;
			var texture = new THREE.ImageUtils.loadTexture('textures/teleport_texture.png');
			texture.wrapS = THREE.RepeatWrapping;
			var hGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1, 32, 32, true)
			var hMaterial = new THREE.MeshBasicMaterial({map:texture, transparent:true, opacity:0.5, visible:false, blinding: THREE.AdditiveBlending});
			var horizon = new THREE.Mesh(hGeometry,hMaterial);
			horizon.material.side = THREE.DoubleSide;
			horizon.rotation.x = Math.PI/2;
			horizon.position.z = 0.5;
			gates.add(horizon);
		}
	}
	this.attachGates();

	this.update = function(delta){
		//host position & rotation
		host.update(delta);

		//updates
		cross.update();
		world.update();
		galaxy.update();
		TWEEN.update();

		//rocks updates
		for( var i=0; i<rocks.length; i++ ){
			if(rocks[i]!=0) rocks[i].object.update();
		}

		//enemies updates
		for( var i=0; i<enemies.length; i++ ){
			enemies[i].object.update(delta);
		}

		//bonus updates
		for( var i=0; i<bonusArray.length; i++ ){
			bonusArray[i].object.update();
		}

		if(levelRocks==0){
			//gates update
			//gates.material.visible = true;
			gates.children[0].material.visible = true;
			if(gatesLoaded){
				if(host.__object.position.distanceTo(gates.position)>10){
					gates.lookAt(host.__object.position);
				}else{
					controls.freeze = true;
					this.nextLevel();
				}
			}
			/*
			if(host.__object.position.distanceTo(gates.position)>10){
				gates.lookAt(host.__object.position);
			}else{
				controls.freeze = true;
				this.nextLevel();
			}*/
		}
	}
}
THREE.Object3D.prototype.clear = function(){
    var children = this.children;
    for(var i = children.length-1;i>=0;i--){
        var child = children[i];
        child.clear();
        this.remove(child);
    };
};
