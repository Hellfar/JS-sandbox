Object.prototype.setAttr =
				function			setAttr( key, value, fun )
				{
					if (fun)
						this[key] = fun(value);
					else
						this[key] = value;
				};
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

					if (obj.instanceOf(Array)) // temporary condition to make it able to clone Array.
					{
						var		copy = [],
								l_obj = obj.length;

						for (var i = 0; i < l_obj; i++)
							copy[i] = Object.clone(obj[i]);

						return (copy);
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
Object.prototype.testIf =
				function			std_Object_testIf( callback, defVal, args )
				{
					if (callback.apply(null, [this].concat(args)))
						return (this);

					return (defVal);
				};
Object.prototype.implement =
				function			std_Object_implement( r_obj, fun )
				{
					for (var attr in r_obj)
						if (r_obj.hasOwnProperty(attr))
							this.setAttr(attr, r_obj[attr], fun);

					return (this);
				};
Object.prototype.implementWeak =
				function			std_Object_implementWeak( r_obj, fun )
				{
					for (var attr in r_obj)
						if (r_obj.hasOwnProperty(attr) && this[attr] == undefined)
							this.setAttr(attr, r_obj[attr], fun);

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
							case ("string"):
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
Object.prototype.convert =
				function			std_Object_convert( template )
				{
					function		setAttrConv( form )
					{
						var			obj = null;

						if (form)
						{
							var		rowTuples = row.toTuples();

							obj = {};

							{
								var	props_form = form.properties(),
									l_props_form = props_form.length;

								for (var i = 0; i < l_props_form; i++)
								{
									var	attr = props_form[i],
										valPair = Object.clone(form[attr]);
// console.log(attr, valPair, form[attr]);
									valPair.forEach(function(e,i,a)
									{
										rowTuples.forEach(function(tuple)
										{
											if (Object.isEqual(a[i], tuple[0]))
												a[i] = tuple[1];
										});
									});
// console.log(valPair);
// console.log("row", row);
									switch (valPair.length)
									{
										case (1):
											obj[attr] = valPair[0];
											break;
										case (2):
											if (valPair[0])
											{
												var	val = valPair[1];

												if (valPair[0] == "$each")
												{
													var	values = row["$push"],
														l_values = values.length;
// console.log(row);
													val = [];
													for (var e = 0; e < l_values; e++)
													{
														var	tmp = row["$entry"];

														row["$entry"] = values[e];
														val.push(setAttrConv(valPair[1]));
														row["$entry"] = tmp;
													}
												}
												obj[attr] = val;
											}
											break;
										case (3):
											if (valPair[0] == valPair[1])
												obj[attr] = valPair[2];
											break;
									}
								}
							};
						}

						return (obj);
					}
					var				ret = [],
									template = Object.clone(template) || {},
									all = template["$all"] || {},
									allDefault = all.extract("default"),
									props_all = all.properties(),
									l_props_all = props_all.length,
									props_this = this.properties(),
									l_props_this = props_this.length,
									row = {"$key":null,"$value":null,"$entry":null};

					for (var i = 0; i < l_props_this; i++)
					{
						var			key = props_this[i],
									value = this[key],
									unfound = true,
									push,
									templateAttr = template[key] || null;

						{
							if (Object.instanceOf.call(value, Array))
							{
								if (Object.instanceOf.call(templateAttr, Array))
									push = value.concat(templateAttr);
								else
								{
									push = value;
									value = templateAttr;
								}
							}
							else
								if (templateAttr)
									push = Object.clone(templateAttr);
								else
									push = value;

							isArray = Object.instanceOf.call(push, Array);
						};
						row["$key"] = key;
						row["$value"] = value;
						row["$push"] = push;
// console.log(key, value, push);
						if (push != "$null")
						{
							for (var e = 0; e < l_props_all; e++)
							{
								var		type = props_all[e];

								if (Object.getType(push) == type)
								{
									// console.log(type, value);
									push = setAttrConv(all[props_all[e]]);
									unfound = false;
									break;
								}
							}
							if (unfound)
								push = setAttrConv(allDefault);
							if (push !== undefined)
								ret.push(push);
						}
					}

					return (ret);
				};
Object.prototype.properties =
				function			std_Object_properties(  )
				{
					return (Object.getOwnPropertyNames(this));
				};
Object.prototype.getType =
				function			std_Object_getType( obj )
				{
					if (arguments.length == 0)
						obj = this;
					if (obj === null)
						return ("null");
					if (!(obj instanceof Object))
						return ((typeof (obj)).charAt(0).toUpperCase() + (typeof (obj)).slice(1));

					if (obj.constructor)
						return (obj.constructor.name)
					return ("Object");
				};
Object.prototype.instanceOf =
				function			std_Object_instanceOf( objectC )
				{
					return (this instanceof objectC || this.constructor == objectC);
				};
Object.prototype.toTuples =
				function			std_Object_toTuple(  )
				{
					var				ret = [],
									props = this.properties(),
									l_props = props.length;

					for (var i = 0; i < l_props; i++)
						ret.push([props[i], this[props[i]]]);

					return (ret);
				};
