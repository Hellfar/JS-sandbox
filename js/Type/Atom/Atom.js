				function			Atom(  )
				{
					this.stand = [];
					this.pool = [];
					//~ this.receptors = [];
					
					if (typeof (this.interface) == "function")
						this.interface.apply(this, arguments);
				}
Atom.prototype.synapses =
				function			std_Atom_synapses(  )
				{
					this.stand.splice.apply(this.stand, arguments);
					this.pool.splice.apply(this.pool, arguments);
					
					if (typeof (this.interface_synapses) == "function")
						this.interface_synapses.apply(this, arguments);
				};
//~ Atom.prototype.emit =
				//~ function			std_Atom_emit(  )
				//~ {
					//~ var				receptors = this.receptors,
									//~ keys = (arguments.length) ? Array.prototype.slice.call(arguments) : receptors.indexes(),
									//~ l_keys = keys.length,
									//~ waiters = Array.prototype.slice.call(this.node.querySelectorAll('.synapsesOut input')).map(function(e){return(~~(e.value));});
					//~ 
					//~ for (var i = 0; i < l_keys; i++)
					//~ {
						//~ var			key = keys[i],
									//~ poolKey = waiters.indexOf(key),
									//~ item = this.pool[poolKey] || null;
						//~ 
						//~ if (item)
							//~ receptors[key].forEach(function(e){e.push(item);});
					//~ };
				//~ };
