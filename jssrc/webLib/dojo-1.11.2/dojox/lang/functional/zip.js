//>>built
define("dojox/lang/functional/zip",["dojo/_base/lang","./lambda"],function(g,c){g.mixin(c,{zip:function(){for(var b=arguments[0].length,e=arguments.length,a=1,c=Array(b),d,f;a<e;b=Math.min(b,arguments[a++].length));for(a=0;a<b;++a){f=Array(e);for(d=0;d<e;f[d]=arguments[d][a],++d);c[a]=f}return c},unzip:function(b){return c.zip.apply(null,b)}})});
/// zip.js.map