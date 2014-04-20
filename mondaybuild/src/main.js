// / all THREE.js objects right now
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
	init_scene(canvas);

	animate();
}

function init_scene(canvas)
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

		fosssim_stepper.explicit_euler_step();
		// update();
		render();
	}	
}


function render()
{
	three_renderer.render(three_scene, three_camera);
}

// scene stepping would go here
function update()
{
	// for now just increment the position of sphere by point 1 or whatever
	var sphere_pos = fosssim_scene.sphere.position;
	sphere_pos.x += 0.01;
	sphere_pos.z += 0.01;

}

function toggle_pause()
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