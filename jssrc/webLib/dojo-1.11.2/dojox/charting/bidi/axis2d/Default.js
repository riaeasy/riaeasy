//>>built
define("dojox/charting/bidi/axis2d/Default",["dojo/_base/declare","dojo/dom-style"],function(b,f){return b(null,{labelTooltip:function(b,c,a,g,h,k){var d="rtl"==f.get(c.node,"direction"),e="rtl"==c.getTextDir(a);e&&!d&&(a="\x3cspan dir\x3d'rtl'\x3e"+a+"\x3c/span\x3e");!e&&d&&(a="\x3cspan dir\x3d'ltr'\x3e"+a+"\x3c/span\x3e");this.inherited(arguments)},_isRtl:function(){return this.chart.isRightToLeft()}})});
/// Default.js.map