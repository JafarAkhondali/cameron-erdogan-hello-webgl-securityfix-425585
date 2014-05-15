FOSSSim.Scene = function()
{
	//set manually for now
	this.num_particles = 0;

	// arrays of floats for math calculations
	// this.x = [0,0];
	// this.v = [1, 1];
	// this.m = [1, 1];
	// this.r = [1];
	// this.forces = [];

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
		
		// this.initVectors([], []);
		// console.log("fossim scene is created");

	}, 

	initSpheres: function()
	{
		
		
		// this.initVectors();

		// this.initForces();

		for(var i = 0; i < this.num_particles; i++)
		{
			var geometry = new THREE.SphereGeometry(this.r[i], 32, 16);
			var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
			var sphere = new THREE.Mesh(geometry, material);

			sphere.position.set(this.x[2*i], this.x[2*i + 1], 0);

			this.spheres.push(sphere);
			three_scene.add(sphere);
		}

		// console.log(this.x);

	},

	initLights: function()
	{
		// console.log(this.spheres);
		this.light = new THREE.PointLight(0xffffff);
		this.light.position.set(10,10,10);
		three_scene.add(this.light);
		this.ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		three_scene.add( this.ambientlight );
	}, 

	initVectors: function(particles, forces)
	{

		// particles are input like [px, py, vx, vy, m, r]
		this.num_particles = particles.length;

		for(var i = 0; i < particles.length; i++)
		{
			this.x.push(particles[i][0]);
			this.x.push(particles[i][1]);
			this.v.push(particles[i][2]);
			this.v.push(particles[i][3]);
			this.m.push(particles[i][4]);
			this.m.push(particles[i][4]);
			this.r.push(particles[i][5]);
		}

		//deal with the different forces
		
		for(i = 0; i < forces.length; i++)
		{
			this_force = forces[i]
			if(this_force[0] == "simple grav")
			{
				var simple_grav = new FOSSSim.SimpleGravityForce(this_force[1]);
				this.forces.push(simple_grav);
			}
			else if(this_force[0] == "grav")
			{
				var grav = new FOSSSim.GravitationalForce(this_force[1], this_force[2]);
				this.forces.push(grav);
			}
			else if(this_force[0] == "linear damp")
			{
				var linear_damp = new FOSSSim.LinearDampingForce(this_force[1]);
				this.forces.push(linear_damp);
			}
			else if(this_force[0] == "spring")
			{
				var spring = new FOSSSim.SpringForce(this_force[1], this_force[2], this_force[3], this_force[4])
				this.forces.push(spring);
			}
		}

		

	},

	// initVectors: function()
	// {	



	// 	// this.x.push(-4);
	// 	// this.x.push(0);
	// 	// this.v.push(0);
	// 	// this.v.push(3);
	// 	// this.m.push(1);
	// 	// this.m.push(1);
	// 	// this.r.push(1);


	// 	// this.x.push(4);
	// 	// this.x.push(0);
	// 	// this.v.push(10);
	// 	// this.v.push(0);
	// 	// this.m.push(1);
	// 	// this.m.push(1);
	// 	// this.r.push(0.5);

	// 	// //gravitational force test
	// 	this.x.push(0);
	// 	this.x.push(0);
	// 	this.v.push(0);
	// 	this.v.push(0);
	// 	this.m.push(0.331436e6);
	// 	this.m.push(0.331436e6);
	// 	this.r.push(0.6);

	// 	this.x.push(1);
	// 	this.x.push(0);
	// 	this.v.push(0);
	// 	this.v.push(6.28316);
	// 	this.m.push(1);
	// 	this.m.push(1);
	// 	this.r.push(0.2);


	// }, 
	// initForces: function()
	// {
	// 	var grav_force = new FOSSSim.GravitationalForce([0, 1], 0.000118419);
	// 	this.forces.push(grav_force);
	// 	// var damping_force = new FOSSSim.LinearDampingForce(1);
	// 	// this.forces.push(damping_force);
	// }, 
	accumulateForces: function(F)
	{
		for(var i = 0; i < this.forces.length; i++)
		{
			this.forces[i].addForceToTotal(F);
		}
	}

};