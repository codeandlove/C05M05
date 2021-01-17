var bonusArray = [];
function BonusSheld(color){
	this.color = color || 0x000000;
	var self = this;
	
	var g = new THREE.IcosahedronGeometry( 5, 1 );
	var m = new Physijs.createMaterial( new THREE.MeshBasicMaterial( {color:this.color, transparent:true, opacity:0.3} ), 0, 0 );
	var bonus = new Physijs.SphereMesh( g, m, 0);
	
	var wg = new THREE.IcosahedronGeometry( 5, 1 );
	var wm = new THREE.MeshBasicMaterial( {wireframe:true, transparent:true, opacity:0.3} );
	var wBonus = new THREE.Mesh( wg, wm);
	
	bonus.position.set(
		Math.random()*worldRadius-worldRadius/2,
		Math.random()*worldRadius-worldRadius/2,
		Math.random()*worldRadius-worldRadius/2
	);
	
	scene.add(bonus);
	bonus.add(wBonus);
	
	this.__object = bonus;
	
	this.remove = function(){
		scene.remove(bonus);
		delete self;
	}

}
function Bonus(type){
	
	this.type = type;
	
	switch(this.type){
		case '2xfaster':
			var bonus = new BonusSheld(0xff8400);
			var icon = new Icon(bonus.__object, '2fasterfire.js');
		break;
		case 'ultraFaster':
			var bonus = new BonusSheld(0x0e6ae8);
			var icon = new Icon(bonus.__object, 'ultrafasterfire.js');
		break;
		case 'doubleFire':
			var bonus = new BonusSheld(0xc80000);
			var icon = new Icon(bonus.__object, 'doubleFire.js');
		break;
		case 'tripleFire':
			var bonus = new BonusSheld(0xc80000);
			var icon = new Icon(bonus.__object, 'tripleFire.js');
		break;
		case 'quadroFire':
			var bonus = new BonusSheld(0xc80000);
			var icon = new Icon(bonus.__object, 'quadroFire.js');
		break;
	}
	
	fadeIn(bonus.__object, 10000);
	var arrayElement = {object:this, __object:bonus.__object}
	bonusArray.push(arrayElement);
	
	function doBonus(){
		
		function toDefault(ms, callback){
			var tween = 'null';
			this.go = function(){
				tween = new TWEEN.Tween({
					p:0
				}).to({
					p:100
				}, ms).onUpdate(function (){
				}).onStart(function(){
				}).onComplete(function(){
					return callback();
				}).start();
			}
			this.stop = function(){
				if(tween!='null'){
					tween.stop();
				}
			}
		};
		
		var delayBonus = new toDefault(20000,function(){
			shootInterval = 200;
			clearInterval(bulletsInterval);
			bulletsInterval = 'null';
		});
		
		switch(type){
			case '2xfaster':
				shootInterval = 100;
				delayBonus.stop();
				delayBonus.go();
				bonus2FasterFireSound.play();
			break;
			case 'ultraFaster':
				shootInterval = 50;
				delayBonus.stop();
				delayBonus.go();
				bonusUltraFasterFireSound.play();
			break;
			case 'doubleFire':
				shootType = 'double';
			break;
			case 'tripleFire':
				shootType = 'triple';
			break;
			case 'quadroFire':
				shootType = 'quadro';
			break;
		}
			
	}
	
	bonus.__object.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation ) {
		/*if((other_object.geometry instanceof THREE.CubeGeometry) && !(other_object.geometry instanceof THREE.IcosahedronGeometry)){*/
		if(((other_object.geometry instanceof THREE.CubeGeometry) && (other_object.id == host.hostID))){		
			for(i=0; i<bonusArray.length; i++){
				if(bonusArray[i].__object == bonus.__object){
					bonusArray.splice( bonusArray.indexOf( arrayElement ), 1);
					doBonus();
				}
			}
			bonus.remove();
		}
	});
	
	this.update = function(){
		bonus.__object.lookAt(host.__object.position);
	}
	
}

function Icon(obj, model){
	
	var loader = new THREE.JSONLoader( true );
	loader.load( "models/bonus/"+model, function( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var mesh = new THREE.Mesh( geometry, material);
		mesh.scale.set( 1, 1, 1 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		
		obj.add( mesh );
	});
	
	/*var icon = new THREE.Object3D();
	
	var m = new THREE.MeshFaceMaterial( [
		new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading} ),
		new THREE.MeshLambertMaterial( { color: 0x111111 } )
	]);
	
	var g = new THREE.TextGeometry(text, {

		size: 4,
		height: 2,
		curveSegments: 2,
		font: "helvetiker",
		weight: 'bold',

		bevelEnabled: false,
		bevelThickness: 2,
		bevelSize: 2,

		material: 0,
		extrudeMaterial: 1

	});
	
	g.computeVertexNormals();
	g.computeBoundingBox();
	
	var centerXoffset = -0.5 * ( g.boundingBox.max.x - g.boundingBox.min.x );
	var centerYoffset = -0.5 * ( g.boundingBox.max.y - g.boundingBox.min.y );
	var centerZoffset = -0.5 * ( g.boundingBox.max.z - g.boundingBox.min.z );
	
	var mesh = new THREE.Mesh( g, m);

	mesh.position.x = centerXoffset;
	mesh.position.y = centerYoffset;
	mesh.position.z = centerZoffset;
	
	icon.add(mesh);
	
	obj.add(icon);*/
}