Array.prototype.indexes =
				function			std_Array_indexes(  )
				{
					return (this.map(function(e,i){return(i);}).filter(function(e){return(e);}));
				};
Array.prototype.first =
				function			std_Array_first(  )
				{
					return (this.slice(0, 1)[0] || null);
				};
Array.prototype.last =
				function			std_Array_last(  )
				{
					return (this.slice(-1)[0] || null);
				};
Array.prototype.sum =
				function			std_Array_Math_sum(  )
				{
					var				a = (typeof(this) == "undefined") ? arguments[0] : this,
									len_a = a.length,
									sum = 0;
					
					for (var i = 0; i < len_a; i++)
						sum += a[i];
					
					return (sum);
				};