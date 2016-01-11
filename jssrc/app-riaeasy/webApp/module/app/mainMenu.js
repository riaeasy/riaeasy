define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 27,
	"_riaswType": "rias.riasw.studio.Module",
	"_riaswVersion": "0.7",
	"style": {
		"min-height": "360px",
		"min-width": "200px",
		"width": "240px"
	},
	"buildMenu": function (items){
			var children = [],
				m = this;
			function getItem(item){
				var c = getChildren(item);
				return {
					id: item.id,
					code: item.code,
					text: item.text,
					leaf: item.leaf,
					isExpanded: item.expanded,
					moduleMeta: item.dcmd ? item.dcmd : "",
					disabled: !c.length && rias.trim(item.dcmd) === "",
					children: c
				};
			}
			function getChildren(item){
				var r = [];
				rias.forEach(rias.filter(items, function(i){
					return i.idp == item.id && i.typ == 1;
				}), function(i){
					r.push(getItem(i));
				});
				return r;
			}
			children.push({
				_riaswType: "rias.riasw.widget.Tree",
				_riaswIdOfModule: "MenuTree1",
				"class": "riaswTreeMenu",
				region: "center",
				persist: false,
				showRoot: false,
				isSource: false,
				accept: [],
				//style: {
				//	padding: "1px",
				//	width: "100%",
				//	height: "100%"
				//},
				model: {
					_riaswType: "rias.riasw.widget.TreeModel",
					rootId: "1",
					rootLabel: "菜单",
					store: {
						_riaswType: "rias.riasw.store.MemoryStore",
						idAttribute: "id",
						labelAttribute: "text",
						data: getChildren({
							id: "1",
							idp: "0",
							typ: 1,
							code: "root",
							text: "菜单",
							leaf: false,
							isExpanded: true,
							moduleMeta: "",
							disabled: false,
							children: true
						})
					}
				},
				onClick: function(item, node, evt){
					m.treeOnClick(item, node, evt);
				}
			});
			rias.filer(children, m.menuPane, m).then(function(result){
				rias.forEach(result.widgets, function(pane){
					m.resize();
				});
			});
		},
	"afterFiler": function (result){
		var m = this,
			q;
		if(this.menuStore.fetch){
			this.menuStore.fetch({
				query: {
				},
				onBegin: function(size){
				},
				onComplete: function(items){
					m.buildMenu(items);
					m.resize();
				},
				onError: function(error){
					console.error(error);
				}
			});
		}else{
			q = this.menuStore.query({});
			//rias.when(q.total, onBegin);
			rias.when(q, function(items){
				m.buildMenu(items);
				//m.needLayout = true;
				m.resize();
			}, function(error){
				console.error(error);
			});
		}
	},
	"callOpen": function (item){},
	"treeOnClick": function (item, node, evt){
			var m = this;
			if(node.tree.model.mayHaveChildren(item)){
				if(node.isExpanded){
					node.tree._collapseNode(node);
				}else{
					node.tree._expandNode(node);
				}
			}else{
				if (rias.isFunction(m.callOpen)){
					m.callOpen(item);
				}
			}
		},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.layout.Panel",
			"_riaswIdOfModule": "menuPane",
			"region": "center",
			"style": {
			},
			"_riaswChildren": [
				{
					"_riaswType": "rias.riasw.store.JsonRestStore",
					"_riaswIdOfModule": "menuStore",
					"target": "act/appMain/getMenu"
				}
			]
		}
	]
}
	
});
