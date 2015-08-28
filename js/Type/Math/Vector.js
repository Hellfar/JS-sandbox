function		Vector(  )
{
	var			t_l_args = arguments.length;
	
	if (!t_l_args)
		;
	else if (t_l_args == 1)
	{
		var		t_arg = arguments[0];
		
		if (typeof(t_arg) == "object" && t_arg.constructor == Vector)
		{
			this.ref = t_arg.ref.clone();
			this.val = t_arg.val.clone();
		}
		if (typeof(t_arg) == "object" && t_arg.constructor == Point)
			this.val = new Point(arguments[0]);
		else if (typeof(t_arg) == "object" && t_arg.constructor == Array
				&& t_arg.length == 2
				&& typeof(t_arg[0]) == "object" && t_arg.constructor == Array
				&& typeof(t_arg[1]) == "object" && t_arg.constructor == Array)
		{
			if (t_arg[0].length == 2
				&& t_arg[1].length == 2)
			{
				this.ref = new Point(t_arg[0]);
				this.val = new Point(t_arg[1]);
			}
			else
				throw ("Uncorrect type of parameters to create a Vector().");
		}
		else
			this.val = new Point(t_arg);
	}
	else if (t_l_args == 2)
	{
		this.ref = new Point(arguments[0]);
		this.val = new Point(arguments[1]);
	}
	else
		throw ("Uncorrect number of parameters to create a Vector().");
}
Vector.prototype.ref = new Point();
Vector.prototype.val = new Point(0, 0);