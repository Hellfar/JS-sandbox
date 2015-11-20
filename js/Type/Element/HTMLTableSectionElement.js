HTMLTableSectionElement.prototype.getRow =
				function			std_HTMLTableSectionElement_getRow(  )
				{
					var				row = this.getRowWeak.apply(this, arguments);

					if (!row)
					{
						var			l_rows,
									k_row = (~~arguments[0]) + 1;

						while ((l_rows = this.rows.length) < k_row)
							row = this.insertRow(l_rows);
					}

					return (row);
				};
HTMLTableSectionElement.prototype.getRowWeak =
				function			std_HTMLTableSectionElement_getRowWeak(  )
				{
					return (this.rows[arguments[0]] || null);
				};
HTMLTableSectionElement.prototype.getColumn =
				function			std_HTMLTableSectionElement_getColumn(  )
				{
					var				col = [],
									l_rows = this.rows.length;

					for (var i = 0; i < l_rows; i++)
						col.push(this.getCell(i, arguments[0]));

					return (col);
				};
HTMLTableSectionElement.prototype.getColumnWeak =
				function			std_HTMLTableSectionElement_getColumnWeak(  )
				{
					var				col = [],
									l_rows = this.rows.length;

					for (var i = 0; i < l_rows; i++)
						col.push(this.getCellWeak(i, arguments[0]));

					return (col);
				};
HTMLTableSectionElement.prototype.getCell =
				function			std_HTMLTableSectionElement_getCell(  )
				{
					var				row = this.getRow.apply(this, arguments),
									cell = row.cells[arguments[1]];

					if (!cell)
					{
						var			l_cells,
									k_cell = (~~arguments[1]) + 1;

						while ((l_cells = row.cells.length) < k_cell)
							cell = row.insertCell(l_cells);
					}

					return (cell);
				};
HTMLTableSectionElement.prototype.getCellWeak =
				function			std_HTMLTableSectionElement_getCellWeak(  )
				{
					var				row = this.getRowWeak.apply(this, arguments);

					if (!row)
						return (null);

					return (row.cells[arguments[1]] || null);
				};
HTMLTableSectionElement.prototype.getRect =
				function			std_HTMLTableSectionElement_getRect( rows, cols )
				{
					var				table = [];

					for (var i = 0; i <= rows; i++)
					{
						this.getCell(i, cols);
						table.push(this.getRow(i).cells);
					}

					return (table);
				}
HTMLTableSectionElement.prototype.setCell =
				function			std_HTMLTableSectionElement_setCell(  )
				{
					var				args = toArray(arguments),
									content,
									elem = this.getCell.apply(this, args.slice(0, -1));

					if (content = args.last())
					{
						if (content.instanceOf(String))
							elem.innerHTML = content;
						else if (content.instanceOf(Element))
							elem.appendChild(content);
					}

					return (content);
				};
HTMLTableSectionElement.prototype.collapseRows =
				function			std_HTMLTableSectionElement_collapseRows(  )
				{
					var				receiver = arguments[0],
									toCollapse = toArray(arguments, 1),
									l_toCollapse = toCollapse.length;

					for (var i = 0; i < l_toCollapse; i++)
					{
						var			childs = toCollapse[i].children,
									l_childs = childs.length;

						for (var e = 0; e < l_childs; e++)
							receiver.appendChild(childs[e]);
						toCollapse[i].parentNode.removeChild(toCollapse[i]);
					}

					receiver.rowSpan = arguments.length;

					return (receiver);
				};
HTMLTableSectionElement.prototype.collapseCols =
				function			std_HTMLTableSectionElement_collapseCols(  )
				{
					var				receiver = arguments[0],
									toCollapse = toArray(arguments, 1),
									l_toCollapse = toCollapse.length;

					for (var i = 0; i < l_toCollapse; i++)
					{
						var			childs = toCollapse[i].children,
									l_childs = childs.length;

						for (var e = 0; e < l_childs; e++)
							receiver.appendChild(childs[e]);
						toCollapse[i].parentNode.removeChild(toCollapse[i]);
					}

					receiver.colSpan = arguments.length;

					return (receiver);
				};
HTMLTableSectionElement.prototype.removeCell =
				function			std_HTMLTableSectionElement_removeCell(  )
				{
					return (this.removeChild(this.getCellWeak.apply(this, arguments)));
				};
HTMLTableSectionElement.prototype.clear =
				function			std_HTMLTableSectionElement_clear(  )
				{
					var				l_arguments = arguments.length;

					if (l_arguments == 0)
						this.empty();
					else if (l_arguments == 1)
					{
						var			row = this.getRowWeak(arguments[0]);

						if (!row)
							return (this);
						row.empty();
					}

					return (this);
				};
HTMLTableSectionElement.prototype.getElem =
				function			std_HTMLTableSectionElement_getElem(  )
				{
					var				l_arguments = arguments.length;

					if (l_arguments > 1)
						return (this.getCell.apply(this, arguments));
					else if (l_arguments > 0)
						return (this.getRow.apply(this, arguments));
					else if (l_arguments == 0)
						return (this.getElemWeak());
				};
HTMLTableSectionElement.prototype.getElemWeak =
				function			std_HTMLTableSectionElement_getElemWeak(  )
				{
					var				l_arguments = arguments.length;

					if (l_arguments > 1)
						return (this.getCellWeak.apply(this, arguments));
					else if (l_arguments > 0)
					{
						var			row = this.getRowWeak.apply(this, arguments);

						if (!row)
							return (null);

						return (row.cells);
					}
					else if (l_arguments == 0)
					{
						var			cells = [],
									rows,
									l_rows;

						rows = this.rows;
						l_rows = rows.length;
						for (var i = 0; i < l_rows; i++)
							cells[i] = rows[i].cells;

						return (cells);
					}
				};
HTMLTableSectionElement.prototype.fillWith =
				function			std_HTMLTableSectionElement_fillWith(  )
				{
					var				content = arguments[0],
									table = this.getElem(),
									l_rows = table.length,
									l_cells;

					for (var i = 0; i < l_rows; i++)
					{
						l_cells = table[i];
						for (var e = 0; i < l_cells; e++)
							if (content.instanceOf(String))
								table[i][e].innerHTML = content;
							else if (content.instanceOf(Element))
								table[i][e].appendChild(content);
					}
				};
