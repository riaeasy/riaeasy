//>>built
require({cache:{"url:dojox/grid/enhanced/templates/FilterBar.html":'\x3ctable class\x3d"dojoxGridFBar" border\x3d"0" cellspacing\x3d"0" role\x3d"presentation" dojoAttachEvent\x3d"onclick:_onClickFilterBar, onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onmousemove:_onMouseMove"\n\t\x3e\x3ctr\x3e\x3ctd class\x3d"dojoxGridFBarBtnTD"\n\t\t\x3e\x3cspan dojoType\x3d"dijit.form.Button" class\x3d"dojoxGridFBarBtn" dojoAttachPoint\x3d"defineFilterButton" label\x3d"..." iconClass\x3d"dojoxGridFBarDefFilterBtnIcon" showLabel\x3d"true" dojoAttachEvent\x3d"onClick:_showFilterDefDialog, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton"\x3e\x3c/span\n\t\x3e\x3c/td\x3e\x3ctd class\x3d"dojoxGridFBarInfoTD"\n\t\t\x3e\x3cspan class\x3d"dojoxGridFBarInner"\n\t\t\t\x3e\x3cspan class\x3d"dojoxGridFBarStatus" dojoAttachPoint\x3d"statusBarNode"\x3e${_noFilterMsg}\x3c/span\n\t\t\t\x3e\x3cspan dojoType\x3d"dijit.form.Button" class\x3d"dojoxGridFBarClearFilterBtn" dojoAttachPoint\x3d"clearFilterButton" \n\t\t\t\tlabel\x3d"${_filterBarClearBtnLabel}" iconClass\x3d"dojoxGridFBarClearFilterBtnIcon" showLabel\x3d"true" \n\t\t\t\tdojoAttachEvent\x3d"onClick:_clearFilterDefDialog, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton"\x3e\x3c/span\n\t\t\t\x3e\x3cspan dojotype\x3d"dijit.form.Button" class\x3d"dojoxGridFBarCloseBtn" dojoAttachPoint\x3d"closeFilterBarButton" \n\t\t\t\tlabel\x3d"${_closeFilterBarBtnLabel}" iconClass\x3d"dojoxGridFBarCloseBtnIcon" showLabel\x3d"false" \n\t\t\t\tdojoAttachEvent\x3d"onClick:_closeFilterBar, onMouseEnter:_onEnterButton, onMouseLeave:_onLeaveButton, onMouseMove:_onMoveButton"\x3e\x3c/span\n\t\t\x3e\x3c/span\n\t\x3e\x3c/td\x3e\x3c/tr\n\x3e\x3c/table\x3e\n'}});
define("dojox/grid/enhanced/plugins/filter/FilterBar","dojo/_base/declare dojo/_base/array dojo/_base/connect dojo/_base/lang dojo/_base/sniff dojo/_base/event dojo/_base/html dojo/_base/window dojo/query dijit/_Widget dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/fx dojo/_base/fx dojo/string dijit/focus dojo/text!../../templates/FilterBar.html".split(" "),function(r,s,n,h,t,u,e,v,w,x,y,z,p,l,m,k,A){var d=function(a){try{a&&a.preventDefault&&u.stop(a)}catch(b){}};return r("dojox.grid.enhanced.plugins.filter.FilterBar",
[x,y,z],{templateString:A,widgetsInTemplate:!0,_timeout_statusTooltip:300,_handle_statusTooltip:null,_curColIdx:-1,plugin:null,postMixInProperties:function(){var a=this.plugin,b=a.nls;this._filterBarDefBtnLabel=b.filterBarDefButton;this._filterBarClearBtnLabel=b.filterBarClearButton;this._closeFilterBarBtnLabel=b.closeFilterBarBtn;this._noFilterMsg=m.substitute(b.filterBarMsgNoFilterTemplate,["",a.args.itemsName||b.defaultItemsName]);b=this.plugin.args.statusTipTimeout;"number"==typeof b&&(this._timeout_statusTooltip=
b);a=a.grid;a.showFilterBar=h.hitch(this,"showFilterBar");a.toggleFilterBar=h.hitch(this,"toggleFilterBar");a.isFilterBarShown=h.hitch(this,"isFilterBarShown")},postCreate:function(){this.inherited(arguments);this.plugin.args.closeFilterbarButton||e.style(this.closeFilterBarButton.domNode,"display","none");var a=this,b=this.plugin.grid,c=this.oldGetHeaderHeight=h.hitch(b,b._getHeaderHeight);this.placeAt(b.viewsHeaderNode,"after");this.connect(this.plugin.filterDefDialog,"showDialog","_onShowFilterDefDialog");
this.connect(this.plugin.filterDefDialog,"closeDialog","_onCloseFilterDefDialog");this.connect(b.layer("filter"),"onFiltered",this._onFiltered);this.defineFilterButton.domNode.title=this.plugin.nls.filterBarDefButton;e.hasClass(v.body(),"dijit_a11y")&&this.defineFilterButton.set("label",this.plugin.nls.a11yFilterBarDefButton);this.connect(this.defineFilterButton.domNode,"click",d);this.connect(this.clearFilterButton.domNode,"click",d);this.connect(this.closeFilterBarButton.domNode,"click",d);this.toggleClearFilterBtn(!0);
this._initAriaInfo();b._getHeaderHeight=function(){return c()+e.marginBox(a.domNode).h};b.focus.addArea({name:"filterbar",onFocus:h.hitch(this,this._onFocusFilterBar,!1),onBlur:h.hitch(this,this._onBlurFilterBar)});b.focus.placeArea("filterbar","after","header")},uninitialize:function(){var a=this.plugin.grid;a._getHeaderHeight=this.oldGetHeaderHeight;a.focus.removeArea("filterbar");this.plugin=null},isFilterBarShown:function(){return"none"!=e.style(this.domNode,"display")},showFilterBar:function(a,
b,c){var f=this.plugin.grid;if(b){if(Boolean(a)!=this.isFilterBarShown()){c=c||{};var g=[];g.push(p[a?"wipeIn":"wipeOut"](h.mixin({node:this.domNode,duration:500},c)));var q=f.views.views[0].domNode.offsetHeight,d={duration:500,properties:{height:{end:h.hitch(this,function(){var b=this.domNode.scrollHeight;t("ff")&&(b-=2);return a?q-b:q+b})}}};s.forEach(f.views.views,function(a){g.push(l.animateProperty(h.mixin({node:a.domNode},d,c)),l.animateProperty(h.mixin({node:a.scrollboxNode},d,c)))});g.push(l.animateProperty(h.mixin({node:f.viewsNode},
d,c)));p.combine(g).play()}}else e.style(this.domNode,"display",a?"":"none"),f.update()},toggleFilterBar:function(a,b){this.showFilterBar(!this.isFilterBarShown(),a,b)},getColumnIdx:function(a){for(var b=w("[role\x3d'columnheader']",this.plugin.grid.viewsHeaderNode),c=-1,f=b.length-1;0<=f;--f){var g=e.position(b[f]);if(a>=g.x&&a<g.x+g.w){c=f;break}}return 0<=c&&!1!==this.plugin.grid.layout.cells[c].filterable?c:-1},toggleClearFilterBtn:function(a){e.style(this.clearFilterButton.domNode,"display",
a?"none":"")},_closeFilterBar:function(a){d(a);if(this.plugin.filterDefDialog.getCriteria()){var b=n.connect(this.plugin.filterDefDialog,"clearFilter",this,function(){this.showFilterBar(!1,!0);n.disconnect(b)});this._clearFilterDefDialog(a)}else this.showFilterBar(!1,!0)},_showFilterDefDialog:function(a){d(a);this.plugin.filterDefDialog.showDialog(this._curColIdx);this.plugin.grid.focus.focusArea("filterbar")},_clearFilterDefDialog:function(a){d(a);this.plugin.filterDefDialog.onClearFilter();this.plugin.grid.focus.focusArea("filterbar")},
_onEnterButton:function(a){this._onBlurFilterBar();d(a)},_onMoveButton:function(a){this._onBlurFilterBar()},_onLeaveButton:function(a){this._leavingBtn=!0},_onShowFilterDefDialog:function(a){"number"==typeof a&&(this._curColIdx=a);this._defPaneIsShown=!0},_onCloseFilterDefDialog:function(){this._defPaneIsShown=!1;this._curColIdx=-1;k.focus(this.defineFilterButton.domNode)},_onClickFilterBar:function(a){d(a);this._clearStatusTipTimeout();this.plugin.grid.focus.focusArea("filterbar");this.plugin.filterDefDialog.showDialog(this.getColumnIdx(a.clientX))},
_onMouseEnter:function(a){this._onFocusFilterBar(!0,null);this._updateTipPosition(a);this._setStatusTipTimeout()},_onMouseMove:function(a){this._leavingBtn&&(this._onFocusFilterBar(!0,null),this._leavingBtn=!1);this._isFocused&&(this._setStatusTipTimeout(),this._highlightHeader(this.getColumnIdx(a.clientX)),this._handle_statusTooltip&&this._updateTipPosition(a))},_onMouseLeave:function(a){this._onBlurFilterBar()},_updateTipPosition:function(a){this._tippos={x:a.pageX,y:a.pageY}},_onFocusFilterBar:function(a,
b,c){if(!this.isFilterBarShown())return!1;this._isFocused=!0;e.addClass(this.domNode,"dojoxGridFBarHover");if(!a){a="none"!==e.style(this.clearFilterButton.domNode,"display");var f="none"!==e.style(this.closeFilterBarButton.domNode,"display");"undefined"==typeof this._focusPos&&(0<c?this._focusPos=0:(this._focusPos=f?1:0,a&&++this._focusPos));0===this._focusPos?k.focus(this.defineFilterButton.focusNode):1===this._focusPos&&a?k.focus(this.clearFilterButton.focusNode):k.focus(this.closeFilterBarButton.focusNode)}d(b);
return!0},_onBlurFilterBar:function(a,b){this._isFocused&&(this._isFocused=!1,e.removeClass(this.domNode,"dojoxGridFBarHover"),this._clearStatusTipTimeout(),this._clearHeaderHighlight());var c=!0;if(b){var f=3;"none"===e.style(this.closeFilterBarButton.domNode,"display")&&--f;"none"===e.style(this.clearFilterButton.domNode,"display")&&--f;if(1==f)delete this._focusPos;else{for(var g=this._focusPos,d=g+b;0>d;d+=f);d%=f;0<b&&d<g||0>b&&d>g?delete this._focusPos:(this._focusPos=d,c=!1)}}return c},_onFiltered:function(a,
b){var c=this.plugin,d=c.args.itemsName||c.nls.defaultItemsName,g="";c.grid.layer("filter").filterDef()?(g=m.substitute(c.nls.filterBarMsgHasFilterTemplate,[a,b,d]),e.addClass(this.domNode,"dojoxGridFBarFiltered")):(g=m.substitute(c.nls.filterBarMsgNoFilterTemplate,[b,d]),e.removeClass(this.domNode,"dojoxGridFBarFiltered"));this.statusBarNode.innerHTML=g;this._focusPos=0},_initAriaInfo:function(){this.defineFilterButton.domNode.setAttribute("aria-label",this.plugin.nls.waiFilterBarDefButton);this.clearFilterButton.domNode.setAttribute("aria-label",
this.plugin.nls.waiFilterBarClearButton)},_isInColumn:function(a,b,c){b=e.position(b);return a>=b.x&&a<b.x+b.w},_setStatusTipTimeout:function(){this._clearStatusTipTimeout();this._defPaneIsShown||(this._handle_statusTooltip=setTimeout(h.hitch(this,this._showStatusTooltip),this._timeout_statusTooltip))},_clearStatusTipTimeout:function(){clearTimeout(this._handle_statusTooltip);this._handle_statusTooltip=null},_showStatusTooltip:function(){this._handle_statusTooltip=null;this.plugin&&this.plugin.filterStatusTip.showDialog(this._tippos.x,
this._tippos.y,this.getColumnIdx(this._tippos.x))},_highlightHeader:function(a){if(a!=this._previousHeaderIdx){var b=this.plugin.grid,c=b.getCell(this._previousHeaderIdx);c&&e.removeClass(c.getHeaderNode(),"dojoxGridCellOver");(c=b.getCell(a))&&e.addClass(c.getHeaderNode(),"dojoxGridCellOver");this._previousHeaderIdx=a}},_clearHeaderHighlight:function(){if("undefined"!=typeof this._previousHeaderIdx){var a=this.plugin.grid,b=a.getCell(this._previousHeaderIdx);if(b)a.onHeaderCellMouseOut({cellNode:b.getHeaderNode()});
delete this._previousHeaderIdx}}})});
/// FilterBar.js.map