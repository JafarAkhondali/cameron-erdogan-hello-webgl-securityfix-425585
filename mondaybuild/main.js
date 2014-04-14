// all THREE.js objects right now

var FOSSSim = {};
var three_scene;
var three_camera;
var three_renderer;

// basically main is just gonna be the outermost layer of the script


function init_scene(canvas)
{
	
}

FOSSSim.Scene = function(canvas)
{
	// this.canvas = canvas;
	var canvas_height = 500;
    var canvas_width = 500;
    rot_speed = 0.01;
    three_scene = new THREE.Scene();
    three_camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);
    three_camera.lookAt(three_scene.position);	
    // var canvas = document.getElementById("canvas");
    three_renderer = new THREE.WebGLRenderer({"canvas": canvas});
    three_renderer.setSize(canvas_width, canvas_height);
};

FOSSSim.Scene.prototype =
{
	constructor: FOSSSim.Scene,

	init: function()
	{
		three_camera.position.z = 5;
		var paused = false;

		// console.log(this.paused);

		var render = function () {
			id = requestAnimationFrame(render);
			// console.log(id);
			// console.log(this.paused);
			if(paused == false)
			{
				sphere.position.x += 0.01;
				sphere.position.z += 0.01;

				three_renderer.render(three_scene, three_camera);
			}
		};
		render();
	}, 

	init_spheres: function()
	{
		var num_spheres = 1;
	    var geometry = new THREE.SphereGeometry( 1, 32, 16 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(0,0,0);
		three_scene.add(sphere);
	},

	init_lights: function()
	{
		var light = new THREE.PointLight(0xffffff);
		light.position.set(10,10,10);
		three_scene.add(light);
		var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		three_scene.add( ambientlight );
	},

	toggle_pause: function()
	{
		if(this.paused = true)
		{
			this.paused = false;
		}
		else
		{
			this.paused = true;
		}
	}
};


