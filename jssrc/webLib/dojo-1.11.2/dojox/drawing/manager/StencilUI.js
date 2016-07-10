//>>built
define("dojox/drawing/manager/StencilUI",["dojo","../util/oo"],function(c,b){return b.declare(function(a){this.canvas=a.canvas;this.mouse=a.mouse;this.keys=a.keys;this._mouseHandle=this.mouse.register(this);this.stencils={}},{register:function(a){return this.stencils[a.id]=a},onUiDown:function(a){if(this._isStencil(a))this.stencils[a.id].onDown(a)},onUiUp:function(a){if(this._isStencil(a))this.stencils[a.id].onUp(a)},onOver:function(a){if(this._isStencil(a))this.stencils[a.id].onOver(a)},onOut:function(a){if(this._isStencil(a))this.stencils[a.id].onOut(a)},
_isStencil:function(a){return!!a.id&&!!this.stencils[a.id]&&"drawing.library.UI.Button"==this.stencils[a.id].type}})});
/// StencilUI.js.map