//>>built
define("dojo/html","./_base/kernel ./_base/lang ./_base/array ./_base/declare ./dom ./dom-construct ./parser".split(" "),function(k,g,h,l,m,f,n){var p=0,e={_secureForInnerHtml:function(a){return a.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")},_emptyNode:f.empty,_setNodeContent:function(a,b){f.empty(a);if(b)if("number"==typeof b&&(b=b.toString()),"string"==typeof b&&(b=f.toDom(b,a.ownerDocument)),!b.nodeType&&g.isArrayLike(b))for(var c=b.length,d=0;d<b.length;d=c==b.length?
d+1:0)f.place(b[d],a,"last");else f.place(b,a,"last");return a},_ContentSetter:l("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:!1,extractContent:!1,parseContent:!1,parserScope:k._scopeName,startup:!0,constructor:function(a,b){g.mixin(this,a||{});b=this.node=m.byId(this.node||b);this.id||(this.id=["Setter",b?b.id||b.tagName:"",p++].join("_"))},set:function(a,b){void 0!==a&&(this.content=a);b&&this._mixin(b);this.onBegin();this.setContent();var c=this.onEnd();return c&&c.then?
c:this.node},setContent:function(){var a=this.node;if(!a)throw Error(this.declaredClass+": setContent given no node");try{a=e._setNodeContent(a,this.content)}catch(b){var c=this.onContentError(b);try{a.innerHTML=c}catch(d){console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+d.message,d)}}this.node=a},empty:function(){this.parseDeferred&&(this.parseDeferred.isResolved()||this.parseDeferred.cancel(),delete this.parseDeferred);this.parseResults&&this.parseResults.length&&
(h.forEach(this.parseResults,function(a){a.destroy&&a.destroy()}),delete this.parseResults);f.empty(this.node)},onBegin:function(){var a=this.content;if(g.isString(a)&&(this.cleanContent&&(a=e._secureForInnerHtml(a)),this.extractContent)){var b=a.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);b&&(a=b[1])}this.empty();this.content=a;return this.node},onEnd:function(){this.parseContent&&this._parse();return this.node},tearDown:function(){delete this.parseResults;delete this.parseDeferred;delete this.node;
delete this.content},onContentError:function(a){return"Error occurred setting content: "+a},onExecError:function(a){return"Error occurred executing scripts: "+a},_mixin:function(a){var b={},c;for(c in a)c in b||(this[c]=a[c])},_parse:function(){var a=this.node;try{var b={};h.forEach(["dir","lang","textDir"],function(a){this[a]&&(b[a]=this[a])},this);var c=this;this.parseDeferred=n.parse({rootNode:a,noStart:!this.startup,inherited:b,scope:this.parserScope}).then(function(a){return c.parseResults=a},
function(a){c._onError("Content",a,"Error parsing in _ContentSetter#"+this.id)})}catch(d){this._onError("Content",d,"Error parsing in _ContentSetter#"+this.id)}},_onError:function(a,b,c){a=this["on"+a+"Error"].call(this,b);c?console.error(c,b):a&&e._setNodeContent(this.node,a,!0)}}),set:function(a,b,c){void 0==b&&(console.warn("dojo.html.set: no cont argument provided, using empty string"),b="");"number"==typeof b&&(b=b.toString());return c?(new e._ContentSetter(g.mixin(c,{content:b,node:a}))).set():
e._setNodeContent(a,b,!0)}};g.setObject("dojo.html",e);return e});
/// html.js.map