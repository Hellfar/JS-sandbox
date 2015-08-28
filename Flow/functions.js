functions =
				{
					'setcpy'		:[{'name':'setcpy','set':null}, 'set', (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'setacpy'		:[{'name':'setacpy','set':null,'separator':',|;| '}, 'set', (function(c, i, p)
					{
						return (p.set.split(new RegExp(p.separator)));
					})],
					'cpy'			:[{'name':'cpy','set':null}, 'set', (function(c, i, p)
					{
						return (Object.clone(c.pool[~~(p.set)]));
					})],
					'acpy'			:[{'name':'acpy','set':null}, 'set', (function(c, i, p)
					{
						return (c.slice.apply(c, p.set.split(/-|,|;| /)));
					})],
					'settextcpy'	:[{'name':'settextcpy','text':null}, 'text', (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'settimecpy'	:[{'name':'settimecpy','set':{'type':'time'}}, 'set', (function(c, i, p)
					{
						return (Object.clone(p.set));
					})],
					'addtime'		:[{'name':'addtime','set':{'type':'time'},'time':'01:00'}, 'set', (function(c, i, p)
					{
						return (~~(p.set) + ~~(p.time));
					})],
					'choice'		:[{'name':'choice','un':{'type':'checkbox','name':'check[]'},'deux':{'type':'checkbox','name':'check[]'}}, 'set', (function(c, i, p)
					{
						return (p.check);
					})],
				};