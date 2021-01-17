var asteroidTexture 		=  	new THREE.ImageUtils.loadTexture('models/asteroid_texture.jpg');
var explosionTexture 		= 	new THREE.ImageUtils.loadTexture('textures/explosion.png');

var galax = [];

for(var i=0; i<5; i++){
	galax[i] = THREE.ImageUtils.loadTextureCube( 
		["textures/gal/"+i+"/3.jpg","textures/gal/"+i+"/1.jpg",
		"textures/gal/"+i+"/5.jpg","textures/gal/"+i+"/6.jpg",
		"textures/gal/"+i+"/2.jpg","textures/gal/"+i+"/4.jpg" ]
	);
}

var firstRock;
var rockLoader = new THREE.JSONLoader( true );
	rockLoader.load( "models/rock_textured.js", function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		material.materials[0].bumpMap = asteroidTexture;
		material.materials[0].bumpScale = 1;
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 12, 12, 12 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		firstRock = mesh;
	});
	rockLoader.onLoadComplete = function(){
		console.log('First Rock loaded');
	}

var secondRock;
var rockLoader = new THREE.JSONLoader( true );
	rockLoader.load( "models/rock2_textured.js", function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		material.materials[0].bumpMap = asteroidTexture;
		material.materials[0].bumpScale = 1;
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 8, 8, 8 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		secondRock = mesh;
	});
	rockLoader.onLoadComplete = function(){
		console.log('Second Rock loaded');
	}	

var thirdRock;
var rockLoader = new THREE.JSONLoader( true );
	rockLoader.load( "models/rock3_textured.js", function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		material.materials[0].bumpMap = asteroidTexture;
		material.materials[0].bumpScale = 1;
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 4, 4, 4 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		thirdRock = mesh;
	});
	rockLoader.onLoadComplete = function(){
		console.log('Third Rock loaded');
	}
	
var ship;
var shipLoader = new THREE.JSONLoader( true );
	shipLoader.load( "models/ship.js", function( geometry, materials ){
		var material = new THREE.MeshFaceMaterial(materials);
		mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( 3, 3, 3 );
		ship = mesh;
	});
	shipLoader.onLoadComplete = function(){
		console.log('ship loaded');
	}
	
var enemyShip;
var enemyLoader = new THREE.JSONLoader( true );
	enemyLoader.load( "models/enemyShip.js", function( geometry, materials ){
		var material = new THREE.MeshFaceMaterial(materials);
		var mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( 3, 3, 3 );
		enemyShip = mesh;
	});
	enemyLoader.onLoadComplete = function(){
		console.log('enemy ship loaded');
	}

var gates;
var gatesLoader = new THREE.JSONLoader( true );
	gatesLoader.load( "models/gates.js", function( geometry, materials ){
		var material = new THREE.MeshFaceMaterial(materials);
		var mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( 3, 3, 3 );
		gates = mesh;
	});
	gatesLoader.onLoadComplete = function(){
		console.log('gates loaded');
	}