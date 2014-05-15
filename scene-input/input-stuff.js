$(function() {
	//very minimal error handling on form processing. don't leave fields empty
	$("#submit").click(function(){
		var forces = $("#force-forms").children();
		var particles = $("#particle-forms").children();
		// console.log(kids);

		//deal with particles
		for(var i = 0; i < particles.length; i++)
		{
			var particle_stuff = particles[i].children;

			var px = particle_stuff[0].value;
			var py = particle_stuff[1].value;
			var vx = particle_stuff[2].value;
			var vy = particle_stuff[3].value;
			var m = particle_stuff[4].value;
			var r = particle_stuff[5].value;
		}

		// deal with forces
		for(i = 0; i < forces.length; i++)
		{
			var force_stuff = forces[i].children;
			if(forces[i].className == "simple-grav")
			{
				var fx = force_stuff[0].value;
				var fy = force_stuff[1].value;
			}
			else if(forces[i].className == "grav")
			{
				var pi = force_stuff[0].value;
				var pj = force_stuff[1].value;
				var G = force_stuff[2].value;
			}
			else if(forces[i].className == "linear-damp")
			{
				var b = force_stuff[0].value;
			}
			else if(forces[i].className == "spring")
			{
				var pi = force_stuff[0].value;
				var pj = force_stuff[1].value;
				var k = force_stuff[2].value;
				var l0 = force_stuff[3].value;
				var b = force_stuff[4].value;
			}
		}

		//deal with integrator type
		var integrator = $("#integrator-type option:selected").val();
		
	});

	$("#add-particle").click(function(){
		$("#particle-forms").append('<div class="particle">Particle:' + 
		' px<input type="number" step="any" name="px">' + 
		' py<input type="number" step="any" name="py>">' + 
		' vx<input type="number" step="any" name="vx">'+ 
		' vy<input type="number" step="any" name="vy">' + 
		' mass<input type="number" step="any" name="m">' + 
		' radius<input type="number" step="any" name="r">'	+
		'<button class="remove">remove</button>'+
		'</div>');
	});


	//the 'on' method binds events to elements now and in the future
	//(as opposed to only what exists when the page is created)
	$(document).on("click", ".remove", function(){
		$(this).parent().remove();
	});

	$("#add-force").click(function(){
		var this_force = $("#which-force option:selected").val();
		if(this_force == "simple grav")
		{
			//this needs fx and fy
			$("#force-forms").append('<div class="simple-grav">Simple Gravity:' + 
			' fx<input type="number" step="any" name="px">' + 
			' fy<input type="number" step="any" name="py>">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
		else if(this_force =="grav")
		{
			//this needs two particle indices, G
			$("#force-forms").append('<div class="grav">Gravitational Force:' + 
			' first particle<input type="number" step="1" name="pi">' + 
			' second particle<input type="number" step="1" name="pj>">' + 
			' G<input type="number" step="any" name="pj>">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
		else if(this_force == "linear damp")
		{
			//this needs b
			$("#force-forms").append('<div class="linear-damp">Linear Damping Force:' + 
			' b<input type="number" step="any" name="b">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
		else if(this_force == "spring")
		{
			//this needs two particle indicies,  k, l0, b
			$("#force-forms").append('<div class="spring">Spring Force:' + 
			' first particle<input type="number" step="1" name="pi">' + 
			' second particle<input type="number" step="1" name="pj>">' + 
			' k<input type="number" step="any" name="k">' + 
			' l0<input type="number" step="any" name="l0">' + 
			' b<input type="number" step="any" name="b">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
	});
});