//>>built
require({cache:{"url:dojox/form/resources/FileInputAuto.html":'\x3cdiv class\x3d"dijitFileInput"\x3e\n\t\x3cinput id\x3d"${id}" name\x3d"${name}" class\x3d"dijitFileInputReal" type\x3d"file" dojoAttachPoint\x3d"fileInput" /\x3e\n\t\x3cdiv class\x3d"dijitFakeInput" dojoAttachPoint\x3d"fakeNodeHolder"\x3e\n\t\t\x3cinput class\x3d"dijitFileInputVisible" type\x3d"text" dojoAttachPoint\x3d"focusNode, inputNode" /\x3e\n\t\t\x3cdiv class\x3d"dijitInline dijitFileInputText" dojoAttachPoint\x3d"titleNode"\x3e${label}\x3c/div\x3e\n\t\t\x3cdiv class\x3d"dijitInline dijitFileInputButton" dojoAttachPoint\x3d"cancelNode" dojoAttachEvent\x3d"onclick:reset"\x3e${cancelText}\x3c/div\x3e\n\t\x3c/div\x3e\n\t\x3cdiv class\x3d"dijitProgressOverlay" dojoAttachPoint\x3d"overlay"\x3e\x26nbsp;\x3c/div\x3e\n\x3c/div\x3e\n'}});
define("dojox/form/FileInputAuto","dojo/_base/declare dojo/_base/lang dojo/_base/fx dojo/_base/window dojo/dom-style dojo/_base/sniff dojo/text!./resources/FileInputAuto.html dojox/form/FileInput dojo/io/iframe".split(" "),function(e,f,g,h,c,b,d,k,l){d=e("dojox.form.FileInputAuto",k,{url:"",blurDelay:2E3,duration:500,uploadMessage:"Uploading ...",triggerEvent:"onblur",_sent:!1,templateString:d,onBeforeSend:function(){return{}},startup:function(){this._blurListener=this.connect(this.fileInput,this.triggerEvent,
"_onBlur");this._focusListener=this.connect(this.fileInput,"onfocus","_onFocus");this.inherited(arguments)},_onFocus:function(){this._blurTimer&&clearTimeout(this._blurTimer)},_onBlur:function(){this._blurTimer&&clearTimeout(this._blurTimer);this._sent||(this._blurTimer=setTimeout(f.hitch(this,"_sendFile"),this.blurDelay))},setMessage:function(a){this.overlay.removeChild(this.overlay.firstChild);this.overlay.appendChild(document.createTextNode(a))},_sendFile:function(a){!this._sent&&(!this._sending&&
this.fileInput.value)&&(this._sending=!0,c.set(this.fakeNodeHolder,"display","none"),c.set(this.overlay,{opacity:0,display:"block"}),this.setMessage(this.uploadMessage),g.fadeIn({node:this.overlay,duration:this.duration}).play(),9>b("ie")||b("ie")&&b("quirks")?(a=document.createElement('\x3cform enctype\x3d"multipart/form-data" method\x3d"post"\x3e'),a.encoding="multipart/form-data"):(a=document.createElement("form"),a.setAttribute("enctype","multipart/form-data"),a.setAttribute("method","post")),
a.appendChild(this.fileInput),h.body().appendChild(a),l.send({url:this.url,form:a,handleAs:"json",handle:f.hitch(this,"_handleSend"),content:this.onBeforeSend()}))},_handleSend:function(a,b){this.overlay.removeChild(this.overlay.firstChild);this._sent=!0;this._sending=!1;c.set(this.overlay,{opacity:0,border:"none",background:"none"});this.overlay.style.backgroundImage="none";this.fileInput.style.display="none";this.fakeNodeHolder.style.display="none";g.fadeIn({node:this.overlay,duration:this.duration}).play(250);
this.disconnect(this._blurListener);this.disconnect(this._focusListener);h.body().removeChild(b.args.form);this.fileInput=null;this.onComplete(a,b,this)},reset:function(a){this._blurTimer&&clearTimeout(this._blurTimer);this.disconnect(this._blurListener);this.disconnect(this._focusListener);this.overlay.style.display="none";this.fakeNodeHolder.style.display="";this.inherited(arguments);this._sending=this._sent=!1;this._blurListener=this.connect(this.fileInput,this.triggerEvent,"_onBlur");this._focusListener=
this.connect(this.fileInput,"onfocus","_onFocus")},onComplete:function(a,b,c){}});e("dojox.form.FileInputBlind",d,{startup:function(){this.inherited(arguments);this._off=c.get(this.inputNode,"width");this.inputNode.style.display="none";this._fixPosition()},_fixPosition:function(){b("ie")?c.set(this.fileInput,"width","1px"):c.set(this.fileInput,"left","-"+this._off+"px")},reset:function(a){this.inherited(arguments);this._fixPosition()}});return d});
/// FileInputAuto.js.map