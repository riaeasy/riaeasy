define([
	"rias",
	"rias/riasw/form/ValidationTextBox",
	"rias/riasw/widget/_HasDropDown"
], function(rias, ValidationTextBox, _HasDropDown){

	var riaswType = "rias.riasw.form.ButtonBox";
	var Widget = rias.declare(riaswType, [ValidationTextBox, _HasDropDown], {

		hasDownArrow: true,

		templateString:
			'<span class="dijit dijitReset dijitInline dijitLeft" id="widget_${id}" role="combobox" aria-haspopup="true" data-dojo-attach-point="_popupStateNode,_aroundNode">'+
				'<span class="riaswTextBoxLabel" data-dojo-attach-point="labelNode" tabIndex="-1" readonly="readonly" role="presentation"></span>'+
				'<span class="dijitInputField riaswTextBoxContainer" data-dojo-attach-point="containerNode">'+
					'<input class="riaswInputInner" type="text" autocomplete="off" data-dojo-attach-point="textbox,focusNode" role="textbox" ${!nameAttrSetting}/>'+
					'<span class="riaswValidationContainer" data-dojo-attach-point="validationNode">'+
						'<input class="dijitInputField riaswValidationIcon riaswValidationInner" value="&#935; " type="text" tabIndex="-1" readonly="readonly" role="presentation"/>'+
					'</span>'+
				'</span>'+
				'<span class="riaswArrowButton riaswDownArrowButton riaswArrowButtonContainer" data-dojo-attach-point="_buttonNode,_arrowWrapperNode" role="presentation">'+
					'<input class="dijitInputField riaswArrowButtonInner" type="text" tabIndex="-1" readonly="readonly" role="button presentation" aria-hidden="true" ${_buttonInputDisabled}/>'+
				'</span>'+
			'</span>',

		baseClass: "riaswTextBox riaswComboBox",

		//canEdit: true,

		cssStateNodes: {
			"_buttonNode": "riaswArrowButton"
		},

		_setHasDownArrowAttr: function(/*Boolean*/ val){
			this._set("hasDownArrow", val);
			this._buttonNode.style.display = val ? "" : "none";
		},

		/*postMixInProperties: function(){
			this.inherited(arguments);
			if(!this.dropDownPosition){
				this.dropDownPosition = ["below", "above"];
			}
		},*/

		openDropDown: function(){
			var self = this;

			var retVal = this.inherited(arguments);

			var dd = this._dropDown;
			if(dd && rias.isFunction(dd.afterSubmit)){
				dd.own(rias.before(dd, "afterSubmit", function(){
					self.set("value", dd.get("moduleResult"));
				}));
			}

			return retVal;
		}

	});

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswButtonBoxIcon",
		iconClass16: "riaswButtonBoxIcon16",
		defaultParams: function(params){
			params = rias.mixinDeep({}, {
				type: "text",
				//labelType: "html",
				//label: "ButtonBox",
				invalidMessage: rias.i18n.message.invalid,
				//constraints: {locale: ""},
				//regExp: ".*",
				//pageSize: null,
				//query: {},
				//queryExpr: "${0}*",
				//autoComplete: true,
				//searchDelay: 200,
				//searchAttr: "name",
				//ignoreCase: true,
				dropDown: {
					caption: "请选择",
					//"moduleMeta": "",
					//"selectMode": "leaf",
					"style": {
					}
				},
				hasDownArrow: true,
				highlightMatch: "first"
			}, params);
			return params;
		},
		initialSize: {},
		resizable: "width",
		//allowedChild: "",
		"property": {
			"type": {
				"datatype": "string",
				"option": [
					{
						"value": "text"
					},
					{
						"value": "password"
					}
				],
				"defaultValue": "text",
				"title": "Type"
			},
			"name": {
				"datatype": "string",
				"title": "Name"
			},
			"alt": {
				"datatype": "string",
				"hidden": true
			},
			"value": {
				"datatype": "string",
				"title": "Value"
			},
			"tabIndex": {
				"datatype": "string",
				"defaultValue": "0",
				"title": "Tab Index"
			},
			"disabled": {
				"datatype": "boolean",
				"title": "Disabled"
			},
			"readOnly": {
				"datatype": "boolean",
				"title": "Read Only"
			},
			"intermediateChanges": {
				"datatype": "boolean",
				"title": "Intermediate Changes"
			},
			"trim": {
				"datatype": "boolean",
				"hidden": true
			},
			"uppercase": {
				"datatype": "boolean",
				"hidden": true
			},
			"lowercase": {
				"datatype": "boolean",
				"hidden": true
			},
			"propercase": {
				"datatype": "boolean",
				"hidden": true
			},
			"maxLength": {
				"datatype": "string",
				"title": "Max Length"
			},
			"required": {
				"datatype": "boolean",
				"title": "Required",
				"hidden": true
			},
			"promptMessage": {
				"datatype": "string",
				"title": "Prompt Message",
				"hidden": true
			},
			"invalidMessage": {
				"datatype": "string",
				"defaultValue": "The value entered is not valid.",
				"title": "Invalid Message",
				"hidden": true
			},
			"constraints": {
				"datatype": "json",
				"defaultValue": "\"{\\\"locale\\\":\\\"\\\"}\"",
				"title": "Constraints",
				"hidden": true
			},
			"regExp": {
				"datatype": "string",
				"defaultValue": ".*",
				"title": "Regular Expression",
				"hidden": true
			},
			"pageSize": {
				"datatype": "number",
				"defaultValue": null,
				"title": "Page Size"
			},
			"store": {
				"datatype": "object",
				"hidden": true
			},
			"query": {
				"datatype": "json",
				"defaultValue": "\"{}\"",
				"hidden": true
			},
			"autoComplete": {
				"datatype": "boolean",
				"defaultValue": true,
				"title": "Auto Complete"
			},
			"searchDelay": {
				"datatype": "number",
				"defaultValue": 100,
				"title": "Search Delay",
				"description": "Search delay (ms)"
			},
			"searchAttr": {
				"datatype": "string",
				"defaultValue": "name",
				"title": "Search Attribute"
			},
			"queryExpr": {
				"datatype": "string",
				"defaultValue": "${0}*",
				"title": "Query Expression"
			},
			"ignoreCase": {
				"datatype": "boolean",
				"defaultValue": true,
				"title": "Ignore Case"
			},
			"hasDownArrow": {
				"datatype": "boolean",
				"defaultValue": true,
				"title": "Show Down Arrow"
			},
			"state": {
				"datatype": "string",
				"description": "Shows current state (ie, validation result) of input (Normal, Warning, or Error)",
				"hidden": true
			},
			"scrollOnFocus": {
				"datatype": "boolean",
				"description": "On focus, should this widget scroll into view?",
				"hidden": false,
				"defaultValue": true
			},
			"item": {
				"datatype": "object",
				"description": "This is the item returned by the dojo.data.store implementation that\nprovides the data for this cobobox, it's the currently selected item.",
				"hidden": true
			},
			"fetchProperties": {
				"datatype": "json",
				"description": "Mixin to the dojo.data store's fetch.\nFor example, to set the sort order of the ComboBox menu, pass:\n\t{ sort: {attribute:\"name\",descending: true} }\nTo override the default queryOptions so that deep=false, do:\n\t{ queryOptions: {ignoreCase: true, deep: false} }",
				"hidden": true
			},
			"highlightMatch": {
				"datatype": "string",
				"defaultValue": "first",
				"option": [
					{
						"value": "first"
					},
					{
						"value": "all"
					},
					{
						"value": "none"
					}
				],
				"description": "One of: \"first\", \"all\" or \"none\".\n\nIf the ComboBox/FilteringSelect opens with the search results and the searched\nstring can be found, it will be highlighted.  If set to \"all\"\nthen will probably want to change queryExpr parameter to '*${0}*'\n\nHighlighting is only performed when labelType is \"text\", so as to not\ninterfere with any HTML markup an HTML label might contain.",
				"hidden": false
			},
			"labelAttr": {
				"datatype": "string",
				"description": "The entries in the drop down list come from this attribute in the\ndojo.data items.\nIf not specified, the searchAttr attribute is used instead.",
				"hidden": false
			},
			"labelType": {
				"datatype": "string",
				"option": [
					{
						"value": "text"
					},
					{
						"value": "html"
					}
				],
				"description": "Specifies how to interpret the labelAttr in the data store items.\nCan be \"html\" or \"text\".",
				"defaultValue": "text",
				"title": "Label Type"
			}
		}
	};

	return Widget;
});
