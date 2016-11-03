define(["rias"],function(b){var f={_riaswVersion:"0.7",caption:b.i18n.riasd.fileSelector,tooltip:b.i18n.riasd.fileSelector+"\x3cbr/\x3eIE11\u53ca\u4ee5\u4e0b\u7248\u672c\u53ea\u80fd\u4f7f\u7528\u90e8\u5206\u529f\u80fd",iconClass:"outlineIcon",rootId:"appModule",onlyDir:!1,actions:{get:"act/riasd/getAppModule",newDir:"act/riasd/newAppModuleDir",newFile:"act/riasd/newAppModule",dele:"act/riasd/deleAppModule",upload:"act/riasd/uploadFile",download:"act/riasd/downloadFile"},persist:!1,minSize:{h:360,w:240},beforeBind:function(){var a=b.queryRiasdParams(this,"_riaswIdOfModule","tree");0<a.length&&this.rootId&&(a[0].model.rootId=this.rootId,a[0].model.rootLabel="appModule"===this.rootId?"\u9875\u9762\u6a21\u5757(app\u76ee\u5f55\u4e3a\u6846\u67b6\u6a21\u5757\uff0c\u4fee\u6539\u65f6\u52a1\u5fc5\u8c28\u614e\uff01)":"serverAct"===this.rootId?"\u670d\u52a1\u5668Act":"\u672a\u77e5\u7c7b\u578b",a[0].model.query={onlyDir:this.onlyDir},a[0].model.store.target=this.actions.get)},afterBind:function(a){this.btnNewDir.set("visible",!!this.actions.newDir);this.btnNewFile.set("visible",!!this.actions.newFile);this.btnDelete.set("visible",!!this.actions.dele);this.btnDownload.set("visible",!!this.actions.download);this.btnUpload.set("visible",!!this.actions.upload);this.btnUpload.set("url",b.toUrl(this.actions.upload))},_setBtnState:function(a){this.isLoaded&&!this.isDestroyed(!0)&&(a=a||this.tree.selectedItem,this.btnOk.set("disabled",!a||"file"!==a.itemType||!a.pathname.endWith(".js")),this.btnNewDir.set("disabled",!a||"file"===a.itemType),this.btnNewFile.set("disabled",!a||"dir"!==a.itemType),this.btnDelete.set("disabled",!a||!!a.root),this.btnDownload.set("disabled",!a||"file"!==a.itemType),this.btnUpload.set("disabled",!a||"file"===a.itemType))},onShow:function(){this.resize({h:b.toInt(.8*this._riasrParent.domNode.clientHeight,480)});this.refresh()},onHide:function(){this.tree&&this.tree.clear()},refresh:function(){this._setBtnState();return this.isLoaded&&this.tree.reload(this._treePath)},onSubmit:function(){var a=this.get("moduleResult");if(a){if("file"!==a.itemType||this.tree.model.mayHaveChildren(a)||!a.pathname.endWith(".js"))return!1;this._treePath=this.tree.get("path")}else return b.warn("\u8bf7\u9009\u62e9\u4e00\u4e2a\u6761\u76ee.",this.btnOk),!1},_newDir:function(){var a=this,c=a.tree.selectedItem,d,e;!c||"dir"!==c.itemType&&c!=a.tree.model.root?b.message({dialogType:"tip",popupParent:a,around:a.btnNewDir,content:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u76ee\u5f55..."}):(d=c==a.tree.model.root?c.id:c.pathname,b.input({popupParent:a,around:a.btnNewDir,caption:b.i18n.action.newDir,value:"",onSubmit:function(){return b.xhr.post(a.actions.newDir,{pathname:d+"/"+this.get("value"),dir:1},function(c){if(!c.success||1>c.success)return b.warn({parent:a,content:b.i18n.action.newDir+"\u5931\u8d25...",caption:a.caption}),!1;a.tree.reload().then(function(c){b.isArray(c)&&(e=a.tree.getNodesByItem(c.pop())[0],a.tree.expandNode(e))});return!0})}}))},_newFile:function(){var a=this,c=a.tree.selectedItem,d,e;!c||"dir"!==c.itemType&&c!=a.tree.model.root?b.message({dialogType:"tip",popupParent:a,around:a.btnNewFile,content:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u76ee\u5f55..."}):(d=c==a.tree.model.root?c.id:c.pathname,b.input({popupParent:a,around:a.btnNewFile,caption:b.i18n.action.newFile,value:"",onSubmit:function(){return b.xhr.post(a.actions.newFile,{pathname:d+"/"+this.get("value"),dir:0},function(c){if(!c.success||1>c.success)return b.warn({parent:a,content:b.i18n.action.newFile+"\u5931\u8d25...",caption:a.caption}),!1;a.tree.reload().then(function(c){b.isArray(c)&&(e=a.tree.getNodesByItem(c.pop())[0],a.tree.expandNode(e))});return!0})}}))},_dele:function(){var a=this,c=a.tree.selectedItem,d,e;c?(d=c==a.tree.model.root?c.id:c.pathname,b.choose({popupParent:a,around:a.btnDelete,content:"\u662f\u5426\u5220\u9664["+d+"]?",caption:b.i18n.action.dele,onSubmit:function(){b.xhr.post(a.actions.dele,{pathname:d,dir:"dir"===c.itemType?1:0},function(c){if(!c.success||1>c.success)return b.warn({parent:a,content:b.i18n.action.dele+"\u5931\u8d25...",caption:a.caption}),!1;(e=a.tree.path?a.tree.path:[]).pop();a.tree.reload().then(function(){a.tree.set("path",e).then(function(c){b.isArray(c)&&(e=a.tree.getNodesByItem(c.pop())[0],a.tree.expandNode(e))})});return!0});return 1}})):b.message({dialogType:"tip",popupParent:a,around:a.btnDelete,content:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u8282\u70b9..."})},_download:function(){var a=this.tree.selectedItem;a&&(a=a==this.tree.model.root?a.id:a.pathname,b.xhr.open(this.actions.download,{pathname:a},!0,""))},_upload:function(){},_riaswChildren:[{_riaswType:"rias.riasw.layout.Panel",_riaswIdOfModule:"main",region:"center",caption:"\u8d44\u6e90\u7ba1\u7406\u5668",design:"sidebar",persist:!1,style:{padding:"0px"},_riaswChildren:[{_riaswType:"rias.riasw.widget.Toolbar",_riaswIdOfModule:"btns",region:"top",style:{"border-bottom":"1px solid lightgray",padding:"2px"},_riaswChildren:[{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnRefresh",label:b.i18n.action.refresh,tooltip:b.i18n.action.refresh,iconClass:"refreshIcon",onClick:function(a){this._riasrModule.refresh()}},{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnOk",label:{$refScript:"return module.btnOkLabel || rias.i18n.action.ok;"},tooltip:b.i18n.action.ok,iconClass:"okIcon",disabled:!1,onClick:function(a){this._riasrModule.submit()}},{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnNewDir",label:b.i18n.action.newDir,tooltip:b.i18n.action.newDir,iconClass:"newDirIcon",onClick:function(a){this._riasrModule._newDir()}},{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnNewFile",label:b.i18n.action.newFile,tooltip:b.i18n.action.newFile,iconClass:"newFileIcon",onClick:function(a){this._riasrModule._newFile()}},{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnDelete",label:b.i18n.action.dele,tooltip:b.i18n.action.dele,iconClass:"deleIcon",onClick:function(a){this._riasrModule._dele()}},{_riaswType:"rias.riasw.widget.ToolbarLineBreak",_riaswIdOfModule:"btnSplitter"},{_riaswType:"rias.riasw.form.Button",_riaswIdOfModule:"btnDownload",label:b.i18n.action.download,tooltip:b.i18n.action.download,iconClass:"downloadIcon",onClick:function(a){this._riasrModule._download()}},{_riaswType:"rias.riasw.form.Uploader",_riaswIdOfModule:"btnUpload",label:b.i18n.action.upload,tooltip:b.i18n.action.upload,iconClass:"uploadIcon",disabled:!1,accept:".js",onChange:function(a){var c=this._riasrModule,b=c.tree.selectedItem;b&&(c=b==c.tree.model.root?b.id:b.pathname,a[0].pathname=c,this.upload(a[0]),this.reset())}}]},{_riaswType:"rias.riasw.widget.Tree",_riaswIdOfModule:"tree",region:"center",persist:!1,noDnd:!0,model:{_riaswType:"rias.riasw.widget.TreeModel",rootId:"appModule",rootLabel:"\u9875\u9762\u6a21\u5757",store:{_riaswType:"rias.riasw.store.JsonXhrStore",idProperty:"pathname",labelProperty:"name"}},style:{padding:"0px"},onClick:function(a,b,d){b=this._riasrModule;b.set("moduleResult",a);b._setBtnState()},onDblClick:function(a,b,d){var c=this._riasrModule;a&&"file"===a.itemType&&!c.tree.model.mayHaveChildren(a)&&c.defer(function(){c.submit()})}}]}]};b.setObject("rias.riasd.module.fileSelector",f);return f});