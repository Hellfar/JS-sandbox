function		Point(  )
{
	var			t_l_args = arguments.length;
	
	if (!t_l_args)
		;
	else if (t_l_args == 1)
	{
		var		t_arg = arguments[0];
		
		if (t_arg == null)
			;
		else if (typeof(t_arg) == "object" && t_arg.constructor == Point)
		{
			this.x = t_arg.x;
			this.y = t_arg.y;
			this.z = t_arg.z;
		}
		else if (typeof(t_arg) == "object" && t_arg.constructor == Array)
		{
			if (t_arg.length > 0)
				this.x = parseFloat(t_arg[0]);
			if (t_arg.length > 1)
				this.y = parseFloat(t_arg[1]);
			if (t_arg.length > 2)
				this.y = parseFloat(t_arg[2]);
		}
		else if (typeof(t_arg) == "string")
		{
			var	t_coords = t_arg.split(/[\s|;|:|,|&]+/);
			
			if (t_coords.length > 0)
				this.x = t_coords[0];
			if (t_coords.length > 1)
				this.y = t_coords[1];
			if (t_coords.length > 2)
				this.z = t_coords[2];
		}
		else if (typeof(t_arg) == "number")
		{
			this.x = t_arg;
			//~ this.y = t_arg;
			//~ this.z = t_arg;
		}
		else
			throw ("Uncorrect type of parameters to create a Point().");
	}
	else if (t_l_args == 2)
	{
		this.x = parseFloat(arguments[0]);
		this.y = parseFloat(arguments[1]);
	}
	else if (t_l_args == 3)
	{
		this.x = parseFloat(arguments[0]);
		this.y = parseFloat(arguments[1]);
		this.y = parseFloat(arguments[2]);
	}
	else
		throw ("Uncorrect number of parameters to create a Point().");
}
Point.prototype.x = null;
Point.prototype.y = null;
Point.prototype.z = null;
Point.prototype.toArray =
				function			std_Point_toArray(  )
				{
					return ([this.x, this.y, this.z]);
				};