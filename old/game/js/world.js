function World(worldRadius){
	
	var geometry = new THREE.IcosahedronGeometry( worldRadius,  3 );
	var material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true, transparent:true, opacity:0.01, blending:THREE.AdditiveBlending});
	var world = new THREE.Mesh(geometry,material);
	scene.add(world); 
	
	this.__object = world;
	
	for(var i=0; i<world.geometry.vertices.length; i++){
		var geometry = new THREE.SphereGeometry( 0.5,  6, 6 );
		var material = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.3});
		var point = new THREE.Mesh(geometry,material);
		point.position.set(	world.geometry.vertices[i].x, world.geometry.vertices[i].y,	world.geometry.vertices[i].z);
		world.add(point);
	}
	
	/*this.init = function(callback){
		new TWEEN.Tween({
			x:0,y:0,z:0
		}).to({
			x:1,y:1,z:1
		}, 1000).easing( TWEEN.Easing.Back.Out ).onUpdate(function (){
			world.scale.x = this.x;
			world.scale.y = this.y;
			world.scale.z = this.z;
		}).onStart(function(){
			//controls.freeze = true;
		}).onComplete(function(){	
			//controls.freeze = false;
			if(callback) return callback();
		}).start();
	}*/
	
	this.update = function(){
		/*world.rotation.x = -1*camera.rotation.x/3;
		world.rotation.y = -1*camera.rotation.y/3;
		world.rotation.z = -1*camera.rotation.z/3;*/
	}
}