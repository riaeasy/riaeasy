//>>built
define("dojox/date/hebrew",["dojox/main","dojo/_base/lang","dojo/date","./hebrew/Date"],function(l,m,n,k){var g=m.getObject("date.hebrew",!0,l);g.getDaysInMonth=function(c){return c.getDaysInHebrewMonth(c.getMonth(),c.getFullYear())};g.compare=function(c,b,a){c instanceof k&&(c=c.toGregorian());b instanceof k&&(b=b.toGregorian());return n.compare.apply(null,arguments)};g.add=function(c,b,a){var e=new k(c);switch(b){case "day":e.setDate(c.getDate()+a);break;case "weekday":b=c.getDay();var d=0;0>a&&
6==b&&(b=5,d=-1);if(5>b+a&&0<=b+a)e.setDate(c.getDate()+a+d);else{var f=0<a?5:-1,h=0<a?2:-2;if(0<a&&(5==b||6==b))d=4-b,b=4;a=b+a-f;var g=parseInt(a/5);e.setDate(c.getDate()-b+h+7*g+d+a%5+f)}break;case "year":e.setFullYear(c.getFullYear()+a);break;case "week":e.setDate(c.getDate()+7*a);break;case "month":b=c.getMonth();a=b+a;c.isLeapYear(c.getFullYear())||(5>b&&5<=a?a++:5<b&&5>=a&&a--);e.setMonth(a);break;case "hour":e.setHours(c.getHours()+a);break;case "minute":e._addMinutes(a);break;case "second":e._addSeconds(a);
break;case "millisecond":e._addMilliseconds(a)}return e};g.difference=function(c,b,a){b=b||new k;a=a||"day";var e=b.getFullYear()-c.getFullYear(),d=1;switch(a){case "weekday":d=Math.round(g.difference(c,b,"day"));a=parseInt(g.difference(c,b,"week"));e=d%7;if(0==e)d=5*a;else{var f=0,h=c.getDay();b=b.getDay();a=parseInt(d/7);e=d%7;c=new k(c);c.setDate(c.getDate()+7*a);c=c.getDay();if(0<d)switch(!0){case 5==h:f=-1;break;case 6==h:f=0;break;case 5==b:f=-1;break;case 6==b:f=-2;break;case 5<c+e:f=-2}else if(0>
d)switch(!0){case 5==h:f=0;break;case 6==h:f=1;break;case 5==b:f=2;break;case 6==b:f=1;break;case 0>c+e:f=2}d=d+f-2*a}break;case "year":d=e;break;case "month":f=b.toGregorian()>c.toGregorian()?b:c;a=b.toGregorian()>c.toGregorian()?c:b;h=f.getMonth();d=a.getMonth();if(0==e)d=!b.isLeapYear(b.getFullYear())&&5<f.getMonth()&&5>=a.getMonth()?f.getMonth()-a.getMonth()-1:f.getMonth()-a.getMonth();else{d=!a.isLeapYear(a.getFullYear())&&6>d?13-d-1:13-d;d+=!f.isLeapYear(f.getFullYear())&&5<h?h-1:h;e=a.getFullYear()+
1;f=f.getFullYear();for(e;e<f;e++)d+=a.isLeapYear(e)?13:12}b.toGregorian()<c.toGregorian()&&(d=-d);break;case "week":d=parseInt(g.difference(c,b,"day")/7);break;case "day":d/=24;case "hour":d/=60;case "minute":d/=60;case "second":d/=1E3;case "millisecond":d*=b.toGregorian().getTime()-c.toGregorian().getTime()}return Math.round(d)};return g});
/// hebrew.js.map