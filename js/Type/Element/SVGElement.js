SVGElement.prototype.svgComponent =
function		std_SVG_svgComponent( o_component )
{
	return (this.addElements(o_component.implementWeak(o_component.extract("className")))[0]);
};
SVGElement.prototype.dot =
function		std_SVG_dot( o_component )
{
	var			pos = new Point(o_component.extract("coords", ["x", "y"]));
	
	return (this.addElements(
		{
			'tag'	:'circle',
			'r'		:o_component.extract("r", "radius") || 0.5,
			'fill'	:o_component.extract("color"),
		}
		.implement({'x':pos.x, 'y':pos.y})
		.implement(o_component)
	)[0]);
};
SVGElement.prototype.line =
function		std_SVG_line( o_component ) // finir optimiser
{
	var			points = (new PointSet(o_component.points)),
				t_len_a_points = points.length;
	
	// two optimisation levels.
	if (t_len_a_points == 2)
	{
		var		elem = document.createElementNS(this.namespace, 'line');
		
		elem.setAttributeNS(null, 'x1', points[0].x);
		elem.setAttributeNS(null, 'y1', points[0].y);
		elem.setAttributeNS(null, 'x2', points[1].x);
		elem.setAttributeNS(null, 'y2', points[1].y);
		//~ elem.style.strokeWidth = 1;
		elem.style.stroke = o_component.color;
		this.appendChild(elem);
	}
	else
	{
		var		elem = document.createElementNS(this.namespace, 'polyline'),
				s_draw = "",
				b = "";
		
		for (var i = 0; i < t_len_a_points; i++)
		{
			s_draw += b + points[i].toArray().join(" ");
			b = ", ";
		}
		elem.setAttributeNS(null, 'points', s_draw);
		elem.style.fill = 'none';
		//~ elem.style.strokeWidth = 1;
		elem.style.stroke = o_component.color;
		this.appendChild(elem);
	}
	
	return (elem);
};
SVGElement.prototype.rect =
function		std_SVG_rect( o_component ) // finir optimiser binder
{
	var			elem = document.createElementNS(this.namespace, 'rect'),
				t_vector;
	
	this.vector = new Vector(o_component.extract("vector", ["coords", "size"]));
	
	elem.setAttributeNS(null, 'x', this.vector.ref.x);
	elem.setAttributeNS(null, 'y', this.vector.ref.y);
	elem.setAttributeNS(null, 'width', this.vector.val.x);
	elem.setAttributeNS(null, 'height', this.vector.val.y);
	//~ elem.style.stroke = o_component.extract("border");
	elem.style.fill = o_component.extract("color");
	elem.setAttributesNS(null, o_component);
	this.appendChild(elem);
	
	return (elem);
};
SVGElement.prototype.circle =
function		std_SVG_circle( o_component ) // finir optimiser binder
{
	var			coords = new Point(o_component.extract("coords", ["x", "y"])),
				radius = new Point(o_component.extract("radius"));
	
	// two optimisation levels.
	if (radius.y == null)
	{
		var		elem = document.createElementNS(this.namespace, 'circle');
		
		elem.setAttributeNS(null, 'r', radius.x);
	}
	else
	{
		var		elem = document.createElementNS(this.namespace, 'ellipse');
		
		elem.setAttributeNS(null, 'rx', radius.x);
		elem.setAttributeNS(null, 'ry', radius.y);
	}
	elem.setAttributeNS(null, 'cx', coords.x);
	elem.setAttributeNS(null, 'cy', coords.y);
	elem.style.fill = o_component.extract("color");
	elem.setAttributesNS(null, o_component);
	this.appendChild(elem);
	
	return (elem);
};
SVGElement.prototype.polygon =
function		std_SVG_polygon( o_component ) // finir optimiser
{
	var			elem = document.createElementNS(this.namespace, 'polygon'),
				points = (new PointSet(o_component.points)),
				t_len_a_points = points.length,
				s_draw = "";
	
	for (var i = 0; i < t_len_a_points; i++)
		s_draw += points[i].toArray().join(" ").trim().split(" ").join(",") +" ";
	elem.setAttributeNS(null, 'points', s_draw.trim());
	//~ elem.style.stroke = o_component.color;
	elem.style.fill = o_component.color;
	this.appendChild(elem);
	
	return (elem);
};
SVGElement.prototype.triangle = SVGElement.prototype.polygon;
SVGElement.prototype.path =
function		std_SVG_path( o_component ) //finir optimiser
{
	var			elem = document.createElementNS(this.namespace, 'path'),
				points = (new PointSet(o_component.path)),
				t_len_a_points = points.length,
				s_draw = "",
				s_part = "M",
				t_path = o_component.path;
	
	for (var i = 0; i < t_len_a_points; i++)
	{
		if (typeof (points[i]) == "string")
			s_draw += " "+ points[i];
		else
			s_draw += s_part + points[i].toArray().join(" ").trim().split(" ").join(",");
		s_part = " L";
	}
	
	elem.setAttributeNS(null, 'd', s_draw);
	//~ elem.style.stroke = o_component.color;
	elem.style.fill = o_component.color;
	this.appendChild(elem);
	
	return (elem);
}; // optimiser
//~ SVGElement.prototype.candle =
//~ function		std_SVG_candle( o_component )
//~ {
	//~ var			elem = this.lastElem = document.createElementNS(this.namespace, 'path');
	//~ var			cdl = clone(this.candle.default);
	//~ 
	//~ for (index in o_component)
		//~ cdl[index] = o_component[index];
	//~ var							i_half = Math.ceil(candleWidth / 2);
	//~ 
	//~ if (typeof(o_candle.o) == "undefined" || typeof(o_candle.c) == "undefined" || typeof(o_candle.h) == "undefined" || typeof(o_candle.l) == "undefined")
		//~ throw ("A candle must have four key (o, c, h, l).");
	//~ 
	//~ return(this);
