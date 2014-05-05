// all THREE.js objects right now
var three_scene;
var three_camera;
var three_renderer;

// FOSSSim objects
var FOSSSim = {};
var fosssim_scene;
var fosssim_stepper;
var paused = false;
var dt = 0.01;

// create scenestepper object also

// basically main is just gonna be the outermost layer of the script
function main(canvas)
{
	initScene(canvas);

	animate();
}

function initScene(canvas)
{
	// this.canvas = canvas;
	// kinda arbitrarily set for math purposes
	var canvas_height = 500;
    var canvas_width = 500;

    // creates scene
    three_scene = new THREE.Scene();

    // creates camera
    three_camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);
    three_camera.lookAt(three_scene.position);	

    // creates renderer
    three_renderer = new THREE.WebGLRenderer({"canvas": canvas});
    three_renderer.setSize(canvas_width, canvas_height);

    //sets camera position
    three_camera.position.z = 5;

    // initialialzes fosssim object
    fosssim_scene = new FOSSSim.Scene();
    fosssim_scene.init();

    // initialize fosssim stepper
    fosssim_stepper = new FOSSSim.Stepper();
}

function animate()
{
	requestAnimationFrame( animate );
		
	// console.log(paused);
	if(paused == false)
	{

		fosssim_stepper.explicitEulerStep();
		render();
	}	
}


function render()
{
	three_renderer.render(three_scene, three_camera);
}



function togglePause()
{
	if(paused == true)
	{
		paused = false;
	}
	else
	{
		paused = true;
	}
}

FOSSSim.Scene = function()
{
	// z this.sphere;
	// var num_spheres;
	// var light;
	// var ambientlight;
};


FOSSSim.Scene.prototype =
{
	constructor: FOSSSim.Scene,

	init: function()
	{
		this.initSpheres();
		this.initLights();
	}, 

	initSpheres: function()
	{
		var num_spheres = 1;
	    var geometry = new THREE.SphereGeometry( 1, 32, 16 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		this.sphere = new THREE.Mesh( geometry, material );
		this.sphere.position.set(0,0,0);
		three_scene.add(this.sphere);

		this.sphere.velocity = new THREE.Vector3(1, 0, 1);
	},

	initLights: function()
	{
		this.light = new THREE.PointLight(0xffffff);
		this.light.position.set(10,10,10);
		three_scene.add(this.light);
		this.ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		three_scene.add( this.ambientlight );
	}
};


// right now this is literally just going to be explicit euler
// i'll build it into a more modular thing (to support different integration techniques) 
// after I get this basic integration down
FOSSSim.Stepper = function()
{

};

FOSSSim.Stepper.prototype = 
{
	constructor: FOSSSim.Stepper,

	explicitEulerStep: function()
	{
		// no forces right now	
		var sphere_pos = fosssim_scene.sphere.position;
		var sphere_vel = fosssim_scene.sphere.velocity

		sphere_pos.x += sphere_vel.x * dt;
		sphere_pos.y += sphere_vel.y * dt;
		sphere_pos.z += sphere_vel.z * dt;

	}
}


