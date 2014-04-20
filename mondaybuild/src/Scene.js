FOSSSim.Scene = function()
{
	// z this.sphere;
	// var num_spheres;
	// var light;
	// var ambientlight;
	this.x = [];
	this.v = [];
	this.m = [];
	this.r = [];
	this.num_particles = 2;
};


FOSSSim.Scene.prototype =
{
	constructor: FOSSSim.Scene,

	init: function()
	{
		this.init_spheres();
		this.init_lights();
	}, 

	init_spheres: function()
	{
		
		
		this.init_vectors();

		for(var i = 0; i < this.num_particles; i++)
		{
			var geometry = new THREE.SphereGeometry(this.r[i], 32, 16);
			var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
			var sphere = new THREE.Mesh(geometry, material);

			sphere.position.set(this.x[2*i], this.x[2*i + 1], 0);
			three_scene.add(sphere);
		}

		// var num_spheres = 1;
	 //    var geometry = new THREE.SphereGeometry( 1, 32, 16 );
		// var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		// this.sphere = new THREE.Mesh( geometry, material );

		// this.sphere.position.set(0,0,0);
		// three_scene.add(this.sphere);

		// this.sphere.velocity = new THREE.Vector3(1, 0, 1);
	},

	init_lights: function()
	{
		this.light = new THREE.PointLight(0xffffff);
		this.light.position.set(10,10,10);
		three_scene.add(this.light);
		this.ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		three_scene.add( this.ambientlight );
	}, 
	// this is hardcoded for now
	init_vectors: function()
	{	
		// put a sphere at -2 0 with no velocity and mass of 1 and radius 1
		this.x.push(-2);
		this.x.push(0);
		this.v.push(0);
		this.v.push(0);
		this.m.push(1);
		this.r.push(1);


		// put another at 2 0 with upward velocity and mass of 2 and radius 0.5
		this.x.push(2)
		this.x.push(0)
		this.v.push(0)
		this.v.push(1)
		this.m.push(2);
		this.r.push(0.5);

	}
};