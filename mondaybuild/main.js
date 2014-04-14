// all THREE.js objects right now
var scene;
var camera;
var renderer;

function init_scene(canvas)
{
	var canvas_height = 500;
    var canvas_width = 500;
    rot_speed = 0.01;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);
    camera.lookAt(scene.position);	
    // var canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({"canvas": canvas});
    renderer.setSize(canvas_width, canvas_height);
}