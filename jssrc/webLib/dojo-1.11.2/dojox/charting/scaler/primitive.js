//>>built
define("dojox/charting/scaler/primitive",["dojo/_base/lang"],function(d){var e=d.getObject("dojox.charting.scaler.primitive",!0);return d.mixin(e,{buildScaler:function(a,b,c,f){a==b&&(a-=0.5,b+=0.5);return{bounds:{lower:a,upper:b,from:a,to:b,scale:c/(b-a),span:c},scaler:e}},buildTicks:function(a,b){return{major:[],minor:[],micro:[]}},getTransformerFromModel:function(a){var b=a.bounds.from,c=a.bounds.scale;return function(a){return(a-b)*c}},getTransformerFromPlot:function(a){var b=a.bounds.from,c=
a.bounds.scale;return function(a){return a/c+b}}})});
/// primitive.js.map