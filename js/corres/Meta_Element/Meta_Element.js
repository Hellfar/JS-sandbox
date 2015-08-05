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
							
							switch (typeof (o[attr]))
							{
								case ("string"):
									input.value = o[attr];
								break;
								case ("object"):
									input.implement(o[attr]);
								break;
							};
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
											input = templateAttr.clone();
											break;
										}
									};
								default:
									input.implement({'tag':'input','name':attr,'placeholder':attr});
									break;
							};
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

						if (param.name)
							element[param.name] = param.value || null;
					}
					
					return (element);
				}
