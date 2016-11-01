define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 182,
	"_riaswVersion": "0.8",
	"badge": "3",
	"caption": "新的页面模块",
	"style": {
	},
	"title": "新的页面模块",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "panel1",
			"layoutPriority": 0,
			"region": "center",
			"style": {
				"height": "80em",
				"margin": "auto",
				"width": "60em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.layout.FieldsetPanel",
					"_riaswIdOfModule": "top",
					"caption": "Top(自动展开)",
					"class": "topRegion",
					"initDisplayBox": {
						"h": 120
					},
					"initDisplayState": "collapsed",
					"layoutPriority": 0,
					"liveSplitters": true,
					"maxable": true,
					"region": "top",
					"splitter": true,
					"style": {
						"height": "8em"
					},
					"toggleOnEnter": true,
					"toggleOnBlur": true,
					"toggleOnLeave": true,
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "tag1",
							"layoutPriority": 0,
							"region": "",
							"tagType": "label",
							"innerHTML": "内容",
							"splitter": false
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "bottom",
					"caption": "Bottom",
					"layoutPriority": 0,
					"liveSplitters": true,
					"region": "bottom",
					"splitter": "toggle",
					"style": {
						"height": "6em"
					},
					"toggleable": false,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "tag2",
							"layoutPriority": 0,
							"region": "",
							"tagType": "label",
							"innerHTML": "内容",
							"splitter": false
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.FieldsetPanel",
					"_riaswIdOfModule": "left",
					"caption": "LeftSide 左对齐 test",
					"closable": true,
					"initDisplayState": "collapsed",
					"layoutPriority": 0,
					"liveSplitters": true,
					"badge": "5",
					"maxable": true,
					"region": "left",
					"splitter": "toggle",
					"style": {
						"width": "19em"
					},
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "tag3",
							"layoutPriority": 0,
							"region": "",
							"tagType": "label",
							"innerHTML": "内容",
							"splitter": false
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "right",
					"caption": "Right右对齐",
					"layoutPriority": 0,
					"liveSplitters": true,
					"region": "right",
					"splitter": "toggle",
					"style": {
						"width": "11em"
					},
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.layout.AccordionPanel",
							"_riaswIdOfModule": "accordionPanel1",
							"layoutPriority": 0,
							"region": "center",
							"splitter": false,
							"_riaswChildren": [
								{
									"_riaswType": "rias.riasw.layout.Panel",
									"_riaswIdOfModule": "Accordion1",
									"layoutPriority": 0,
									"region": "",
									"splitter": false,
									"caption": "Accordion1"
								},
								{
									"_riaswType": "rias.riasw.layout.Panel",
									"_riaswIdOfModule": "Accordion2",
									"caption": "Accordion2",
									"layoutPriority": 0,
									"region": "",
									"splitter": false
								}
							]
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.FieldsetPanel",
					"_riaswIdOfModule": "center",
					"caption": "Center",
					"layoutPriority": 0,
					"liveSplitters": true,
					"region": "center",
					"splitter": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.grid.DGrid",
							"_riaswIdOfModule": "dGridTree",
							"cellOpParams": [
								{
									"func": "cellOpOnClick",
									"name": "view",
									"text": "查看",
									"tooltip": "查看详细信息"
								},
								{
									"func": "cellOpOnClick",
									"name": "modify",
									"text": "修改",
									"tooltip": "修改详细信息"
								},
								{
									"func": "cellOpOnClick",
									"name": "copy",
									"text": "复制",
									"tooltip": "复制并新增"
								}
							],
							"loadDataOnStartup": true,
							"query": {
								"parentId": "1"
							},
							"region": "center",
							"structure": [
								{
									"field": "id",
									"fixed": true,
									"name": "id",
									"width": "10em"
								},
								{
									"field": "text",
									"name": "条目名称",
									"width": "12em"
								},
								{
									"field": "idp",
									"name": "上级id",
									"width": "8em"
								},
								{
									"field": "code",
									"name": "条目编码",
									"width": "8em"
								},
								{
									"field": "typ",
									"name": "条目类型",
									"width": "6em"
								},
								{
									"field": "dtyp",
									"name": "值类型",
									"width": "6em"
								},
								{
									"field": "dval",
									"name": "值",
									"width": "12em"
								},
								{
									"field": "ord",
									"name": "顺序号",
									"width": "5em"
								},
								{
									"field": "children",
									"name": "子项数",
									"width": "5em"
								}
							],
							"style": {
								"border-width": "0px"
							},
							"target": {
								"$refScript": "return rias.webApp.dataServerAddr + 'act/xdict/query';"
							},
							"topBtns": [
								"btnAux",
								"btnRefresh",
								"btnEdit",
								"btnAdd",
								"btnDelete",
								"btnPrint",
								"btnExport"
							],
							"treeColumns": [
								"id"
							],
							"viewModule": "appModule/xdict/xdictBase"
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.DialogPanel",
					"_riaswIdOfModule": "floatPanel",
					"caption": "float(自动展开、右停靠)",
					"restrictBox": {
						"right": "2em"
					},
					"initDisplayState": "collapsed",
					"initPlaceToArgs": {
						"around": {
							"x": 120,
							"y": 200
						},
						"positions": "after"
					},
					"layoutPriority": 0,
					"selectOnShow": false,
					"liveSplitters": true,
					"maxable": true,
					"region": "",
					"splitter": true,
					"style": {
						"height": "8em",
						"left": "10em",
						"top": "8em",
						"width": "20em"
					},
					"toggleOnEnter": true,
					"toggleOnBlur": true,
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.html.Tag",
							"_riaswIdOfModule": "tag4",
							"layoutPriority": 0,
							"region": "",
							"tagType": "label",
							"innerHTML": "内容",
							"splitter": false
						}
					]
				}
			]
		}
	]
}
	
});
