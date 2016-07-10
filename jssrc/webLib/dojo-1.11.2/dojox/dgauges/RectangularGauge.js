//>>built
define("dojox/dgauges/RectangularGauge",["dojo/_base/declare","./GaugeBase","dojox/gfx/matrix"],function(k,l,h){return k("dojox.dgauges.RectangularGauge",l,{orientation:"horizontal",_middleParts:null,_leadingParts:null,_trailingParts:null,_baseParts:null,_classParts:null,_layoutInfos:{},constructor:function(){this.orientation="horizontal";this._middleParts=[];this._leadingParts=[];this._trailingParts=[];this._baseParts=[];this._classParts=[];this._layoutInfos={leading:{x:0,y:0,w:0,h:0},middle:{x:0,
y:0,w:0,h:0},trailing:{x:0,y:0,w:0,h:0}};this.addInvalidatingProperties(["orientation"])},addElement:function(a,b,c){this.inherited(arguments);var d=this._elements[this._elements.length-1];"middle"==c?this._middleParts.push(d):"leading"==c?this._leadingParts.push(d):"trailing"==c?this._trailingParts.push(d):d._isGFX?this._baseParts.push(d):this._classParts.push(d)},removeElement:function(a){var b=this.getElement(a);b&&(this._middleParts&&0<=this._middleParts.indexOf(b)?this._middleParts.splice(this._middleParts.indexOf(b),
1):this._leadingParts&&0<=this._leadingParts.indexOf(b)?this._leadingParts.splice(this._leadingParts.indexOf(b),1):this._trailingParts&&0<=this._trailingParts.indexOf(b)?this._trailingParts.splice(this._trailingParts.indexOf(b),1):this._baseParts&&0<=this._baseParts.indexOf(b)?this._baseParts.splice(this._baseParts.indexOf(b),1):this._classParts&&0<=this._classParts.indexOf(b)&&this._classParts.splice(this._classParts.indexOf(b),1));this.inherited(arguments)},_computeArrayBoundingBox:function(a){if(0==
a.length)return{x:0,y:0,w:0,h:0};var b=null,c,d,e,f;c=d=Infinity;e=f=-Infinity;for(var g=0;g<a.length;g++)b=this._computeBoundingBox(a[g]._gfxGroup),c>b.x&&(c=b.x),d>b.y&&(d=b.y),e<b.x+b.width&&(e=b.x+b.width),f<b.y+b.height&&(f=b.y+b.height);return{x:c,y:d,w:e-c,h:f-d}},refreshRendering:function(){if(!(0>=this._widgetBox.w||0>=this._widgetBox.h)){var a;if(this._baseParts)for(a=0;a<this._baseParts.length;a++)this._baseParts[a].width=this._widgetBox.w,this._baseParts[a].height=this._widgetBox.h,this._elementsRenderers[this._baseParts[a]._name]=
this._baseParts[a].refreshRendering();if(this._leadingParts)for(a=0;a<this._leadingParts.length;a++)this._elementsRenderers[this._leadingParts[a]._name]=this._leadingParts[a].refreshRendering();if(this._trailingParts)for(a=0;a<this._trailingParts.length;a++)this._elementsRenderers[this._trailingParts[a]._name]=this._trailingParts[a].refreshRendering();a=this._computeArrayBoundingBox(this._leadingParts);var b=this._computeArrayBoundingBox(this._trailingParts),c={};"horizontal"==this.orientation?(c.x=
a.x+a.w,c.y=0,c.w=this._widgetBox.w-a.w-b.w,c.h=this._widgetBox.h):(c.x=0,c.y=a.y+a.h,c.w=this._widgetBox.w,c.h=this._widgetBox.h-a.h-b.h);this._layoutInfos={leading:a,middle:c,trailing:b};for(a=0;a<this._middleParts.length;a++)this._middleParts[a]._gfxGroup.setTransform([h.translate(c.x,c.y)]);if(this._trailingParts)for(a=0;a<this._trailingParts.length;a++)this._trailingParts[a]._gfxGroup.setTransform(h.translate(this._widgetBox.w-b.w,0));for(a=0;a<this._classParts.length;a++)this._elementsRenderers[this._classParts[a]._name]=
this._classParts[a].refreshRendering()}}})});
/// RectangularGauge.js.map