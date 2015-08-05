				function			toNodeList( arrayBasedElementsList )
				{
					{// manage everything, but is a bit hard code.
						var			fragDoc = document.createDocumentFragment(),
									l_arrayBasedElementsList = arrayBasedElementsList.length,
									anchors = [],
									parent = fragDoc.appendChild(document.createElement('div')),
									elems = null;
						
						for (var i = 0; i < l_arrayBasedElementsList; i++)
						{
							var			elem = arrayBasedElementsList[i];
							
							anchors.push((elem.parentNode) ? elem.parentNode.insertBefore(document.createElement('a'), elem) : null);
							parent.appendChild(elem);
						};
						elems = parent.querySelectorAll('div > *');
						for (var i = 0; i < l_arrayBasedElementsList; i++)
							if (anchors[i])
							{
								anchors[i].parentNode.insertBefore(arrayBasedElementsList[i], anchors[i]);
								anchors[i].parentNode.removeChild(anchors[i]);
							}

						return (elems);
					};
					
					{// can't reassignate NodeList item
						/*var			fragDoc = document.createDocumentFragment(),
									l_arrayBasedElementsList = arrayBasedElementsList.length,
									nodeList = null;

						for (var i = 0; i < l_arrayBasedElementsList; i++)
							fragDoc.appendChild(document.createElement('a'));
						nodeList = fragDoc.querySelectorAll('a');
						for (var i = 0; i < l_arrayBasedElementsList; i++)
							nodeList[i] = arrayBasedElementsList[i];
						
						return (nodeList || document.createDocumentFragment().childNodes);*/
					};

					{// can't manage the unappended elements
						/*var			l_arrayBasedElementsList = arrayBasedElementsList.length,
									uniq = uniqid('q'),
									elems = null;
						
						for (var i = 0; i < l_arrayBasedElementsList; i++)
							arrayBasedElementsList[i].appendClass(uniq);
						if (i)
							elems = document.querySelectorAll('.'+ uniq);
						for (var i = 0; i < l_arrayBasedElementsList; i++)
							arrayBasedElementsList[i].removeClass(uniq);
	
						return (elems || document.createDocumentFragment().childNodes);*/
					};
				}