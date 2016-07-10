//>>built
define("dojox/storage/manager",["dojo/_base/config","dojo/_base/lang","dojo/_base/array"],function(e,f,d){return new function(){this.currentProvider=null;this.available=!1;this.providers=[];this._initialized=!1;this._onLoadListeners=[];this.initialize=function(){this.autodetect()};this.register=function(b,a){this.providers.push(a);this.providers[b]=a};this.setProvider=function(b){};this.autodetect=function(){if(!this._initialized){for(var b=e.forceStorageProvider||!1,a,c=0;c<this.providers.length;c++)if(a=
this.providers[c],b&&b==a.declaredClass){a.isAvailable();break}else if(!b&&a.isAvailable())break;a?(this.currentProvider=a,f.mixin(dojox.storage,this.currentProvider),dojox.storage.initialize(),this.available=this._initialized=!0):(this._initialized=!0,this.available=!1,this.currentProvider=null,console.warn("No storage provider found for this platform"),this.loaded())}};this.isAvailable=function(){return this.available};this.addOnLoad=function(b){this._onLoadListeners.push(b);this.isInitialized()&&
this._fireLoaded()};this.removeOnLoad=function(b){for(var a=0;a<this._onLoadListeners.length;a++)if(b==this._onLoadListeners[a]){this._onLoadListeners.splice(a,1);break}};this.isInitialized=function(){return null!=this.currentProvider&&"dojox.storage.FlashStorageProvider"==this.currentProvider.declaredClass&&!1==dojox.flash.ready?!1:this._initialized};this.supportsProvider=function(b){try{var a=eval("new "+b+"()").isAvailable();return!a?!1:a}catch(c){return!1}};this.getProvider=function(){return this.currentProvider};
this.loaded=function(){this._fireLoaded()};this._fireLoaded=function(){d.forEach(this._onLoadListeners,function(b){try{b()}catch(a){console.debug(a)}})};this.getResourceList=function(){var b=[];d.forEach(dojox.storage.manager.providers,function(a){b=b.concat(a.getResourceList())});return b}}});
/// manager.js.map