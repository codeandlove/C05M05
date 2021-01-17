function explode(x,y,z, size){
	explodeSound.play();		
	
	explosionTexture.wrapS = explosionTexture.wrapT = THREE.RepeatWrapping;
	explosionTexture.repeat.set( 1 / 4, 1 / 6 );
	var geometry = new THREE.PlaneGeometry( size, size );
	var material = new THREE.MeshBasicMaterial( { map: explosionTexture, transparent:true, depthTest:true, depthWrite:false, blending:THREE.AdditiveBlending } );
	
	var explodeSprite = new THREE.Mesh( geometry, material );
	explodeSprite.position.set(x,y,z);
	
	scene.add(explodeSprite);
	
	explodeSprite.position.set(x,y,z);
	
	var lensLight = new lensFlare( 0xfff6c4, x, y, z );
	
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