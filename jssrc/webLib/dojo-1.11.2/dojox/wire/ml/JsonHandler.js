//>>built
define("dojox/wire/ml/JsonHandler",["dijit","dojo","dojox","dojo/require!dojox/wire/ml/RestHandler,dojox/wire/_base,dojox/wire/ml/util"],function(g,a,f){a.provide("dojox.wire.ml.JsonHandler");a.require("dojox.wire.ml.RestHandler");a.require("dojox.wire._base");a.require("dojox.wire.ml.util");a.declare("dojox.wire.ml.JsonHandler",f.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(c,d){var e=null;if("POST"==c||"PUT"==c){var b=d?d[0]:void 0;
b&&(e=a.isString(b)?b:a.toJson(b))}return e}})});
/// JsonHandler.js.map