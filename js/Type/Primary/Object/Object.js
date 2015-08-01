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
Object.prototype.implement =
				function			std_Object_implement( r_obj )
				{
					for (var attr in r_obj)
						if (r_obj.hasOwnProperty(attr))
							this[attr] = r_obj[attr];
					
					return (this);
				};
Object.prototype.properties =
				function			std_Object_properties(  )
				{
					return (Object.getOwnPropertyNames(this));
				};
