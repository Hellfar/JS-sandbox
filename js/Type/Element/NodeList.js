NodeList.prototype.slice =
				function			std_NodeList_slice(  )
				{
					var				arr = toArray(this),
									ret = arr.slice.apply(arr, arguments);

					return (toNodeList(ret));
				};
NodeList.prototype.splice =
				function			std_NodeList_splice(  )
				{
					{
						var			arr = toArray(this),
									l_arr = arr.length,
									last = arr.slice((arguments[0] || 0) + (arguments[1] || 0))[0] || null,
									ret = arr.splice.apply(arr, arguments),
									l_ret = ret.length,
									fragDoc = document.createDocumentFragment(),
									args = toArray(arguments, 2),
									l_args = args.length;

						if (last)
							for (var i = 0; i < l_args; i++)
								last = last.parentNode.insertBefore(args[i], last);
						for (var i = 0; i < l_ret; i++)
							fragDoc.appendChild(ret[i]);

						return (fragDoc.childNodes);
					};

					{// This ain't work since NodeLists are static.
						/*var			arr = toArray(this),
									ret = arr.splice.apply(arr, arguments),
									itself = toNodeList(arr),
									l_itself = itself.length,
									l_thisLength = this.length,
									i = 0;

						for (; i < l_itself; i++)
							this[i] = itself[i];
						for (; i < l_thisLength; i++)
							delete (this[i]);

						return (toNodeList(ret));*/
					};
				};
NodeList.prototype.toArray =
				function			std_NodeList_toArray(  )
				{
					return (toArray(this));
				}
NodeList.prototype.first =
				function			std_NodeList_first(  )
				{
					return (toArray(this, 0, 1)[0] || null);
				};
NodeList.prototype.last =
				function			std_NodeList_last(  )
				{
					return (toArray(this, -1)[0] || null);
				};
NodeList.prototype.indexOf =
				function			std_NodeList_indexOf( soughtNode )
				{
					var					index = Array.prototype.indexOf.call(this, soughtNode);

					return (index);
				};
NodeList.prototype.forEach =
				function			std_NodeList_forEach(  )
				{
					Array.prototype.forEach.apply(this, arguments);

					return (this);
				};
NodeList.prototype.appendClass =
				function			std_NodeList_appendClass( name )
				{
					this.forEach(function(e){e.appendClass(name);});
				};
NodeList.prototype.removeClass =
				function			std_NodeList_removeClass( name )
				{
					this.forEach(function(e){e.removeClass(name);});
				};
