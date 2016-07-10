//>>built
define("dojox/layout/TableContainer","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/dom-class dojo/dom-construct dojo/_base/array dojo/dom-prop dojo/dom-style dijit/_WidgetBase dijit/layout/_LayoutWidget".split(" "),function(e,k,v,p,b,d,s,w,x,y){e.experimental("dojox.layout.TableContainer");e=v("dojox.layout.TableContainer",y,{cols:1,labelWidth:"100",showLabels:!0,orientation:"horiz",spacing:1,customClass:"",postCreate:function(){this.inherited(arguments);this._children=[];this.connect(this,
"set",function(a,l){l&&("orientation"==a||"customClass"==a||"cols"==a)&&this.layout()})},startup:function(){if(!this._started&&(this.inherited(arguments),!this._initialized)){var a=this.getChildren();1>a.length||(this._initialized=!0,p.add(this.domNode,"dijitTableLayout"),d.forEach(a,function(a){!a.started&&!a._started&&a.startup()}),this.layout(),this.resize())}},resize:function(){d.forEach(this.getChildren(),function(a){"function"==typeof a.resize&&a.resize()})},layout:function(){function a(a,b,
f){if(""!=t.customClass){var c=t.customClass+"-"+(b||a.tagName.toLowerCase());p.add(a,c);2<arguments.length&&p.add(a,c+"-"+f)}}if(this._initialized){var l=this.getChildren(),e={},t=this;d.forEach(this._children,k.hitch(this,function(a){e[a.id]=a}));d.forEach(l,k.hitch(this,function(a,b){e[a.id]||this._children.push(a)}));var q=b.create("table",{width:"100%","class":"tableContainer-table tableContainer-table-"+this.orientation,cellspacing:this.spacing},this.domNode),h=b.create("tbody");q.appendChild(h);
a(q,"table",this.orientation);var m=b.create("tr",{},h),u=!this.showLabels||"horiz"==this.orientation?m:b.create("tr",{},h),r=this.cols*(this.showLabels?2:1),n=0;d.forEach(this._children,k.hitch(this,function(g,e){var f=g.colspan||1;1<f&&(f=this.showLabels?Math.min(r-1,2*f-1):Math.min(r,f));if(n+f-1+(this.showLabels?1:0)>=r)n=0,m=b.create("tr",{},h),u="horiz"==this.orientation?m:b.create("tr",{},h);var c;if(this.showLabels)if(c=b.create("td",{"class":"tableContainer-labelCell"},m),g.spanLabel)s.set(c,
"vert"==this.orientation?"rowspan":"colspan",2);else{a(c,"labelCell");var d={"for":g.get("id")},d=b.create("label",d,c);if(-1<Number(this.labelWidth)||-1<String(this.labelWidth).indexOf("%"))w.set(c,"width",0>String(this.labelWidth).indexOf("%")?this.labelWidth+"px":this.labelWidth);d.innerHTML=g.get("label")||g.get("title")}c=g.spanLabel&&c?c:b.create("td",{"class":"tableContainer-valueCell"},u);1<f&&s.set(c,"colspan",f);a(c,"valueCell",e);c.appendChild(g.domNode);n+=f+(this.showLabels?1:0)}));this.table&&
this.table.parentNode.removeChild(this.table);d.forEach(l,function(a){"function"==typeof a.layout&&a.layout()});this.table=q;this.resize()}},destroyDescendants:function(a){d.forEach(this._children,function(b){b.destroyRecursive(a)})},_setSpacingAttr:function(a){this.spacing=a;this.table&&(this.table.cellspacing=Number(a))}});e.ChildWidgetProperties={label:"",title:"",spanLabel:!1,colspan:1};k.extend(x,e.ChildWidgetProperties);return e});
/// TableContainer.js.map