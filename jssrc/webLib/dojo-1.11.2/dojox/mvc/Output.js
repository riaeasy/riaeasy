//>>built
define("dojox/mvc/Output",["dojo/_base/declare","dojo/_base/lang","dojo/dom","dijit/_WidgetBase","dojo/regexp"],function(e,f,g,h,k){return e("dojox.mvc.Output",h,{exprchar:"$",templateString:"",postscript:function(a,c){if(this.srcNodeRef=g.byId(c))this.templateString=this.srcNodeRef.innerHTML,this.srcNodeRef.innerHTML="";this.inherited(arguments)},set:function(a,c){this.inherited(arguments);"value"===a&&this._output()},_updateBinding:function(a,c,d){this.inherited(arguments);this._output()},_output:function(){(this.srcNodeRef||
this.domNode).innerHTML=this.templateString?this._exprRepl(this.templateString):this.value},_exprRepl:function(a){var c=this,d=function(a,d){if(!a)return"";var b=a.substr(2),b=b.substr(0,b.length-1);with(c)return(b=eval(b))||0==b?b:""},d=f.hitch(this,d);return a.replace(RegExp(k.escapeString(this.exprchar)+"({.*?})","g"),function(a,c,b){return d(a,c).toString()})}})});
/// Output.js.map