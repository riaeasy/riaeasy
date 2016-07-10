//>>built
define("dojox/html/ellipsis",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/colors"],function(c){if(7>c.isFF){var g=1;"dojoxFFEllipsisDelay"in c.config&&(g=Number(c.config.dojoxFFEllipsisDelay),isNaN(g)&&(g=1));try{var p=function(){var a=document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","window"),b=document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","description");b.setAttribute("crop",
"end");a.appendChild(b);return function(d){var b=a.cloneNode(!0);b.firstChild.setAttribute("value",d.textContent);d.innerHTML="";d.appendChild(b)}}()}catch(v){}var n=c.create,q=c.doc,r=c.place,s=n("iframe",{className:"dojoxEllipsisIFrame",src:"javascript:'\x3chtml\x3e\x3chead\x3e\x3cscript\x3eif(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}\x3c/script\x3e\x3c/head\x3e\x3cbody\x3e\x3c/body\x3e\x3c/html\x3e'",style:{display:"none"}}),k=function(a,b){if(!a.collapsed)if(0<b){do k(a),
b--;while(b)}else if(3==a.endContainer.nodeType&&0<a.endOffset)a.setEnd(a.endContainer,a.endOffset-1);else if(3==a.endContainer.nodeType)a.setEndBefore(a.endContainer),k(a);else if(a.endOffset&&a.endContainer.childNodes.length>=a.endOffset){var d=a.endContainer.childNodes[a.endOffset-1];3==d.nodeType?a.setEnd(d,d.length-1):(d.childNodes.length?a.setEnd(d,d.childNodes.length):a.setEndBefore(d),k(a))}else a.setEndBefore(a.endContainer),k(a)},t=function(a){var b=n("div",{className:"dojoxEllipsisContainer"}),
d=n("div",{className:"dojoxEllipsisShown",style:{display:"none"}});a.parentNode.replaceChild(b,a);b.appendChild(a);b.appendChild(d);var c=s.cloneNode(!0),f=a.style,g=d.style,e=function(){f.display="";g.display="none";if(!(a.scrollWidth<=a.offsetWidth)){var b=q.createRange();b.selectNodeContents(a);f.display="none";g.display="";var c=!1;do{var e=1;r(b.cloneContents(),d,"only");var l=d.scrollWidth,h=d.offsetWidth,c=l<=h,l=1-1*h/l;0<l&&(e=Math.max(Math.round(d.textContent.length*l)-1,1));k(b,e)}while(!b.collapsed&&
!c)}};c.onload=function(){c.contentWindow.onresize=e;e()};b.appendChild(c)},u=c.hasClass,e=c.doc,f,h,m;e.querySelectorAll?(f=e,h="querySelectorAll",m=".dojoxEllipsis"):e.getElementsByClassName?(f=e,h="getElementsByClassName",m="dojoxEllipsis"):(f=c,h="query",m=".dojoxEllipsis");fx=function(){c.forEach(f[h].apply(f,[m]),function(a){a&&!a._djx_ellipsis_done&&(a._djx_ellipsis_done=!0,p&&a.textContent==a.innerHTML&&!u(a,"dojoxEllipsisSelectable")?p(a):t(a))})};c.addOnLoad(function(){var a=null,b=null,
d=function(){b&&(c.disconnect(b),b=null);a&&clearTimeout(a);a=setTimeout(function(){a=null;fx();b=c.connect(c.body(),"DOMSubtreeModified",d)},g)};d()})}});
/// ellipsis.js.map