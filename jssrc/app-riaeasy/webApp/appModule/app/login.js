define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 263,
	"caption": "登录",
	"op": "login",
	"operExpires": 7,
	"requires": [
		"rias/riasw/layout/TablePanel",
		"rias/riasw/layout/ContentPanel",
		"rias/riasw/form/Button",
		"rias/riasw/form/TextBox",
		"rias/riasw/form/CheckButton"
	],
	"style": {
		"color": "navy",
		"font-size": "14px",
		"height": "19em",
		"maring": "0.25em",
		"padding": "0.25em",
		"width": "22em"
	},
	"themeCss": [
		"app/login.css"
	],
	"widgetCss": "appLogin",
	"actions": function (){
		return {
			"login": rias.webApp.dataServerAddr + "act/login",
			"logout": rias.webApp.dataServerAddr + "act/logout"
		};
	},
	"afterLoaded": function (){
		var m = this,
			oper = rias.cookie("operCode");
		m.ckSaveCode.set("checked", !!oper);
		m.edtId.set("value", oper);
	},
	"onShow": function (){
		var m = this;
		if(m.edtId.get("value")){
			m.edtPass.focus();
			m.edtPass.select();
		}else{
			m.edtId.focus();
			m.edtId.select();
		}
	},
	"onCancel": function (){
		var m = this;
		m.edtPass.set("value", "");
	},
	"onSubmit": function (){
		var m = this,
			data = m.inputs.get("value"),
			s = m.ckSaveCode.get("checked") ? 1 : 0;
		m.edtPass.set("value", "");
		if(s){
			rias.cookie("operCode", data.code, {expires: m.operExpires});
		}else{
			rias.cookie("operCode", null, {expires: -1});
		}
		return rias.webApp.login({
			data: data
		}).always(function(){
			m.set("moduleResult", rias.webApp.oper.logged);
			if(!rias.webApp.oper.logged){
				rias.warn({
					dialogType: "modal",
					around: m.btnLogin,
					content: "未能登录，请重新登录."
				});
			}
			return !!rias.webApp.oper.logged;
		});
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.ContentPanel",
			"_riaswIdOfModule": "mTitle",
			"content": "<font color='darkblue'><b>请输入登录名和密码（可以用 developer 登录，无密码）：</b></font>",
			"region": "top",
			"style": {
				"padding": "4px"
			}
		},
		{
			"_riaswType": "rias.riasw.layout.TablePanel",
			"_riaswIdOfModule": "inputs",
			"cellStyle": {
				"border": "0px solid",
				"height": "2.5em"
			},
			"childParams": {
				"labelWidth": "5em",
				"showLabel": true
			},
			"childStyle": {
				"height": "2em",
				"padding": "0px",
				"width": "100%"
			},
			"colWidths": [
				"5%",
				"45%",
				"45%",
				"5%"
			],
			"cols": 4,
			"region": "center",
			"splitter": false,
			"style": {
				"padding": "1em 1em 0.5em 1em"
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edtId",
					"label": "登录名",
					"name": "code",
					"position": {
						"col": 1,
						"row": 0,
						"colSpan": 2
					},
					"tooltip": "用户登录名",
					"onKeyDown": function (evt){
		var m = this._riasrModule;
		if(evt.keyCode == rias.keys.ENTER){
			m.edtPass.focus();
			m.edtPass.select();
		}
	}
				},
				{
					"_riaswType": "rias.riasw.form.CheckButton",
					"_riaswIdOfModule": "ckSaveCode",
					"checked": true,
					"label": "保存登录名",
					"name": "saveCode",
					"position": {
						"col": 1,
						"colSpan": 2,
						"row": 1
					},
					"style": {
						"margin-left": "5.5em",
						"width": "auto"
					},
					"tooltip": "保存用户登录名"
				},
				{
					"_riaswType": "rias.riasw.form.TextBox",
					"_riaswIdOfModule": "edtPass",
					"label": "密码",
					"name": "password",
					"position": {
						"col": 1,
						"colSpan": 2,
						"row": 2
					},
					"tooltip": "密码",
					"type": "password",
					"onKeyDown": function (evt){
		var m = this._riasrModule;
		if(evt.keyCode == rias.keys.ENTER){
			m.btnLogin.focus();
		}
	}
				},
				{
					"_riaswType": "rias.riasw.form.Button",
					"_riaswIdOfModule": "btnLogin",
					"attachStyle": {
						"labelNode": {
							"height": "3em",
							"line-height": "3em",
							"width": "100%"
						}
					},
					"disabled": false,
					"label": "登  录",
					"position": {
						"col": 1,
						"colSpan": 2,
						"row": 4
					},
					"style": {
						"height": "3em"
					},
					"tooltip": "提交登录信息...",
					"widgetCss": "highlightBtn",
					"onClick": function (evt){
		this._riasrModule.submit();
	}
				}
			]
		}
	]
}
	
});
