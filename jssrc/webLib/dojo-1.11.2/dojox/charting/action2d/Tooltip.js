//>>built
define("dojox/charting/action2d/Tooltip","dijit/Tooltip dojo/_base/lang dojo/_base/declare dojo/_base/window dojo/_base/connect dojo/dom-style ./PlotAction dojox/gfx/matrix dojo/has require dojox/lang/functional dojox/lang/functional/scan dojox/lang/functional/fold".split(" "),function(h,l,m,n,p,t,q,r,u,v,f){var k=function(a,b){var c=a.run&&a.run.data&&a.run.data[a.index];return c&&"number"!=typeof c&&(c.tooltip||c.text)?c.tooltip||c.text:b.tooltipFunc?b.tooltipFunc(a):a.y},g=Math.PI/4,s=Math.PI/
2;return m("dojox.charting.action2d.Tooltip",q,{defaultParams:{text:k,mouseOver:!0},optionalParams:{},constructor:function(a,b,c){this.text=c&&c.text?c.text:k;this.mouseOver=c&&void 0!=c.mouseOver?c.mouseOver:!0;this.connect()},process:function(a){if("onplotreset"===a.type||"onmouseout"===a.type)h.hide(this.aroundRect),this.aroundRect=null,"onplotreset"===a.type&&delete this.angles;else if(a.shape&&!(this.mouseOver&&"onmouseover"!==a.type||!this.mouseOver&&"onclick"!==a.type)){var b={type:"rect"},
c=["after-centered","before-centered"];switch(a.element){case "marker":b.x=a.cx;b.y=a.cy;b.w=b.h=1;break;case "circle":b.x=a.cx-a.cr;b.y=a.cy-a.cr;b.w=b.h=2*a.cr;break;case "spider_circle":b.x=a.cx;b.y=a.cy;b.w=b.h=1;break;case "spider_plot":return;case "column":c=["above-centered","below-centered"];case "bar":b=l.clone(a.shape.getShape());b.w=b.width;b.h=b.height;break;case "candlestick":b.x=a.x;b.y=a.y;b.w=a.width;b.h=a.height;break;default:if(!this.angles){var e="number"==typeof a.run.data[0]?
f.map(a.run.data,"x ? Math.max(x, 0) : 0"):f.map(a.run.data,"x ? Math.max(x.y, 0) : 0");this.angles=f.map(f.scanl(e,"+",0),"* 2 * Math.PI / this",f.foldl(e,"+",0))}var e=r._degToRad(a.plot.opt.startAngle),d=(this.angles[a.index]+this.angles[a.index+1])/2+e;b.x=a.cx+a.cr*Math.cos(d);b.y=a.cy+a.cr*Math.sin(d);b.w=b.h=1;if(e&&(0>d||d>2*Math.PI))d=Math.abs(2*Math.PI-Math.abs(d));d<g||(d<s+g?c=["below-centered","above-centered"]:d<Math.PI+g?c=["before-centered","after-centered"]:d<2*Math.PI-g&&(c=["above-centered",
"below-centered"]))}e=this.chart.getCoords();b.x+=e.x;b.y+=e.y;b.x=Math.round(b.x);b.y=Math.round(b.y);b.w=Math.ceil(b.w);b.h=Math.ceil(b.h);this.aroundRect=b;(a=this.text(a,this.plot))&&h.show(this._format(a),this.aroundRect,c);this.mouseOver||(this._handle=p.connect(n.doc,"onclick",this,"onClick"))}},onClick:function(){this.process({type:"onmouseout"})},_recheckPosition:function(a,b,c){},_format:function(a){return a}})});
/// Tooltip.js.map