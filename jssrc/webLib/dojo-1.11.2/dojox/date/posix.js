//>>built
define("dojox/date/posix",["dojo/_base/kernel","dojo/date","dojo/date/locale","dojo/string","dojo/cldr/supplemental"],function(u,s,k,v,p){var h=u.getObject("date.posix",!0,dojox);h.strftime=function(a,b,e){for(var c=null,d=function(a,b){return v.pad(a,b||2,c||"0")},p=k._getGregorianBundle(e),f=function(b){switch(b){case "a":return k.getNames("days","abbr","format",e)[a.getDay()];case "A":return k.getNames("days","wide","format",e)[a.getDay()];case "b":case "h":return k.getNames("months","abbr","format",
e)[a.getMonth()];case "B":return k.getNames("months","wide","format",e)[a.getMonth()];case "c":return k.format(a,{formatLength:"full",locale:e});case "C":return d(Math.floor(a.getFullYear()/100));case "d":return d(a.getDate());case "D":return f("m")+"/"+f("d")+"/"+f("y");case "e":return null==c&&(c=" "),d(a.getDate());case "f":return null==c&&(c=" "),d(a.getMonth()+1);case "G":console.warn("unimplemented modifier 'G'");break;case "F":return f("Y")+"-"+f("m")+"-"+f("d");case "H":return d(a.getHours());
case "I":return d(a.getHours()%12||12);case "j":return d(k._getDayOfYear(a),3);case "k":return null==c&&(c=" "),d(a.getHours());case "l":return null==c&&(c=" "),d(a.getHours()%12||12);case "m":return d(a.getMonth()+1);case "M":return d(a.getMinutes());case "n":return"\n";case "p":return p["dayPeriods-format-wide-"+(12>a.getHours()?"am":"pm")];case "r":return f("I")+":"+f("M")+":"+f("S")+" "+f("p");case "R":return f("H")+":"+f("M");case "S":return d(a.getSeconds());case "t":return"\t";case "T":return f("H")+
":"+f("M")+":"+f("S");case "u":return String(a.getDay()||7);case "U":return d(k._getWeekOfYear(a));case "V":return d(h.getIsoWeekOfYear(a));case "W":return d(k._getWeekOfYear(a,1));case "w":return String(a.getDay());case "x":return k.format(a,{selector:"date",formatLength:"full",locale:e});case "X":return k.format(a,{selector:"time",formatLength:"full",locale:e});case "y":return d(a.getFullYear()%100);case "Y":return String(a.getFullYear());case "z":return b=a.getTimezoneOffset(),(0<b?"-":"+")+d(Math.floor(Math.abs(b)/
60))+":"+d(Math.abs(b)%60);case "Z":return s.getTimezoneName(a);case "%":return"%"}},m="",g=0,n=0,l=null;-1!=(n=b.indexOf("%",g));){m+=b.substring(g,n++);switch(b.charAt(n++)){case "_":c=" ";break;case "-":c="";break;case "0":c="0";break;case "^":l="upper";break;case "*":l="lower";break;case "#":l="swap";break;default:c=null,n--}g=f(b.charAt(n++));switch(l){case "upper":g=g.toUpperCase();break;case "lower":g=g.toLowerCase();break;case "swap":for(var l=g.toLowerCase(),t="",q="",r=0;r<g.length;r++)q=
g.charAt(r),t+=q==l.charAt(r)?q.toUpperCase():q.toLowerCase();g=t}l=null;m+=g;g=n}return m+=b.substring(g)};h.getStartOfWeek=function(a,b){isNaN(b)&&(b=p.getFirstDayOfWeek?p.getFirstDayOfWeek():0);var e=b,e=a.getDay()>=b?e-a.getDay():e-(7-a.getDay()),c=new Date(a);c.setHours(0,0,0,0);return s.add(c,"day",e)};h.setIsoWeekOfYear=function(a,b){if(!b)return a;var e=h.getIsoWeekOfYear(a),c=b-e;0>b&&(c=h.getIsoWeeksInYear(a)+b+1-e);return s.add(a,"week",c)};h.getIsoWeekOfYear=function(a){var b=h.getStartOfWeek(a,
1);a=new Date(a.getFullYear(),0,4);a=h.getStartOfWeek(a,1);a=b.getTime()-a.getTime();return 0>a?h.getIsoWeeksInYear(b):Math.ceil(a/6048E5)+1};h.getIsoWeeksInYear=function(a){function b(a){return a+Math.floor(a/4)-Math.floor(a/100)+Math.floor(a/400)}a=a.getFullYear();return 4==b(a)%7||3==b(a-1)%7?53:52};return h});
/// posix.js.map