//>>built
define("dojox/dgauges/components/default/CircularLinearGauge","dojo/_base/lang dojo/_base/declare dojo/_base/Color ../utils ../../CircularGauge ../../LinearScaler ../../CircularScale ../../CircularValueIndicator ../../TextIndicator ../DefaultPropertiesMixin".split(" "),function(f,h,g,b,k,l,m,n,p,q){return h("dojox.dgauges.components.default.CircularLinearGauge",[k,q],{_radius:100,borderColor:"#C9DFF2",fillColor:"#FCFCFF",indicatorColor:"#F01E28",constructor:function(){this.borderColor=new g(this.borderColor);
this.fillColor=new g(this.fillColor);this.indicatorColor=new g(this.indicatorColor);this.addElement("background",f.hitch(this,this.drawBackground));var d=new l,a=new m;a.set("scaler",d);this.addElement("scale",a);d=new n;a.addIndicator("indicator",d);this.addElement("foreground",f.hitch(this,this.drawForeground));var c=new p;c.set("indicator",d);c.set("x",100);c.set("y",150);this.addElement("indicatorText",c);b.genericCircularGauge(a,d,this._radius,this._radius,0.65*this._radius,130,50,null,null,
"outside")},drawBackground:function(d){var a=this._radius,c=2*a,e=b.createGradient([0,b.brightness(this.borderColor,70),1,b.brightness(this.borderColor,-40)]);d.createEllipse({cx:a,cy:a,rx:a,ry:a}).setFill(f.mixin({type:"linear",x1:c,y1:0,x2:0,y2:c},e)).setStroke({color:"#A5A5A5",width:0.2});e=b.createGradient([0,b.brightness(this.borderColor,70),1,b.brightness(this.borderColor,-50)]);d.createEllipse({cx:a,cy:a,rx:0.99*a,ry:0.99*a}).setFill(f.mixin({type:"linear",x1:0,y1:0,x2:c,y2:c},e));e=b.createGradient([0,
b.brightness(this.borderColor,60),1,b.brightness(this.borderColor,-40)]);d.createEllipse({cx:a,cy:a,rx:0.92*a,ry:0.92*a}).setFill(f.mixin({type:"linear",x1:0,y1:0,x2:c,y2:c},e));e=b.createGradient([0,b.brightness(this.borderColor,70),1,b.brightness(this.borderColor,-40)]);d.createEllipse({cx:a,cy:a,rx:0.9*a,ry:0.9*a}).setFill(f.mixin({type:"linear",x1:c,y1:0,x2:0,y2:c},e));e=b.createGradient([0,[255,255,255,220],0.8,b.brightness(this.fillColor,-5),1,b.brightness(this.fillColor,-30)]);d.createEllipse({cx:a,
cy:a,rx:0.9*a,ry:0.9*a}).setFill(f.mixin({type:"radial",cx:a,cy:a,r:a},e)).setStroke({color:b.brightness(this.fillColor,-40),width:0.4})},drawForeground:function(d){var a=0.07*this._radius,c=b.createGradient([0,this.borderColor,1,b.brightness(this.borderColor,-20)]);d.createEllipse({cx:this._radius,cy:this._radius,rx:a,ry:a}).setFill(f.mixin({type:"radial",cx:0.96*this._radius,cy:0.96*this._radius,r:a},c)).setStroke({color:b.brightness(this.fillColor,-50),width:0.4})}})});
/// CircularLinearGauge.js.map