//~ };
//~ SVGElement.prototype.candle.default =
//~ {
	//~ 'width'		:10
//~ };
SVGElement.prototype.text =
function		std_SVG_text( o_component )
{
	var			elem = document.createElementNS(this.namespace, 'text'),
				point = new Point(o_component.extract("coords", ["x", "y"]));
	
	elem.bind("content", ["innerHTML"], o_component.extract("content"));
	elem.bind("color", ["#setAttributeNS", 2, null, "fill"], o_component.extract("color"));
	elem.bind("x", ["#setAttributeNS", 2, null, "x"], point.x);
	elem.bind("y", ["#setAttributeNS", 2, null, "y"], point.y);
	//~ console.log(elem.binders);
	elem.setAttributesNS(null, o_component);
	//~ elem.binder();
	this.appendChild(elem);
	
	return (elem);
}
SVGElement.prototype.image =
function		std_SVG_image( o_component )
{
	var			elem = document.createElementNS(this.namespace, 'image'),
				coords = (typeof (o_component.coords) != "undefined") ? new Point(o_component.coords) : new Point(o_component.x, o_component.y);
	
	if (!(this.getAttribute("xmlns:xlink")))
		this.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	
	elem.setAttributeNS(null, 'x', coords.x);
	elem.setAttributeNS(null, 'y', coords.y);
	elem.setAttributeNS(null, 'width', o_component.width);
	elem.setAttributeNS(null, 'height', o_component.height);
	elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', o_component.url);
	elem.innerHTML = o_component.content;
	this.appendChild(elem);
	
	return (elem);
}

SVGElement.prototype.getDefs =
function		std_SVG_getDefs( elemToCp )
{
	var			collector = this.getElementsByTagNameNS(this.namespace, 'defs'),
				elem = this.lastElem = (typeof (elemToCp) == 'undefined') ? ((collector.length) ? collector[0] : document.createElementNS(this.namespace, 'defs')) : elemToCp.cloneNode();
	
	this.appendChild(elem);
	
	return (elem);
};
SVGElement.prototype.stop =
function		std_SVG_stop( ID )
{
	var			gradNode = (typeof (ID) == "String") ? this.getElementById(this.namespace, ID) : ID,
				len_args = arguments.length - 1;
	
	for (var i = 1; i <= len_args; i++)
	{
		var		arg = arguments[i],
				stop = document.createElementNS(this.namespace, 'stop');
		
		stop.setAttributeNS(null, 'offset', arg.offset);
		stop.style.stopColor = getColorObject(arg.color).rgb;
		stop.style.stopOpacity = arg.opacity;
		gradNode.appendChild(stop);
	}
};
SVGElement.prototype.gradient =
function		std_SVG_gradient( o_def )
{
	var			defElem = this.getDefs(),
				elem = document.createElementNS(this.namespace, 'linearGradient');
	
	if (typeof (o_def.vector) != 'undefined')
	{
		elem.setAttributeNS(null, 'x1', o_def.vector[0].x);
		elem.setAttributeNS(null, 'y1', o_def.vector[0].y);
		elem.setAttributeNS(null, 'x2', o_def.vector[1].x);
		elem.setAttributeNS(null, 'y2', o_def.vector[1].y);
	}
	if (typeof (o_def.stops) != 'undefined')
		this.stop.apply(this, [elem].concat(o_def.stops));
	if (typeof (o_def.id) == 'undefined')
	{
		elem.setAttributeNS(null, 'id', this.gradient.static_IDName);
		(parseInt(this.gradient.static_IDName) + 1) +"Component";
	}
	else
		elem.setAttributeNS(null, 'id', o_def.id);
	defElem.appendChild(elem);
	this.lastElem = elem;
	
	return (elem);
};
SVGElement.prototype.gradient.static_IDName = "0Component";