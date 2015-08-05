Atom.prototype.interface =
				function			std_Atom_interface( parent )
				{
					this.node = parent.addElements(
					{
						'tag'		:'div',
						'class'		:'atom',
						'child'		:
						[
							{
								'tag'	:'div',
								'child':
								[
									{
										'tag'		:'button',
										'child'		:'x',
										'onclick'	:'Javascript:var p=this.parent(\'.atom\');p.parent().removeChild(p);',
									},
									{
										'tag'		:'button',
										'child'		:'reduce',
										'onclick'	:'Javascript:if(this.innerHTML==\'reduce\'){this.parent(\'div\').siblingElements(\':not(.output)\').forEach(function(e){e.appendClass(\'reduce\')});this.innerHTML=\'enlarge\';}else{this.parent(\'div\').siblingElements().forEach(function(e){e.removeClass(\'reduce\')});this.innerHTML=\'reduce\';};',
									},
									{
										'tag'		:'button',
										'child'		:'hide',
										'onclick'	:'Javascript:if(this.innerHTML==\'hide\'){this.parent(\'div\').siblingElements().forEach(function(e){e.appendClass(\'reduce\')});this.innerHTML=\'show\';}else{this.parent(\'div\').siblingElements().forEach(function(e){e.removeClass(\'reduce\')});this.innerHTML=\'hide\';};',
									},
									{
										'tag'		:'button',
										'child'		:'refresh',
										'onclick'	:'Javascript:this.parent(\'.atom\').atom.interface_refresh();',
									},
								],
							},
							{'tag'	:'hr'},
							{
								'tag'	:'div',
								'class'	:'synapses',
								'child':
								{
									'tag'			:'button',
									'child'			:'Stand',
									'onclick'		:'Javascript:var s=this.siblingElements(\'.synapse\');this.parent().addElements({\'tag\':\'span\',\'class\':\'synapse\',\'child\':[{\'tag\':\'br\'},{\'tag\':\'input\',\'placeholder\':\'synapse Key\','+/*\'onkeyup\':\'Javascript:if (!(this.t)){this.t=window.setTimeout(function(that){that.parent(\\\'.atom\\\').atom.synapse(that.value);delete(that.t);}, 1000, this);};\'*/'},{\'tag\':\'button\',\'onclick\':\'this.parent(\\\'.atom\\\').atom.synapses(this.parent(\\\'.synapse\\\').siblingElements(\\\'.synapse\\\').position, 1);\',\'child\':\'o\'}]});',
								},
							},
							{'tag'	:'hr'},
							{
								'tag'	:'div',
								'class'	:'operators',
								'child'	:
								{
									'tag'			:'button',
									'child'			:'+',
									'onclick'		:'Javascript:if(this.innerHTML==\'-\'){this.innerHTML=\'+\';this.siblingElements(\'.operator\').appendClass(\'reduce\');}else{this.innerHTML=\'-\';this.siblingElements(\'.operator\').removeClass(\'reduce\');};',
								},
							},
							{'tag'	:'hr'},
							{
								'tag'	:'div',
								'class'	:'output',
								'child'	:'**EMPTY**',
							},
							//~ {'tag'	:'hr'},
							//~ {
								//~ 'tag'	:'div',
								//~ 'class'	:'synapsesOut',
								//~ 'child'	:
								//~ {
									//~ 'tag'		:'button',
									//~ 'child'		:'Synapse waiter',
									//~ 'onclick'	:'Javascript:this.parent().addElements({\'tag\':\'span\',\'child\':[{\'tag\':\'br\'},{\'tag\':\'input\',\'placeholder\':\'Out Key\'},{\'tag\':\'button\',\'onclick\':\'this.parent(\\\'.synapsesOut\\\').removeChild(this.parent());\',\'child\':\'o\'}]});',
								//~ },
							//~ },
						],
					}).first().implement({'atom'	:this,});
				};
Atom.prototype.interface_synapses =
				function			std_Atom_interface_synapses(  )
				{
					var				node = this.node,
									synapse = node.querySelectorAll('.synapse'),
									operator = node.querySelectorAll('.operator');
					
					synapse.splice.apply(synapse, arguments).toArray().forEach(function(e){e.remove();});
					operator.splice.apply(operator, arguments).toArray().forEach(function(e){e.remove();});
				};
/*Atom.prototype.interface*/
Atom.prototype.interface_refresh =
				function			std_Atom_interface_refresh(  )
				{
					var				node = this.node,
									stand = this.stand,
									l_stand = stand.length,
									pool = this.pool,
									l_pool = pool.length,
									synapses = node.querySelectorAll('.synapse input'),
									l_synapses = synapses.length;
					
					{// synapses processes.
						var			previous = node.previousElementSibling || null,
									recept = (previous) ? previous.atom.pool : [];
						
						for (var i = 0; i < l_synapses; i++)
						{
							var		value = synapses[i].value,
									o = null;
							
							switch (value)
							{
								case (""):
								break;
								case (value.match(/\d+/)[0]):
								{
									value = ~~value;
									o = recept[value] || null;
								};
								break;
							};
							stand[i] = o;
						};
						l_stand = stand.length;
					};
					
					{// operators
						var			operators = [],
									opes = node.querySelector('.operators'),
									l_n_operators = l_synapses - node.querySelectorAll('.operator').length,
									params = functions[templates["name"][0]][0]/*.implement({'set':stand[i]})*/,
									t_templates = templates.clone();
						
						for (var i = 0; i < l_n_operators; i++)
							operators.push({'tag':'span','class':'operator'+ ((opes.querySelector('button').innerHTML == '+') ? ' reduce' : ''),'child':[{'tag':'br'}].concat(jsonParams(params, t_templates))});
						opes.addElements(operators);
						node.querySelectorAll('.operator').toArray().forEach(function(e, i)
						{
							params = paramsJson(e.childNodes);
							pool[i] = functions[params.name][1](this, i, params);
						});
						l_pool = pool.length;
					};
					
					{// output
						var			output = node.querySelector('.output');
						
						output.innerHTML = (l_pool) ? '' : '**EMPTY**';
						for (var i = 0; i < l_pool; i++)
							output.addElements([(i > 0) ? {'tag':'br'} : {}, {'tag':'#text','value':pool[i]}]);
					};
					
					//~ {// waiter
						//~ var			waiters = node.querySelectorAll('.synapsesOut input'),
									//~ l_waiters = waiters.length;
						//~ 
						//~ console.log(waiters);
					//~ };
				};
