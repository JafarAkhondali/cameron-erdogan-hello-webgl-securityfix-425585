FOSSSim.SpringForce = function(endpoints, k, l0, b)
{
	FOSSSim.Force.call(this);

	// endpoints should be the index of the particles involved in this force
	this.endpoints = endpoints;
	this.k = k;
	this.l0 = l0;
	this.b = b;

};

FOSSSim.SpringForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.SpringForce.prototype.addForceToTotal = function(F){
	
	var x = fosssim_scene.x;
	var v = fosssim_scene.v;
	var i = this.endpoints[0];
	var j = this.endpoints[1];

	var nhat = numeric.sub(
			numeric.getBlock(x, [2*j, 0], [2*j + 1, 0]), 
			numeric.getBlock(x, [2*i, 0], [2*i + 1, 0])
		);
	var l = numeric.norm2(nhat);
	nhat = numeric.div(nhat, l);

	// damping component is included here, we'll use it later
	var fdamp = nhat;

	//back to damp-free spring force component
	nhat = numeric.mul(nhat, this.k * (l - this.l0));
	add2SegIntoF(F, nhat, 2*i);
	add2SegIntoF(F, numeric.mul(nhat, -1), 2*j);

	//back to damping
	var seg_j = numeric.getBlock(v, [2*j, 0], [2*j + 1, 0]);
	var seg_i = numeric.getBlock(v, [2*i, 0], [2*i + 1, 0]);
	var dotprod = numeric.dot(fdamp, numeric.sub(seg_j, seg_i));
	fdamp = numeric.mul(fdamp, dotprod*this.b);
	add2SegIntoF(F, fdamp, 2*i);
	add2SegIntoF(F, numeric.mul(fdamp, -1), 2*j);

};

// // Compute the elastic component
//   Vector2s nhat = x.segment<2>(2*m_endpoints.second)-x.segment<2>(2*m_endpoints.first); 
//   scalar l = nhat.norm(); 
//   assert( l != 0.0 ); 
//   nhat /= l;
//   Vector2s fdamp = nhat;
//   nhat *= m_k*(l-m_l0);
//   gradE.segment<2>(2*m_endpoints.first)  -= nhat;
//   gradE.segment<2>(2*m_endpoints.second) += nhat;

//   // Compute the internal damping
//   // Remember we are computing minus the force here
//   fdamp *= m_b*fdamp.dot(v.segment<2>(2*m_endpoints.second)-v.segment<2>(2*m_endpoints.first));
//   gradE.segment<2>(2*m_endpoints.first)  -= fdamp;
//   gradE.segment<2>(2*m_endpoints.second) += fdamp;