define(["rias"],function(g){return function(c,e,a){var d=this.fetchByName(e,"pathname",_typeStr),b=this.extractFilenameNoExt(d);c=this.changeFileExt(d,"");e=c.replace(/^appModule/,"rsfsModule");var f=["","","{}"];a={success:!1,value:0};/^[\w\/]+$/.test(c)?(a=this.readJson(e+".rsfs","rsfsModule",!0),a={_opened:a._opened&&a._opened.sessionid?a._opened:{sessionid:""},_count:0<a._count?a._count:49,position:0<a.position?a.position:0,items:g.isArray(a.items)?a.items:[]},0<a.items.length&&a.position<a.items.length-1&&(-1>a.position&&(a.position=-1),a.position++,(d=a.items[a.position])&&d.rsfVersion&&(d=this.extractDir(e)+"/"+b+"_rsf/"+b+"_"+d.rsfVersion+".rsf",b=this.readJson(d,"rsfsModule",!0),a.rsfVersion=b._rsfVersion=0<b._rsfVersion?b._rsfVersion:1,b=g.toJson(b,{prettyPrint:!0,includeFunc:!0,loopToString:!1,errorToString:!0,simpleObject:!0}),f[2]=b,f=g.substitute('define([\n\t"rias"${0}\n], function(rias${1}){\n\treturn ${2}\n\t\n});\n',f),this.writeText(c+".js","appModule",f,!0))),c=this.writeJson(e+".rsfs","rsfsModule",a,{},!0),a={success:1===c,value:c}):a={success:!1,value:"\u6a21\u5757\u540d\u5305\u542b\u4e0d\u5408\u89c4\u5b57\u7b26..."};return a}});