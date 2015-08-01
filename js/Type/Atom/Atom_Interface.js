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
										'onclick'	:'Javascript:this.parent(\'.atom\').atom.refresh();',
									},
								],
							},
							{'tag'	:'hr'},
							{
								'tag'	:'div',
								'class'	:'synapsesIn',
								'child':
								{
									'tag'		:'button',
									'child'		:'Stand',
									'onclick'	:'Javascript:this.parent().addElements({\'tag\':\'span\',\'child\':[{\'tag\':\'br\'},{\'tag\':\'input\',\'placeholder\':\'synapse Key\','+/*\'onkeyup\':\'Javascript:if (!(this.t)){this.t=window.setTimeout(function(that){that.parent(\\\'.atom\\\').atom.synapse(that.value);delete(that.t);}, 1000, this);};\'*/'},{\'tag\':\'button\',\'onclick\':\'this.parent(\\\'.synapsesIn\\\').removeChild(this.parent());\',\'child\':\'o\'}]});',
								},
							},
							{'tag'	:'hr'},
							{
								'tag'	:'div',
								'child'	:
								[
									{
										'tag'		:'button',
										'child'		:'+',
										'onclick'	:'Javascript:if(this.innerHTML==\'-\'){this.innerHTML=\'+\';this.siblingElements(\'.operator\')[0].appendClass(\'reduce\');}else{this.innerHTML=\'-\';this.siblingElements(\'.operator\')[0].removeClass(\'reduce\');};',
									},
									{
										'tag'		:'div',
										'class'		:'operator reduce',
										'child'		:'',
									},
								],
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
					})[0].implement({'atom'	:this,});
				};
Atom.prototype.refresh =
				function			std_Atom_refresh(  )
				{
					var				node = this.node,
									stand = this.stand = [],
									l_stand = 0,
									pool = this.pool = [],
									l_pool = 0;
					
					{// synapsesIn processes.
						var			synapses = node.querySelectorAll('.synapsesIn input'),
									l_synapses = synapses.length,
									previous = node.previousElementSibling || null,
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
									console.log(recept[value]);
									if (recept[value])
										o = recept[value];
								};
								break;
							};
							stand.push(o);
						};
						l_stand = stand.length;
					};
					
					{// operators
						var			operators = node.querySelector('.operator');
						
						operators.innerHTML = '';
						for (var i = 0; i < l_stand; i++)
						{
							var		params = functions[templates["name"][0]][0].implement({'set':stand[i]});
							
							operators.addElements({'tag':'span','child':[((i) ? {'tag':'br'} : {})].concat(jsonParams(params, templates))});
							
							pool.push(functions[params.name][1](params));
						};
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
