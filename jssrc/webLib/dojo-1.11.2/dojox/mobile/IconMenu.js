//>>built
define("dojox/mobile/IconMenu","dojo/_base/declare dojo/sniff dojo/dom-class dojo/dom-construct dojo/dom-style dojo/dom-attr dijit/_Contained dijit/_Container dijit/_WidgetBase require ./IconMenuItem".split(" "),function(g,p,b,d,q,r,s,t,u,v){return g("dojox.mobile.IconMenu",[u,t,s],{transition:"slide",iconBase:"",iconPos:"",cols:3,tag:"ul",selectOne:!1,baseClass:"mblIconMenu",childItemClass:"mblIconMenuItem",_createTerminator:!1,buildRendering:function(){this.domNode=this.containerNode=this.srcNodeRef||
d.create(this.tag);r.set(this.domNode,"role","menu");this.inherited(arguments);if(this._createTerminator){var a=this._terminator=d.create("br");a.className=this.childItemClass+"Terminator";this.domNode.appendChild(a)}},startup:function(){this._started||(this.refresh(),this.inherited(arguments))},refresh:function(){var a=this.getParent();a&&b.remove(a.domNode,"mblSimpleDialogDecoration");a=this.getChildren();if(this.cols){var f=Math.ceil(a.length/this.cols),d=Math.floor(100/this.cols),k=100-d*this.cols,
l=Math.floor(100/f),m=100-l*f;p("ie")&&(k--,m--)}for(var c=0;c<a.length;c++){var e=a[c];if(this.cols){var g=0===c%this.cols,n=0===(c+1)%this.cols,h=Math.floor(c/this.cols);q.set(e.domNode,{width:d+(n?k:0)+"%",height:l+(h+1===f?m:0)+"%"});b.toggle(e.domNode,this.childItemClass+"FirstColumn",g);b.toggle(e.domNode,this.childItemClass+"LastColumn",n);b.toggle(e.domNode,this.childItemClass+"FirstRow",0===h);b.toggle(e.domNode,this.childItemClass+"LastRow",h+1===f)}}},addChild:function(a,b){this.inherited(arguments);
this.refresh()},hide:function(){var a=this.getParent();a&&a.hide&&a.hide()}})});
/// IconMenu.js.map