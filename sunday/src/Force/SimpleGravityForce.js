// applies a force to every non-fixed particle in the scene

FOSSSim.SimpleGravityForce = function()
{
	FOSSSim.Force.call(this);

	this.g = [0, -9.81];
};

FOSSSim.SimpleGravityForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.SimpleGravityForce.prototype.addForceToTotal = function(F){
	// console.log("I am a simple gravity force");
	var m = fosssim_scene.m;

	for(var i = 0; i < m.length/2; i++)
	{
		var seg = numeric.getBlock(F, [2*i, 0], [2*i + 1, 0]);
		seg = numeric.add( numeric.mul(m[2*i], this.g), seg);
		
		copySegmentIntoVector(F, seg, 2*i);
	}

};

