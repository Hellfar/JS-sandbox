document.event =
			function		std_document_event( eventName, callback, prevent )
			{
				var			params = eventName.split(';').map(function(e){return (e.toLowerCase());});

				document.addEventListener(params[0], (function(e){document.event.control(e, callback, prevent, params);}), false);
			};
document.event.control =
			function		std_document_event_control( e, callback, prevent, params )
			{
				var		b = false;

				if (params.length > 1)
				{
					var		keys = params[1].split('+'),
							l_keys = keys.length;

					for (var i = 0; i < l_keys; i++)
					{
						b = false;
						if (document.event.control.keys[keys[i]] && document.event.control.keys[keys[i]](e))
							b = true;
						else if (keys[i].match(/^[0-9]+$/) && (parseInt(keys[i], 10) == e.keyCode || parseInt(keys[i], 16) == e.keyCode))
							b = true;
						else if (keys[i] == e.key)
							b = true;
						if (!b)
							break;
					}
				}
				else
					b = true;
				if (b)
				{
					if (prevent)
						e.preventDefault();
					callback(e);
				}
			};
document.event.control.keys =
			{
				"ctrl"		:(function(e){return(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey);}),
				"space"		:(function(e){return(e.keyCode == 32);}),
				"left"		:(function(e){return(e.keyCode == 37);}),
				"up"		:(function(e){return(e.keyCode == 38);}),
				"right"		:(function(e){return(e.keyCode == 39);}),
				"bottom"	:(function(e){return(e.keyCode == 40);}),
			};
Element.prototype.event =
			function		std_Element_event( eventName, callback, prevent )
			{
				var			params = eventName.split(';').map(function(e){return (e.toLowerCase());});
				
				this[eventName] = (function(e){document.event.control(e, callback, prevent, params);});
			};