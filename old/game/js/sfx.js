var armagedonArmed, armagedonExpl, bonusFasterFire, bonus2FasterFire, bonusUltraFasterFire;

var shootSound = new Sound(['sfx/shoot.mp3','sfx/shoot.ogg']);
var hitSound = new Sound(['sfx/hit.mp3','sfx/hit.ogg']);
var enemyHitSound = new Sound(['sfx/enemy_hit.mp3','sfx/hit.ogg']);
var explodeSound = new Sound(['sfx/explode.mp3','sfx/explode.ogg']);
var collisionSound = new Sound(['sfx/hostCollision.mp3','sfx/hostCollision.ogg']);
var stageClearSound = new Sound(['sfx/stageClear.mp3','sfx/stageClear.ogg']);

var bonus2FasterFireSound = new Sound(['sfx/bonus_2_faster_fire.mp3','sfx/bonus_2_faster_fire.ogg']);
var bonusUltraFasterFireSound = new Sound(['sfx/bonus_ultra_faster_fire.mp3','sfx/bonus_ultra_faster_fire.ogg']);

var armagedonArmedSound = new Sound(['sfx/armagedon_armed.mp3','sfx/armagedon_armed.ogg']);
var armagedonExplodeSound = new Sound(['sfx/armagedon_expl.mp3','sfx/armagedon_expl.ogg']);

function Sound(sourceSfx){
	var clone = false;
	var audio = document.createElement( 'audio' );
	var source = document.createElement( 'source' );
	if(audio.canPlayType('audio/mpeg')){
		source.src = sourceSfx[0];
		audio.appendChild( source );
	}else if(audio.canPlayType('audio/ogg')){
		source.src = sourceSfx[1];
		audio.appendChild( source );
		clone = true;
	}

	this.playing = 0;
	
	this.play = function (playing) {
		if(playing){
			if(this.playing<1){
				audio.currentTime = 0;
				if(clone){
					audio.cloneNode(true).play();
				}else{
					audio.play();
				}
				this.playing++;
			}else{
				this.playing = 0;
			}
		}else{
			audio.currentTime = 0;
			if(clone){
				audio.cloneNode(true).play();
			}else{
				audio.play();
			}
		}
	}
}

//sfx

/*
var hostHitted = new Sound(['sfx/hostHitted.mp3','sfx/hostHitted.ogg']);

var stageClear = new Sound(['sfx/stage_clear.mp3','sfx/stage_clear.ogg']);

var bonusFasterFire = new Sound(['sfx/bonus_faster_fire.mp3','sfx/bonus_faster_fire.ogg']);
var bonus2FasterFire = new Sound(['sfx/bonus_2_faster_fire.mp3','sfx/bonus_2_faster_fire.ogg']);
var bonusUltraFasterFire = new Sound(['sfx/bonus_ultra_faster_fire.mp3','sfx/bonus_ultra_faster_fire.ogg']);

var armagedonArmed = new Sound(['sfx/armagedon_armed.mp3','sfx/armagedon_armed.ogg']);
var armagedonExpl = new Sound(['sfx/armagedon_expl.mp3','sfx/armagedon_expl.ogg']);*/
/*var sounds = [];
function Sound( sources, radius, volume, object ) {
	
		var audio = document.createElement( 'audio' );
		
		for ( var i = 0; i < sources.length; i ++ ) {
			var source = document.createElement( 'source' );
			source.src = sources[ i ];
			audio.appendChild( source );
		}
		
		this.play = function () {
			audio.play();
		}
		
		this.stop = function () {
			audio.volume = 0;
		}
		
		var soundObj = this;

		sounds.push(soundObj);
		
		this.remove = function(){
			sounds.splice(sounds.indexOf(soundObj), 1);
			delete this;
		}
		
		this.update = function () {

			var distance = object.position.distanceTo( camera.position );
			if ( distance >= radius ) {
				audio.volume = 0;
				this.remove();
			} else {
				audio.volume = volume * ( 1 - distance / (radius) );
			}
		}
	}
*/	