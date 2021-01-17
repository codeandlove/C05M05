
function Cross(){
	
	var material = new THREE.SpriteMaterial({
		map: new THREE.ImageUtils.loadTexture( "textures/cross_texture.png" ),
		/*alignment: THREE.SpriteAlignment.topLeft,*/
		useScreenCoordinates: false
	});
	
	var cross = new THREE.Sprite(material);
	
	cross.position.set(0,-0.005,-1);
	cross.scale.set( 0.2, 0.2, 1 );
	
	host.__object.add(cross);
	
	var detectorMaterial = new THREE.SpriteMaterial({
		map: new THREE.ImageUtils.loadTexture( "textures/detector_texture.png" ),
		/*alignment: THREE.SpriteAlignment.topLeft,*/
		useScreenCoordinates: false
	});
	
	var detector = new THREE.Sprite(detectorMaterial);
	detector.position.set(0,-0.005,-1);
	detector.scale.set( 0.2, 0.2, 1 );
	
	host.__object.add(detector);
	
	var range = 100;
	var projector = new THREE.Projector();

	this.update = function(){
		var targets = [];
		for(var i=0;i<rocks.length;i++){
			if(rocks[i]!=0){
				targets.push(rocks[i].__object);
			}
		}
		for(var i=0;i<enemies.length;i++){
			targets.push(enemies[i].__object);
		}
		cross.rotation+=0.01;
		detector.rotation-=0.01;
		for(var i=0; i<targets.length; i++){
			camera.updateProjectionMatrix();
			if(typeof targets[i]!=='undefined'){
				var distance = targets[i].position.distanceTo(host.__object.position);
				var frustum = new THREE.Frustum();
				frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
				if(distance<range){
					if(frustum.intersectsObject( targets[i] )){
						var pos = projector.projectVector( targets[i].position.clone(), camera );				
						detector.position.set(pos.x, pos.y, -1);
					}else{
						detector.position.set(0,-0.005,-1);
					}
				}
			}
		}
	}
		
}