define([
	"rias"
], function(rias){

	// module:
	//		rias/riasw/form/_RadioButtonMixin

	return rias.declare("rias.riasw.form._RadioButtonMixin", null, {
		// summary:
		//		Mixin to provide widget functionality for an HTML radio button

		// type: [private] String
		//		type attribute on `<input>` node.
		//		Users should not change this value.
		type: "radio",

		_getRelatedWidgets: function(){
			// Private function needed to help iterate over all radio buttons in a group.
			var ary = [];
			rias.dom.query("input[type=radio]", this.focusNode.form || this.ownerDocument).forEach(// can't use name= since query doesn't support [] in the name
				rias.hitch(this, function(inputNode){
					if(inputNode.name == this.name && inputNode.form == this.focusNode.form){
						var widget = rias.by(inputNode);
						if(widget){
							ary.push(widget);
						}
					}
				})
			);
			return ary;
		},

		_setCheckedAttr: function(/*Boolean*/ value){
			// If I am being checked then have to deselect currently checked radio button
			this.inherited(arguments);
			if(!this._created){
				return;
			}
			if(value){
				rias.forEach(this._getRelatedWidgets(), rias.hitch(this, function(widget){
					if(widget != this && widget.checked){
						widget.set('checked', false);
					}
				}));
			}
		},

		_getSubmitValue: function(/*String*/ value){
			return value == null ? "on" : value;
		},

		_onClick: function(/*Event*/ e){
			if(this.checked || this.disabled){ // nothing to do
				e.stopPropagation();
				e.preventDefault();
				return false;
			}

			if(this.readOnly){ // ignored by some browsers so we have to resync the DOM elements with widget values
				e.stopPropagation();
				e.preventDefault();
				rias.forEach(this._getRelatedWidgets(), rias.hitch(this, function(widget){
					rias.dom.setAttr(this.focusNode || this.domNode, 'checked', widget.checked);
				}));
				return false;
			}

			// RadioButton has some unique logic since it must enforce only a single button being checked at once
			// For this reason the "_onClick" method does not call this.inherited

			var canceled = false;
			var previouslyCheckedButton;

			rias.some(this._getRelatedWidgets(), function(radioButton){
				if(radioButton.checked){
					previouslyCheckedButton = radioButton;
					return true;
				}
				return false;
			});

			// We want to set the post-click values correctly for any event handlers, but since
			// the event handlers could revert them, we don't want to fully update the widget state
			// yet and trigger notifications
			this.checked = true;
			previouslyCheckedButton && (previouslyCheckedButton.checked = false);

			// Call event handlers
			// If event handler prevents it, the clicked radio button will not be checked
			if(this.onClick(e) === false || e.defaultPrevented){
				canceled = true;
			}

			// Reset internal state to how it was before the click
			this.checked = false;
			previouslyCheckedButton && (previouslyCheckedButton.checked = true);

			if(canceled){
				e.preventDefault();
			}else{
				this.set('checked', true);
			}

			return !canceled;
		}

	});
});
