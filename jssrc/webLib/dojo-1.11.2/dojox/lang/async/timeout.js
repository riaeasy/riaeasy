//>>built
define("dojox/lang/async/timeout",["dijit","dojo","dojox"],function(h,e,g){e.provide("dojox.lang.async.timeout");(function(){var f=g.lang.async.timeout;f.from=function(b){return function(){var a,c=function(){a&&(clearTimeout(a),a=null)},d=new e.Deferred(c);a=setTimeout(function(){c();d.callback(b)},b);return d}};f.failOn=function(b){return function(){var a,c=function(){a&&(clearTimeout(a),a=null)},d=new e.Deferred(c);a=setTimeout(function(){c();d.errback(b)},b);return d}}})()});
/// timeout.js.map