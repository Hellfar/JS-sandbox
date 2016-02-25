function initWebGL(canvas)
{
	var gl = null;

	try
	{
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e) {}

	// If we don't have a GL context, give up now
	if (!gl)
	{
		alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}

	return (gl);
}

function draw( canvas, items )
{
	console.log(canvas);
	console.log(items);

	gl = initWebGL(canvas);

	// Only continue if WebGL is available and working
	if (gl)
	{
		// Set clear color to lavender, fully opaque
		gl.clearColor(0.9019607843137255, 0.9019607843137255, 0.9803921568627451, 1.0);
		// Enable depth testing
		gl.enable(gl.DEPTH_TEST);
		// Near things obscure far things
		gl.depthFunc(gl.LEQUAL);
		// Clear the color as well as the depth buffer.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
	else
		console.error("WebGL wasn't set properly.");

	gl.viewport(0, 0, canvas.width, canvas.height);

	return (gl);
}
