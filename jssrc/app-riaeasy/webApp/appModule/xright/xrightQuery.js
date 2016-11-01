define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 51,
	"_riaswVersion": "0.7",
	"query": {
		"parentId": "1"
	},
	"region": "center",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "panTitle",
			"class": "infoRegion topRegion",
			"region": "top",
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.html.Tag",
					"_riaswIdOfModule": "tagInfo",
					"class": "infoText",
					"content": "权限定义",
					"tagType": "span"
				}
			]
		},
		{
			"_riaswType": "rias.riasw.layout.FieldsetPanel",
			"_riaswIdOfModule": "main",
			"caption": "明细",
			"class": "clientRegion",
			"region": "center",
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.grid.DGrid",
					"_riaswIdOfModule": "grid",
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
					"columnLockCount": 2,
					"loadDataOnStartup": true,
					"opColumnWidth": "9em",
					"query": {
						"$refObj": "module.query"
					},
					"region": "center",
					"structure": [
						{
							"field": "id",
							"fixed": true,
							"name": "id",
							"width": "160px"
						},
						{
							"field": "text",
							"name": "名称",
							"width": "160px"
						},
						{
							"field": "idp",
							"name": "上级id",
							"width": "120px"
						},
						{
							"field": "code",
							"name": "编码",
							"width": "100px"
						},
						{
							"field": "typ",
							"name": "类型",
							"width": "48px"
						},
						{
							"field": "ord",
							"name": "顺序号",
							"width": "48px"
						},
						{
							"field": "dicon",
							"name": "图标",
							"width": "60px"
						},
						{
							"field": "dcmd",
							"name": "模块名/命令",
							"width": "280px"
						},
						{
							"field": "childcount",
							"name": "子项数",
							"width": "48px"
						}
					],
					"style": {
						"padding": "0px"
					},
					"target": {
						"$refScript": "return rias.webApp.dataServerAddr + 'act/xright/query';"
					},
					"topBtns": [
						"btnRefresh",
						"btnAux",
						"btnAdd",
						"btnDelete"
					],
					"treeColumns": [
						"id"
					],
					"viewModule": "appModule/xright/xrightBase"
				}
			]
		}
	]
}
	
});
