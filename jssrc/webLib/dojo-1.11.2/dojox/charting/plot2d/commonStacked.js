//>>built
define("dojox/charting/plot2d/commonStacked",["dojo/_base/lang","dojox/lang/functional","./common"],function(m,p,q){var n=m.getObject("dojox.charting.plot2d.commonStacked",!0);return m.mixin(n,{collectStats:function(l,k){for(var f=m.delegate(q.defaultStats),g=0;g<l.length;++g)for(var e=l[g],c=0;c<e.data.length;c++){var a,b;null!==e.data[c]&&("number"==typeof e.data[c]||!e.data[c].hasOwnProperty("x")?(b=n.getIndexValue(l,g,c,k)[0],a=c+1):(a=e.data[c].x,null!==a&&(b=n.getValue(l,g,a,k)[0],b=null!=b&&
b.y?b.y:null)),f.hmin=Math.min(f.hmin,a),f.hmax=Math.max(f.hmax,a),f.vmin=Math.min(f.vmin,b),f.vmax=Math.max(f.vmax,b))}return f},rearrangeValues:function(l,k,f){var g=p.filter(l,"x"),e=g.length;if(!e)return l;for(var c={},a=0;a<e;++a){for(var b=g[a],d=b.min,h=b.max;d<h;++d)b[d]=(b[d]||0)+(c[d]||0);c=b}for(a=0;a<e;++a){b=g[a];d=b.min;for(h=b.max;d<h;++d)b[d]=this.isNullValue(b[d])?0:k(b[d])-f}if(this.opt.minWidth){k=this.opt.minWidth;for(a=e-1;a;--a){b=g[a];c=g[a-1];d=b.min;for(h=b.max;d<h;++d)b[d]-=
c[d]}c=b.max;for(d=b.min;d<c;++d){for(a=f=b=0;a<e;++a)h=g[a][d],0<h&&(b+=h,++f);if(b<=f*k)for(a=0;a<e;++a)h=g[a][d],0<h&&(g[a][d]=k);else{for(a=f=0;a<e;++a)b=g[a],h=b[d],0<h&&(h<k?(f+=k-h,b[d]=k):0<f&&(h=b[d]-k,h>=f?(b[d]-=f,f=0):0<h&&(b[d]=k,f-=h)));if(0<f)for(a=e-1;0<=a;--a)if(b=g[a],h=b[d],0<h)if(h=b[d]-k,h>=f){b[d]-=f;break}else 0<h&&(b[d]=k,f-=h)}}for(a=1;a<e;++a){b=g[a];c=g[a-1];d=b.min;for(h=b.max;d<h;++d)b[d]+=c[d]}}return l},getIndexValue:function(l,k,f,g){var e=0,c,a;for(a=0;a<=k;++a)c=
l[a].data[f],g(c)||(isNaN(c)&&(c=c.y||0),e+=c);return e},getValue:function(l,k,f,g){var e=null,c,a;for(c=0;c<=k;++c)for(a=0;a<l[c].data.length;a++)if(v=l[c].data[a],!g(v))if(v.x==f){e||(e={x:f});null!=v.y&&(null==e.y&&(e.y=0),e.y+=v.y);break}else if(v.x>f)break;return e},getIndexValue:function(l,k,f,g){var e=0,c,a,b;for(a=0;a<=k;++a)l[a].hidden||(b=e,c=l[a].data[f],g(c)||(isNaN(c)&&(c=c.y||0),e+=c));return[e,b]},getValue:function(l,k,f,g){var e=null,c,a,b,d;for(c=0;c<=k;++c)if(!l[c].hidden)for(a=
0;a<l[c].data.length;a++)if(d=e,b=l[c].data[a],!g(b))if(b.x==f){e||(e={x:f});null!=b.y&&(null==e.y&&(e.y=0),e.y+=b.y);break}else if(b.x>f)break;return[e,d]}})});
/// commonStacked.js.map