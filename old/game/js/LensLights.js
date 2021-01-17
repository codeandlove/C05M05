var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lens_00.png" );
var textureFlare1 = THREE.ImageUtils.loadTexture( "textures/lensflare/lens_01.png" );
var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lens_02.png" );
var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lens_03.png" );
function lensFlare( hex, x, y, z ) {
		var light = new THREE.PointLight( hex, 5 );
		
		light.color.setHex( hex );
		light.position.set(x,y,z);
		scene.add( light );
		
		var flareColor = new THREE.Color( hex );
		
		var lensFlare = new THREE.LensFlare( textureFlare0, 512, 0.0, THREE.AdditiveBlending, flareColor );
		
		lensFlare.add( textureFlare1, 512, 0.0, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare1, 2048, 0.0, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare2, 256, 0.2, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare2, 1024, 0.4, THREE.AdditiveBlending,flareColor );
		lensFlare.add( textureFlare2, 2048, 0.6, THREE.AdditiveBlending,flareColor );
		lensFlare.add( textureFlare3, 128, 0.1, THREE.AdditiveBlending,flareColor);
		lensFlare.add( textureFlare3, 64, 0.3, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 64, 0.7, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 128, 0.9, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 256, 1.1, THREE.AdditiveBlending, flareColor );

		lensFlare.customUpdateCallback = lensFlareUpdateCallback;
		lensFlare.position = light.position;
		
		scene.add( lensFlare );
		this.remove = function(){
			scene.remove(light);
			scene.remove(lensFlare);
		}
		this.updatePosition = function(x,y,z){
			lensFlare.position.set(x,y,z);
		}
}
function galaxyFlare( hex, x, y, z ) {
		var light = new THREE.PointLight( hex, 5 );
		
		light.color.setHex( hex );
		light.position.set(x,y,z);
		scene.add( light );
		
		var flareColor = new THREE.Color( hex );
		
		var lensFlare = new THREE.LensFlare( textureFlare0, 512, 0.0, THREE.AdditiveBlending, flareColor );
		
		lensFlare.add( textureFlare1, 512, 0.0, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare1, 2048, 0.0, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare2, 256, 0.2, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare2, 1024, 0.4, THREE.AdditiveBlending,flareColor );
		lensFlare.add( textureFlare2, 2048, 0.6, THREE.AdditiveBlending,flareColor );
		lensFlare.add( textureFlare3, 128, 0.1, THREE.AdditiveBlending,flareColor);
		lensFlare.add( textureFlare3, 64, 0.3, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 64, 0.7, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 128, 0.9, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 256, 1.1, THREE.AdditiveBlending, flareColor );

		lensFlare.customUpdateCallback = lensFlareUpdateCallback;
		lensFlare.position = light.position;
		
		sceneCube.add( lensFlare );
		this.remove = function(){
			sceneCube.remove(light);
			sceneCube.remove(lensFlare);
		}
		this.updatePosition = function(x,y,z){
			lensFlare.position.set(x,y,z);
		}
}
function FlameFlare(obj, x, y, z ) {
	var light = new THREE.PointLight( 0x0374ff, 3 );

	light.color.setHex( 0x0374ff );
	obj.add(light);
	light.position.set(x,y,z);
	
	var flareColor = new THREE.Color( 0x0374ff );
	
	var flameFlare = new THREE.LensFlare( textureFlare0, 128, 0.0, THREE.AdditiveBlending, flareColor );
		
	flameFlare.add( textureFlare0, 256, 0.0, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare1, 512, 0.0, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare3, 128, 0.1, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare3, 96, 0.2, THREE.AdditiveBlending,flareColor );
	flameFlare.add( textureFlare3, 64, 0.3, THREE.AdditiveBlending,flareColor );
	/*flameFlare.add( textureFlare3, 128, 0.1, THREE.AdditiveBlending,flareColor);
	flameFlare.add( textureFlare3, 64, 0.3, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare3, 64, 0.7, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare3, 128, 0.9, THREE.AdditiveBlending, flareColor );
	flameFlare.add( textureFlare3, 256, 1.1, THREE.AdditiveBlending, flareColor );*/
	
	flameFlare.customUpdateCallback = lensFlareUpdateCallback;
	flameFlare.position = light.position;
	
	obj.add( flameFlare );

	this.updatePosition = function(x,y,z){
		flameFlare.position.set(x,y,z);
	}
}

function lensFlareUpdateCallback( object ) {
	var f, fl = object.lensFlares.length;
	var flare;
	var vecX = -object.positionScreen.x * 2;
	var vecY = -object.positionScreen.y * 2;
	var vecZ = -object.positionScreen.z * 2;
	for( f = 0; f < fl; f++ ) {
		flare = object.lensFlares[ f ];
		flare.x = object.positionScreen.x + vecX * flare.distance;
		flare.y = object.positionScreen.y + vecY * flare.distance;
		flare.rotation = 0;
		//flare.opacity = 1-(f/10);
		/*if(object.positionScreen.z>=1){
			flare.opacity = 0;
		}else{
			flare.opacity = 1;
		}*/
	}

	/*object.lensFlares[ 0 ].rotation += object.positionScreen.x * 2;
	object.lensFlares[ 1 ].y += 0.025;
	object.lensFlares[ 2 ].rotation += object.positionScreen.x * 0.1 + THREE.Math.degToRad( 45 );
	object.lensFlares[ 3 ].rotation += object.positionScreen.x * 0.1 + THREE.Math.degToRad( 45 );*/
}