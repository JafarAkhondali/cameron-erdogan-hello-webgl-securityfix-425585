FOSSSim.Force = function()
{

};

FOSSSim.Force.prototype = 
{
	constructor: FOSSSim.Force,

	addForceToTotal: function(F)
	{
		alert("shouldn't be calling parent function");
	}


};