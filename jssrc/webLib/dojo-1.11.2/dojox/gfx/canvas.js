//>>built
define("dojox/gfx/canvas","./_base dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/_base/window dojo/dom-geometry dojo/dom ./shape ./path ./arc ./matrix ./decompose ./bezierutils".split(" "),function(r,B,I,k,C,O,P,l,D,K,E,v,G){function H(c,b,a,d,g,h,f,e,Q,n){var m,q,l=b.length,k=0;n?(q=n.l/g,k=n.i):q=b[0]/g;for(;h<f;)h+q>f&&(m={l:(h+q-f)*g,i:k},q=f-h),k%2||(c.beginPath(),c.arc(a,d,g,h,h+q,e),Q&&c.stroke()),h+=q,++k,q=b[k%l]/g;return m}function L(c,b,a,d){var g=0,h=0,f,e=0;d?(f=d.l,e=d.i):
f=b[0];for(;1>h;)h=G.tAtLength(c,f),1==h&&(g=G.computeLength(c),g={l:f-g,i:e}),c=G.splitBezierAtT(c,h),e%2||a.push(c[0]),c=c[1],++e,f=b[e%b.length];return g}function s(c,b,a,d){var g=[b.last.x,b.last.y].concat(a),h=!(c instanceof Array);a=4===a.length?"quadraticCurveTo":"bezierCurveTo";var f=[];b=L(g,b.canvasDash,f,d);for(d=0;d<f.length;++d)g=f[d],h?(c.moveTo(g[0],g[1]),c[a].apply(c,g.slice(2))):(c.push("moveTo",[g[0],g[1]]),c.push(a,g.slice(2)));return b}function m(c,b,a,d,g,h,f){var e=0,m=0,n=0,
k=G.distance(a,d,g,h),q=0;b=b.canvasDash;var l=a,s=d,r,t=!(c instanceof Array);f?(n=f.l,q=f.i):n+=b[0];for(;0.01<Math.abs(1-m);)n>k&&(e={l:n-k,i:q},n=k),m=n/k,f=a+(g-a)*m,r=d+(h-d)*m,q++%2||(t?(c.moveTo(l,s),c.lineTo(f,r)):(c.push("moveTo",[l,s]),c.push("lineTo",[f,r]))),l=f,s=r,n+=b[q%b.length];return e}var e=r.canvas={},y=null,w=E.multiplyPoint,t=Math.PI,M=2*t,u=t/2;v=B.extend;if(C.global.CanvasRenderingContext2D){C=C.doc.createElement("canvas").getContext("2d");var F="function"==typeof C.setLineDash,
R="function"==typeof C.fillText}var N={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};e.Shape=k("dojox.gfx.canvas.Shape",l.Shape,{_render:function(c){c.save();this._renderTransform(c);this._renderClip(c);this._renderShape(c);this._renderFill(c,!0);this._renderStroke(c,!0);c.restore()},_renderClip:function(c){this.canvasClip&&(this.canvasClip.render(c),
c.clip())},_renderTransform:function(c){if("canvasTransform"in this){var b=this.canvasTransform;c.translate(b.dx,b.dy);c.rotate(b.angle2);c.scale(b.sx,b.sy);c.rotate(b.angle1)}},_renderShape:function(c){},_renderFill:function(c,b){if("canvasFill"in this){var a=this.fillStyle;if("canvasFillImage"in this){var d=a.width,g=a.height,h=this.canvasFillImage.width,f=this.canvasFillImage.height,e=Math.min(d==h?1:d/h,g==f?1:g/f),m=(d-e*h)/2,k=(g-e*f)/2;y.width=d;y.height=g;var l=y.getContext("2d");l.clearRect(0,
0,d,g);l.drawImage(this.canvasFillImage,0,0,h,f,m,k,e*h,e*f);this.canvasFill=c.createPattern(y,"repeat");delete this.canvasFillImage}c.fillStyle=this.canvasFill;b&&("pattern"===a.type&&(0!==a.x||0!==a.y)&&c.translate(a.x,a.y),c.fill())}else c.fillStyle="rgba(0,0,0,0.0)"},_renderStroke:function(c,b){var a=this.strokeStyle;a?(c.strokeStyle=a.color.toString(),c.lineWidth=a.width,c.lineCap=a.cap,"number"==typeof a.join?(c.lineJoin="miter",c.miterLimit=a.join):c.lineJoin=a.join,this.canvasDash?F?(c.setLineDash(this.canvasDash),
b&&c.stroke()):this._renderDashedStroke(c,b):b&&c.stroke()):b||(c.strokeStyle="rgba(0,0,0,0.0)")},_renderDashedStroke:function(c,b){},getEventSource:function(){return null},on:function(){},connect:function(){},disconnect:function(){},canvasClip:null,setClip:function(c){this.inherited(arguments);var b=c?"width"in c?"rect":"cx"in c?"ellipse":"points"in c?"polyline":"d"in c?"path":null:null;if(c&&!b)return this;this.canvasClip=c?S(b,c):null;this.parent&&this.parent._makeDirty();return this}});var S=
function(c,b){switch(c){case "ellipse":return{canvasEllipse:J({shape:b}),render:function(a){return e.Ellipse.prototype._renderShape.call(this,a)}};case "rect":return{shape:B.delegate(b,{r:0}),render:function(a){return e.Rect.prototype._renderShape.call(this,a)}};case "path":return{canvasPath:T(b),render:function(a){this.canvasPath._renderShape(a)}};case "polyline":return{canvasPolyline:b.points,render:function(a){return e.Polyline.prototype._renderShape.call(this,a)}}}return null},T=function(c){var b=
new dojox.gfx.canvas.Path;b.canvasPath=[];b._setPath(c.d);return b},z=function(c,b,a){var d=c.prototype[b];c.prototype[b]=a?function(){this.parent&&this.parent._makeDirty();d.apply(this,arguments);a.call(this);return this}:function(){this.parent&&this.parent._makeDirty();return d.apply(this,arguments)}};z(e.Shape,"setTransform",function(){this.matrix?this.canvasTransform=r.decompose(this.matrix):delete this.canvasTransform});z(e.Shape,"setFill",function(){var c=this.fillStyle,b;if(c){if("object"==
typeof c&&"type"in c){var a=this.surface.rawNode.getContext("2d");switch(c.type){case "linear":case "radial":b="linear"==c.type?a.createLinearGradient(c.x1,c.y1,c.x2,c.y2):a.createRadialGradient(c.cx,c.cy,0,c.cx,c.cy,c.r);I.forEach(c.colors,function(a){b.addColorStop(a.offset,r.normalizeColor(a.color).toString())});break;case "pattern":y||(y=document.createElement("canvas")),a=new Image,this.surface.downloadImage(a,c.src),this.canvasFillImage=a}}else b=c.toString();this.canvasFill=b}else delete this.canvasFill});
z(e.Shape,"setStroke",function(){var c=this.strokeStyle;if(c){var b=this.strokeStyle.style.toLowerCase();b in N&&(b=N[b]);if(b instanceof Array){this.canvasDash=b=b.slice();var a;for(a=0;a<b.length;++a)b[a]*=c.width;if("butt"!=c.cap){for(a=0;a<b.length;a+=2)b[a]-=c.width,1>b[a]&&(b[a]=1);for(a=1;a<b.length;a+=2)b[a]+=c.width}}else delete this.canvasDash}else delete this.canvasDash;this._needsDash=!F&&!!this.canvasDash});z(e.Shape,"setShape");e.Group=k("dojox.gfx.canvas.Group",e.Shape,{constructor:function(){l.Container._init.call(this)},
_render:function(c){c.save();this._renderTransform(c);this._renderClip(c);for(var b=0;b<this.children.length;++b)this.children[b]._render(c);c.restore()},destroy:function(){l.Container.clear.call(this,!0);e.Shape.prototype.destroy.apply(this,arguments)}});e.Rect=k("dojox.gfx.canvas.Rect",[e.Shape,l.Rect],{_renderShape:function(c){var b=this.shape,a=Math.min(b.r,b.height/2,b.width/2),d=b.x,g=d+b.width,h=b.y,b=h+b.height,f=d+a,e=g-a,m=h+a,k=b-a;c.beginPath();c.moveTo(f,h);a?(c.arc(e,m,a,-u,0,!1),c.arc(e,
k,a,0,u,!1),c.arc(f,k,a,u,t,!1),c.arc(f,m,a,t,t+u,!1)):(c.lineTo(e,h),c.lineTo(g,k),c.lineTo(f,b),c.lineTo(d,m));c.closePath()},_renderDashedStroke:function(c,b){var a=this.shape,d=Math.min(a.r,a.height/2,a.width/2),g=a.x,h=g+a.width,e=a.y,k=e+a.height,l=g+d,n=h-d,r=e+d,q=k-d;d?(c.beginPath(),a=m(c,this,l,e,n,e),b&&c.stroke(),a=H(c,this.canvasDash,n,r,d,-u,0,!1,b,a),c.beginPath(),a=m(c,this,h,r,h,q,a),b&&c.stroke(),a=H(c,this.canvasDash,n,q,d,0,u,!1,b,a),c.beginPath(),a=m(c,this,n,k,l,k,a),b&&c.stroke(),
a=H(c,this.canvasDash,l,q,d,u,t,!1,b,a),c.beginPath(),a=m(c,this,g,q,g,r,a),b&&c.stroke(),H(c,this.canvasDash,l,r,d,t,t+u,!1,b,a)):(c.beginPath(),a=m(c,this,l,e,n,e),a=m(c,this,n,e,h,q,a),a=m(c,this,h,q,l,k,a),m(c,this,l,k,g,r,a),b&&c.stroke())}});var x=[];(function(){var c=K.curvePI4;x.push(c.s,c.c1,c.c2,c.e);for(var b=45;360>b;b+=45){var a=E.rotateg(b);x.push(w(a,c.c1),w(a,c.c2),w(a,c.e))}})();var J=function(c){var b,a,d,g=[],e=c.shape,f=E.normalize([E.translate(e.cx,e.cy),E.scale(e.rx,e.ry)]);
b=w(f,x[0]);g.push([b.x,b.y]);for(e=1;e<x.length;e+=3)a=w(f,x[e]),d=w(f,x[e+1]),b=w(f,x[e+2]),g.push([a.x,a.y,d.x,d.y,b.x,b.y]);if(c._needsDash){b=[];a=g[0];for(e=1;e<g.length;++e)d=[],L(a.concat(g[e]),c.canvasDash,d),a=[g[e][4],g[e][5]],b.push(d);c._dashedPoints=b}return g};e.Ellipse=k("dojox.gfx.canvas.Ellipse",[e.Shape,l.Ellipse],{setShape:function(){this.inherited(arguments);this.canvasEllipse=J(this);return this},setStroke:function(){this.inherited(arguments);F||(this.canvasEllipse=J(this));
return this},_renderShape:function(c){var b=this.canvasEllipse,a;c.beginPath();c.moveTo.apply(c,b[0]);for(a=1;a<b.length;++a)c.bezierCurveTo.apply(c,b[a]);c.closePath()},_renderDashedStroke:function(c,b){var a=this._dashedPoints;c.beginPath();for(var d=0;d<a.length;++d)for(var e=a[d],h=0;h<e.length;++h){var f=e[h];c.moveTo(f[0],f[1]);c.bezierCurveTo(f[2],f[3],f[4],f[5],f[6],f[7])}b&&c.stroke()}});e.Circle=k("dojox.gfx.canvas.Circle",[e.Shape,l.Circle],{_renderShape:function(c){var b=this.shape;c.beginPath();
c.arc(b.cx,b.cy,b.r,0,M,1)},_renderDashedStroke:function(c,b){var a=this.shape,d=0,e,h=this.canvasDash.length;for(i=0;d<M;)e=this.canvasDash[i%h]/a.r,i%2||(c.beginPath(),c.arc(a.cx,a.cy,a.r,d,d+e,0),b&&c.stroke()),d+=e,++i}});e.Line=k("dojox.gfx.canvas.Line",[e.Shape,l.Line],{_renderShape:function(c){var b=this.shape;c.beginPath();c.moveTo(b.x1,b.y1);c.lineTo(b.x2,b.y2)},_renderDashedStroke:function(c,b){var a=this.shape;c.beginPath();m(c,this,a.x1,a.y1,a.x2,a.y2);b&&c.stroke()}});e.Polyline=k("dojox.gfx.canvas.Polyline",
[e.Shape,l.Polyline],{setShape:function(){this.inherited(arguments);var c=this.shape.points,b=c[0],a,d;this.bbox=null;this._normalizePoints();if(c.length)if("number"==typeof b)b=c;else{b=[];for(d=0;d<c.length;++d)a=c[d],b.push(a.x,a.y)}else b=[];this.canvasPolyline=b;return this},_renderShape:function(c){var b=this.canvasPolyline;if(b.length){c.beginPath();c.moveTo(b[0],b[1]);for(var a=2;a<b.length;a+=2)c.lineTo(b[a],b[a+1])}},_renderDashedStroke:function(c,b){var a=this.canvasPolyline,d=0;c.beginPath();
for(var e=0;e<a.length;e+=2)d=m(c,this,a[e],a[e+1],a[e+2],a[e+3],d);b&&c.stroke()}});e.Image=k("dojox.gfx.canvas.Image",[e.Shape,l.Image],{setShape:function(){this.inherited(arguments);var c=new Image;this.surface.downloadImage(c,this.shape.src);this.canvasImage=c;return this},_renderShape:function(c){var b=this.shape;c.drawImage(this.canvasImage,b.x,b.y,b.width,b.height)}});e.Text=k("dojox.gfx.canvas.Text",[e.Shape,l.Text],{_setFont:function(){this.fontStyle?this.canvasFont=r.makeFontString(this.fontStyle):
delete this.canvasFont},getTextWidth:function(){var c=this.shape,b=0,a;c.text&&(a=this.surface.rawNode.getContext("2d"),a.save(),this._renderTransform(a),this._renderFill(a,!1),this._renderStroke(a,!1),this.canvasFont&&(a.font=this.canvasFont),b=a.measureText(c.text).width,a.restore());return b},_render:function(c){c.save();this._renderTransform(c);this._renderFill(c,!1);this._renderStroke(c,!1);this._renderShape(c);c.restore()},_renderShape:function(c){var b,a=this.shape;a.text&&(b="middle"===a.align?
"center":a.align,c.textAlign=b,this.canvasFont&&(c.font=this.canvasFont),this.canvasFill&&c.fillText(a.text,a.x,a.y),this.strokeStyle&&(c.beginPath(),c.strokeText(a.text,a.x,a.y),c.closePath()))}});z(e.Text,"setFont");R||e.Text.extend({getTextWidth:function(){return 0},getBoundingBox:function(){return null},_renderShape:function(){}});var U={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",
Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};e.Path=k("dojox.gfx.canvas.Path",[e.Shape,D.Path],{constructor:function(){this.lastControl={}},setShape:function(){this.canvasPath=[];this._dashedPath=[];return this.inherited(arguments)},setStroke:function(){this.inherited(arguments);F||(this.segmented=!1,this._confirmSegmented());return this},_setPath:function(){this._dashResidue=null;this.inherited(arguments)},_updateWithSegment:function(c){var b=
B.clone(this.last);this[U[c.action]](this.canvasPath,c.action,c.args,this._needsDash?this._dashedPath:null);this.last=b;this.inherited(arguments)},_renderShape:function(c){var b=this.canvasPath;c.beginPath();for(var a=0;a<b.length;a+=2)c[b[a]].apply(c,b[a+1])},_renderDashedStroke:F?function(){}:function(c,b){var a=this._dashedPath;c.beginPath();for(var d=0;d<a.length;d+=2)c[a[d]].apply(c,a[d+1]);b&&c.stroke()},_moveToA:function(c,b,a,d){c.push("moveTo",[a[0],a[1]]);d&&d.push("moveTo",[a[0],a[1]]);
for(b=2;b<a.length;b+=2)c.push("lineTo",[a[b],a[b+1]]),d&&(this._dashResidue=m(d,this,a[b-2],a[b-1],a[b],a[b+1],this._dashResidue));this.last.x=a[a.length-2];this.last.y=a[a.length-1];this.lastControl={}},_moveToR:function(c,b,a,d){b="x"in this.last?[this.last.x+=a[0],this.last.y+=a[1]]:[this.last.x=a[0],this.last.y=a[1]];c.push("moveTo",b);d&&d.push("moveTo",b);for(b=2;b<a.length;b+=2)c.push("lineTo",[this.last.x+=a[b],this.last.y+=a[b+1]]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-
1][1],this.last.x,this.last.y,this._dashResidue));this.lastControl={}},_lineToA:function(c,b,a,d){for(b=0;b<a.length;b+=2)d&&(this._dashResidue=m(d,this,this.last.x,this.last.y,a[b],a[b+1],this._dashResidue)),c.push("lineTo",[a[b],a[b+1]]);this.last.x=a[a.length-2];this.last.y=a[a.length-1];this.lastControl={}},_lineToR:function(c,b,a,d){for(b=0;b<a.length;b+=2)c.push("lineTo",[this.last.x+=a[b],this.last.y+=a[b+1]]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-1][1],this.last.x,this.last.y,
this._dashResidue));this.lastControl={}},_hLineToA:function(c,b,a,d){for(b=0;b<a.length;++b)c.push("lineTo",[a[b],this.last.y]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-1][1],a[b],this.last.y,this._dashResidue));this.last.x=a[a.length-1];this.lastControl={}},_hLineToR:function(c,b,a,d){for(b=0;b<a.length;++b)c.push("lineTo",[this.last.x+=a[b],this.last.y]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-1][1],this.last.x,this.last.y,this._dashResidue));this.lastControl=
{}},_vLineToA:function(c,b,a,d){for(b=0;b<a.length;++b)c.push("lineTo",[this.last.x,a[b]]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-1][1],this.last.x,a[b],this._dashResidue));this.last.y=a[a.length-1];this.lastControl={}},_vLineToR:function(c,b,a,d){for(b=0;b<a.length;++b)c.push("lineTo",[this.last.x,this.last.y+=a[b]]),d&&(this._dashResidue=m(d,this,d[d.length-1][0],d[d.length-1][1],this.last.x,this.last.y,this._dashResidue));this.lastControl={}},_curveToA:function(c,b,a,d){for(b=
0;b<a.length;b+=6)c.push("bezierCurveTo",a.slice(b,b+6)),d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.last.x=a[a.length-2];this.last.y=a[a.length-1];this.lastControl.x=a[a.length-4];this.lastControl.y=a[a.length-3];this.lastControl.type="C"},_curveToR:function(c,b,a,d){for(b=0;b<a.length;b+=6)c.push("bezierCurveTo",[this.last.x+a[b],this.last.y+a[b+1],this.lastControl.x=this.last.x+a[b+2],this.lastControl.y=this.last.y+a[b+3],this.last.x+a[b+4],this.last.y+a[b+5]]),d&&(this._dashResidue=
s(d,this,c[c.length-1],this._dashResidue)),this.last.x+=a[b+4],this.last.y+=a[b+5];this.lastControl.type="C"},_smoothCurveToA:function(c,b,a,d){for(b=0;b<a.length;b+=4){var e="C"==this.lastControl.type;c.push("bezierCurveTo",[e?2*this.last.x-this.lastControl.x:this.last.x,e?2*this.last.y-this.lastControl.y:this.last.y,a[b],a[b+1],a[b+2],a[b+3]]);d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.lastControl.x=a[b];this.lastControl.y=a[b+1];this.lastControl.type="C"}this.last.x=
a[a.length-2];this.last.y=a[a.length-1]},_smoothCurveToR:function(c,b,a,d){for(b=0;b<a.length;b+=4){var e="C"==this.lastControl.type;c.push("bezierCurveTo",[e?2*this.last.x-this.lastControl.x:this.last.x,e?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+a[b],this.last.y+a[b+1],this.last.x+a[b+2],this.last.y+a[b+3]]);d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.lastControl.x=this.last.x+a[b];this.lastControl.y=this.last.y+a[b+1];this.lastControl.type="C";this.last.x+=
a[b+2];this.last.y+=a[b+3]}},_qCurveToA:function(c,b,a,d){for(b=0;b<a.length;b+=4)c.push("quadraticCurveTo",a.slice(b,b+4));d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.last.x=a[a.length-2];this.last.y=a[a.length-1];this.lastControl.x=a[a.length-4];this.lastControl.y=a[a.length-3];this.lastControl.type="Q"},_qCurveToR:function(c,b,a,d){for(b=0;b<a.length;b+=4)c.push("quadraticCurveTo",[this.lastControl.x=this.last.x+a[b],this.lastControl.y=this.last.y+a[b+1],this.last.x+a[b+
2],this.last.y+a[b+3]]),d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue)),this.last.x+=a[b+2],this.last.y+=a[b+3];this.lastControl.type="Q"},_qSmoothCurveToA:function(c,b,a,d){for(b=0;b<a.length;b+=2){var e="Q"==this.lastControl.type;c.push("quadraticCurveTo",[this.lastControl.x=e?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=e?2*this.last.y-this.lastControl.y:this.last.y,a[b],a[b+1]]);d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.lastControl.type=
"Q"}this.last.x=a[a.length-2];this.last.y=a[a.length-1]},_qSmoothCurveToR:function(c,b,a,d){for(b=0;b<a.length;b+=2){var e="Q"==this.lastControl.type;c.push("quadraticCurveTo",[this.lastControl.x=e?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=e?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+a[b],this.last.y+a[b+1]]);d&&(this._dashResidue=s(d,this,c[c.length-1],this._dashResidue));this.lastControl.type="Q";this.last.x+=a[b];this.last.y+=a[b+1]}},_arcTo:function(c,b,a,d){b=
"a"==b;for(var e=0;e<a.length;e+=7){var h=a[e+5],f=a[e+6];b&&(h+=this.last.x,f+=this.last.y);var k=K.arcAsBezier(this.last,a[e],a[e+1],a[e+2],a[e+3]?1:0,a[e+4]?1:0,h,f);I.forEach(k,function(a){c.push("bezierCurveTo",a)});d&&(this._dashResidue=s(d,this,p,this._dashResidue));this.last.x=h;this.last.y=f}this.lastControl={}},_closePath:function(c,b,a,d){c.push("closePath",[]);d&&(this._dashResidue=m(d,this,this.last.x,this.last.y,d[1][0],d[1][1],this._dashResidue));this.lastControl={}}});I.forEach("moveTo lineTo hLineTo vLineTo curveTo smoothCurveTo qCurveTo qSmoothCurveTo arcTo closePath".split(" "),
function(c){z(e.Path,c)});e.TextPath=k("dojox.gfx.canvas.TextPath",[e.Shape,D.TextPath],{_renderShape:function(c){},_setText:function(){},_setFont:function(){}});e.Surface=k("dojox.gfx.canvas.Surface",l.Surface,{constructor:function(){l.Container._init.call(this);this.pendingImageCount=0;this.makeDirty()},destroy:function(){l.Container.clear.call(this,!0);this.inherited(arguments)},setDimensions:function(c,b){this.width=r.normalizedLength(c);this.height=r.normalizedLength(b);if(!this.rawNode)return this;
var a=!1;this.rawNode.width!=this.width&&(this.rawNode.width=this.width,a=!0);this.rawNode.height!=this.height&&(this.rawNode.height=this.height,a=!0);a&&this.makeDirty();return this},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null},_render:function(c){if(this.rawNode&&(c||!this.pendingImageCount))c=this.rawNode.getContext("2d"),c.clearRect(0,0,this.rawNode.width,this.rawNode.height),this.render(c),"pendingRender"in this&&(clearTimeout(this.pendingRender),
delete this.pendingRender)},render:function(c){c.save();for(var b=0;b<this.children.length;++b)this.children[b]._render(c);c.restore()},makeDirty:function(){!this.pendingImagesCount&&(!("pendingRender"in this)&&!this._batch)&&(this.pendingRender=setTimeout(B.hitch(this,this._render),0))},downloadImage:function(c,b){var a=B.hitch(this,this.onImageLoad);!this.pendingImageCount++&&"pendingRender"in this&&(clearTimeout(this.pendingRender),delete this.pendingRender);c.onload=a;c.onerror=a;c.onabort=a;
c.src=b},onImageLoad:function(){--this.pendingImageCount||(this.onImagesLoaded(),this._render())},onImagesLoaded:function(){},getEventSource:function(){return null},connect:function(){},disconnect:function(){},on:function(){}});e.createSurface=function(c,b,a){if(!b&&!a){var d=O.position(c);b=b||d.w;a=a||d.h}"number"==typeof b&&(b+="px");"number"==typeof a&&(a+="px");d=new e.Surface;c=P.byId(c);var g=c.ownerDocument.createElement("canvas");g.width=r.normalizedLength(b);g.height=r.normalizedLength(a);
c.appendChild(g);d.rawNode=g;d._parent=c;return d.surface=d};var A=l.Container;k={openBatch:function(){++this._batch;return this},closeBatch:function(){this._batch=0<this._batch?--this._batch:0;this._makeDirty();return this},_makeDirty:function(){this._batch||this.surface.makeDirty()},add:function(c){this._makeDirty();return A.add.apply(this,arguments)},remove:function(c,b){this._makeDirty();return A.remove.apply(this,arguments)},clear:function(){this._makeDirty();return A.clear.apply(this,arguments)},
getBoundingBox:A.getBoundingBox,_moveChildToFront:function(c){this._makeDirty();return A._moveChildToFront.apply(this,arguments)},_moveChildToBack:function(c){this._makeDirty();return A._moveChildToBack.apply(this,arguments)}};D={createObject:function(c,b){var a=new c;a.surface=this.surface;a.setShape(b);this.add(a);return a}};v(e.Group,k);v(e.Group,l.Creator);v(e.Group,D);v(e.Surface,k);v(e.Surface,l.Creator);v(e.Surface,D);e.fixTarget=function(c,b){return!0};return e});
/// canvas.js.map