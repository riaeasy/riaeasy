//>>built
define("dojo/NodeList-traverse",["./query","./_base/lang","./_base/array"],function(g,h,l){var k=g.NodeList;h.extend(k,{_buildArrayFromCallback:function(b){for(var a=[],d=0;d<this.length;d++){var c=b.call(this[d],this[d],a);c&&(a=a.concat(c))}return a},_getUniqueAsNodeList:function(b){for(var a=[],d=0,c;c=b[d];d++)1==c.nodeType&&-1==l.indexOf(a,c)&&a.push(c);return this._wrap(a,null,this._NodeListCtor)},_getUniqueNodeListWithParent:function(b,a){var d=this._getUniqueAsNodeList(b),d=a?g._filterResult(d,
a):d;return d._stash(this)},_getRelatedUniqueNodes:function(b,a){return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(a),b)},children:function(b){return this._getRelatedUniqueNodes(b,function(a,b){return h._toArray(a.childNodes)})},closest:function(b,a){return this._getRelatedUniqueNodes(null,function(d,c){do if(g._filterResult([d],b,a).length)return d;while(d!=a&&(d=d.parentNode)&&1==d.nodeType);return null})},parent:function(b){return this._getRelatedUniqueNodes(b,function(a,b){return a.parentNode})},
parents:function(b){return this._getRelatedUniqueNodes(b,function(a,b){for(var c=[];a.parentNode;)a=a.parentNode,c.push(a);return c})},siblings:function(b){return this._getRelatedUniqueNodes(b,function(a,b){for(var c=[],e=a.parentNode&&a.parentNode.childNodes,f=0;f<e.length;f++)e[f]!=a&&c.push(e[f]);return c})},next:function(b){return this._getRelatedUniqueNodes(b,function(a,b){for(var c=a.nextSibling;c&&1!=c.nodeType;)c=c.nextSibling;return c})},nextAll:function(b){return this._getRelatedUniqueNodes(b,
function(a,b){for(var c=[],e=a;e=e.nextSibling;)1==e.nodeType&&c.push(e);return c})},prev:function(b){return this._getRelatedUniqueNodes(b,function(a,b){for(var c=a.previousSibling;c&&1!=c.nodeType;)c=c.previousSibling;return c})},prevAll:function(b){return this._getRelatedUniqueNodes(b,function(a,b){for(var c=[],e=a;e=e.previousSibling;)1==e.nodeType&&c.push(e);return c})},andSelf:function(){return this.concat(this._parent)},first:function(){return this._wrap(this[0]&&[this[0]]||[],this)},last:function(){return this._wrap(this.length?
[this[this.length-1]]:[],this)},even:function(){return this.filter(function(b,a){return 0!=a%2})},odd:function(){return this.filter(function(b,a){return 0==a%2})}});return k});
/// NodeList-traverse.js.map