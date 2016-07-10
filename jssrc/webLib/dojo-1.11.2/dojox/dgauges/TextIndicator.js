//>>built
define("dojox/dgauges/TextIndicator","dojo/_base/lang dojo/_base/declare dojo/_base/sniff dojo/_base/array dojo/on dojox/gfx ./IndicatorBase".split(" "),function(c,d,e,f,l,g,h){return d("dojox.dgauges.TextIndicator",h,{font:null,x:0,y:0,align:"middle",color:"black",indicator:null,labelFunc:null,constructor:function(){this.addInvalidatingProperties(["indicator"]);f.forEach("x y font align color labelFunc".split(" "),c.hitch(this,function(a){this.watch(a,this._resetText)}));this.watch("indicator",c.hitch(this,
this._indicatorChanged))},postscript:function(a){this.inherited(arguments);a&&a.indicator&&this._indicatorChanged("indicator",null,a.indicator)},_resetText:function(){this._textCreated=!1;this.invalidateRendering()},_valueWatcher:null,_indicatorChanged:function(a,b,k){this._valueWatcher&&this._valueWatcher.unwatch();this._valueWatcher=k.watch("value",c.hitch(this,this.refreshRendering))},_getFont:function(){var a=this.font;!a&&this._gauge&&(a=this._gauge.font);a||(a=g.defaultFont);return a},_textCreated:!1,
_textInstance:null,_createText:function(a,b,c,d,e,f,g){return a.createText({x:e,y:f,text:d,align:g}).setFont(b).setFill(c)},refreshRendering:function(){if(null!=this._gfxGroup){var a;a=this.indicator?this.indicator.value:this.value;this.labelFunc&&(a=this.labelFunc(a));var b=e("iphone");if(!this._textCreated||void 0!=b&&5>b)this._gfxGroup.clear(),b=this._getFont(),this._textInstance=this._createText(this._gfxGroup,b,b.color?b.color:this.color,"",this.x,this.y,this.align),this._textCreated=!0;this._textInstance.setShape({text:a});
return this._textInstance}}})});
/// TextIndicator.js.map