// right now this is literally just going to be explicit euler
// i'll build it into a more modular thing (to support different integration techniques) 
// after I get this basic integration down
FOSSSim.Stepper = function()
{

};

FOSSSim.Stepper.prototype = 
{
	constructor: FOSSSim.Stepper,

	explicit_euler_step: function()
	{
		// no forces right now	
		// var sphere_pos = fosssim_scene.sphere.position;
		// var sphere_vel = fosssim_scene.sphere.velocity

		// sphere_pos.x += sphere_vel.x * dt;
		// sphere_pos.y += sphere_vel.y * dt;
		// sphere_pos.z += sphere_vel.z * dt;

	}
}