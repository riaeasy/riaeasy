define(["rias"],function(c){return function(a,b,c){a=this.fetchByName(b,"pathname",_typeStr);b={success:!1,value:0};/^[\w\/]+$/.test(a)?""==a?b={success:!1,value:"\u7f3a\u5c11\u64cd\u4f5c\u6743\u9650..."}:(a=this.createNewDir(a,"serverAct"),b=2===a?{success:0,value:"\u76ee\u5f55\u5df2\u7ecf\u5b58\u5728..."}:{success:1===a,value:a}):b={success:!1,value:"action\u8def\u5f84(\u76ee\u5f55)\u540d\u5305\u542b\u4e0d\u5408\u89c4\u5b57\u7b26..."};return b}});