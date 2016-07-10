//>>built
define("dojox/mdnd/LazyManager","dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/dom-attr dojo/dnd/common dojo/dnd/Manager ./PureSource dojo/_base/unload".split(" "),function(c,e,f,g,h,k,l,m,n){return e("dojox.mdnd.LazyManager",null,{constructor:function(){this._registry={};this._fakeSource=new n(h.create("div"),{copyOnly:!1});this._fakeSource.startup();c.addOnUnload(f.hitch(this,"destroy"));this.manager=m.manager()},getItem:function(b){var a=b.getAttribute("dndType");
return{data:b.getAttribute("dndData")||b.innerHTML,type:a?a.split(/\s*,\s*/):["text"]}},startDrag:function(b,a){if(a=a||b.target){var d=this.manager,c=this.getItem(a);""==a.id&&k.set(a,"id",l.getUniqueId());g.add(a,"dojoDndItem");this._fakeSource.setItem(a.id,c);d.startDrag(this._fakeSource,[a],!1);d.onMouseMove(b)}},cancelDrag:function(){var b=this.manager;b.target=null;b.onMouseUp()},destroy:function(){this._fakeSource.destroy()}})});
/// LazyManager.js.map