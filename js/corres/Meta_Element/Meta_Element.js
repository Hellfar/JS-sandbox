				function			createElements( elems, ns )
				{
					var				a_o = [];

					ns = ns || null;
					switch (typeof (elems))
					{
						case ("string"):
						{
							var		o = document.createTextNode(elems);

							a_o.push(o);
						};
						break;
						case ("object"):
						{
							var		l_elems;

							if (elems.constructor != Array)
								elems = [elems];
							l_elems = elems.length;
							for (var i = 0; i < l_elems; i++)
							{
								var	elem = elems[i],
									o;

								if (typeof (elem.tag) != "undefined")
								{
									if (elem.tag == "#text")
										o = document.createTextNode(elem.value);
									else
									{
										if (ns)
											o = document.createElementNS(ns, elem.tag);
										else
											o = document.createElement(elem.tag);
										if (typeof (elem.child) != "undefined")
										{
											var	t_childs = createElements(elem.child, ns),
												t_l_childs = t_childs.length;
											for(var e = 0; e < t_l_childs; e++)
												o.appendChild(t_childs[e]);
										}
										for (attr in elem)
											if (elem.hasOwnProperty(attr) && elem[attr] && attr != "tag" && attr != "child")
												if (attr == "value")
													o.value = elem[attr];
												else
													if (ns)
														o.setAttributeNS(null, attr, elem[attr]);
													else
														o.setAttribute(attr, elem[attr]);
									}
									a_o.push(o);
								}
							}
						};
						break;
					}
					return (a_o);
				}

				function				jsonParams( o, templates )
				{
					var				params = [],
									props = o.properties(),
									l_props = props.length;

					if (!(templates))
						templates = {};

					for (var i = 0; i < l_props; i++)
					{
						var			attr = props[i],
									input = {},
									templateAttr = templates[attr] || null;

						switch (typeof (o[attr]))
						{
							case ("string"):
								input.value = o[attr];
							break;
							case ("object"):
								input.implement(o[attr]);
							break;
						};
						// console.log("input", input, typeof (templateAttr), templateAttr);
						switch (typeof (templateAttr))
						{
							case ("string"):
								switch (templateAttr)
								{
									case ("textarea"):
										input.implement({'tag':'textarea','name':attr,'placeholder':attr});
									break;
									default:
										input.implement({'tag':'input','name':attr,'placeholder':attr,'type':templateAttr});
									break;
								};
								break;
							case ("object"):
								{
									if (templateAttr == null)
										;
									else if (templateAttr.constructor == Array)
									{
										var	values = [];

										input.implement({'tag':'select','name':attr});
										for (k in templateAttr)
											if (templateAttr.hasOwnProperty(k))
											{
												var	value = templateAttr[k];

												if (!isNaN(k) && k.length)
												{
													if (o[attr] == value)
														values.push({'tag':'option','value':value,'selected':'selected','child':value});
													else
														values.push({'tag':'option','value':value,'child':value});
												}
												else
													input[k] = value;
											}
										if (!(input['child']))
											input['child'] = [];
										input['child'] = input['child'].concat(values);
										break;
									}
									else
									{
										input.implementWeak(templateAttr);
										// console.log("input2", input);
										break;
									}
								};
							default:
								input.implementWeak({'tag':'input','name':attr,'class':attr,'placeholder':attr});
								break;
						};
						params.push(input);
					}

					return (params);
				}
				function				paramsJson( params )
				{
					var				element = {},
									l_params = params.length;

					for (var i = 0; i < l_params; i++)
					{
						var			param = params[i],
									name;

						if (param.name && (name = param.name.match(/^\s*([a-zA-Z]\w*)(\[\s*\])?\s*$/))[0])
						{
							var		key = name[1],
									value = (param.type == "checkbox") ? ((param.checked) ? (param.value || null) : null) : (param.value || null);

							if (name[2])
							{
								if (typeof (element[key]) != "object" || element[key].constructor != Array)
									element[key] = [];
								element[key].push(value);
							}
							else
								element[key] = value;
						}
					}

					return (element);
				}
