var			XMLHttpFactories =
[
	function () {return (new XMLHttpRequest())},
	function () {return (new ActiveXObject("Msxml2.XMLHTTP"))},
	function () {return (new ActiveXObject("Msxml3.XMLHTTP"))},
	function () {return (new ActiveXObject("Microsoft.XMLHTTP"))},
];

function	createXMLHTTPObject(  )
{
	var		xmlhttp = false;

	for (var i = 0; i < XMLHttpFactories.length; i++)
	{
		try
		{
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e)
		{
			continue;
		}
		break;
	}
	return (xmlhttp);
}
function	sendRequest( url, callback, postData )
{
	var		req = createXMLHTTPObject(),
			method = (postData) ? "POST" : "GET";

	if (!req)
		return;
	req.open(method,url,true);
	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function ()
	{
		if (req.readyState != 4)
			return;
		if (req.status != 200 && req.status != 304)
		{
			// alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
	};
	if (req.readyState == 4)
		return;
	req.send(postData);
}

function	require( fileName, callback )
{
	{ // very old way.
		// var body = document.getElementsByTagName("body")[0];
		// var script = document.createElement('script');

		// if (id != undefined)
			// script.id = id;

		// script.type = "text/javascript";
		// body.appendChild(document.createTextNode("\n"));
		// body.appendChild(script);
		// script.src = fileName;
	};

	{ // in the past was the only way that could synchronously include a document.
		var	id = 'lib_js_'+ arguments[0];

		if (document.getElementById(id) == null)
			document.writeln("\n<script id=\""+ id +"\" type=\"text/javascript\" src=\""+ fileName +"\" ></script>");

		callback && callback.apply(null, arguments);
	};

	{ // test pending, (unauthorized in main thread)
		// var	id = id || "lib_js_"+ fileName;

		// if (document.getElementById(id) == null)
		// {
		// 	var	xhrObj = createXMLHTTPObject(),
		// 		s = document.createElement('script');

		// 	xhrObj.open('GET', fileName, false);
		// 	xhrObj.send('');

		// 	s.type = "text/javascript";
		// 	s.text = xhrObj.responseText;

		// 	document.getElementsByTagName('head')[0].appendChild(s);
		// }
	};
}

// require("./test.js", (function ()
// {
// 	alert(test);
// }));
