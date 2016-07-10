//>>built
define("dojox/grid/_SelectionPreserver",["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(e,a,d,f){return e("dojox.grid._SelectionPreserver",null,{constructor:function(b){this.selection=b;var c=this.grid=b.grid;this.reset();this._connects=[a.connect(c,"_setStore",this,"reset"),a.connect(c,"_addItem",this,"_reSelectById"),a.connect(b,"onSelected",d.hitch(this,"_selectById",!0)),a.connect(b,"onDeselected",d.hitch(this,"_selectById",!1)),a.connect(b,"deselectAll",
this,"reset")]},destroy:function(){this.reset();f.forEach(this._connects,a.disconnect);delete this._connects},reset:function(){this._selectedById={}},_reSelectById:function(b,c){b&&this.grid._hasIdentity&&(this.selection.selected[c]=this._selectedById[this.grid.store.getIdentity(b)])},_selectById:function(b,c){if("none"!=this.selection.mode&&this.grid._hasIdentity){var a=c,d=this.grid;if("number"==typeof c||"string"==typeof c)a=(a=d._by_idx[c])&&a.item;a&&(this._selectedById[d.store.getIdentity(a)]=
!!b);return a}}})});
/// _SelectionPreserver.js.map