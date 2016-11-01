define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 326,
	"_riaswVersion": "0.7",
	"query": {
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
					"content": "操作员定义",
					"tagType": "span"
				}
			]
		},
		{
			"_riaswType": "rias.riasw.layout.FieldsetPanel",
			"_riaswIdOfModule": "main",
			"caption": "查询结果",
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
							"tooltip": "查看缴款户信息"
						},
						{
							"func": "cellOpOnClick",
							"name": "modify",
							"text": "修改",
							"tooltip": "修改缴款户信息"
						},
						{
							"func": "cellOpOnClick",
							"name": "copy",
							"text": "复制",
							"tooltip": "复制并新增"
						}
					],
					"loadDataOnStartup": false,
					"query": {
						"$refObj": "module.query"
					},
					"region": "center",
					"structure": [
						{
							"field": "text",
							"name": "姓名",
							"width": "100px"
						},
						{
							"field": "code",
							"name": "工号",
							"width": "80px"
						},
						{
							"field": "stat",
							"name": "账号状态",
							"width": "80px"
						},
						{
							"field": "typ",
							"name": "操作员类型",
							"width": "80px"
						},
						{
							"field": "dtyp",
							"name": "证件类型",
							"width": "80px"
						},
						{
							"field": "dcode",
							"name": "证件编号",
							"width": "100px"
						},
						{
							"field": "dmobile",
							"name": "手机",
							"width": "100px"
						},
						{
							"field": "dtele",
							"name": "联系电话",
							"width": "100px"
						},
						{
							"field": "demail",
							"name": "email",
							"width": "200px"
						},
						{
							"field": "dstat",
							"name": "工作状态",
							"width": "100px"
						},
						{
							"field": "dinfo",
							"name": "备注",
							"width": "280px"
						}
					],
					"style": {
						"border": "1px #b1badf solid"
					},
					"target": {
						"$refScript": "return rias.webApp.dataServerAddr + 'act/xoper/query';"
					},
					"topBtns": [
						"btnRefresh",
						"btnAux",
						"btnAdd",
						"btnDelete"
					],
					"treeColumns": [
					],
					"viewModule": "appModule/xoper/xoperBase"
				}
			]
		},
		{
			"_riaswType": "rias.riasw.layout.FieldsetPanel",
			"_riaswIdOfModule": "qPane",
			"caption": "查询条件",
			"class": "rightRegion",
			"region": "right",
			"splitter": true,
			"style": {
				"padding": "0px",
				"width": "19em"
			},
			"toggleable": true,
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.layout.ContentPanel",
					"_riaswIdOfModule": "qBar",
					"region": "top",
					"class": "toolbarRegion",
					"_riaswChildren": [
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
					"_riaswType": "rias.riasw.layout.TablePanel",
					"_riaswIdOfModule": "qTable",
					"cellStyle": {
						"border": "0px solid",
						"height": "2.2em"
					},
					"childParams": {
						"labelWidth": "6em",
						"showLabel": true
					},
					"childStyle": {
						"height": "2em",
						"width": "100%"
					},
					"class": "qTableRight",
					"cols": 1,
					"region": "center",
					"_riaswChildren": [
						{
							"_riaswType": "rias.riasw.form.TextBox",
							"_riaswIdOfModule": "q_idq",
							"label": "操作员id",
							"name": "idq",
							"position": {
								"col": 0,
								"row": 0
							},
							"tooltip": "操作员id"
						},
						{
							"_riaswType": "rias.riasw.form.TextBox",
							"_riaswIdOfModule": "q_code",
							"label": "操作员工号",
							"name": "code",
							"position": {
								"col": 0,
								"row": 1
							},
							"tooltip": "操作员工号"
						},
						{
							"_riaswType": "rias.riasw.form.TextBox",
							"_riaswIdOfModule": "q_text",
							"label": "操作员姓名",
							"name": "text",
							"position": {
								"col": 0,
								"row": 2
							},
							"tooltip": "操作员姓名"
						}
					]
				}
			]
		}
	]
}
	
});
