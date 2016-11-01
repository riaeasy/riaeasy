define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 58,
	"_riaswVersion": "0.7",
	"query": {
	},
	"region": "center",
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.CaptionPanel",
			"_riaswIdOfModule": "qPane",
			"caption": "查询条件",
			"region": "top",
			"style": {
				"height": "6em",
				"padding": "0px"
			},
			"toggleable": true,
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "q_idq",
					"label": "id",
					"labelWidth": "5em",
					"name": "idq",
					"position": {
						"col": 0,
						"row": 0
					},
					"showLabel": true,
					"style": {
						"width": "15em"
					},
					"tooltip": "角色id"
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "q_text",
					"label": "角色名",
					"labelWidth": "5em",
					"name": "text",
					"position": {
						"col": 1,
						"row": 0
					},
					"style": {
						"width": "15em"
					},
					"showLabel": true,
					"tooltip": "角色名"
				},
				{
					"iconClass": "queryIcon",
					"label": "查询",
					"style": {
					},
					"onClick": function (evt){
		var m = this._riasrModule,
			g = m.grid,
			a = m.qTable ? m.qTable.get("value") : undefined,
			q, k;
		if(g){
			q = rias.mixinDeep({}, m.query);
			if(a){
				for(k in a){
					if(a[k]){
						q[k] = a[k];
					}else{
						delete q[k];
					}
				}
			}
			g.refresh(q);
		}
	},
					"_riaswType": "rias.riasw.form.Button",
					"_riaswIdOfModule": "btnQuery"
				},
				{
					"_riaswType": "rias.riasw.form.Button",
					"_riaswIdOfModule": "btnClear",
					"iconClass": "clearIcon",
					"label": "清除",
					"style": {
					},
					"onClick": function (evt){
		var m = this._riasrModule,
			g = m.grid;
		if(g){
			if(m.qTable && m.qTable.reset){
				m.qTable.reset();
			}
			g.refresh(m.query);
		}
	}
				}
			]
		},
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "panRole",
			"caption": "查询结果",
			"gutters": true,
			"region": "center",
			"style": {
				"height": "6em",
				"padding": "0px"
			},
			"toggleable": true,
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "panGrid",
					"caption": "角色信息",
					"region": "center",
					"style": {
					},
					"toggleable": true,
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.grid.DGrid",
							"_riaswIdOfModule": "grid",
							"cellOpParams": [
								{
									"func": "cellOpOnClick",
									"name": "modify",
									"text": "修改",
									"tooltip": "修改详细信息"
								}
							],
							"loadDataOnStartup": false,
							"query": {
								"$refObj": "module.query"
							},
							"region": "center",
							"structure": [
								{
									"field": "id",
									"name": "id",
									"width": "5em"
								},
								{
									"field": "text",
									"name": "角色名",
									"width": "8em"
								},
								{
									"field": "stat",
									"name": "状态",
									"width": "4em"
								},
								{
									"field": "typ",
									"name": "类型",
									"width": "4em"
								},
								{
									"field": "dinfo",
									"name": "备注",
									"width": "20em"
								}
							],
							"style": {
								"border": "1px #b1badf solid"
							},
							"target": {
								"$refScript": "return rias.webApp.dataServerAddr + 'act/xrole/query';"
							},
							"topBtns": [
								"btnRefresh",
								"btnAux",
								"btnAdd",
								"btnDelete"
							],
							"treeColumns": [
							],
							"viewModule": "appModule/xrole/xroleBase"
						}
					]
				},
				{
					"_riaswType": "rias.riasw.layout.CaptionPanel",
					"_riaswIdOfModule": "panRights",
					"caption": "权限信息",
					"region": "right",
					"style": {
						"width": "30em"
					},
					"toggleable": true
				}
			]
		}
	]
}
	
});
