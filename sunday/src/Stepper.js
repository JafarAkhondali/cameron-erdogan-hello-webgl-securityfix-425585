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

		// keep in mind javascript automatically passes non-primitives by reference
		var x = fosssim_scene.x;
		var v = fosssim_scene.v;
		var m = fosssim_scene.m;

		var F = [];
		makeZeros(F, 2*fosssim_scene.num_particles);
		fosssim_scene.accumulateForces(F);


		var dx = numeric.mul(v, dt);
		x = numeric.add(x, dx);

		var dv = numeric.mul(F, dt);
		dv = numeric.div(dv, m)
		v = numeric.add(v, dv);
		// console.log(x);
		// console.log(v);


		// probably have to do this because the numeric add returns a copy
		fosssim_scene.x = x;
		fosssim_scene.v = v;

		this.updateSpheresPos();
	}, 

	symplecticEulerStep: function()
	{
		var x = fosssim_scene.x;
		var v = fosssim_scene.v;
		var m = fosssim_scene.m;

		var F = [];
		makeZeros(F, 2*fosssim_scene.num_particles);
		fosssim_scene.accumulateForces(F);


		var dv = numeric.mul(F, dt);
		dv = numeric.div(dv, m)
		v = numeric.add(v, dv);

		var dx = numeric.mul(v, dt);
		x = numeric.add(x, dx);
		
		// console.log(x);
		// console.log(v);


		// probably have to do this because the numeric add returns a copy
		fosssim_scene.x = x;
		fosssim_scene.v = v;

		this.updateSpheresPos();
	},

	updateSpheresPos: function()
	{
		var spheres = fosssim_scene.spheres;
		var x = fosssim_scene.x;

		for(var i = 0; i < fosssim_scene.num_particles; i++)
		{
			spheres[i].position.x = x[2*i];
			spheres[i].position.y = x[2*i + 1];
		}

		// fosssim_scene.spheres = spheres;
	}
}