HTMLTableElement.prototype.createTBody =
				function			std_HTMLTableElement_createTBody(  )
				{
					return (this.tBodies[arguments[0] || 0] || this.appendChild(document.createElement('tbody')));
				};
HTMLTableElement.prototype.deleteTBody =
				function			std_HTMLTableElement_deleteTBody(  )
				{
					this.removeChild(this.createTBody.apply(this, arguments));

					return (this);
				};
