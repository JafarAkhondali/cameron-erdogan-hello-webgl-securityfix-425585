var FOSSSim = {};

FOSSSim.Scene = function()
{
	// this.canvas = canvas;
	this.paused = false;
};

FOSSSim.Scene.prototype =
{
	constructor: FOSSSim.Scene,

	init: function()
	{
		// console.log(this.paused);

		// var canvas = this.canvas;

		// var canvas_height = 500;
	 //    var canvas_width = 500;
	 //    rot_speed = 0.01;
	 //    var scene = new THREE.Scene();
	 //    var camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);
	 //    camera.lookAt(scene.position);	
	 //    // var canvas = document.getElementById("canvas");
	 //    var renderer = new THREE.WebGLRenderer({"canvas": canvas});
	 //    renderer.setSize(canvas_width, canvas_height);

	    // init_spheres();
	    var num_spheres = 1;
	    var geometry = new THREE.SphereGeometry( 1, 32, 16 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(0,0,0);
		scene.add(sphere);

		// init_lights();
		var light = new THREE.PointLight(0xffffff);
		light.position.set(10,10,10);
		scene.add(light);
		var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		scene.add( ambientlight );

		camera.position.z = 5;
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

				renderer.render(scene, camera);
			}
		};
		render();
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


