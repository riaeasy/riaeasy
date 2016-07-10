//>>built
define("dojox/rpc/OfflineRest",["dojo","dojox","dojox/data/ClientFilter","dojox/rpc/Rest","dojox/storage"],function(g,d){function m(a){return a.replace(/[^0-9A-Za-z_]/g,"_")}function p(a,c){if(n&&!r&&(c||a&&a.__id))d.storage.put(m(c||a.__id),"object"==typeof a?d.json.ref.toJson(a):a,function(){},l)}function t(a){return a instanceof Error&&(503==a.status||12E3<a.status||!a.status)}function u(){if(n){var a=d.storage.get("dirty",l);if(a)for(var c in a)v(c,a)}}function s(){f.sendChanges();f.downloadChanges()}
function w(a,c,b,e,h){"delete"==a?d.storage.remove(m(c),l):d.storage.put(m(b),e,function(){},l);if(a=h&&h._store)a.updateResultSet(a._localBaseResults,a._localBaseFetch),d.storage.put(m(h._getRequest(a._localBaseFetch.query).url),d.json.ref.toJson(a._localBaseResults),function(){},l)}function v(a,c){var b=c[a],e=d.rpc.JsonRest.getServiceAndId(b.id),e=x(b.method,e.service,e.id,b.content);c[a]=b;d.storage.put("dirty",c,function(){},l);e.addBoth(function(c){if(t(c))return null;var b=d.storage.get("dirty",
l)||{};delete b[a];d.storage.put("dirty",b,function(){},l);return c});return e}var k=d.rpc.Rest,l="dojox_rpc_OfflineRest",n,q=k._index;d.storage.manager.addOnLoad(function(){n=d.storage.manager.available;for(var a in q)p(q[a],a)});var r,f,z=setInterval(s,15E3);g.connect(document,"ononline",s);f=d.rpc.OfflineRest={turnOffAutoSync:function(){clearInterval(z)},sync:s,sendChanges:u,downloadChanges:function(){},addStore:function(a,c){f.stores.push(a);a.fetch({queryOptions:{cache:!0},query:c,onComplete:function(c,
d){a._localBaseResults=c;a._localBaseFetch=d}})}};f.stores=[];var A=k._get;k._get=function(a,c){try{u();if(window.navigator&&!1===navigator.onLine)throw Error();var b=A(a,c)}catch(e){b=new g.Deferred,b.errback(e)}var h=d.rpc._sync;b.addCallback(function(d){p(d,a._getRequest(c).url);return d});b.addErrback(function(e){if(n){if(t(e)){var y={},f=function(a,c){if(y[a])return c;var b=g.fromJson(d.storage.get(m(a),l))||c;y[a]=b;for(var e in b){var h=b[e];if(a=h&&h.$ref)a.substring&&"cid:"==a.substring(0,
4)&&(a=a.substring(4)),b[e]=f(a,h)}if(b instanceof Array)for(e=0;e<b.length;e++)void 0===b[e]&&b.splice(e--,1);return b};r=!0;var k=f(a._getRequest(c).url);if(!k)return e;r=!1;return k}return e}if(h)return Error("Storage manager not loaded, can not continue");b=new g.Deferred;b.addCallback(arguments.callee);d.storage.manager.addOnLoad(function(){b.callback()});return b});return b};g.addOnLoad(function(){g.connect(d.data,"restListener",function(a){var c=a.channel,b=a.event.toLowerCase(),e=d.rpc.JsonRest&&
d.rpc.JsonRest.getServiceAndId(c).service;w(b,c,"post"==b?c+a.result.id:c,g.toJson(a.result),e)})});var x=k._change;k._change=function(a,c,b,e){if(!n)return x.apply(this,arguments);var h=c._getRequest(b).url;w(a,h,d.rpc.JsonRest._contentId,e,c);var g=d.storage.get("dirty",l)||{};if("put"==a||"delete"==a)var f=h;else{var f=0,k;for(k in g)isNaN(parseInt(k))||(f=k);f++}g[f]={method:a,id:h,content:e};return v(f,g)};g.connect(q,"onLoad",p);g.connect(q,"onUpdate",p);return f});
/// OfflineRest.js.map