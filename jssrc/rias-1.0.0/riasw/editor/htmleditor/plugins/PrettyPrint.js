define([
	"rias",
	"../_Plugin"
], function(rias, _Plugin) {

	var pluginsName = "rias.riasw.editor.htmleditor.plugins";

	var PrettyPrint = rias.declare(pluginsName + ".PrettyPrint", _Plugin,{
		// summary:
		//		This plugin provides a mechanism by which to 'beautify HTML'
		//		generated by the editor.  It is by no means perfect.

		// indentBy: [public] Integer
		//		The indentBy property configures if the plugin should use a
		//		set number of spaces for indent (between 1-5), or just tab.
		//		The default value is -1, which means tab.
		indentBy: -1,

		// lineLength: [public] Integer
		//		The lineLength property configures if the plugin should break up long
		//		text lines into N lines of 'lineLength' length.  This parameter does not
		//		take into account indention depth, only text line length.  The default is -1
		//		which means unlimited line length.
		lineLength: -1,

		// Over-ride indicating that the command processing is done all by this plugin.
		useDefaultCommand: false,

		// map: [public] Array
		//		An array of arrays that define out entity character to encoding mappings.
		//		see the dojox.html.entities definitions for more details.  The default is
		//		HTML + cent, pound, yen, ellipsis, copyright, registered trademark.
		entityMap: null,

		// xhtml: [public] boolean
		//		Flag to denote that the PrettyPrint plugin try to generate XHTML compliant
		//		markup.
		xhtml: false,

		_initButton: function(){
			// summary:
			//		Over-ride for creation of the resize button.
			delete this.command;
		},

		setToolbar: function(toolbar){
			// summary:
			//		Over-ride to do nothing.
			//		We don't want to append a button, we take over getValue.
		},

		setEditor: function(editor){
			// summary:
			//		Over-ride to take over getValue of editor so that
			//		we can 'pretty' the output.
			this.inherited(arguments);
			var self = this;
			editor.onLoadDeferred.then(function(){
				editor._prettyprint_getValue = editor.getValue;
				editor.getValue = function(){
					var val = editor._prettyprint_getValue.apply(editor, arguments);
					return rias.html.format.prettyPrint(val, self.indentBy, self.lineLength, self.entityMap, self.xhtml);
				};

				// The following are implemented as 'performance' functions.  Don't prettyprint
				// content on internal state changes, just on calls to actually get values.
				editor._prettyprint_endEditing = editor._endEditing;
				editor._prettyprint_onBlur = editor._onBlur;
				editor._endEditing = function(ignore_caret){
					var v = editor._prettyprint_getValue(true);
					editor._undoedSteps = [];//clear undoed steps
					editor._steps.push({
						text: v,
						bookmark: editor._getBookmark()
					});
				};
				editor._onBlur = function(e){
					this.inherited("_onBlur", arguments);
					var _c = editor._prettyprint_getValue(true);
					if(_c != editor.savedContent){
						editor.onChange(_c);
						editor.savedContent = _c;
					}
				}
			});
		}
	});

// Register this plugin.
	_Plugin.registry["prettyPrint"] = _Plugin.registry["prettyprint"] = function(args){
		return new PrettyPrint(rias.mixin({
			entityMap: ("entityMap" in args) ? args.entityMap : rias.html.entities.html.concat([
				["\u00A2","cent"],["\u00A3","pound"],["\u20AC","euro"],
				["\u00A5","yen"],["\u00A9","copy"],["\u00A7","sect"],
				["\u2026","hellip"],["\u00AE","reg"]
			])
		}, args));
	};

	return PrettyPrint;

});
