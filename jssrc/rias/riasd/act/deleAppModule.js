define(["rias"],function(c){return function(b,a,c){a=this.fetchByName(a,"pathname",_typeStr);b="js"===this.extractFileExt(a)?a.replace(/\.js$/gi,""):a;a={success:!1,value:0};a=this.extractDir(b,"appModule");/^[\w\/]+$/.test(b)?""==a||/appModule\/app$/gi.test(a)?a={success:!1,value:"\u7f3a\u5c11\u64cd\u4f5c\u6743\u9650..."}:(this.isDirectory(b,"appModule")?a=this.deleteFile(b,"appModule"):(a=this.deleteFile(b.replace(/^appModule/,"rsfsModule")+".rsfs","rsfsModule"),1===a&&(a=this.deleteFile(b+".js","appModule"))),a={success:1===a,value:a}):a={success:!1,value:"\u6a21\u5757\u8def\u5f84(\u76ee\u5f55\u6587\u4ef6)\u540d\u5305\u542b\u4e0d\u5408\u89c4\u5b57\u7b26..."};return a}});