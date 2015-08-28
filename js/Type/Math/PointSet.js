function		PointSet(  )
{
	this.inherit(Array);
	
	var			t_l_args = arguments.length;
	
	if (!t_l_args)
		;
	else if (t_l_args == 1)
	{
		var		t_arg = arguments[0];
		
		if (typeof(t_arg) == "object" && t_arg.constructor == PointSet)
		{
			var	t_len_t_arg = t_arg.length;
			for (var i = 0; i < t_len_t_arg; i++)
				this.push(t_arg[i]);
		}
		else if (typeof(t_arg) == "object" && t_arg.constructor == Array)
			this.push.apply(this, t_arg);
		else if (typeof(t_arg) == "string")
			this.push.apply(this, t_arg.match(/([^\s|;|:|,|&]+[\s|;|:|,|&]+[^\s|;|:|,|&]+)/));
		else
			throw ("Uncorrect type of parameters to create a PointSet().");
	}
	else
		this.push.apply(this, arguments);
}
PointSet.prototype.push =
				function			push(  )
				{
					var				t_l_args = arguments.length;
					
					for (var i = 0; i < t_l_args; i++)
					{
						var			t_arg = arguments[i];
						
						this.super((typeof(t_arg) == "string" && isNaN(parseFloat(t_arg.trim())) || typeof (t_arg) == "number") ? t_arg : new Point(t_arg));
					}
				};