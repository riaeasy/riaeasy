define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 229,
	"_riaswVersion": "0.7",
	"query": {
		"parentId": "1"
	},
	"caption": "系统字典",
	"iconClass": "menuIcon",
	"region": "center",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "main",
			"design": "headline",
			"gutters": true,
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
					"opColumnWidth": "9em",
					"query": {
						"$refObj": "module.query"
					},
					"region": "center",
					"loadDataOnStartup": false,
					"structure": [
						{
							"field": "id",
							"name": "id",
							"width": "12em"
						},
						{
							"field": "text",
							"name": "条目名称",
							"width": "12em"
						},
						{
							"field": "idp",
							"name": "上级id",
							"width": "10em"
						},
						{
							"field": "code",
							"name": "条目编码",
							"width": "10em"
						},
						{
							"field": "typ",
							"formatter": function (cellData, data){
				return rias.webApp.datas.getXdictTextByCodepDval("xdicttyp", cellData);
			},
							"name": "条目类型",
							"width": "8em"
						},
						{
							"field": "dtyp",
							"name": "值类型",
							"width": "6em"
						},
						{
							"field": "dval",
							"name": "值",
							"width": "10em"
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
						"border": "1px #b1badf solid",
						"height": "100%",
						"weith": "100%"
					},
					"target": "act/xdict/query",
					"topBtns": [
						"btnAdd",
						"btnDelete",
						"btnEdit"
					],
					"treeColumns": [
						"id"
					],
					"viewModule": "appModule/xdict/xdictForm"
				}
			]
		}
	]
}
	
});
