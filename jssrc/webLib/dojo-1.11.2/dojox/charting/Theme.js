//>>built
define("dojox/charting/Theme","dojo/_base/lang dojo/_base/declare dojo/_base/Color ./SimpleTheme dojox/color/_base dojox/color/Palette dojox/gfx/gradutils".split(" "),function(h,l,k,d,g,m){var e=l("dojox.charting.Theme",d,{});h.mixin(e,{defineColors:function(a){a=a||{};var c,b=[],e=a.num||5;if(a.colors){c=a.colors.length;for(var f=0;f<e;f++)b.push(a.colors[f%c]);return b}return a.hue?(b=a.saturation||100,c=((a.high||90)+(a.low||30))/2,m.generate(g.fromHsv(a.hue,b,c),"monochromatic").colors):a.generator?
g.Palette.generate(a.base,a.generator).colors:b},generateGradient:function(a,c,b){a=h.delegate(a);a.colors=[{offset:0,color:c},{offset:1,color:b}];return a},generateHslColor:function(a,c){a=new k(a);var b=a.toHsl(),b=g.fromHsl(b.h,b.s,c);b.a=a.a;return b},generateHslGradient:function(a,c,b,d){a=new k(a);var f=a.toHsl();b=g.fromHsl(f.h,f.s,b);d=g.fromHsl(f.h,f.s,d);b.a=d.a=a.a;return e.generateGradient(c,b,d)}});e.defaultMarkers=d.defaultMarkers;e.defaultColors=d.defaultColors;e.defaultTheme=d.defaultTheme;
return e});
/// Theme.js.map