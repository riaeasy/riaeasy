//>>built
define("dojox/fx/text","dojo/_base/lang ./_base dojo/_base/fx dojo/fx dojo/fx/easing dojo/dom dojo/dom-style dojo/_base/html dojo/_base/connect".split(" "),function(w,z,q,y,m,r,s,x,v){var c=w.getObject("dojox.fx.text",!0);c._split=function(a){function f(b){var d=b.nextSibling;if("SPAN"==b.tagName&&1==b.childNodes.length&&3==b.firstChild.nodeType){var e=x.coords(b,!0);q++;s.set(b,{padding:0,margin:0,top:a.crop?"0px":e.t+"px",left:a.crop?"0px":e.l+"px",display:"inline"});b=a.pieceAnimation(b,e,h,q,
m);w.isArray(b)?g=g.concat(b):g[g.length]=b}else b.firstChild&&f(b.firstChild);d&&f(d)}var b=a.node=r.byId(a.node),d=b.style,e=s.getComputedStyle(b),h=x.coords(b,!0);a.duration=a.duration||1E3;a.words=a.words||!1;var n=a.text&&"string"==typeof a.text?a.text:b.innerHTML,k=d.height,c=d.width,g=[];s.set(b,{height:e.height,width:e.width});for(var d=/(<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)/g,e=a.words?/(<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)\s*|([^\s<]+\s*)/g:
/(<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)\s*|([^\s<]\s*)/g,e="string"==typeof a.text?a.text.match(e):b.innerHTML.match(e),l="",m=0,q=0,t=0;t<e.length;t++){var u=e[t];u.match(d)?l+=u:(l+="\x3cspan\x3e"+u+"\x3c/span\x3e",m++)}b.innerHTML=l;f(b.firstChild);d=y.combine(g);v.connect(d,"onEnd",d,function(){b.innerHTML=n;s.set(b,{height:k,width:c})});a.onPlay&&v.connect(d,"onPlay",d,a.onPlay);a.onEnd&&v.connect(d,"onEnd",d,a.onEnd);return d};c.explode=function(a){a.node=r.byId(a.node);
a.distance=a.distance||1;a.duration=a.duration||1E3;a.random=a.random||0;"undefined"==typeof a.fade&&(a.fade=!0);"undefined"==typeof a.sync&&(a.sync=!0);a.random=Math.abs(a.random);a.pieceAnimation=function(f,b,d,e,h){var c=b.h,k=b.w;h=2*a.distance;e=a.duration;var p=parseFloat(f.style.top),g=parseFloat(f.style.left),l=0,r=0,v=0;a.random&&(l=Math.random()*a.random+Math.max(1-a.random,0),h*=l,e*=l,l=a.unhide&&a.sync||!a.unhide&&!a.sync?a.duration-e:0,r=Math.random()-0.5,v=Math.random()-0.5);c=(d.h-
c)/2-(b.y-d.y);b=(d.w-k)/2-(b.x-d.x);d=Math.sqrt(Math.pow(b,2)+Math.pow(c,2));var t=p-c*h+d*v,u=g-b*h+d*r;b=q.animateProperty({node:f,duration:e,delay:l,easing:a.easing||(a.unhide?m.sinOut:m.circOut),beforeBegin:a.unhide?function(){a.fade&&s.set(f,"opacity",0);f.style.position=a.crop?"relative":"absolute";f.style.top=t+"px";f.style.left=u+"px"}:function(){f.style.position=a.crop?"relative":"absolute"},properties:{top:a.unhide?{start:t,end:p}:{start:p,end:t},left:a.unhide?{start:u,end:g}:{start:g,
end:u}}});return a.fade?(e=q.animateProperty({node:f,duration:e,delay:l,easing:a.fadeEasing||m.quadOut,properties:{opacity:a.unhide?{start:0,end:1}:{end:0}}}),a.unhide?[e,b]:[b,e]):b};return c._split(a)};c.converge=function(a){a.unhide=!0;return c.explode(a)};c.disintegrate=function(a){a.node=r.byId(a.node);a.duration=a.duration||1500;a.distance=a.distance||1.5;a.random=a.random||0;a.fade||(a.fade=!0);var f=Math.abs(a.random);a.pieceAnimation=function(b,d,e,h,c){var k=a.interval||a.duration/(1.5*
c);d=a.duration-c*k;var p=Math.random()*c*k;h=a.reverseOrder||0>a.distance?h*k:(c-h)*k;h=p*f+Math.max(1-f,0)*h;var g={};a.unhide?(g.top={start:parseFloat(b.style.top)-e.h*a.distance,end:parseFloat(b.style.top)},a.fade&&(g.opacity={start:0,end:1})):(g.top={end:parseFloat(b.style.top)+e.h*a.distance},a.fade&&(g.opacity={end:0}));return q.animateProperty({node:b,duration:d,delay:h,easing:a.easing||(a.unhide?m.sinIn:m.circIn),properties:g,beforeBegin:a.unhide?function(){a.fade&&s.set(b,"opacity",0);b.style.position=
a.crop?"relative":"absolute";b.style.top=g.top.start+"px"}:function(){b.style.position=a.crop?"relative":"absolute"}})};return c._split(a)};c.build=function(a){a.unhide=!0;return c.disintegrate(a)};c.blockFadeOut=function(a){a.node=r.byId(a.node);a.duration=a.duration||1E3;a.random=a.random||0;var f=Math.abs(a.random);a.pieceAnimation=function(b,d,e,c,n){var k=a.interval||a.duration/(1.5*n);d=a.duration-n*k;e=Math.random()*n*k;c=a.reverseOrder?(n-c)*k:c*k;c=e*f+Math.max(1-f,0)*c;return q.animateProperty({node:b,
duration:d,delay:c,easing:a.easing||m.sinInOut,properties:{opacity:a.unhide?{start:0,end:1}:{end:0}},beforeBegin:a.unhide?function(){s.set(b,"opacity",0)}:void 0})};return c._split(a)};c.blockFadeIn=function(a){a.unhide=!0;return c.blockFadeOut(a)};c.backspace=function(a){a.node=r.byId(a.node);a.words=!1;a.duration=a.duration||2E3;a.random=a.random||0;var f=Math.abs(a.random),b=10;a.pieceAnimation=function(d,c,h,n,k){c=a.interval||a.duration/(1.5*k);h="textContent"in d?d.textContent:d.innerText;var p=
h.match(/\s/g);"undefined"==typeof a.wordDelay&&(a.wordDelay=2*c);a.unhide||(b=(k-n-1)*c);var g,l;a.fixed?a.unhide&&(g=function(){s.set(d,"opacity",0)}):a.unhide?(g=function(){d.style.display="none"},l=function(){d.style.display="inline"}):l=function(){d.style.display="none"};n=q.animateProperty({node:d,duration:1,delay:b,easing:a.easing||m.sinInOut,properties:{opacity:a.unhide?{start:0,end:1}:{end:0}},beforeBegin:g,onEnd:l});a.unhide&&(k=Math.random()*h.length*c,g=k*f/2+Math.max(1-f/2,0)*a.wordDelay,
b+=k*f+Math.max(1-f,0)*c*h.length+g*(p&&h.lastIndexOf(p[p.length-1])==h.length-1));return n};return c._split(a)};c.type=function(a){a.unhide=!0;return c.backspace(a)};return c});
/// text.js.map