//>>built
define("dojox/mobile/TextBox","dojo/_base/declare dojo/dom-construct dijit/_WidgetBase dijit/form/_FormValueMixin dijit/form/_TextBoxMixin dojo/has require".split(" "),function(b,c,d,e,f,g,h){return b("dojox.mobile.TextBox",[d,e,f],{baseClass:"mblTextBox",_setTypeAttr:null,_setPlaceHolderAttr:function(a){a=this._cv?this._cv(a):a;this._set("placeHolder",a);this.textbox.setAttribute("placeholder",a)},buildRendering:function(){this.srcNodeRef||(this.srcNodeRef=c.create("input",{type:this.type}));this.inherited(arguments);
this.textbox=this.focusNode=this.domNode},postCreate:function(){this.inherited(arguments);this.connect(this.textbox,"onmouseup",function(){this._mouseIsDown=!1});this.connect(this.textbox,"onmousedown",function(){this._mouseIsDown=!0});this.connect(this.textbox,"onfocus",function(a){this._onFocus(this._mouseIsDown?"mouse":a);this._mouseIsDown=!1});this.connect(this.textbox,"onblur","_onBlur")}})});
/// TextBox.js.map