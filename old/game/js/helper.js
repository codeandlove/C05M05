function focusIn(){
	var cf = currentCamera.fov;
	new TWEEN.Tween({f:cf}).to({f:20}, 100).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
		currentCamera.fov = this.f;
		currentCamera.updateProjectionMatrix();
	}).onStart(function(){	
	}).onComplete(function(){
	}).start();
	controls.lookSpeed = 0.05;
}
function focusOut(){
	var cf = currentCamera.fov;
	new TWEEN.Tween({f:cf}).to({f:80}, 100).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
		currentCamera.fov = this.f;
		currentCamera.updateProjectionMatrix();
	}).onStart(function(){
	}).onComplete(function(){
	}).start();
	controls.lookSpeed = 0.2;
}

function fadeIn(obj, duration, childrens, update, callback){

	var objOpacity = obj.material.opacity;
	
	if(childrens==='undefined') childrens = true;
	fadeInObj(obj, false);
	if(childrens==true && obj.children.length>0){
		for(var i=0; i<obj.children.length; i++){
			fadeInObj(obj.children[i], true);
		}
	}
	
	function fadeInObj(obj, isChild){
		new TWEEN.Tween({op:0}).to({op:objOpacity}, duration).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
			obj.material.opacity = this.op;
			if(update && !isChild) return update();
		}).onStart(function(){
			obj.material.transparent = true;
			obj.material.opacity = 0;
		}).onComplete(function(){
			obj.material.opacity = objOpacity;
			if(callback && !isChild) return callback();
		}).start();
	}
}
function fadeOut(obj, duration, childrens, update, callback){

	var objOpacity = obj.material.opacity;
	
	if(childrens==='undefined') childrens = true;
	fadeInObj(obj, false);
	if(childrens==true && obj.children.length>0){
		for(var i=0; i<obj.children.length; i++){
			fadeInObj(obj.children[i], true);
		}
	}
	
	function fadeInObj(obj, isChild){
		new TWEEN.Tween({op:objOpacity}).to({op:0}, duration).easing( TWEEN.Easing.Sinusoidal.Out ).onUpdate(function (){
			obj.material.opacity = this.op;
			if(update && !isChild) return update();
		}).onStart(function(){
			obj.material.transparent = true;
			obj.material.opacity = objOpacity;
		}).onComplete(function(){
			obj.material.opacity = 0;
			if(callback && !isChild) return callback();
		}).start();
	}
}
function delay(ms, callback){
	new TWEEN.Tween({
		p:0
	}).to({
		p:100
	}, ms).onUpdate(function (){
	}).onStart(function(){
	}).onComplete(function(){
		return callback();
	}).start();
	
};
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration){
	// note: texture passed by reference, will be updated by the update function.
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	// usually equals tilesHoriz * tilesVert, but not necessarily,
	// if there at blank tiles at the bottom of the spritesheet.
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;
	this.update = function( milliSec ){
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
		this.currentDisplayTime -= this.tileDisplayDuration;
		this.currentTile++;
		if (this.currentTile == this.numberOfTiles)
		this.currentTile = 0;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
		}
	};
} 