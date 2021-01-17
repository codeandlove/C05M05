var totalTexturesCount = 44;
var loadedTexturesCount = 0;

var gallaxy_texture = new THREE.TextureLoader();
	gallaxy_texture.load('images/textures/gallaxy/texture.jpg');
	gallaxy_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var planetoid_1_texture = new THREE.TextureLoader();
	planetoid_1_texture.load('images/textures/planetoid/planetoid_01.png');
	planetoid_1_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var planetoid_2_texture = new THREE.TextureLoader();
	planetoid_2_texture.load('images/textures/planetoid/planetoid_02.png');
	planetoid_2_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var planetoid_3_texture = new THREE.TextureLoader();
	planetoid_3_texture.load('images/textures/planetoid/planetoid_03.png');
	planetoid_3_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var sun_texture = new THREE.TextureLoader();
	sun_texture.load('images/textures/sun/texture.jpg');
	sun_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var mercury_texture = new THREE.TextureLoader();
	mercury_texture.load('images/textures/mercury/texture.jpg');
	mercury_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var venus_texture = new THREE.TextureLoader();
	venus_texture.load('images/textures/venus/texture.jpg');
	venus_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var earth_texture = new THREE.TextureLoader();
	earth_texture.load('images/textures/earth/texture.jpg');
	earth_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var earth_atmosphere_texture = new THREE.TextureLoader();
	earth_atmosphere_texture.load('images/textures/earth/atmosphere_texture.png');
	earth_atmosphere_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var earth_moon = new THREE.TextureLoader();
	earth_moon.load('images/textures/earth/moon/texture.jpg');
	earth_moon.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var mars_texture = new THREE.TextureLoader();
	mars_texture.load('images/textures/mars/texture.jpg');
	mars_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var mars_phobos = new THREE.TextureLoader();
	mars_phobos.load('images/textures/mars/phobos/texture.jpg');
	mars_phobos.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var mars_deimos = new THREE.TextureLoader();
	mars_deimos.load('images/textures/mars/deimos/texture.jpg');
	mars_deimos.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var jupiter_texture = new THREE.TextureLoader();
	jupiter_texture.load('images/textures/jupiter/texture.jpg');
	jupiter_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var jupiter_io = new THREE.TextureLoader();
	jupiter_io.load('images/textures/jupiter/io/texture.jpg');
	jupiter_io.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var jupiter_europa = new THREE.TextureLoader();
	jupiter_europa.load('images/textures/jupiter/europa/texture.jpg');
	jupiter_europa.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var jupiter_ganymede = new THREE.TextureLoader();
	jupiter_ganymede.load('images/textures/jupiter/ganymede/texture.jpg');
	jupiter_ganymede.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
var jupiter_callisto = new THREE.TextureLoader();
	jupiter_callisto.load('images/textures/jupiter/callisto/texture.jpg');
	jupiter_callisto.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var saturn_texture = new THREE.TextureLoader();
	saturn_texture.load('images/textures/saturn/texture.jpg');
	saturn_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var saturn_rings = new THREE.TextureLoader();
	saturn_rings.load('images/textures/saturn/texture_rings.png');
	saturn_rings.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var saturn_mimas = new THREE.TextureLoader();
	saturn_mimas.load('images/textures/saturn/mimas/texture.jpg');
	saturn_mimas.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var saturn_tethys = new THREE.TextureLoader();
	saturn_tethys.load('images/textures/saturn/tethys/texture.jpg');
	saturn_tethys.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var saturn_dione = new THREE.TextureLoader();
	saturn_dione.load('images/textures/saturn/dione/texture.jpg');
	saturn_dione.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var saturn_enceladus = new THREE.TextureLoader();
	saturn_enceladus.load('images/textures/saturn/enceladus/texture.jpg');
	saturn_enceladus.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var saturn_rhea = new THREE.TextureLoader();
	saturn_rhea.load('images/textures/saturn/rhea/texture.jpg');
	saturn_rhea.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var saturn_titan = new THREE.TextureLoader();
	saturn_titan.load('images/textures/saturn/titan/texture.jpg');
	saturn_titan.addEventListener('load', function(event){
		loadedTexturesCount++;
	});		

	
var saturn_iapetus = new THREE.TextureLoader();
	saturn_iapetus.load('images/textures/saturn/iapetus/texture.jpg');
	saturn_iapetus.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
//27

var uranus_texture = new THREE.TextureLoader();
	uranus_texture.load('images/textures/uranus/texture.jpg');
	uranus_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var uranus_rings = new THREE.TextureLoader();
	uranus_rings.load('images/textures/uranus/texture_rings.png');
	uranus_rings.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var uranus_titania = new THREE.TextureLoader();
	uranus_titania.load('images/textures/uranus/titania/texture.jpg');
	uranus_titania.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var uranus_oberon = new THREE.TextureLoader();
	uranus_oberon.load('images/textures/uranus/oberon/texture.jpg');
	uranus_oberon.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

var uranus_ariel = new THREE.TextureLoader();
	uranus_ariel.load('images/textures/uranus/ariel/texture.jpg');
	uranus_ariel.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var uranus_umbriel = new THREE.TextureLoader();
	uranus_umbriel.load('images/textures/uranus/umbriel/texture.jpg');
	uranus_umbriel.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

//33

var neptune_texture = new THREE.TextureLoader();
	neptune_texture.load('images/textures/neptune/texture.jpg');
	neptune_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var neptune_triton = new THREE.TextureLoader();
	neptune_triton.load('images/textures/neptune/triton/texture.jpg');
	neptune_triton.addEventListener('load', function(event){
		loadedTexturesCount++;
	});

//35

var pluto_texture = new THREE.TextureLoader();
	pluto_texture.load('images/textures/pluto/texture.jpg');
	pluto_texture.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var pluto_charon = new THREE.TextureLoader();
	pluto_charon.load('images/textures/pluto/charon/texture.jpg');
	pluto_charon.addEventListener('load', function(event){
		loadedTexturesCount++;
	});
	
//37
//lensflares

var lens_00 = new THREE.TextureLoader();
	lens_00.load('images/textures/lensflare/lens_00.png');
	lens_00.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

var lens_01 = new THREE.TextureLoader();
	lens_01.load('images/textures/lensflare/lens_01.png');
	lens_01.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var lens_02 = new THREE.TextureLoader();
	lens_02.load('images/textures/lensflare/lens_02.png');
	lens_02.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var lens_03 = new THREE.TextureLoader();
	lens_03.load('images/textures/lensflare/lens_03.png');
	lens_03.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var lens_04 = new THREE.TextureLoader();
	lens_04.load('images/textures/lensflare/lens_04.png');
	lens_04.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var lens_05 = new THREE.TextureLoader();
	lens_05.load('images/textures/lensflare/lens_05.png');
	lens_05.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	
	
var lens_06 = new THREE.TextureLoader();
	lens_06.load('images/textures/lensflare/lens_06.png');
	lens_06.addEventListener('load', function(event){
		loadedTexturesCount++;
	});	

//44	
