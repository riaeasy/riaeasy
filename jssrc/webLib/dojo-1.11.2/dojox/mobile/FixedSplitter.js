//>>built
define("dojox/mobile/FixedSplitter","dojo/_base/array dojo/_base/declare dojo/_base/window dojo/dom-class dojo/dom-geometry dijit/_Contained dijit/_Container dijit/_WidgetBase dojo/has ./common".split(" "),function(k,s,l,g,d,t,u,v,w){return s("dojox.mobile.FixedSplitter",[v,u,t],{orientation:"H",variablePane:-1,screenSizeAware:!1,screenSizeAwareClass:"dojox/mobile/ScreenSizeAware",baseClass:"mblFixedSplitter",startup:function(){if(!this._started){g.add(this.domNode,this.baseClass+this.orientation);
var c=this.getParent(),a;if(!c||!c.resize){var d=this;a=function(){d.defer(function(){d.resize()})}}this.screenSizeAware?require([this.screenSizeAwareClass],function(c){c.getInstance();a&&a()}):a&&a();this.inherited(arguments)}},resize:function(){var c=d.getPadExtents(this.domNode).t,a="H"===this.orientation?"w":"h",g="H"===this.orientation?"l":"t",p={},q={},b,r,h=[],e=0,m=0,f=k.filter(this.domNode.childNodes,function(a){return 1==a.nodeType}),n=-1==this.variablePane?f.length-1:this.variablePane;
for(b=0;b<f.length;b++)b!=n&&(h[b]=d.getMarginBox(f[b])[a],m+=h[b]);"V"==this.orientation&&"BODY"==this.domNode.parentNode.tagName&&1==k.filter(l.body().childNodes,function(a){return 1==a.nodeType}).length&&(r=l.global.innerHeight||l.doc.documentElement.clientHeight);b=(r||d.getMarginBox(this.domNode)[a])-m;"V"===this.orientation&&(b-=c);q[a]=h[n]=b;a=f[n];d.setMarginBox(a,q);a.style["H"===this.orientation?"height":"width"]="";"V"===this.orientation&&(e=e?e+c:c);for(b=0;b<f.length;b++)a=f[b],p[g]=
e,d.setMarginBox(a,p),"H"===this.orientation?a.style.top=c+"px":a.style.left="",e+=h[b];k.forEach(this.getChildren(),function(a){a.resize&&a.resize()})},_setOrientationAttr:function(c){var a=this.baseClass;g.replace(this.domNode,a+c,a+this.orientation);this.orientation=c;this._started&&this.resize()}})});
/// FixedSplitter.js.map