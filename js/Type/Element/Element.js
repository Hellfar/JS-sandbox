Element.prototype.getStyle =
				function			std_Element_getStyle( param )
				{
					if (typeof(param) != "undefined" && this.style[param])
						return (this.style[param]);
					else
						return (window.getComputedStyle(this, null).getPropertyValue(param));
				};
Element.prototype.identify =
				function			std_Element_identify( suffix, prefix )
				{
					if (suffix == undefined)
						suffix = "";
					if (prefix == undefined)
						prefix = "";
					if (this.id == "")
						this.id = prefix + ~~this.static_componentID++ + suffix;

					return (this.id);
				};
Element.prototype.identify.static_componentID = "0";
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
				function 			std_Element_removeClass( name )
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
					childs = childs.filter(function(e)
					{
						return (selectors.length == 0 || selectors.some(function(ed)
							{
								return (ed.indexOf(e) != -1);
							}));
					}).filter(function(e)
					{
						if (!found)
						{
							position++;

							return (!(found = (e == that)));
						}

						return (true);
					});

					return (toNodeList(childs).implement({'position':position}));
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
					childs = childs.filter(function(e)
					{
						return(e.nodeName != "#text");
					}).filter(function(e)
					{
						return (selectors.length == 0 || selectors.some(function(ed)
							{
								return (ed.indexOf(e) != -1);
							}));
					}).filter(function(e)
					{
						if (!found)
						{
							position++;

							return (!(found = (e == that)));
						}

						return (true);
					});

					return (toNodeList(childs).implement({'position':position}));
				};
Element.prototype.getChild =
				function			std_Element_getChild( key )
				{
					if (!isNaN(parseFloat(key)) && isFinite(key))
						return (this.childNodes[key] || null);
					else if (key == undefined)
						return (this.childNodes);

					return (null);
				};
Element.prototype.getChildElement =
				function			std_Element_getChildElement( key )
				{
					if (!isNaN(parseFloat(key)) && isFinite(key))
						return (this.children[key] || null);
					else if (key == undefined)
						return (this.children);

					return (null);
				};
Element.prototype.insertNode =
				function			std_Element_insertNode( key, node )
				{
					this.insertBefore(node, this.getChild(key));

					return (this);
				};
Element.prototype.parentNodes =
				function			std_Element_parentNodes(  )
				{
					var				a_parentNodes = [];

					for (currentElem = this.parentNode; currentElem != null; currentElem = currentElem.parentNode)
						a_parentNodes.push(currentElem);

					return (toNodeList(a_parentNodes));
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
Element.prototype.isChildOf =
				function			std_Element_isChildOf( suspect )
				{
					return (this.parentNodes().indexOf(suspect) > -1);
				};
Element.prototype.insertAfter =
				function			std_Element_insertAfter( n_elem, aftElem )
				{
					var				b_last = aftElem.nextSibling;

					if (!(b_last))
						return (this.appendChild(n_elem));

					return (this.insertBefore(n_elem, b_last));
				};
Element.prototype.setAttributeWeak =
				function			std_Element_weakSetAttribute( key, value )
				{
					if (this.getAttributeNS(this.namespace, key) == null)
						this.setAttributeNS(this.namespace, key, value);

					return (this.getAttributeNS(this.namespace, key));
				};
Element.prototype.setAttributesNS =
				function			std_Element_setAttributesNS( ns, o_attributesSet )
				{
					for (var attr in o_attributesSet)
						if (o_attributesSet.hasOwnProperty(attr))
							this.setAttributeNS(ns, attr, o_attributesSet[attr]);
				};
Element.prototype.setAttributesNSWeak =
				function			std_Element_setAttributesNSWeak( ns, o_attributesSet )
				{
					for (var attr in o_attributesSet)
						if (o_attributesSet.hasOwnProperty(attr))
							this.setAttributeWeak(ns, attr, o_attributesSet[attr]);
				};
Element.prototype.appendChilds =
				function			std_Element_appendChilds( childs )
				{
					if (childs instanceof Array || childs instanceof NodeList)
					{
						var				l_childs = childs.length;

						for (var i = 0; i < l_childs; i++)
							this.appendChild(childs[i]);
					}
					else
						this.appendChild(childs);

					return (this);
				};
Element.prototype.remove =
				function			std_Element_remove(  )
				{
					return (this.parentNode.removeChild(this));
				};
Element.prototype.empty =
				function			std_Element_empty(  )
				{
					this.innerHTML = "";

					return (this);
				};
Element.prototype.getJSONForm =
				function			std_Element_getJSONForm(  )
				{
					var				json = {"tag":this.nodeName.toLowerCase()},
									thisAttrs = this.attributes,
									l_thisAttrs = thisAttrs.length,
									childs = this.children,
									l_childs = childs.length,
									thisChilds = [];

					for (var i = 0; i < l_thisAttrs; i++)
					{
						var			attr = thisAttrs[i];

						json[attr.nodeName] = attr.nodeValue;
					}
					if (l_childs)
					{
						for (var i = 0; i < l_childs; i++)
							thisChilds.push(childs[i].getJSONForm());
						json["child"] = thisChilds;
					}
					if (this.value)
						json["value"] = this.value;

					return (json);
				}
