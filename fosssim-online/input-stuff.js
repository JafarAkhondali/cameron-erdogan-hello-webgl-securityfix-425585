$(function() {
	//very minimal error handling on form processing. don't leave fields empty
	$("#change-code").click(function(){
		var forces = $("#force-forms").children();
		var particles = $("#particle-forms").children();

		//deal with particles

		//sent to the FOSSSim scene in an array of particles like [px, py, vx, vy, m, r]
		var fosssim_particles = [];
		for(var i = 0; i < particles.length; i++)
		{
			var particle_stuff = particles[i].children;

			var px = parseFloat(particle_stuff[0].value);
			var py = parseFloat(particle_stuff[1].value);
			var vx = parseFloat(particle_stuff[2].value);
			var vy = parseFloat(particle_stuff[3].value);
			var m = parseFloat(particle_stuff[4].value);
			var r = parseFloat(particle_stuff[5].value);	

			fosssim_particles.push([px, py, vx, vy, m, r]);
		}

		

		// deal with forces
		var fosssim_forces = []
		for(i = 0; i < forces.length; i++)
		{
			var force_stuff = forces[i].children;
			if(forces[i].className == "simple-grav")
			{
				var fx = parseFloat(force_stuff[0].value);
				var fy = parseFloat(force_stuff[1].value);

				fosssim_forces.push(["simple grav", [fx, fy]]);
			}
			else if(forces[i].className == "grav")
			{
				var pi = parseInt(force_stuff[0].value);
				var pj = parseInt(force_stuff[1].value);
				var G = parseFloat(force_stuff[2].value);

				fosssim_forces.push(["grav", [pi,pj] , G]);

			}
			else if(forces[i].className == "linear-damp")
			{
				var b = parseFloat(force_stuff[0].value);

				fosssim_forces.push(["linear damp", b]);
			}
			else if(forces[i].className == "spring")
			{
				var pi = parseInt(force_stuff[0].value);
				var pj = parseInt(force_stuff[1].value);
				var k = parseFloat(force_stuff[2].value);
				var l0 = parseFloat(force_stuff[3].value);
				var b = parseFloat(force_stuff[4].value);

				fosssim_forces.push(["spring", [pi, pj], k, l0, b]);
			}
		}

		//deal with integrator type
		var integrator = $("#integrator-type option:selected").val();

		window.frames['fiddle'].window.setScene(fosssim_particles, fosssim_forces, integrator);
		
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
		if(this_force == "simple-grav")
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
			' i index <input type="number" step="1" name="pi">' + 
			' j index <input type="number" step="1" name="pj>">' + 
			' G<input type="number" step="any" name="pj>">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
		else if(this_force == "linear-damp")
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
			' i index <input type="number" step="1" name="pi">' + 
			' j index <input type="number" step="1" name="pj>">' + 
			' k<input type="number" step="any" name="k">' + 
			' l0<input type="number" step="any" name="l0">' + 
			' b<input type="number" step="any" name="b">' + 
			'<button class="remove">remove</button>'+
			'</div>');
		}
	});
});