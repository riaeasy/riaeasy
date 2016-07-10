//>>built
define("dojox/mvc/WidgetList","require dojo/_base/array dojo/_base/lang dojo/_base/declare dijit/_Container dijit/_WidgetBase ./Templated".split(" "),function(l,h,c,q,d,u,v){function m(b){return eval("({"+b+"})")}function r(b){for(var c=null;c=(b._handles||[]).pop();)c.unwatch()}function w(c){var e=[];h.forEach(c,function(c){[].push.apply(e,c)});return e}function s(b,e){if(this.childClz)e(this.childClz);else if(this.childType){var f=!c.isFunction(this.childType)&&!c.isFunction(this.childMixins)?[[this.childType].concat(this.childMixins&&
this.childMixins.split(",")||[])]:h.map(b,function(a){var b=c.isFunction(this.childType)?this.childType.call(a,this):this.childType;a=c.isFunction(this.childMixins)?this.childMixins.call(a,this):this.childMixins;return b?[b].concat(c.isArray(a)?a:a?a.split(","):[]):["dojox/mvc/Templated"]},this);l(h.filter(h.map(w(f),function(a){return c.getObject(a)?t:a}),function(a){return a!==t}),function(){e.apply(this,h.map(f,function(a){a=h.map(a,function(a){return c.getObject(a)||l(a)});return 1<a.length?q(a,
{}):a[0]}))})}else e(v)}var k="data-mvc-child-props",n="data-mvc-child-bindings",t;d=q("dojox.mvc.WidgetList",[u,d],{childClz:null,childType:"",childMixins:"",childParams:null,childBindings:null,children:null,partialRebuild:!1,_relTargetProp:"children",postMixInProperties:function(){this.inherited(arguments);this["data-mvc-child-type"]&&(this.childType=this["data-mvc-child-type"]);this["data-mvc-child-mixins"]&&(this.childMixins=this["data-mvc-child-mixins"])},startup:function(){this.inherited(arguments);
this._setChildrenAttr(this.children)},_setChildrenAttr:function(b){var e=this.children;this._set("children",b);if(this._started&&(!this._builtOnce||e!=b))if(this._builtOnce=!0,this._buildChildren(b),c.isArray(b)){var f=this;b.watch!=={}.watch&&(this._handles=this._handles||[]).push(b.watch(function(a,c,b){isNaN(a)||(a=f.getChildren()[a-0])&&a.set(a._relTargetProp||"target",b)}))}},_buildChildren:function(b){function e(a){if(!(this._beingDestroyed||this._buildChildrenSeq>l)){var b=[].slice.call(arguments,
1);a.clz=c.isFunction(this.childType)||c.isFunction(this.childMixins)?b:b[0];for(var g=null;g=p.shift();){if(!g.clz){p.unshift(g);break}for(var b=0,d=(g.removals||[]).length;b<d;++b)this.removeChild(g.idx);h.forEach(h.map(g.adds,function(a,b){var d={ownerDocument:this.ownerDocument,parent:this,indexAtStartup:g.idx+b},e=c.isArray(g.clz)?g.clz[b]:g.clz;d[(c.isFunction(this.childParams)&&this.childParams.call(d,this)||this.childParams||this[k]&&m.call(d,this[k])||{})._relTargetProp||e.prototype._relTargetProp||
"target"]=a;var f=this.childParams||this[k]&&m.call(d,this[k]),h=this.childBindings||this[n]&&m.call(d,this[n]);this.templateString&&(!d.templateString&&!e.prototype.templateString)&&(d.templateString=this.templateString);h&&(!d.bindings&&!e.prototype.bindings)&&(d.bindings=h);return new e(c.delegate(c.isFunction(f)?f.call(d,this):f,d))},this),function(a,b){this.addChild(a,g.idx+b)},this)}}}r(this);for(var f=this.getChildren(),a=null;a=f.pop();)this.removeChild(a),a.destroy();if(c.isArray(b)){var d=
this,l=this._buildChildrenSeq=(this._buildChildrenSeq||0)+1,f={idx:0,removals:[],adds:[].concat(b)},p=[f];c.isFunction(b.watchElements)&&(this._handles=this._handles||[]).push(b.watchElements(function(a,f,g){!f||!g||!d.partialRebuild?d._buildChildren(b):(a={idx:a,removals:f,adds:g},p.push(a),s.call(d,g,c.hitch(d,e,a)))}));s.call(this,b,c.hitch(this,e,f))}},destroy:function(){r(this);this.inherited(arguments)}});d.prototype["data-mvc-child-type"]=d.prototype["data-mvc-child-mixins"]=d.prototype[k]=
d.prototype[n]="";return d});
/// WidgetList.js.map