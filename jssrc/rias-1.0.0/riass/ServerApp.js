define(["rias/riass/riass","rias/riass/FileMixin"],function(d,q){function r(a,b){function c(a){a=d.mixinDeep({},a);var c;if(!a.dbName||!a.dbConfig)throw Error("loadDbs has no dbName or dbConfig.",a);try{d.log(1,f,"Setting DB["+a.dbName+"] Connection ..."),"mysql"==a.dbType&&d.synRequire(["rias/riasdb/DbMySQL"],function(g){try{a={ownerRiasw:e,app:e,dbTables:a.dbTables,dbName:a.dbName,dbConfig:a.dbConfig,maxResultRecords:b},c=new g(a),e.dbs[a.dbName]=c,a.dbTables||(c.afterGetDbDefine=function(a){try{var b="serverApp/db/"+c.dbName.replace(/\\|\//,"_")+".json";e.writeJson(b,"serverApp",a,{},!0);d.log(1,f,"Save DB["+c.dbName+"] define in "+b)}catch(m){d.log(3,f,"Save DB["+c.dbName+"] define Error: "+m,m)}},c.getDbDefine())}catch(p){d.log(3,f,"Setting DB["+a.dbName+"] Connection Error: "+p,p)}})}catch(n){d.log(3,f,"Setting DB["+a.dbName+"] Connection Error: "+n,n)}}var e=this,g,h,f=e.appName+".serverApp";for(g in e.dbs)e.dbs.hasOwnProperty(g)&&(h=e.dbs[g],d.isString(h)?a.hasOwnProperty(h)&&(g=h,h=a[h],d.isObjectSimple(h)&&c({dbType:h.dbType,dbTables:void 0,dbName:g,dbConfig:h})):d.isObjectSimple(h)&&c(h));e.defaultDb=e.dbs[e.defaultDbName];e.defaultDb||d.log(2,f,"There's no defaultDb: '"+e.defaultDbName+"'.")}return d.declare("rias.riass.ServerApp",[d.ClassBase,q],{debugLevel:d.host.debugLevel(),defaultLanguage:"zh",defaultDbName:"riastudio",defaultDb:null,postMixInProperties:function(){this.path||(this.path={});this.path.riasLib=this.getFilePathName(riasServerConfig.riasLib?riasServerConfig.riasLib:"jssrc/rias");this.path.webLib=this.getFilePathName(riasServerConfig.webLib?riasServerConfig.webLib:"jssrc/webLib");this.path.appRoot=this.getFilePathName(riasServerConfig.appsRoot?riasServerConfig.appsRoot+"/"+this.appName:"jssrc/riasApp");this._initPackagePath();this.defaultLanguage=this.defaultLanguage||d.host.ServerEnv.getServerConfig("defaultLanguage")||"zh";this.defaultDbName=this.defaultDbName||"riastudio";this.dbs||(this.dbs={});this.inherited(arguments)},postCreate:function(){this.inherited(arguments);r.apply(this,[riasServerConfig.dbConfigs,riasServerConfig.maxResultRecords]);var a=this;d.synRequire([this.appName+"/serverApp/actMapper",this.appName+"/serverApp/actRight",this.appName+"/serverApp/actLog",this.appName+"/serverApp/pageRight","dojo/i18n!"+this.appName+"/serverApp/nls/appi18n"],function(b,c,e,g,h){var f;a.actMapper={};for(f in b)b.hasOwnProperty(f)&&("/"===f?a.actMapper["/"]=b["/"]:"*"===f?a.actMapper["/"]=b["*"]:""===f?a.actMapper["/"]=b[""]:a.actMapper[f.toLowerCase()]=b[f]);a.actRight={"/act/login":{requireLogged:!1,requireRights:!1},"/act/logout":{requireLogged:!1,requireRights:!1},"/act/heartbeat":{requireLogged:!0,requireRights:!1},"/act/page":{requireLogged:!1,requireRights:!1}};for(f in c)c.hasOwnProperty(f)&&("/"===f?a.actRight["/"]=c["/"]:"*"===f?a.actRight["/"]=c["*"]:""===f?a.actRight["/"]=c[""]:a.actRight[f.toLowerCase()]=c[f]);if(1==e)a.actLog=!0;else if(d.isObjectSimple(e))for(f in a.actLog={},e)e.hasOwnProperty(f)&&("/"===f?a.actLog["/"]=e["/"]:"*"===f?a.actLog["/"]=e["*"]:""===f?a.actLog["/"]=e[""]:a.actLog[f.toLowerCase()]=e[f]);else a.actLog=!1;a.pageRight={};for(f in g)g.hasOwnProperty(f)&&("/"===f?a.pageRight["/"]=g["/"]:"*"===f?a.pageRight["/"]=g["*"]:""===f?a.pageRight["/"]=g[""]:a.pageRight[f.toLowerCase()]=g[f]);d.i18n[a.appName]=h;d.host.ServerEnv.putI18n(a.appName,h,"")})},destroy:function(a){a||d.forEach(this.dbs,function(a){d.destroy(a)});this.dbs=void 0;this.inherited(arguments)},encodeURI:function(a){return encodeURI(d.host.jsString(a))},decodeURI:function(a){return decodeURI(d.host.jsString(a))},fetchByName:function(a,b,c){var e=this.getAttribute(a,b,c);return null==e?this.getParameter(a,b,c):d.host.jsType(e,c)},getParameter:function(a,b,c){b=d.host.isRequest(a)?a.getParameter(b):a.parameter[b];return null==b?null:d.host.jsType(b,c||d.host._typeStr)},getAttribute:function(a,b,c){b=d.host.isRequest(a)?a.getAttribute(b):a.attribute[b];return null==b?null:d.host.jsType(b,c)},setAttribute:function(a,b,c){d.host.isRequest(a)?a.setAttribute(b,c):a.attribute[b]=c},removeAttribute:function(a,b){d.host.isRequest(a)?a.removeAttribute(b):delete a.attribute[b]},getAttributeNames:function(a){var b={},c,e;if(d.host.isRequest(a))for(e=a.getAttributeNames();e.hasMoreElements();)c=d.host.jsString(e.nextElement()),b[c]=this.getAttribute(a,c);else for(c in a.attribute)b[c]=a.attribute[c];return b},getParameters:function(a){var b={},c,e;if(d.host.isRequest(a))for(e=a.getParameterNames();e.hasMoreElements();)c=d.host.jsString(e.nextElement()),b[c]=this.getParameter(a,c);else for(c in a.parameter)b[c]=a.parameter[c];return b},getRemoteIp:function(a){return d.host.getRemoteIp(a)},getLocalPort:function(a){return d.host.isRequest(a)?a.getLocalPort():a.port||0},getRequestURI:function(a){return d.host.isRequest(a)?this.decodeURI(a.getRequestURI()):a.uri||a.url||""},getRequestURL:function(a){return d.host.isRequest(a)?this.decodeURI(a.getRequestURL()):a.url||""},getServletPath:function(a){return d.host.isRequest(a)?this.decodeURI(a.getServletPath()):a.servletPath||""},getPathInfo:function(a){return d.host.isRequest(a)?this.decodeURI(a.getPathInfo()):a.pathInfo||""},getMethod:function(a){return d.host.isRequest(a)?d.host.jsString(a.getMethod()):a.method||""},getConditionSrv:function(a,b,c,d,g){return a?a.getCondition(b,c,d,g):this.defaultDb.getCondition(b,c,d,g)},getEqualStrSrv:function(a,b,c){return a?a.getEqualStr(b,c):this.defaultDb.getEqualStr(b,c)},getLikeStrSrv:function(a,b,c){return a?a.getLikeStr(b,c):this.defaultDb.getLikeStr(b,c)},getWhereSrv:function(a,b){return a?a.getWhere(b):this.defaultDb.getWhere(b)},getOrderBySrv:function(a,b,c){return a?a.getOrderBy(b,c):this.defaultDb.getOrderBy(b,c)},getLimitSrv:function(a,b,c){return a?a.getLimit(b,c):this.defaultDb.getLimit(b,c)},canDo_actLog:function(a,b){function c(a){return 0==a?!1:1==a||"*"===a?!0:d.isString(a)?0<=a.indexOf(b):d.isObjectSimple(a)?1==a[b]:!!a}var e=a.toLowerCase().split("/"),g;if(1==this.actLog)return!0;if(d.isObjectSimple(this.actLog)){for(;e.length;){g=e.join("/");g=this.actLog[g];if(void 0!=g)return c(g);e.pop()}g=this.actLog["/"];if(void 0!=g)return c(g)}return!1},getSession:function(a,b){return a.getSession(!!b)},getOper:function(a){return this.getAttribute(a,"session.oper")},hasRight:function(a,b){b=d.trim(b).toLowerCase();b=a.rights[b];return 1==b},hasRightOf:function(a,b,c,e,g){function h(a,b){var h=!1,k,m,l;if(0==a||e.logged){if(b)if(l=d.isString(b)?b:b[c])for(l=l.split(","),k=0,m=l.length;k<m;k++){if(l[k]&&f.hasRight(e,l[k])){h=!0;break}}else h=!0;else h=!0;return h?!0:(g.responseCode=d.host.responseCode.SC_METHOD_NOT_ALLOWED,g.success=!1,g.value="\u7f3a\u5c11\u6743\u9650.",!1)}g.responseCode=d.host.responseCode.SC_UNAUTHORIZED;g.success=!1;g.value="\u9700\u8981\u767b\u5f55.";return!1}var f=this;b=b.toLowerCase().split("/");for(var k;b.length;){k=a[b.join("/")];if(void 0!=k)return h(k.requireLogged,k.requireRights);b.pop()}k=a["/"];return void 0!=k?h(k.requireLogged,k.requireRights):!0},hasOrigin:function(a){this.origins||(this.origins={"localhost:8081":1,"127.0.0.1:8081":1,"www.riaeasy.com:8081":1,"www.riaeasy.com:8043":1});a=d.trimStartStr(a,"http://");a=d.trimStartStr(a,"https://");a=a.split("/")[0];return a.startWith("localhost")||a.startWith("127.0.0.1")||a.startWith("www.riaeasy.com")?!0:!!this.origins[a]},setXdHeader:function(a,b){var c=a.getHeader("Origin");return null==c?!0:this.hasOrigin(c)?(b.header={"Access-Control-Allow-Origin":c,"Access-Control-Allow-Credentials":"true","Access-Control-Allow-Headers":"X-Requested-With,X-Range,Range","Access-Control-Expose-Headers":"Accept-Ranges,Content-Encoding,Content-Length,Content-Range","Access-Control-Allow-Methods":"GET,POST,OPTIONS"},!0):!1}})});