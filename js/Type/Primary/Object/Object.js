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
Object.prototype.properties =
				function			std_Object_properties(  )
				{
					return (Object.getOwnPropertyNames(this));
				};
