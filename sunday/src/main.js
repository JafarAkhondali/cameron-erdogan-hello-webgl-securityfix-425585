// / all THREE.js objects right now
var three_scene;
var three_camera;
var three_renderer;

// FOSSSim objects
var FOSSSim = {};
var fosssim_scene;
var fosssim_stepper;
var paused = true;
var dt = 0.01;
var time_elapsed = 0;
var time_display;
var integrator_type;

// create scenestepper object also

// basically main is just gonna be the outermost layer of the script
function main(canvas)
{
	initScene(canvas);

	animate();	// console.log("a thing");
}

function setTimeDisplay(td)
{
	time_display = td;
}

function initScene(canvas)
{
	// this.canvas = canvas;
	// kinda arbitrarily set for math purposes
	var canvas_height = 400;
    var canvas_width = 400;

    // creates scene
    three_scene = new THREE.Scene();

    // creates camera
    three_camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);
    three_camera.lookAt(three_scene.position);	

    // creates renderer
    three_renderer = new THREE.WebGLRenderer({"canvas": canvas});
    three_renderer.setSize(canvas_width, canvas_height);

    //sets camera position
    three_camera.position.z = 10;

    //if we've already defined the fosssim scene via clicking the button in the scene tab
    //add the spheres and lights from the fosssim scene to the three scene
    if(fosssim_scene)
    {
    	fosssim_scene.initSpheres();
    	fosssim_scene.initLights();

    	$("#moveit").prop('disabled', false);
    	$("#step").prop('disabled', false);
    }
}

function setScene(particles, forces, integrator)
{
	// initialialzes fosssim object
    fosssim_scene = new FOSSSim.Scene();
    fosssim_scene.init();

	fosssim_scene.initVectors(particles, forces);
	
	// initialize fosssim stepper

	integrator_type = integrator;
    fosssim_stepper = new FOSSSim.Stepper();

	render();
}

function animate()
{
	requestAnimationFrame( animate );
		
	// console.log(paused);
	if(paused == false)
	{
		time_elapsed += 1;
		time_display.innerHTML = time_elapsed;
		
		fosssim_stepper.step(integrator_type);
		render();
	}	
}

function test()
{
	fosssim_scene.test();
}

function step()
{
	time_elapsed += 1;
	time_display.innerHTML = time_elapsed;


	fosssim_stepper.step(integrator_type);
	render();
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

function makeZeros(a, n)
{
	for(var i = 0; i < n; i++)
		a.push(0);
}

function copySegmentIntoVector(vec, seg, start)
{

	for(var i = 0; i <seg.length; i++)
	{
		vec[start + i] = seg[i];
	}
}


