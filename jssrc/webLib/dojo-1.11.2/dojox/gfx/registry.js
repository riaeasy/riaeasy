//>>built
define("dojox/gfx/registry",["dojo/has","./shape"],function(h,f){h.add("gfxRegistry",1);var d={},g={},e={};d.register=f.register=function(a){var b=a.declaredClass.split(".").pop(),c=b in g?++g[b]:g[b]=0,b=b+c;e[b]=a;return b};d.byId=f.byId=function(a){return e[a]};d.dispose=f.dispose=function(a,b){if(b&&a.children)for(var c=0;c<a.children.length;++c)d.dispose(a.children[c],!0);c=a.getUID();e[c]=null;delete e[c]};return d});
/// registry.js.map