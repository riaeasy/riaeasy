//>>built
define("dojox/mobile/parser","dojo/_base/kernel dojo/_base/array dojo/_base/config dojo/_base/lang dojo/_base/window dojo/ready".split(" "),function(q,s,t,k,u,v){var w=k.getObject("dojox.mobile",!0),c=new function(){var c={},r=function(a,e){if("string"===typeof e){var n=a+":"+e.replace(/ /g,"");return c[n]||(c[n]=r(a).createSubclass(s.map(e.split(/, */),r)))}return c[a]||(c[a]=k.getObject(a)||require(a))},q=function(a){return eval(a)};this.instantiate=function(a,e,n){e=e||{};n=n||{};var g,l=[];if(a){for(g=
0;g<a.length;g++){var b=a[g],h=r(b._type,b.getAttribute("data-dojo-mixins")),c=h.prototype,f={},m,d,p;k.mixin(f,q.call(n.propsThis,"({"+(b.getAttribute("data-dojo-props")||"")+"})"));k.mixin(f,n.defaults);k.mixin(f,e);for(m in c)if(d=(d=b.getAttributeNode(m))&&d.nodeValue,p=typeof c[m],d||!("boolean"!==p||""!==d))k.isArray(c[m])?f[m]=d.split(/\s*,\s*/):"string"===p?f[m]=d:"number"===p?f[m]=d-0:"boolean"===p?f[m]="false"!==d:"object"===p?f[m]=eval("("+d+")"):"function"===p&&(f[m]=k.getObject(d,!1)||
new Function(d),b.removeAttribute(m));f["class"]=b.className;f.style||(f.style=b.style.cssText);if(d=b.getAttribute("data-dojo-attach-point"))f.dojoAttachPoint=d;if(d=b.getAttribute("data-dojo-attach-event"))f.dojoAttachEvent=d;h=new h(f,b);l.push(h);(b=b.getAttribute("jsId")||b.getAttribute("data-dojo-id"))&&k.setObject(b,h)}for(g=0;g<l.length;g++)a=l[g],!n.noStart&&a.startup&&!a._started&&a.startup()}return l};this.parse=function(a,e){a?!e&&a.rootNode&&(e=a,a=a.rootNode):a=u.body();var c=a.getElementsByTagName("*"),
g,l,b=[];for(g=0;g<c.length;g++){var h=c[g];if(l=h._type=h.getAttribute("dojoType")||h.getAttribute("data-dojo-type"))if(h._skip)h._skip="";else{if(r(l).prototype.stopParser&&(!e||!e.template)){var k=h.getElementsByTagName("*");for(l=0;l<k.length;l++)k[l]._skip="1"}b.push(h)}}return this.instantiate(b,e&&e.template?{template:!0}:null,e)}};t.parseOnLoad&&v(100,function(){try{require("dojo/parser")||c.parse()}catch(k){c.parse()}});w.parser=c;q.parser=q.parser||c;return c});
/// parser.js.map