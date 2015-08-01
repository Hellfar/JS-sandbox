Element.prototype.appendClass =
				function			std_Element_appendClass( name )
				{
					var				currentClassValue = this.className;
					
					if (currentClassValue.indexOf(name) == -1)
						if ((currentClassValue == null) || (currentClassValue === ""))
							this.className = name;
						else
							this.className += " " + name;

					return (this.className);
				};
Element.prototype.removeClass =
				function removeClass( name )
				{
					var currentClassValue = this.className;
				
					if (currentClassValue == name)
					{
						this.className = "";

						return;
					}
				
					this.className = currentClassValue.split(" ").filter(function (e){return (e.trim() && e != name);}).join(" ");

					return (this.className);
				};
Element.prototype.siblings =
				function			std_Element_siblings(  )
				{
					var				that = this,
									childs = Array.prototype.slice.call(this.parentNode.childNodes),
									selectors = Array.prototype.slice.call(arguments),
									position = -1,
									found = false;
					
					selectors.forEach(function(e,i,a){a[i]=Array.prototype.slice.call(document.querySelectorAll(e))});
					childs = childs.filter(function(e,i){if (!found)position++;if (e != that && (selectors.length == 0 || selectors.some(function(ed){return (ed.indexOf(e) != -1);}))){return (true);} else if (!found && e == that)found = true; return (false);}).implement({'position':position})
					
					return (childs);
				};
Element.prototype.siblingElements =
				function			std_Element_siblingElements(  )
				{
					var				that = this,
									childs = Array.prototype.slice.call(this.parentNode.childNodes),
									selectors = Array.prototype.slice.call(arguments),
									position = -1,
									found = false;
					
					selectors.forEach(function(e,i,a){a[i]=Array.prototype.slice.call(document.querySelectorAll(e))});
					childs = childs.filter(function(e){return(e.nodeName != "#text");}).filter(function(e,i){if (!found)position++;if (e != that && (selectors.length == 0 || selectors.some(function(ed){return (ed.indexOf(e) != -1);}))){return (true);} else if (!found && e == that)found = true; return (false);}).implement({'position':position});
					
					return (childs);
				};
Element.prototype.parent =
				function			std_Element_parent(  )
				{
					var				p = this.parentNode,
									selectors = Array.prototype.slice.call(arguments);
					
					selectors.forEach(function(e,i,a){a[i]=Array.prototype.slice.call(document.querySelectorAll(e))});
					if (selectors.length)
						for (; p !=  null; p = p.parentNode)
							if (selectors.some(function(e){return(e.indexOf(p) != -1);}))
								break;
					
					return (p);
				};
Element.prototype.addElements =
				function			std_Element_addElements( elems )
				{
					var				ns = this.namespaceURI,
									a_o = [];
					
					switch (typeof (elems))
					{
						case ("string"):
						{
							var		o = document.createTextNode(elems);
							
							this.appendChild(o);
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
										o = document.createElementNS(ns, elem.tag);
										delete (elem.tag);
										if (typeof (elem.child) != "undefined")
											o.addElements(elem.child);
										delete (elem.child);
										for (attr in elem)
											if (elem.hasOwnProperty(attr) && elem[attr])
												o.setAttributeNS(null, attr, elem[attr]);
									}
									this.appendChild(o);
									a_o.push(o);
								}
							}
						};
						break;
					}
					return (a_o);
				};
