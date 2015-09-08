				function			tuplesToObject( pool )
				{
					var				ret = {},
									l_arguments = arguments.length;

					for (var i = 0; i < l_arguments; i++)
						ret[arguments[i][0] || i] = arguments[i][1];

					return (ret);
				}
