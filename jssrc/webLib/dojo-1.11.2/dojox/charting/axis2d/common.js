//>>built
define("dojox/charting/axis2d/common",["dojo/_base/lang","dojo/_base/window","dojo/dom-geometry","dojox/gfx","dojo/has"],function(l,h,s,p,q){q=l.getObject("dojox.charting.axis2d.common",!0);var r=function(a){a.marginLeft="0px";a.marginTop="0px";a.marginRight="0px";a.marginBottom="0px";a.paddingLeft="0px";a.paddingTop="0px";a.paddingRight="0px";a.paddingBottom="0px";a.borderLeftWidth="0px";a.borderTopWidth="0px";a.borderRightWidth="0px";a.borderBottomWidth="0px"};return l.mixin(q,{createText:{gfx:function(a,
d,c,f,h,k,m,n){return d.createText({x:c,y:f,text:k,align:h}).setFont(m).setFill(n)},html:function(a,d,c,f,l,k,m,n,g){d=h.doc.createElement("div");var b=d.style,e;a.getTextDir&&(d.dir=a.getTextDir(k));r(b);b.font=m;d.innerHTML=String(k).replace(/\s/g,"\x26nbsp;");b.color=n;b.position="absolute";b.left="-10000px";h.body().appendChild(d);k=p.normalizedLength(p.splitFontString(m).size);g||(d.getBoundingClientRect?(e=d.getBoundingClientRect(),e=e.width||e.right-e.left):e=s.getMarginBox(d).w);"rtl"==d.dir&&
(c+=g?g:e);h.body().removeChild(d);b.position="relative";if(g)switch(b.width=g+"px",l){case "middle":b.textAlign="center";b.left=c-g/2+"px";break;case "end":b.textAlign="right";b.left=c-g+"px";break;default:b.left=c+"px",b.textAlign="left"}else switch(l){case "middle":b.left=Math.floor(c-e/2)+"px";break;case "end":b.left=Math.floor(c-e)+"px";break;default:b.left=Math.floor(c)+"px"}b.top=Math.floor(f-k)+"px";b.whiteSpace="nowrap";c=h.doc.createElement("div");f=c.style;r(f);f.width="0px";f.height="0px";
c.appendChild(d);a.node.insertBefore(c,a.node.firstChild);return c}}})});
/// common.js.map