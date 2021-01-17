var galaxy;
var textureCube;
var cameraCube, sceneCube; 
function createGalaxy(type){
	
	this.type = type || 'stage_2';
	
	var starRedTexture = new THREE.ImageUtils.loadTexture('textures/star_red_texture.png');
	var starYellowTexture = new THREE.ImageUtils.loadTexture('textures/star_yellow_texture.png');
	var starBlueTexture = new THREE.ImageUtils.loadTexture('textures/star_blue_texture.png');
	
	function particleGeometry(){
		var particles = [];
		var particleCount = 1500,
		particles = new THREE.Geometry();
		for(var i = 0; i < particleCount; i++) {
			var x = Math.random() * 2 - 1;
			var y = Math.random() * 2 - 1;
			var z = Math.random() * 2 - 1;
			var particle = new THREE.Vector3(x,y,z);
			particle.normalize().multiplyScalar( worldRadius*4+(Math.random()*worldRadius*4) );
		  particles.vertices.push(particle);
		}
		return particles;
	}

	switch(this.type){
		case 'stage_0':
			
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 10000 );
			sceneCube.add( cameraCube ); 
			
			textureCube = galax[0];
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;
			var material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			}),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh ); 
			
			//stars
			var redStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starRedTexture, opacity:1, size: 2, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var yellowStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starYellowTexture, opacity:1, size: 4, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var blueStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starBlueTexture, opacity:1, size: 8, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			
			scene.add(redStars);
			scene.add(yellowStars);
			scene.add(blueStars);
			
			//lights
			var flare1 = new galaxyFlare( 0x3594fe, -100, 4, 22 );
			var flare2 = new galaxyFlare( 0xee4a61, 156, -60, 100 );
			
		break;
		case 'stage_1':
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 10000 );
			sceneCube.add(cameraCube); 
			
			textureCube = galax[1];
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;
			var material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			}),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh ); 
			
			//stars
			var redStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starRedTexture, opacity:1, size: 2, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var yellowStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starYellowTexture, opacity:1, size: 4, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var blueStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starBlueTexture, opacity:1, size: 8, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			
			scene.add(redStars);
			scene.add(yellowStars);
			scene.add(blueStars);
			
			//lights
			var flare1 = new galaxyFlare( 0xfeff8f, 0, 20, 220 );
		break;
		case 'stage_2':
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 10000 );
			sceneCube.add( cameraCube ); 

			textureCube = galax[2];
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;
			var material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			}),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh ); 
			
			//stars
			var redStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starRedTexture, opacity:1, size: 2, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var yellowStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starYellowTexture, opacity:1, size: 4, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var blueStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starBlueTexture, opacity:1, size: 8, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			
			scene.add(redStars);
			scene.add(yellowStars);
			scene.add(blueStars);
			
			//lights
			var flare1 = new galaxyFlare( 0xfeff8f, 0, 20, 220 );
		break;
		case 'stage_3':
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 10000 );
			sceneCube.add( cameraCube ); 

			textureCube = galax[3];
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;
			var material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			}),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh ); 
			
			//stars
			var redStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starRedTexture, opacity:1, size: 2, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var yellowStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starYellowTexture, opacity:1, size: 4, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var blueStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starBlueTexture, opacity:1, size: 8, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			
			scene.add(redStars);
			scene.add(yellowStars);
			scene.add(blueStars);
			
			//lights
			var flare1 = new galaxyFlare( 0xfeff8f, 0, 20, 220 );
		break;
		case 'stage_4':
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 10000 );
			sceneCube.add( cameraCube ); 

			textureCube = galax[4];
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;
			var material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			}),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh ); 
			
			//stars
			var redStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starRedTexture, opacity:1, size: 2, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var yellowStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starYellowTexture, opacity:1, size: 4, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			var blueStars = new THREE.ParticleSystem(
				particleGeometry(),
				new THREE.ParticleBasicMaterial({transparent: true, map: starBlueTexture, opacity:1, size: 8, depthWrite: false, blending: THREE.AdditiveBlending })
			);
			
			scene.add(redStars);
			scene.add(yellowStars);
			scene.add(blueStars);
			
			//lights
			var flare1 = new galaxyFlare( 0xfeff8f, 0, 20, 220 );
		break;
	}
	

	this.update = function(){
		switch(this.type){
			case 'stage_0':
				/*mirrorSphere.visible = false;
				mirrorSphereCamera.updateCubeMap( renderer, scene );
				mirrorSphere.visible = true; 
				/*texture.offset.y += 0.01;
				texture.offset.y %= 1;
				lightHolder.rotation.x += 0.01;*/
			break;
			case 'stage_1':
				/*texture.offset.y += 0.005;
				texture.offset.y %= 1;
				lightHolder.rotation.x += 0.05;*/
			break;
			case 'stage_2':
				/*texture.offset.y += 0.005;
				texture.offset.y %= 1;
				lightHolder.rotation.x += 0.05;*/
			break;
			case 'stage_3':
				/*texture.offset.y += 0.005;
				texture.offset.y %= 1;
				lightHolder.rotation.x += 0.05;*/
			break;
			case 'stage_4':
				/*texture.offset.y += 0.005;
				texture.offset.y %= 1;
				lightHolder.rotation.x += 0.1;*/
			break;
		}
	}

	//scene.fog = new THREE.FogExp2( 0x000000, worldRadius/1000000 );
}