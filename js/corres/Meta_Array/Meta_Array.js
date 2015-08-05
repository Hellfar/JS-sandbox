				function			toArray( arr, start, end )
				{
					if (!arr)
						return ([]);
					if (!start)
						start = 0;
					if (!end)
						end = arr.length;
					
					return (Array.prototype.slice.call(arr, start, end));
					//return (Array.prototype.slice.call.apply(null, arguments)); // TODO: should be cleanner like that but doesn't work at all.
				}