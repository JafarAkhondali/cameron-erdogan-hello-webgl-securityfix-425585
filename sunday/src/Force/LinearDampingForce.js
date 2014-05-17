FOSSSim.LinearDampingForce = function(b)
{
	FOSSSim.Force.call(this);

	this.b = b;

};

FOSSSim.LinearDampingForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.LinearDampingForce.prototype.addForceToTotal = function(F){
	
	var v = fosssim_scene.v;
	for(var i = 0; i < v.length/2; i++)
	{
		//getBlock gets a sub-matrix (a vector since on the the dimensions is one, in this case)
		// that goes from the second argument's indicies to the third's
		v_seg = numeric.getBlock(v, [2*i, 0], [2*i + 1, 0]);
		add2SegIntoF(F, numeric.mul(-this.b, v_seg), 2*i);
	}


};
