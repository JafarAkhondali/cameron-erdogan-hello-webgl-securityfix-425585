// applies a gravitational force between two particles in the scene

FOSSSim.GravitationalForce = function(pair)
{
	FOSSSim.Force.call(this);

	// pair should be the index of the particles involved in this force
	this.pair = pair;
};

FOSSSim.GravitationalForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.GravitationalForce.prototype.addForceToTotal = function(F){
	console.log("I am a gravitational force");
};

