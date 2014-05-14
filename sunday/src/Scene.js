FOSSSim.Scene = function()
{
	//set manually for now
	this.num_particles = 2;

	// arrays of floats for math calculations
	this.x = [];
	this.v = [];
	this.m = [];
	this.r = [];
	this.forces = [];
	

	// array of THREE spheres
	this.spheres = [];
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
		
		
		this.initVectors();

		this.initForces();

		for(var i = 0; i < this.num_particles; i++)
		{
			var geometry = new THREE.SphereGeometry(this.r[i], 32, 16);
			var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
			var sphere = new THREE.Mesh(geometry, material);

			sphere.position.set(this.x[2*i], this.x[2*i + 1], 0);

			this.spheres.push(sphere);
			three_scene.add(sphere);
		}

	},

	initLights: function()
	{
		this.light = new THREE.PointLight(0xffffff);
		this.light.position.set(10,10,10);
		three_scene.add(this.light);
		this.ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		three_scene.add( this.ambientlight );
	}, 
	// this is hardcoded for now
	initVectors: function()
	{	



		// this.x.push(-4);
		// this.x.push(0);
		// this.v.push(0);
		// this.v.push(3);
		// this.m.push(1);
		// this.m.push(1);
		// this.r.push(1);


		// this.x.push(4);
		// this.x.push(0);
		// this.v.push(10);
		// this.v.push(0);
		// this.m.push(1);
		// this.m.push(1);
		// this.r.push(0.5);

		// //gravitational force test
		this.x.push(0);
		this.x.push(0);
		this.v.push(0);
		this.v.push(0);
		this.m.push(0.331436e6);
		this.m.push(0.331436e6);
		this.r.push(0.06);

		this.x.push(1);
		this.x.push(0);
		this.v.push(0);
		this.v.push(6.28316);
		this.m.push(1);
		this.m.push(1);
		this.r.push(0.02);


	}, 
	initForces: function()
	{
		var grav_force = new FOSSSim.GravitationalForce([0, 1], 0.000118419);
		this.forces.push(grav_force);
		// var damping_force = new FOSSSim.LinearDampingForce(1);
		// this.forces.push(damping_force);
	}, 
	accumulateForces: function(F)
	{
		for(var i = 0; i < this.forces.length; i++)
		{
			this.forces[i].addForceToTotal(F);
		}
	}

};