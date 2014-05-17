// applies a gravitational force between two particles in the scene
// obviously haven't finished this one yet
FOSSSim.GravitationalForce = function(pair, G)
{
	FOSSSim.Force.call(this);

	// pair should be the index of the particles involved in this force
	this.pair = pair;
	this.G = G;
};

FOSSSim.GravitationalForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.GravitationalForce.prototype.addForceToTotal = function(F){
	
	var x = fosssim_scene.x;

	var i = this.pair[0];
	var j = this.pair[1];
	var m_i = fosssim_scene.m[2*i];
	var m_j = fosssim_scene.m[2*j];

	//getBlock gets a sub-matrix (a vector since on the the dimensions is one, in this case)
	// that goes from the second argument's indicies to the third's
	var nhat = numeric.sub(
			numeric.getBlock(x, [2*j, 0], [2*j + 1, 0]), 
			numeric.getBlock(x, [2*i, 0], [2*i + 1, 0])
		);
	var r = numeric.norm2(nhat);
	nhat = numeric.div(nhat, r);

	nhat = numeric.mul(nhat, (this.G*m_i*m_j)/(r*r));

	// add segments to force vector 
	add2SegIntoF(F, nhat, 2*i);
	add2SegIntoF(F, numeric.mul(nhat, -1), 2*j);
};

