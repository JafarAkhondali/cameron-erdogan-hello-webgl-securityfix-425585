Hi Tinybop,

I included this readme to explain the structure and overall purpose of my code sample.
This project is an implementation of physically-based animation system using WebGL
and Three.js. The application has two facets, a coding window with javascript code-highlighting
and an animation window that plays an WebGL animation. This is a work-in-progress, but
what I'm sending you now shows the basic foundation and how it can easily be extended
to accomodate forces and integration techniques. 

I'll start off by explaining the GUI. As you can see, it's not much (this isn't intended
to show off UX prowess. again it's still a work-in-progress). The project comes proloaded
with code in the code window. In this case, it's an implementation of the explicit euler
integration method. The code is more than stock javascript, as it utilizes both the Numeric.js
math package and the code I designed, called "fosssim" (which stands for "Four Oh Six Seven
Simulation". My animation class last semester that inspired this project was called COMS 4167).
I won't get too deep into the math, but if you uncomment the lines:

	var dx = numeric.mul(v, dt);
	x = numeric.add(x, dx);

	var dv = numeric.mul(F, dt);
	dv = numeric.div(dv, m)
	v = numeric.add(v, dv);

And press the "ch-ch-change" button, the animation window (which is just an iframe that gets 
reloaded) will display an WebGL-ified canvas displaying two particles moving under a simple
gravitational force. In this way, the coding window acts like an imitation of JSFiddle. 
The code for that isn't terribly complicated, and is entirely contained in the playfiddle.js
file (fiddle.txt and initial.txt are used to initialize the code inside of the coding window
and to act as a template for the html inside of the iframe)

The code in the browser window is the same code as the commented-out "explicitEulerStep" function
in the Stepper.js class. Basically the code just extends the Stepper object with an 
explicitEulerStep function, which is called in the "step" function in main.js.

To play the animation, press the "play" button. To step through frame by
frame, press the "step" button.

The graphics part:

You can see the real meat of the project behind the scenes, in the "src" folder. For brevity's 
sake I'll only explain the higher-level parts of what's going on. The physics system is contained
within the FOSSSim object, which contains two attribute objects, FOSSSim.Scene and 
FOSSSim.Stepper. 

The Scene attribute contains vectors holding particle positions and velocity, 
as well as a vector representing all of the forces acting on the objects. Translating from 
particles in FOSSSim to particles in Three.js (used for drawing stuff with WebGL) is also
handled in the Scene.

The Stepper attribute contains various integration methods (right now it only has one, explicit 
euler) which apply the forces (which are defined in separate files, in the Forces directory) and 
update article positions/velocities every time step. 

All of the stuff for initilizing the Three.js renderer/WebGL canvas is handled in main.js. And is
pretty idiomatic and self explanatory.

If you have any questions, feel free to email me!

Thanks, 
Cameron Erdogan



