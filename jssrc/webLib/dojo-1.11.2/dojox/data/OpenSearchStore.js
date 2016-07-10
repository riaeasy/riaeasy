//>>built
define("dojox/data/OpenSearchStore","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/xhr dojo/_base/array dojo/_base/window dojo/query dojo/data/util/simpleFetch dojox/xml/parser".split(" "),function(f,h,k,g,l,m,n,p,q){f.experimental("dojox.data.OpenSearchStore");f=k("dojox.data.OpenSearchStore",null,{constructor:function(a){a&&(this.label=a.label,this.url=a.url,this.itemPath=a.itemPath,"urlPreventCache"in a&&(this.urlPreventCache=a.urlPreventCache?!0:!1));a=g.get({url:this.url,handleAs:"xml",
sync:!0,preventCache:this.urlPreventCache});a.addCallback(this,"_processOsdd");a.addErrback(function(){throw Error("Unable to load OpenSearch Description document from ".args.url);})},url:"",itemPath:"",_storeRef:"_S",urlElement:null,iframeElement:null,urlPreventCache:!0,ATOM_CONTENT_TYPE:3,ATOM_CONTENT_TYPE_STRING:"atom",RSS_CONTENT_TYPE:2,RSS_CONTENT_TYPE_STRING:"rss",XML_CONTENT_TYPE:1,XML_CONTENT_TYPE_STRING:"xml",_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojox.data.OpenSearchStore: a function was passed an item argument that was not an item");
},_assertIsAttribute:function(a){if("string"!==typeof a)throw Error("dojox.data.OpenSearchStore: a function was passed an attribute argument that was not an attribute name string");},getFeatures:function(){return{"dojo.data.api.Read":!0}},getValue:function(a,b,c){return(a=this.getValues(a,b))?a[0]:c},getAttributes:function(a){return["content"]},hasAttribute:function(a,b){return this.getValue(a,b)?!0:!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getLabel:function(a){},
getLabelAttributes:function(a){return null},containsValue:function(a,b,c){a=this.getValues(a,b);for(b=0;b<a.length;b++)if(a[b]===c)return!0;return!1},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);var c=this.processItem(a,b);if(c)return[c]},isItem:function(a){return a&&a[this._storeRef]===this?!0:!1},close:function(a){},process:function(a){return this["_processOSD"+this.contentType](a)},processItem:function(a,b){return this["_processItem"+this.contentType](a.node,b)},_createSearchUrl:function(a){var b=
this.urlElement.attributes.getNamedItem("template").nodeValue,c=b.indexOf("{searchTerms}"),b=b.substring(0,c)+a.query.searchTerms+b.substring(c+13);l.forEach([{name:"count",test:a.count,def:"10"},{name:"startIndex",test:a.start,def:this.urlElement.attributes.getNamedItem("indexOffset")?this.urlElement.attributes.getNamedItem("indexOffset").nodeValue:0},{name:"startPage",test:a.startPage,def:this.urlElement.attributes.getNamedItem("pageOffset")?this.urlElement.attributes.getNamedItem("pageOffset").nodeValue:
0},{name:"language",test:a.language,def:"*"},{name:"inputEncoding",test:a.inputEncoding,def:"UTF-8"},{name:"outputEncoding",test:a.outputEncoding,def:"UTF-8"}],function(a){b=b.replace("{"+a.name+"}",a.test||a.def);b=b.replace("{"+a.name+"?}",a.test||a.def)});return b},_fetchItems:function(a,b,c){a.query||(a.query={});var d=this,e={url:this._createSearchUrl(a),preventCache:this.urlPreventCache},e=g.get(e);e.addErrback(function(b){c(b,a)});e.addCallback(function(c){var e=[];if(c){e=d.process(c);for(c=
0;c<e.length;c++)e[c]={node:e[c]},e[c][d._storeRef]=d}b(e,a)})},_processOSDxml:function(a){var b=m.doc.createElement("div");b.innerHTML=a;return n(this.itemPath,b)},_processItemxml:function(a,b){if("content"===b)return a.innerHTML},_processOSDatom:function(a){return this._processOSDfeed(a,"entry")},_processItematom:function(a,b){return this._processItemfeed(a,b,"content")},_processOSDrss:function(a){return this._processOSDfeed(a,"item")},_processItemrss:function(a,b){return this._processItemfeed(a,
b,"description")},_processOSDfeed:function(a,b){a=dojox.xml.parser.parse(a);for(var c=[],d=a.getElementsByTagName(b),e=0;e<d.length;e++)c.push(d.item(e));return c},_processItemfeed:function(a,b,c){if("content"===b)return a=a.getElementsByTagName(c).item(0),this._getNodeXml(a,!0)},_getNodeXml:function(a,b){var c;switch(a.nodeType){case 1:var d=[];if(!b){d.push("\x3c"+a.tagName);var e;for(c=0;c<a.attributes.length;c++)e=a.attributes.item(c),d.push(" "+e.nodeName+'\x3d"'+e.nodeValue+'"');d.push("\x3e")}for(c=
0;c<a.childNodes.length;c++)d.push(this._getNodeXml(a.childNodes.item(c)));b||d.push("\x3c/"+a.tagName+"\x3e\n");return d.join("");case 3:case 4:return a.nodeValue}},_processOsdd:function(a){a=a.getElementsByTagName("Url");var b=[],c,d;for(d=0;d<a.length;d++)switch(c=a[d].attributes.getNamedItem("type").nodeValue,c){case "application/rss+xml":b[d]=this.RSS_CONTENT_TYPE;break;case "application/atom+xml":b[d]=this.ATOM_CONTENT_TYPE;break;default:b[d]=this.XML_CONTENT_TYPE}c=0;var e=b[0];for(d=1;d<a.length;d++)b[d]>
e&&(c=d,e=b[d]);if("url"==a[c].nodeName.toLowerCase())switch(this.urlElement=a[c],b[c]){case this.ATOM_CONTENT_TYPE:this.contentType=this.ATOM_CONTENT_TYPE_STRING;break;case this.RSS_CONTENT_TYPE:this.contentType=this.RSS_CONTENT_TYPE_STRING;break;case this.XML_CONTENT_TYPE:this.contentType=this.XML_CONTENT_TYPE_STRING}}});return h.extend(f,p)});
/// OpenSearchStore.js.map