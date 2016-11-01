define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 256,
	"_riaswVersion": "0.7",
	"caption": "formEdit",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.FieldsetPanel",
			"_riaswIdOfModule": "panel11",
			"caption": "TablePanel 展示",
			"region": "center",
			"style": {
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.layout.TablePanel",
					"_riaswIdOfModule": "table",
					"cellStyle": {
						"border": "1px solid silver"
					},
					"childParams": {
						"labelWidth": "5em",
						"showLabel": true
					},
					"region": "center",
					"childStyle": {
						"height": "2.5em",
						"width": "100%"
					},
					"colWidth": [
						"30%",
						"20%",
						"20%",
						"30%"
					],
					"cols": 4,
					"rowStyle": {
						"height": "2em"
					},
					"rows": 6,
					"style": {
						"border": "0px blue solid",
						"padding": "1em"
					},
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.form.TextBox",
							"_riaswIdOfModule": "edt1",
							"caption": "edt1",
							"editable": false,
							"label": "edt1",
							"position": {
								"col": 0,
								"colSpan": 2,
								"row": 0
							},
							"readOnly": true,
							"value": "edt1text"
						},
						{
							"_riaswType": "rias.riasw.form.ValidationTextBox",
							"_riaswIdOfModule": "edt2",
							"label": "url12",
							"labelWidth": "40px",
							"message": "错误的 url.",
							"pattern": {
								"$refScript": "return rias.regexp.url;"
							},
							"position": {
								"col": 2,
								"row": 0
							},
							"required": true,
							"value": "edt2value"
						},
						{
							"_riaswType": "rias.riasw.form.ValidationTextBox",
							"_riaswIdOfModule": "edtV0",
							"contextMenu": {
								"$refObj": "module.menu0"
							},
							"label": "ValidationTextBox",
							"position": {
								"col": 3,
								"row": 0
							},
							"readOnly": false,
							"required": true,
							"showLabel": false
						},
						{
							"_riaswType": "rias.riasw.form.CheckButton",
							"_riaswIdOfModule": "checkBox0",
							"label": "checkBox0",
							"position": {
								"col": 0,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.RadioButton",
							"_riaswIdOfModule": "rb0",
							"label": "rb0000",
							"name": "rb",
							"position": {
								"col": 0,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.RadioButton",
							"_riaswIdOfModule": "rb1",
							"disabled": true,
							"label": "rb1",
							"name": "rb",
							"position": {
								"col": 0,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.Button",
							"_riaswIdOfModule": "button0",
							"badge": "3",
							"label": "Button",
							"position": {
								"col": 1,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": ""
							},
							"onClick": function (){
		rias.xhr.open("act/riass/page", {
			module: 'appModule/demo/formEdit',
			theme: rias.theme.themeParams.name,
			mobileTheme: rias.theme.themeParams.mobileTheme
		}, true);
	}
						},
						{
							"_riaswType": "rias.riasw.form.ToggleButton",
							"_riaswIdOfModule": "toggleButton0",
							"badge": "1",
							"label": "toggleButton0",
							"position": {
								"col": 2,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": ""
							},
							"value": "toggleButton0"
						},
						{
							"_riaswType": "rias.riasw.form.DropDownButton",
							"_riaswIdOfModule": "dropDownButton0",
							"dropDown": {
								"$refScript": "return module.menu0;"
							},
							"label": "ddButton",
							"position": {
								"col": 1,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.DropDownButton",
							"_riaswIdOfModule": "dropDownButton1",
							"dropDown": {
								"dialogType": "tip",
								"moduleMeta": "appModule/app/mainMenu",
								"style": {
									"height": "480px",
									"width": "320px"
								}
							},
							"label": "ddButtonArgs",
							"position": {
								"col": 1,
								"row": 1
							},
							"style": {
								"height": "auto",
								"width": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.ComboButton",
							"_riaswIdOfModule": "cbButton0",
							"dropDown": {
								"$refScript": "return module.menu0;"
							},
							"label": "cbButton",
							"position": {
								"col": 3,
								"row": 1
							},
							"style": {
								"width": "auto"
							},
							"value": "comboButton0"
						},
						{
							"_riaswType": "rias.riasw.form.ComboBox",
							"_riaswIdOfModule": "comboBoxRest",
							"label": "Rest",
							"name": "typ",
							"pageSize": 16,
							"position": {
								"col": 0,
								"colSpan": 1,
								"row": 2,
								"rowSpan": 2
							},
							"query": {
								"parentCode": "xdictdtyp"
							},
							"queryExpr": "${0}%",
							"searchAttr": "text",
							"store": {
								"_riaswType": "rias.riasw.store.JsonXhrStore",
								"defaultData": [
									{
										"id": "",
										"text": ""
									}
								],
								"target": "act/xdict/query"
							}
						},
						{
							"_riaswType": "rias.riasw.form.ComboBox",
							"_riaswIdOfModule": "comboBoxMemory",
							"defaultData": [
								{
									"id": "0",
									"text": "0"
								},
								{
									"id": "1",
									"text": "1"
								}
							],
							"label": "Memory",
							"name": "typ",
							"pageSize": 16,
							"position": {
								"col": 0,
								"colSpan": 1,
								"row": 2,
								"rowSpan": 1
							},
							"query": {
							},
							"queryExpr": "${0}*",
							"searchAttr": "text",
							"store": {
								"_riaswType": "rias.riasw.store.MemoryStore",
								"data": [
									{
										"id": "1",
										"text": "1"
									},
									{
										"id": "11",
										"text": "11"
									},
									{
										"id": "2",
										"text": "2"
									},
									{
										"id": "21",
										"text": "21"
									}
								],
								"defaultData": [
									{
										"id": "0",
										"text": "0"
									},
									{
										"id": "1",
										"text": "1"
									}
								]
							}
						},
						{
							"_riaswType": "rias.riasw.form.ButtonBox",
							"_riaswIdOfModule": "buttonBox0",
							"dropDown": {
								"moduleMeta": "appModule/app/mainMenu",
								"dialogType": "tip",
								"style": {
									"height": "480px",
									"width": "320px"
								}
							},
							"label": "ButtonBox",
							"name": "typ",
							"position": {
								"col": 0,
								"colSpan": 1,
								"row": 2,
								"rowSpan": 1
							}
						},
						{
							"_riaswType": "rias.riasw.form.NumberTextBox",
							"_riaswIdOfModule": "numberTextBox0",
							"label": "numberTextBox",
							"labelWidth": "8em",
							"pattern": {
								"$refScript": "return rias.regexp.url;"
							},
							"position": {
								"col": 2,
								"colSpan": 2,
								"row": 2,
								"rowSpan": 2
							}
						},
						{
							"_riaswType": "rias.riasw.form.CurrencyTextBox",
							"_riaswIdOfModule": "currencyTextBox0",
							"editOptions": {
								"pattern": "#.##"
							},
							"constraints": {
								"currency": "",
								"exponent": false,
								"fractional": [
									true,
									false
								],
								"locale": "",
								"max": 9000000000000,
								"min": -9000000000000,
								"places": 3,
								"round": 0,
								"type": "currency"
							},
							"label": "currencyTextBox0",
							"labelWidth": "8em",
							"position": {
								"col": 2,
								"row": 2
							},
							"value": "currencyTextBox0"
						},
						{
							"_riaswType": "rias.riasw.form.NumberSpinner",
							"_riaswIdOfModule": "numberSpinner0",
							"label": "numberSpinner0",
							"labelWidth": "8em",
							"position": {
								"col": 2,
								"row": 2
							},
							"readOnly": false,
							"value": "numberSpinner0"
						},
						{
							"_riaswType": "rias.riasw.form.DateTextBox",
							"_riaswIdOfModule": "dateTextBox0",
							"cellStyle": {
							},
							"constraints": {
								"datePattern": "yyyy-MM-dd"
							},
							"editable": false,
							"label": "dateTextBox",
							"labelWidth": "8em",
							"position": {
								"col": 1,
								"colSpan": 1,
								"row": 2,
								"rowSpan": 1
							}
						},
						{
							"_riaswType": "rias.riasw.form.TimeTextBox",
							"_riaswIdOfModule": "timeTextBox0",
							"cellStyle": {
							},
							"constraints": {
								"timePattern": "HH:mm:ss"
							},
							"label": "timeTextBox",
							"labelWidth": "8em",
							"position": {
								"col": 1,
								"colSpan": 1,
								"row": 3,
								"rowSpan": 1
							}
						},
						{
							"_riaswType": "rias.riasw.form.TimeSpinner",
							"_riaswIdOfModule": "timeSpinner0",
							"label": "timeSpinner",
							"labelWidth": "6em",
							"position": {
								"col": 1,
								"row": 3
							},
							"readOnly": 0
						},
						{
							"_riaswType": "rias.riasw.form.FilteringSelect",
							"_riaswIdOfModule": "filteringSelect",
							"displayLabel": true,
							"label": "FilteringSelect",
							"labelAttr": "text",
							"labelWidth": "8em",
							"position": {
								"col": 0,
								"colSpan": 2,
								"row": 4,
								"rowSpan": 1
							},
							"query": {
								"parentCode": "xdictdtyp"
							},
							"queryExpr": "${0}*",
							"searchAttr": "id",
							"valueAttr": "id",
							"store": {
								"$refObj": "rias.webApp.datas.xdict"
							},
							"style": {
							}
						},
						{
							"_riaswType": "rias.riasw.form.MultiComboBox",
							"_riaswIdOfModule": "multiComboBox1",
							"label": "multiComboBox",
							"labelAttr": "text",
							"labelWidth": "8em",
							"multiple": true,
							"position": {
								"col": 0,
								"colSpan": 2,
								"row": 5,
								"rowSpan": 1
							},
							"query": {
								"parentCode": "xdictdtyp"
							},
							"queryExpr": "${0}*",
							"searchAttr": "id",
							"size": 3,
							"store": {
								"$refObj": "rias.webApp.datas.xdict"
							},
							"style": {
							}
						},
						{
							"_riaswType": "rias.riasw.form.CheckedMultiSelect",
							"_riaswIdOfModule": "checkedMultiSelect1",
							"disabled": false,
							"dropDown": false,
							"label": "multiSelect",
							"labelAttr": "text",
							"multiple": true,
							"position": {
								"col": 2,
								"colSpan": 1,
								"row": 4,
								"rowSpan": 2
							},
							"query": {
								"parentCode": "xdictdtyp"
							},
							"queryExpr": "${0}*",
							"readOnly": false,
							"searchAttr": "id",
							"size": 3,
							"store": {
								"$refObj": "rias.webApp.datas.xdict"
							},
							"style": {
								"height": "auto"
							}
						},
						{
							"_riaswType": "rias.riasw.form.TextArea",
							"_riaswIdOfModule": "textArea0",
							"label": "TextArea0",
							"position": {
								"col": 3,
								"colSpan": 1,
								"row": 4,
								"rowSpan": 2
							},
							"readOnly": false,
							"style": {
								"height": "8em"
							},
							"value": "TextArea0\nfds\nwewq\n健康了\n进风口\n\n健康服务\njfkls"
						}
					]
				},
				{
					"_riaswType": "rias.riasw.html.ContainerTag",
					"_riaswIdOfModule": "menus",
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.widget.Menu",
							"_riaswIdOfModule": "menu1",
							"style": {
							},
							"_riaswChildren": [
								{
									"_riaswType": "rias.riasw.widget.RadioMenuItem",
									"_riaswIdOfModule": "radioMenuItem0",
									"label": "radioMenuItem0",
									"group": "group1",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.RadioMenuItem",
									"_riaswIdOfModule": "radioMenuItem1",
									"label": "radioMenuItem1",
									"group": "group1",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.MenuSeparator",
									"_riaswIdOfModule": "menuSeparator3",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.RadioMenuItem",
									"_riaswIdOfModule": "radioMenuItem2",
									"label": "radioMenuItem2",
									"group": "group2",
									"style": {
									}
								}
							]
						},
						{
							"_riaswType": "rias.riasw.widget.Menu",
							"_riaswIdOfModule": "menu0",
							"style": {
							},
							"targetNodeIds": [
								{
									"$refObj": "edt1"
								},
								{
									"$refObj": "edt2"
								}
							],
							"_riaswChildren": [
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem0",
									"label": "menuItem0",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.MenuSeparator",
									"_riaswIdOfModule": "menuSeparator0",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.CheckedMenuItem",
									"_riaswIdOfModule": "checkedMenuItem0",
									"label": "checkedMenuItem0",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.CheckedMenuItem",
									"_riaswIdOfModule": "checkedMenuItem1",
									"label": "checkedMenuItem1",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.MenuSeparator",
									"_riaswIdOfModule": "menuSeparator1",
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.PopupMenuItem",
									"_riaswIdOfModule": "popupMenuItem0",
									"label": "popupMenuItem0",
									"popup": {
										"$refScript": "return module.menu1;"
									},
									"style": {
									}
								},
								{
									"_riaswType": "rias.riasw.widget.MenuSeparator",
									"_riaswIdOfModule": "menuSeparator2"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem1"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem2"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem3"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem4"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem5"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem6"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem7"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem8"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem9"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem10"
								},
								{
									"_riaswType": "rias.riasw.widget.MenuItem",
									"_riaswIdOfModule": "menuItem11"
								}
							]
						}
					]
				}
			]
		}
	]
}
	
});
