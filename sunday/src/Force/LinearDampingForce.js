FOSSSim.LinearDampingForce = function(pair)
{
	FOSSSim.Force.call(this);

};

FOSSSim.LinearDampingForce.prototype = Object.create( FOSSSim.Force.prototype);

FOSSSim.LinearDampingForce.prototype.addForceToTotal = function(F){
	console.log("I am a linear damping force");
};
