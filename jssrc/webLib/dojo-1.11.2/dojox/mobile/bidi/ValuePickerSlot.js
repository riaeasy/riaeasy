//>>built
define("dojox/mobile/bidi/ValuePickerSlot",["dojo/_base/declare","./common"],function(c,b){return c(null,{postCreate:function(){!this.textDir&&(this.getParent()&&this.getParent().get("textDir"))&&(this.textDir=this.getParent().get("textDir"))},_getValueAttr:function(){return b.removeUCCFromText(this.inputNode.value)},_setValueAttr:function(a){this.inherited(arguments);this._applyTextDirToValueNode()},_setTextDirAttr:function(a){a&&this.textDir!==a&&(this.textDir=a,this._applyTextDirToValueNode())},
_applyTextDirToValueNode:function(){this.inputNode.value=b.removeUCCFromText(this.inputNode.value);this.inputNode.value=b.enforceTextDirWithUcc(this.inputNode.value,this.textDir)}})});
/// ValuePickerSlot.js.map