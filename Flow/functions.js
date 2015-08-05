functions =
				{
					'setcpy'		:[{'name':'setcpy','set':null}, (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'setacpy'		:[{'name':'setacpy','set':null,'separator':',|;| '}, (function(c, i, p)
					{
						alert('setacpy!!!');

						return (p.set.split(new RegExp(p.separator)));
					})],
					'cpy'			:[{'name':'cpy','set':null}, (function(c, i, p)
					{
						return (Object.clone(c.pool[~~(p.set)]));
					})],
					'acpy'			:[{'name':'acpy','set':null}, (function(c, i, p)
					{
						return (c.slice.apply(c, p.set.split(/-|,|;| /)));
					})],
					'settextcpy'	:[{'name':'settextcpy','text':null}, (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'settimecpy'	:[{'name':'settimecpy','set':{'type':'time'}}, (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'addtime'	:[{'name':'addtime','set':{'type':'time'},'time':'01:00'}, (function(c, i, p)
					{
						return (~~(p.set) + ~~(p.time));
					})],
				};