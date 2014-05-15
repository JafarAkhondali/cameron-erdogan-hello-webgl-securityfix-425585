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
var stepper_type = "";

// create scenestepper object also

// basically main is just gonna be the outermost layer of the script
function main(canvas)
{
	initScene(canvas);

	animate();
	// console.log("a thing");
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

    

    

    // render();
}

function setScene(particles, forces)
{
	// initialialzes fosssim object
    fosssim_scene = new FOSSSim.Scene();
    fosssim_scene.init();

	fosssim_scene.initVectors(particles, forces);
	console.log(fosssim_scene.x);
	three_scene.updateMatrix();

	console.log(three_scene);
	// initialize fosssim stepper
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
		
		fosssim_stepper.explicitEulerStep();
		// fosssim_stepper.symplecticEulerStep();
		// update();
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

	console.log(fosssim_scene.x);
	fosssim_stepper.explicitEulerStep();
	console.log(fosssim_scene.x);
		// update();
	render();
}

function render()
{
	three_renderer.render(three_scene, three_camera);
}

// // scene stepping would go here
// function update()
// {
// 	// for now just increment the position of sphere by point 1 or whatever
// 	var sphere_pos = fosssim_scene.sphere.position;
// 	sphere_pos.x += 0.01;
// 	sphere_pos.z += 0.01;

// }

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


