//~ Object.prototype.clone =
				//~ function			std_Object_clone(  )
				//~ {
					//~ var				o = (arguments.length) ? arguments[0] : this,
									//~ n_o,
									//~ propNames;
					//~ 
					//~ if (!o)
						//~ return (o);
					//~ n_o = Object.create(Object.getPrototypeOf(o));
					//~ propNames = Object.getOwnPropertyNames(o);
//~ 
					//~ propNames.forEach(function( name )
					//~ {
						//~ var desc = Object.getOwnPropertyDescriptor(o, name);
						//~ 
						//~ Object.defineProperty(n_o, name, desc);
					//~ });
//~ 
					//~ return (n_o);
				//~ };
Object.prototype.clone =
				function		std_Object_clone( obj )
				{
					if (null == obj || "object" != typeof (obj))
					{
						if (arguments.length == 0)
							obj = this;
						else
							return (obj);
					}
					
					var			copy = Object.create(obj.__proto__);
					
					for (var attr in obj)
						if (obj.hasOwnProperty(attr))
							copy[attr] = Object.clone(obj[attr]);
					
					return (copy);
				};
Object.prototype.isEqual =
				function			std_Object_isEqual( obj, cmpW )
				{
					switch (arguments.length)
					{
						case (0):
							return (false);
						break;
						case (1):
							cmpW = obj;
							obj = this;
					};
					if ((typeof (obj) == "number" && isNaN(obj)) && (typeof (obj) == "number" && isNaN(cmpW)))
						return (true);
					if ((obj === null || cmpW === null) || (typeof (obj) != "object" || typeof (cmpW) != "object"))
						return (obj === cmpW);
					
					if (obj.constructor != cmpW.constructor)
						return (false);
					for (var attr in obj)
						if (typeof (obj[attr]) != typeof (cmpW[attr]) || !(Object.isEqual(obj[attr], cmpW[attr])))
							return (false);
					
					return (true);
				};
Object.prototype.implement =
				function			std_Object_implement( r_obj )
				{
					for (var attr in r_obj)
						if (r_obj.hasOwnProperty(attr))
							this[attr] = r_obj[attr];
					
					return (this);
				};
Object.prototype.implementWeak =
				function			std_Object_implementWeak( r_obj )
				{
					for (var attr in r_obj)
						if (r_obj.hasOwnProperty(attr) && this[attr] == undefined)
							this[attr] = r_obj[attr];
					
					return (this);
				};
Object.prototype.extract =
				function			std_Object_extract(  )
				{
					var				b = (typeof (this) == 'function') ? false : true,
									obj = (b) ? this : arguments[0];
					
					arguments = Array.prototype.slice.call(arguments, 0);
					if (!b)
						arguments = arguments.slice(1);
					function	removeNReturn( obj, k )
					{
						var		v = obj[k] || null;
						
						delete (obj[k]);
						
						return (v);
					}
					function	v_extract( arg )
					{
						switch (typeof (arg))
						{
							case ("string"): // strange behavior of switch allow that (making a "string" or "number" comparison).
							case ("number"):
								return (removeNReturn(obj, arg));
								break;
							case ("object"):
								switch (arg.constructor)
								{
									case (Array):
										{
											var	a = [],
												len_arg = arg.length,
												b = false,
												t;
											
											for (var i = 0; i < len_arg; i++)
											{
												a.push(t = (typeof (arg[i]) == "object") ? v_extract(arg[i]) : removeNReturn(obj, arg[i]));
												if (t != null)
													b = true;
											}
											if (b)
												return (a);
										};
										break;
									default:
										{
											var	b = false;
											
											for (var item in arg)
												if (arg.hasOwnProperty(item))
													if ((arg[item] = (arg[item] == null) ? removeNReturn(obj, item) : v_extract(arg[item])) != null)
														b = true;
											if (b)
												return (arg);
										};
										break;
								}
								break;
						}
						
						return (null);
					}
					var			len_args = arguments.length;
					
					for (var i = 0; i < len_args; i++)
					{
						var		arg = arguments[i],
								o = v_extract(arg);
						
						if (o != null)
							return (o);
					}
					
					return (null);
				};
Object.prototype.properties =
				function			std_Object_properties(  )
				{
					return (Object.getOwnPropertyNames(this));
				};
Object.prototype.instanceOf =
				function			std_Object_instanceOf( objectC )
				{
					return (this instanceof objectC || this.constructor == objectC);
				};