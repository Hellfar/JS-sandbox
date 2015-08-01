				function			jsonParams( o, templates )
				{
					var				params = [],
									props = o.properties(),
									l_props = props.length;
					
					if (!(templates))
						templates = {};
					
					for (attr in o)
					{
						if (o.hasOwnProperty(attr))
						{
							var		input = {},
									templateAttr = templates[attr] || null;
							
							switch (typeof (templateAttr))
							{
								case ("string"):
									input = {'tag':'input','name':attr,'placeholder':attr,'type':templateAttr};
									break;
								case ("object"):
									{
										if (templateAttr == null)
											;
										else if (templateAttr.constructor == Array)
										{
											var	values = [];

											input = {'tag':'select','name':attr};
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
											input['child'] = values;
											break;
										}
									};
								default:
									input = {'tag':'input','name':attr,'placeholder':attr};
									break;
							};
							input.value = o[attr] || "";
							params.push(input);
						}
					}

					return (params);
				}
				function			paramsJson( params )
				{
					var				element = {},
									l_params = params.length;

					for (var i = 0; i < l_params; i++)
					{
						var			param = params[i];

						element[param.name] = param.value || null;
					}
					
					return (element);
				}
