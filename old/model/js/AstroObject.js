function object(name, type, coords, radius, parentObject, textureUrl, selfLight, orbitsOPT){
		
		name = ( name !== undefined ) ? name : 'objectName';
		type = ( type !== undefined ) ? type : 'starSimple';
		coords = ( coords !== undefined ) ? coords : new THREE.Vector3(0,0,0);
		radius = ( radius !== undefined ) ? radius : 1000;
		
		if(textureUrl){
			var texture = new THREE.ImageUtils.loadTexture(textureUrl);
		}else{
			var texture = null;
		}
		
		switch (type) {
			case 'planet':
				if(radius<100){
					bumpScale*=0.5;
				}
				var material = new THREE.MeshPhongMaterial({map: texture, color:0xffffff, ambient: 0xf6efc7, specular: 0xf6efc7, shininess: shininess, shading: shading, bumpMap: texture, bumpScale: bumpScale });
				var geometry = new THREE.SphereGeometry( radius, 50, 50, 0, Math.PI * 2, 0, Math.PI  );
			break;
			case 'moon':
				if(radius<100){
					bumpScale*=0.1;
				}
				var material = new THREE.MeshPhongMaterial({map: texture, color:0xffffff, ambient: 0xf6efc7, specular: 0xf6efc7, shininess: shininess, shading: shading, bumpMap: texture, bumpScale: bumpScale });
				var geometry = new THREE.SphereGeometry( radius, 50, 50, 0, Math.PI * 2, 0, Math.PI  );
			break;
			case 'star':
				var material = new THREE.MeshBasicMaterial({map: texture, color:0xffffff});
				var geometry = new THREE.SphereGeometry( radius, 50, 50, 0, Math.PI * 2, 0, Math.PI  );
			case 'starLight':
				var material = new THREE.MeshBasicMaterial({map: texture, color:0xffffff,visible:true});
				var geometry = new THREE.SphereGeometry( radius, 50, 50, 0, Math.PI * 2, 0, Math.PI  );
			break;
			case 'starSimple':
				var material = new THREE.MeshBasicMaterial({map: texture, color:0xffffff});
				var geometry = new THREE.SphereGeometry( radius, 2, 2, 0, Math.PI * 2, 0, Math.PI  );
			break;
		}
		
		var selftOrbit, objectOrbit;
		
		var mesh = new THREE.Mesh(geometry, material);
		
		this.object = mesh;
		
		if(parentObject){
			var parentRadius = parentObject.geometry.radius;
			mesh.position.set(coords.x+parentRadius,coords.y,coords.z+parentRadius);		
		}else{
			mesh.position.set(coords.x,coords.y,coords.z);
		}
		mesh.castShadow = true;
		mesh.receiveShadow  = true;
		
		if(parentObject){parentObject.add(mesh)}
		else{scene.add(mesh)}

		objects.push(mesh);
	
		//names
		var text = document.createElement("div");
		document.body.insertBefore(text,document.body.childNodes[0]);
		text.setAttribute('class','name');
		text.innerHTML = name;
		
		text.onclick = function(){
			setTrackBallControlsTarget(mesh,true);
			SELECTED = null;
		}
		
		objectNames.push(text);
		
		if(selfLight){
			var lightMesh = new THREE.Mesh(
				new THREE.SphereGeometry( 10, 50, 50, 0, Math.PI * 2, 0, Math.PI ),
				new THREE.MeshBasicMaterial({color:0xffffff})
			);
			lightMesh.castShadow = false;
			lightMesh.visible = false;
			scene.add(lightMesh);
			var dirLight = new THREE.DirectionalLight( 0xffffff, 1,1000 );
			dirLight.target.position.copy(mesh.position);
			dirLight.castShadow = true;
			dirLight.onlyShadow = true;
			dirLight.shadowMapWidth = 512*4;
			dirLight.shadowMapHeight = 512*4;
			dirLight.shadowCameraNear = 1;
			dirLight.shadowCameraFar = 10000;
			dirLight.shadowCameraFov = 120;
			dirLight.shadowDarkness = 0.8;
			//dirLight.shadowBias = 0.001;
			dirLight.shadowCameraVisible = false;
			scene.add( dirLight );
			
		}

		this.lightUpdate = function(distance){
			//lightMesh.position.copy(scene.position);
			var meshPositionOfWorld = mesh.matrixWorld.getPosition();
			var distance = radius/radius+distance;
			dirLight.position.x=meshPositionOfWorld.x/1.2;
			dirLight.position.y=meshPositionOfWorld.y/1.2;
			dirLight.position.z=meshPositionOfWorld.z/1.2/*-radius-distance*/;
			//dirLight.position.copy(lightMesh.position);
			dirLight.target.position.copy(meshPositionOfWorld);
		}
		
		this.createSelfOrbit = function(){
			var rad = mesh.geometry.radius+mesh.geometry.radius*25/100;
			selfOrbit = new THREE.Mesh(
				new THREE.TorusGeometry( rad, 0.01, 5, 100 ),
				new THREE.MeshBasicMaterial({color:0x2d56ec })
			);
			selfOrbit.rotation.x = Math.PI/2;
			mesh.add(selfOrbit);
			selfOrbits.push(selfOrbit);
		}
		
		this.createObjectOrbit = function(){
			if(parentObject){var rad = mesh.position.z + parentObject.geometry.radius}
			else{var rad = mesh.position.z};
			if(type==='moon'){
				var geometry = new THREE.TorusGeometry( rad, 1, 50, 200 );
				var material = new THREE.MeshBasicMaterial({color:0xff9c00, transparent:true, alphaTest: 0.5, wireframe:true });
				text.setAttribute('class','name moon');
			}else{
				var geometry = new THREE.TorusGeometry( rad, 10, 50, 200 );
				var material = new THREE.MeshBasicMaterial({color:0xa641f4, transparent:true, alphaTest: 0.5 });
			}
			objectOrbit = new THREE.Mesh(
				geometry,
				material
			);
			objectOrbit.geometry.dynamic = true;
			objectOrbit.geometry.verticesNeedUpdate = true ;
			if(parentObject){
				parentObject.add(objectOrbit);
				//orbitMesh.position.copy(parentObject.position);
				//objectOrbit.position.y-=0.01;
				objectOrbit.rotation.x = Math.PI/2;
				orbits.push(objectOrbit);
			}else{
				objectOrbit.position.copy(scene.position);
				//objectOrbit.position.y-=0.01;
				objectOrbit.rotation.x = Math.PI/2;
				scene.add(objectOrbit);
				orbits.push(objectOrbit);
			}
		}
		
		//orbits
		if(orbitsOPT.selfOrbit==true) this.createSelfOrbit();
		if(orbitsOPT.objectOrbit==true) this.createObjectOrbit();
		
		//const
		var theta = clock.startTime+Math.ceil(Math.random()*1000);
		
		if(parentObject){var orbitRadius = mesh.position.z + parentObject.geometry.radius}
		else{var orbitRadius = mesh.position.z}
		
		//upadte
		this.update = function(nameVisible, rotateSelfOrbitOPT, rotateObjectOrbitOPT){
			//vars
			var meshPositionOfWorld = mesh.matrixWorld.getPosition();
			var distance = meshPositionOfWorld.distanceTo( camera.position );
			var radius = mesh.geometry.radius;
		
			//starLight update
			if(type=='starLight'){
				if(distance<=10*radius){
					mesh.material.visible = true;
				}else{
					mesh.material.visible = false;
				}
			}
			
			//names update
			var vector = projector.projectVector( meshPositionOfWorld.clone(), camera );
			var l = window.innerWidth/2+(window.innerWidth/2*vector.x);
			var t = window.innerHeight/2-(window.innerHeight/2*vector.y);
			
			if(vector.z>=1){text.style.display = 'none'}
			else{text.style.display = 'block'}
			
			text.style.left = Math.ceil(l-50) + 'px';
			text.style.top = Math.ceil(t-50) + 'px';
			if(nameVisible==false){
				var radius = 1000;
				if ( distance <= radius ){
					text.style.opacity = ( 1 - distance / (radius) ); text.style.display = 'block';
				}else{
					text.style.opacity = 0; text.style.display = 'none';
				}
			}
			
			//orbits opacity
			if(orbitsOPT){
				if(type==='planet'){
					objectOrbit.material.opacity = 1-1000/distance ;
				}else if(type==='moon'){
					/*if(1-1000/distance == 0){
						objectOrbit.material.wireframe = true;
					}else{
						objectOrbit.material.wireframe = false;
					}*/
				}
			}
			
			//Self orbit update
			if(rotateSelfOrbitOPT){
				var rotObjectMatrix = new THREE.Matrix4();
				rotObjectMatrix.makeRotationAxis(rotateSelfOrbitOPT.axis.normalize(), 2 * Math.PI *timeSpeed / (rotateSelfOrbitOPT.hoursInADay * 3600));
				mesh.matrix.multiply(rotObjectMatrix);      // post-multiply
				mesh.rotation.setEulerFromRotationMatrix(mesh.matrix);
			}			
			//rotate object orbit			
			if(rotateObjectOrbitOPT){
				var velocity = 2*Math.PI*orbitRadius/(Math.pow(3600,2)*rotateObjectOrbitOPT.yearsInCycle/timeSpeed);
				theta += velocity/orbitRadius/1000;
				if(parentObject){
					var parentRadius = /*parentObject.geometry.radius*/0;
					mesh.position.x = parentRadius + orbitRadius * Math.sin(theta);
					//object.position.y = axis.y + radius * Math.sin( THREE.Math.degToRad( theta ) );
					mesh.position.z = parentRadius + orbitRadius * Math.cos(theta);
				}else{
					mesh.position.x = rotateObjectOrbitOPT.object.position.x + orbitRadius * Math.sin(theta);
					//object.position.y = axis.y + radius * Math.sin( THREE.Math.degToRad( theta ) );
					mesh.position.z = rotateObjectOrbitOPT.object.position.z + orbitRadius * Math.cos(theta);
				}
			}
		}
	};