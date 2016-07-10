//>>built
define("dojox/collections/SortedList",["dojo/_base/kernel","dojo/_base/array","./_base"],function(m,p,e){e.SortedList=function(f){var n=this,d={},c=[],h=function(a,b){return a.key>b.key?1:a.key<b.key?-1:0},g=function(){c=[];for(var a=n.getIterator();!a.atEnd();)c.push(a.get());c.sort(h)},l={};this.count=c.length;this.add=function(a,b){d[a]||(d[a]=new e.DictionaryEntry(a,b),this.count=c.push(d[a]),c.sort(h))};this.clear=function(){d={};c=[];this.count=c.length};this.clone=function(){return new e.SortedList(this)};
this.contains=this.containsKey=function(a){return l[a]?!1:null!=d[a]};this.containsValue=function(a){for(var b=this.getIterator();!b.atEnd();)if(b.get().value==a)return!0;return!1};this.copyTo=function(a,b){for(var c=this.getIterator(),d=b;!c.atEnd();)a.splice(d,0,c.get()),d++};this.entry=function(a){return d[a]};this.forEach=function(a,b){m.forEach(c,a,b)};this.getByIndex=function(a){return c[a].valueOf()};this.getIterator=function(){return new e.DictionaryIterator(d)};this.getKey=function(a){return c[a].key};
this.getKeyList=function(){for(var a=[],b=this.getIterator();!b.atEnd();)a.push(b.get().key);return a};this.getValueList=function(){for(var a=[],b=this.getIterator();!b.atEnd();)a.push(b.get().value);return a};this.indexOfKey=function(a){for(var b=0;b<c.length;b++)if(c[b].key==a)return b;return-1};this.indexOfValue=function(a){for(var b=0;b<c.length;b++)if(c[b].value==a)return b;return-1};this.item=function(a){if(a in d&&!l[a])return d[a].valueOf()};this.remove=function(a){delete d[a];g();this.count=
c.length};this.removeAt=function(a){delete d[c[a].key];g();this.count=c.length};this.replace=function(a,b){if(d[a])return d[a]=new e.DictionaryEntry(a,b),g(),!0;this.add(a,b);return!1};this.setByIndex=function(a,b){d[c[a].key].value=b;g();this.count=c.length};if(f){for(f=f.getIterator();!f.atEnd();){var k=f.get();c[c.length]=d[k.key]=new e.DictionaryEntry(k.key,k.value)}c.sort(h)}};return e.SortedList});
/// SortedList.js.map