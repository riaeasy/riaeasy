(function() {
	window.svgns = "http://www.w3.org/2000/svg";
	window.xlinkns = "http://www.w3.org/1999/xlink";
	svgnsFake = "urn:__fake__internal__namespace";
	var isOpera = false,
		isSafari = false,
		isMoz = false,
		isIE = false,
		isAIR = false,
		isKhtml = false,
		isFF = false,
		isXHTML = false;
	function _detectBrowsers() {
		var n = navigator,
			dua = n.userAgent,
			dav = n.appVersion,
			tv = parseFloat(dav);
		if (dua.indexOf("Opera") >= 0) {
			isOpera = tv;
		}
		var index = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
		if (index) {
			isSafari = parseFloat(dav.split("Version/")[1]) || (parseFloat(dav.substr(index + 7)) > 419.3) ? 3 : 2;
		}
		if (dua.indexOf("AdobeAIR") >= 0) {
			isAIR = 1;
		}
		if (dav.indexOf("Konqueror") >= 0 || isSafari) {
			isKhtml = tv;
		}
		if (dua.indexOf("Gecko") >= 0 && !isKhtml) {
			isMoz = tv;
		}
		if (isMoz) {
			isFF = parseFloat(dua.split("Firefox/")[1]) || undefined;
		}
		if (document.all && !isOpera) {
			isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
		}
		if (document.documentMode) {
			isStandardsMode = (document.documentMode > 5);
		} else {
			isStandardsMode = (document.compatMode == "CSS1Compat");
		}
		if (document.contentType == "application/xhtml+xml") {
			isXHTML = true;
		} else {
			if (typeof XMLDocument != "undefined" && document.constructor == XMLDocument) {
				isXHTML = true;
			}
		}
	}
	_detectBrowsers();
	function doDebugging() {
		var debug = false;
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
			if (/svg(?:\-uncompressed)?\.js/.test(scripts[i].src)) {
				var debugSetting = scripts[i].getAttribute("data-debug");
				debug = (debugSetting === "true" || debugSetting === true) ? true : false;
			}
		}
		return debug;
	}
	var debug = doDebugging();
	if (typeof console == "undefined" || !console.log) {
		var queue = [];
		console = {};
		if (!debug) {
			console.log = function() {};
		} else {
			console.log = function(msg) {
				var body = null;
				var delay = false;
				try {
					body = document.getElementsByTagName("body")[0];
				} catch (exp) {
					delay = true;
				}
				if (isIE) {
					try {
						document.documentElement.doScroll("left");
					} catch (exp) {
						delay = true;
					}
				}
				if (delay) {
					queue.push(msg);
					return;
				}
				var p;
				while (queue.length) {
					var oldMsg = queue.shift();
					p = document.createElement("p");
					p.appendChild(document.createTextNode(oldMsg));
					body.appendChild(p);
				}
				p = document.createElement("p");
				p.appendChild(document.createTextNode(msg));
				body.appendChild(p);
			};
			if (isIE) {
				function flushQueue() {
					while (queue.length) {
						var oldMsg = queue.shift();
						p = document.createElement("p");
						p.appendChild(document.createTextNode(oldMsg));
						document.body.appendChild(p);
					}
				}
				var debugInterval = window.setInterval(function() {
					if (document.readyState == "complete") {
						flushQueue();
						window.clearTimeout(debugInterval);
					}
				}, 50);
			}
		}
	}
	function extend(f, addMe) {
		for (var i in addMe) {
			f.prototype[i] = addMe[i];
		}
	}
	function mixin(f, addMe) {
		for (var i in addMe) {
			f[i] = addMe[i];
		}
	}
	function xpath(doc, context, expr, namespaces) {
		if (!context) {
			context = doc.documentElement;
		}
		if (typeof XPathEvaluator != "undefined") {
			var evaluator = new XPathEvaluator();
			var resolver = doc.createNSResolver(context);
			var result = evaluator.evaluate(expr, context, resolver, 0, null);
			var found = createNodeList(),
				current;
			while (current = result.iterateNext()) {
				found.push(current);
			}
			return found;
		} else {
			doc.setProperty("SelectionLanguage", "XPath");
			if (namespaces) {
				var allNamespaces = "";
				var foundNamespace = {};
				for (var i = 0; i < namespaces.length; i++) {
					var namespaceURI = namespaces[i];
					var prefix = namespaces["_" + namespaceURI];
					if (!foundNamespace["_" + namespaceURI]) {
						if (prefix == "xmlns") {
							allNamespaces += 'xmlns="' + namespaceURI + '" ';
						} else {
							allNamespaces += "xmlns:" + prefix + '="' + namespaceURI + '" ';
						}
						foundNamespace["_" + namespaceURI] = namespaceURI;
					}
				}
				doc.setProperty("SelectionNamespaces", allNamespaces);
			}
			var found = context.selectNodes(expr);
			if (found === null || typeof found == "undefined") {
				found = createNodeList();
			}
			var results = createNodeList();
			for (var i = 0; i < found.length; i++) {
				results.push(found[i]);
			}
			return results;
		}
	}
	var parseXMLCache = {};
	function parseXML(xml, preserveWhiteSpace) {
		if (preserveWhiteSpace === undefined) {
			preserveWhiteSpace = false;
		}
		var cachedXML = parseXMLCache[preserveWhiteSpace + xml];
		if (cachedXML) {
			return cachedXML.cloneNode(true);
		}
		var xmlDoc;
		if (typeof DOMParser != "undefined") {
			var parser = new DOMParser();
			try {
				xmlDoc = parser.parseFromString(xml, "application/xml");
			} catch (e) {
				throw e;
			}
			var root = xmlDoc.documentElement;
			if (root.nodeName == "parsererror") {
				throw new Error("There is a bug in your SVG: " + (new XMLSerializer().serializeToString(root)));
			}
		} else {
			var versions = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.3.0"];
			var xmlDoc;
			for (var i = 0; i < versions.length; i++) {
				try {
					xmlDoc = new ActiveXObject(versions[i]);
					if (xmlDoc) {
						break;
					}
				} catch (e) {}
			}
			if (!xmlDoc) {
				throw new Error("Unable to instantiate XML parser");
			}
			try {
				xmlDoc.preserveWhiteSpace = preserveWhiteSpace;
				xmlDoc.resolveExternals = false;
				xmlDoc.validateOnParse = false;
				xmlDoc.setProperty("ProhibitDTD", false);
				xmlDoc.async = "false";
				var successful = xmlDoc.loadXML(xml);
				if (!successful || xmlDoc.parseError.errorCode !== 0) {
					throw new Error(xmlDoc.parseError.reason);
				}
			} catch (e) {
				console.log(e.message);
				throw new Error("Unable to parse SVG: " + e.message);
			}
		}
		try {
			parseXMLCache[preserveWhiteSpace + xml] = xmlDoc.cloneNode(true);
		} catch (e) {}
		return xmlDoc;
	}
	function xmlToStr(node, namespaces) {
		var nodeXML = (node._nodeXML || node);
		var xml;
		if (typeof XMLSerializer != "undefined") {
			xml = (new XMLSerializer().serializeToString(nodeXML));
		} else {
			xml = nodeXML.xml;
		}
		xml = xml.replace(/urn\:__fake__internal__namespace/g, svgns);
		var nsString = "";
		if (xml.indexOf("xmlns=") == -1) {
			nsString = 'xmlns="' + svgns + '" ';
		}
		if (namespaces) {
			for (var i = 0; i < namespaces.length; i++) {
				var uri = namespaces[i];
				var prefix = namespaces["_" + uri];
				if (uri == svgnsFake) {
					uri = svgns;
				}
				var newNS;
				if (prefix != "xmlns") {
					newNS = "xmlns:" + prefix + '="' + uri + '"';
				} else {
					newNS = 'xmlns="' + uri + '"';
				}
				if (xml.indexOf(newNS) == -1) {
					nsString += newNS + " ";
				}
			}
		}
		xml = xml.replace(/<([^ ]+)/, "<$1 " + nsString + " ");
		return xml;
	}
	function hitch(context, method) {
		if (typeof method == "string") {
			method = context[method];
		}
		return function() {
			return method.apply(context, (arguments.length) ? arguments : []);
		};
	}
	var XHR_PROGIDS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	function xhrObj() {
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else {
			if (ActiveXObject) {
				var xhr = null;
				var i;
				for (i = 0; i < XHR_PROGIDS.length && !xhr; ++i) {
					try {
						xhr = new ActiveXObject(XHR_PROGIDS[i]);
					} catch (e) {}
				}
				if (!xhr) {
					throw new Error("XMLHttpRequest object not available on this platform");
				}
				return xhr;
			}
		}
	}
	var guidCounter = 0;
	function guid() {
		return "_" + guidCounter++;
	}
	function SVGWeb() {
		this._setXDomain();
		this.libraryPath = this._getLibraryPath();
		this.htcFilename = this._getHTCFilename();
		if (isIE) {
			FlashHandler._prepareBehavior(this.libraryPath, this.htcFilename);
		}
		this._interceptOnloadListeners();
		this._initDOMContentLoaded();
	}
	extend(SVGWeb, {
		libraryPath: "./",
		config: null,
		pageLoaded: false,
		handlers: [],
		totalLoaded: 0,
		_guidLookup: [],
		_loadListeners: [],
		_removedNodes: [],
		addOnLoad: function(listener, fromObject, objectWindow) {
			if (fromObject) {
				var obj = objectWindow.frameElement;
				if (fromObject && this.getHandlerType() == "flash") {
					listener.apply(objectWindow);
				} else {
					if (obj._svgHandler) {
						obj._svgHandler._onObjectLoad(listener, objectWindow);
					} else {
						obj._svgWindow = objectWindow;
						obj._svgFunc = listener;
					}
				}
			} else {
				this._loadListeners.push(listener);
			}
			if (this.pageLoaded) {
				this._fireOnLoad();
			}
		},
		getHandlerType: function() {
			if (this.renderer == FlashHandler) {
				return "flash";
			} else {
				if (this.renderer == NativeHandler) {
					return "native";
				}
			}
		},
		appendChild: function(node, parent) {
			if (node.nodeName.toLowerCase() == "object" && node.getAttribute("type") == "image/svg+xml") {
				this.totalSVG++;
				this._svgObjects.push(node);
				if (this.getHandlerType() == "native") {
					node.onload = node.onsvgload;
					parent.appendChild(node);
				}
				var placeHolder = node;
				if (this.getHandlerType() == "flash") {
					if (node.onsvgload) {
						node.addEventListener("SVGLoad", node.onsvgload, false);
					}
					var div = document._createElement("div");
					for (var j = 0; j < node.attributes.length; j++) {
						var attr = node.attributes[j];
						var attrName = attr.nodeName;
						var attrValue = attr.nodeValue;
						if (!attrValue && attrValue !== "true") {
							continue;
						}
						div.setAttribute(attrName, attrValue);
					}
					parent.appendChild(div);
					div._onloadListeners = node._onloadListeners;
					placeHolder = div;
				}
				var objID = this._processSVGObject(placeHolder);
				node._objID = objID;
			} else {
				if (node.nodeName.toLowerCase() == "svg") {
					this.totalSVG++;
					if (node.onsvgload) {
						node.addEventListener("SVGLoad", node.onsvgload, false);
					}
					if (isIE && node._fakeNode) {
						node = node._fakeNode;
					}
					var svgStr = xmlToStr(node);
					var svgScript = document.createElement("script");
					svgScript.type = "image/svg+xml";
					if (!isXHTML) {
						svgScript.text = svgStr;
					} else {
						svgScript.appendChild(document.createTextNode(svgStr));
					}
					this._svgScripts.push(svgScript);
					parent.appendChild(svgScript);
					svgScript._onloadListeners = node._detachedListeners || node._onloadListeners;
					this._processSVGScript(svgScript);
				}
			}
		},
		removeChild: function(node, parent) {
			var name = node.nodeName.toLowerCase();
			var nodeID, nodeHandler;
			if (name == "object" || name == "embed" || name == "svg") {
				this.totalSVG = this.totalSVG == 0 ? 0 : this.totalSVG - 1;
				this.totalLoaded = this.totalLoaded == 0 ? 0 : this.totalLoaded - 1;
				nodeID = node.getAttribute("id");
				nodeHandler = this.handlers[nodeID];
				var newHandlers = [];
				for (var i = 0; i < this.handlers.length; i++) {
					var currentHandler = this.handlers[i];
					if (currentHandler != nodeHandler) {
						newHandlers[currentHandler.id] = currentHandler;
						newHandlers.push(currentHandler);
					}
				}
				this.handlers = newHandlers;
			}
			if (name == "object" || name == "embed") {
				if (this.getHandlerType() == "flash" && nodeHandler.document && nodeHandler.document.defaultView) {
					var iframeWin = nodeHandler.document.defaultView;
					for (var i = 0; i < iframeWin._intervalIDs.length; i++) {
						iframeWin.clearInterval(iframeWin._intervalIDs[i]);
					}
					for (var i = 0; i < iframeWin._timeoutIDs.length; i++) {
						iframeWin.clearTimeout(iframeWin._timeoutIDs[i]);
					}
					for (var i = 0; i < nodeHandler._keyboardListeners.length; i++) {
						var l = nodeHandler._keyboardListeners[i];
						if (isIE) {
							document.detachEvent("onkeydown", l);
						} else {
							document.removeEventListener("keydown", l, true);
							document.removeEventListener("keydown", l, false);
						}
					}
				}
				var objID;
				if (typeof node._objID != "undefined") {
					objID = node._objID;
				} else {
					if (typeof node.contentDocument != "undefined") {
						objID = node.contentDocument._handler.id;
					} else {
						objID = node._handler.id;
					}
				}
				for (var i = 0; i < svgweb._svgObjects.length; i++) {
					if (svgweb._svgObjects[i]._objID === objID) {
						svgweb._svgObjects.splice(i, 1);
						break;
					}
				}
				parent.removeChild(node);
				if (this.getHandlerType() == "flash") {
					var container = document.getElementById("__htc_container");
					if (container) {
						for (var i = 0; i < container.childNodes.length; i++) {
							var child = container.childNodes[i];
							if (typeof child.ownerDocument != "undefined" && child.ownerDocument == nodeHandler._svgObject.document) {
								if (typeof child._fakeNode != "undefined" && typeof child._fakeNode._htcNode != "undefined") {
									child._fakeNode._htcNode = null;
								}
								child._fakeNode = null;
								child._handler = null;
								container.removeChild(child);
							}
						}
					}
					for (var guid in svgweb._guidLookup) {
						var child = svgweb._guidLookup[guid];
						if (child._fake && child.ownerDocument === nodeHandler.document) {
							delete svgweb._guidLookup[guid];
						}
					}
					nodeHandler.flash.contentDocument = null;
					nodeHandler.flash = null;
					nodeHandler._xml = null;
					if (nodeHandler.window) {
						nodeHandler.window._scope = null;
						nodeHandler.window = null;
					}
					var svgObj = nodeHandler._svgObject;
					var svgDoc = svgObj.document;
					svgDoc._nodeById = null;
					svgDoc._xml = null;
					svgDoc.defaultView = null;
					svgDoc.documentElement = null;
					svgDoc.rootElement = null;
					svgDoc.defaultView = null;
					svgDoc = null;
					svgObj._svgNode = null;
					svgObj._handler = null;
					if (iframeWin) {
						iframeWin._setTimeout = null;
						iframeWin.setTimeout = null;
						iframeWin._setInterval = null;
						iframeWin.setInterval = null;
					}
					nodeHandler._svgObject = null;
					svgObj = null;
					nodeHandler = null;
					iframeWin = null;
				}
			} else {
				if (name == "svg") {
					for (var i = 0; i < svgweb._svgScripts.length; i++) {
						if (svgweb._svgScripts[i] == nodeHandler._scriptNode) {
							svgweb._svgScripts.splice(i, 1);
							break;
						}
					}
					if (isIE && this.getHandlerType() == "flash" && node._fakeNode) {
						node = node._fakeNode;
					}
					var removeMe;
					if (this.getHandlerType() == "native") {
						removeMe = node;
					} else {
						removeMe = node._handler.flash;
					}
					if (!isIE) {
						parent.removeChild(removeMe);
					} else {
						window.setTimeout(function(parent, removeMe) {
							return function() {
								parent.removeChild(removeMe);
								parent = null;
								removeMe = null;
							};
						}(parent, removeMe), 1);
					}
					if (this.getHandlerType() == "flash") {
						node._setUnattached();
						for (var guid in svgweb._guidLookup) {
							var child = svgweb._guidLookup[guid];
							if (child._fake && child._getFakeNode() === nodeHandler) {
								delete svgweb._guidLookup[guid];
							}
						}
						nodeHandler._scriptNode = null;
						nodeHandler.flash.documentElement = null;
						nodeHandler.flash = null;
						nodeHandler._xml = null;
						nodeHandler = null;
					}
				}
			}
		},
		_initDOMContentLoaded: function() {
			var self = this;
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", function() {
					self._onDOMContentLoaded();
				}, false);
			} else {
				document.write('<script id="__ie__svg__onload" defer src=//0><\/script>');
				var script = document.getElementById("__ie__svg__onload");
				script.onreadystatechange = function() {
					if (this.readyState == "complete") {
						self._onDOMContentLoaded();
					}
				};
				var documentReady = function() {
					if (window.onload) {
						self._saveWindowOnload();
						document.detachEvent("onreadystatechange", documentReady);
					}
				};
				document.attachEvent("onreadystatechange", documentReady);
			}
		},
		_setXDomain: function() {
			var scripts = document.getElementsByTagName("script");
			for (var i = 0; i < scripts.length; i++) {
				if (/svg(?:\-uncompressed)?\.js/.test(scripts[i].src) && /^https?/.test(scripts[i].src)) {
					var url = scripts[i].src.replace(/svg(?:\-uncompressed)?\.js/, "");
					var loc = url.match(/https?\:\/\/[^\/]*/)[0];
					var ourLoc = window.location.protocol.replace(/:|\//g, "") + "://" + window.location.host;
					if (loc != ourLoc) {
						this.xDomainURL = url;
						this._isXDomain = true;
						return;
					}
				}
			}
			this._isXDomain = false;
		},
		_getLibraryPath: function() {
			var libraryPath = "./";
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name == "svg.config.data-path" && meta[i].content.length > 0) {
					libraryPath = meta[i].content;
				}
			}
			var scripts = document.getElementsByTagName("script");
			for (var i = 0; i < scripts.length; i++) {
				if (/svg(?:\-uncompressed)?\.js/.test(scripts[i].src) && scripts[i].getAttribute("data-path")) {
					libraryPath = scripts[i].getAttribute("data-path");
					break;
				}
			}
			if (libraryPath.charAt(libraryPath.length - 1) != "/") {
				libraryPath += "/";
			}
			return libraryPath;
		},
		_getHTCFilename: function() {
			var htcFilename = "svg.htc";
			var loc = window.location.toString();
			if (loc.indexOf("svg.htcFilename=svg-htc.php") != -1) {
				return "svg-htc.php";
			} else {
				if (loc.indexOf("svg.htcFilename=svg-htc.jsp") != -1) {
					return "svg-htc.jsp";
				} else {
					if (loc.indexOf("svg.htcFilename=svg-htc.asp") != -1) {
						return "svg-htc.asp";
					}
				}
			}
			var scripts = document.getElementsByTagName("script");
			for (var i = 0; i < scripts.length; i++) {
				if (/svg(?:\-uncompressed)?\.js/.test(scripts[i].src) && scripts[i].getAttribute("data-htc-filename")) {
					htcFilename = scripts[i].getAttribute("data-htc-filename");
					break;
				}
			}
			return htcFilename;
		},
		_onDOMContentLoaded: function() {
			if (arguments.callee.done) {
				return;
			}
			arguments.callee.done = true;
			this._startTime = new Date().getTime();
			var listener = document.getElementById("__ie__svg__onload");
			if (listener) {
				listener.parentNode.removeChild(listener);
				listener.onreadystatechange = null;
				listener = null;
			}
			this._saveWindowOnload();
			this.config = new RenderConfig();
			if (isIE) {
				this._watchUnload();
			}
			this._svgScripts = this._getSVGScripts();
			this._svgObjects = this._getSVGObjects();
			this.totalSVG = this._svgScripts.length + this._svgObjects.length;
			this._cleanupSVGObjects();
			this._handleHTMLTitleBug();
			if (!this.config.supported) {
				this._displayNotSupported(this.config.reason);
				this._fireOnLoad();
				return;
			}
			this.renderer;
			if (this.config.use == "flash") {
				this.renderer = FlashHandler;
			} else {
				if (this.config.use == "native") {
					this.renderer = NativeHandler;
				}
			}
			this.renderer._patchBrowserObjects(window, document);
			if (this.config.use == "flash") {
				this._createResizeListener();
				this._attachResizeListener();
			}
			if (this.totalSVG === 0) {
				this._fireOnLoad();
				return;
			}
			var self = this;
			for (var i = 0; i < this._svgScripts.length; i++) {
				this._processSVGScript(this._svgScripts[i]);
			}
			for (var i = 0; i < this._svgObjects.length; i++) {
				var objID = this._processSVGObject(this._svgObjects[i]);
				this._svgObjects[i]._objID = objID;
			}
		},
		_createResizeListener: function() {
			var self = this;
			if (isIE) {
				this._resizeFunc = (function(self) {
					return function() {
						self._onWindowResize();
					};
				})(this);
			} else {
				this._resizeFunc = hitch(this, function() {
					this._onWindowResize();
				});
			}
		},
		_attachResizeListener: function() {
			if (isIE) {
				window.attachEvent("onresize", this._resizeFunc);
			} else {
				window.addEventListener("resize", this._resizeFunc, false);
			}
		},
		_detachResizeListener: function() {
			if (isIE) {
				window.detachEvent("onresize", this._resizeFunc);
			} else {
				window.removeEventListener("resize", this._resizeFunc, false);
			}
		},
		_onWindowResize: function() {
			if (!this.pageLoaded) {
				return;
			}
			this._detachResizeListener();
			for (var i = 0; i < this.handlers.length; i++) {
				var handler = this.handlers[i];
				if (!handler._inserter || !handler.flash) {
					continue;
				}
				var size = handler._inserter._determineSize();
				handler.flash.width = size.width;
				handler.flash.height = size.height;
				handler.sendToFlash("jsHandleResize", [size.pixelsWidth, size.pixelsHeight]);
			}
			this._attachResizeListener();
		},
		_getSVGScripts: function() {
			var scripts = document.getElementsByTagName("script");
			var results = [];
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].type == "image/svg+xml") {
					results.push(scripts[i]);
				}
			}
			return results;
		},
		_getSVGObjects: function() {
			var objs = document.getElementsByTagName("object");
			var results = [];
			for (var i = 0; i < objs.length; i++) {
				if (objs[i].getAttribute("classid") == "image/svg+xml") {
					results.push(objs[i]);
				} else {
					if (objs[i].getAttribute("type") == "image/svg+xml") {
						results.push(objs[i]);
					}
				}
			}
			return results;
		},
		_displayNotSupported: function(reason) {
			for (var i = 0; i < this._svgObjects.length; i++) {
				var obj = this._svgObjects[i];
				if (!obj.childNodes.length || (obj.childNodes.length == 1 && obj.childNodes[0].nodeType == 3 && /^[ ]*$/m.test(obj.childNodes[0].nodeValue))) {
					var span = document.createElement("span");
					span.className = "svg-noscript";
					span.appendChild(document.createTextNode(reason));
					obj.parentNode.replaceChild(span, obj);
				}
			}
			for (var i = 0; i < this._svgScripts.length; i++) {
				var script = this._svgScripts[i];
				var output = document.createElement("span");
				output.className = "svg-noscript";
				var sibling = script.nextSibling;
				while (sibling && sibling.nodeType != 1) {
					sibling = sibling.nextSibling;
				}
				if (sibling && sibling.nodeName.toLowerCase() == "noscript") {
					var noscript = sibling;
					output.innerHTML = noscript.innerHTML;
				} else {
					output.appendChild(document.createTextNode(reason));
				}
				script.parentNode.insertBefore(output, script);
			}
		},
		_fireOnLoad: function() {
			if (this.handlers.length < this._svgObjects.length) {
				return;
			}
			var allLoaded = true;
			for (var i = 0; i < this.handlers.length; i++) {
				var h = this.handlers[i];
				if (!h._loaded) {
					allLoaded = false;
					break;
				}
			}
			if (!allLoaded) {
				return;
			}
			this.pageLoaded = true;
			this._endTime = new Date().getTime();
			if (this._loadListeners.length) {
				var self = this;
				window.setTimeout(function() {
					var listeners = self._loadListeners;
					self._loadListeners = [];
					this.totalLoaded = 0;
					for (var i = 0; i < listeners.length; i++) {
						try {
							listeners[i]();
						} catch (exp) {
							console.log("Error while firing onload: " + (exp.message || exp));
						}
					}
				}, 1);
			}
		},
		_cleanSVG: function(svg, addMissing, normalizeWhitespace) {
			if (/^\s*<\!\[CDATA\[/.test(svg)) {
				svg = svg.replace(/^\s*<\!\[CDATA\[/, "");
				svg = svg.replace(/\]\]>\s*/, "");
			}
			if (addMissing) {
				if (/\<\?xml/m.test(svg) == false) {
					svg = '<?xml version="1.0"?>\n' + svg;
				}
				if (/xmlns\=['"]http:\/\/www\.w3\.org\/2000\/svg['"]/.test(svg) == false) {
					svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
				}
				if (/xmlns:[^=]+=['"]http:\/\/www\.w3\.org\/1999\/xlink['"]/.test(svg) == false) {
					svg = svg.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
				}
			}
			if (svg.charAt(0) != "<") {
				svg = svg.replace(/\s*<\?xml/, "<?xml");
			}
			RegExp.lastIndex = 0;
			var match;
			var entityRE = /<!ENTITY\s+(\S+)\s+"([^"]*)"/g;
			while ((match = entityRE.exec(svg)) != null) {
				var entityName = RegExp.$1;
				var entityValue = RegExp.$2;
				svg = svg.split("&" + entityName + ";").join(entityValue);
			}
			if (normalizeWhitespace) {
				svg = svg.replace(/\>\s+\</gm, "><");
			}
			if (this.renderer == FlashHandler) {
				svg = svg.replace(/<!\-\-[\s\S]*?\-\->/g, "");
				svg = svg.replace(/<svg/, "<SVGROOT");
				svg = svg.replace(/<svg/g, "<NESTEDSVG");
				svg = svg.replace(/<SVGROOT/, "<svg");
				var separator = svg.match(/<svg/)[0];
				var pieces = svg.split(/<svg/);
				var hasCData = (pieces[1].indexOf("<![CDATA[") != -1);
				if (hasCData) {
					RegExp.lastIndex = 0;
					var cdataRE = /<\!\[CDATA\[/g;
					match = cdataRE.exec(pieces[1]);
					var cdataBlocks = [];
					i = 0;
					while (match && RegExp.rightContext) {
						var startIdx = cdataRE.lastIndex - "<![CDATA[".length;
						var context = RegExp.rightContext;
						var endIdx = cdataRE.lastIndex + context.indexOf("]]>") + 2;
						var section = context.substring(0, context.indexOf("]]>"));
						section = "<![CDATA[" + section + "]]>";
						cdataBlocks.push(section);
						var before = pieces[1].substring(0, startIdx);
						var after = pieces[1].substring(endIdx + 1, pieces[1].length);
						pieces[1] = before + "__SVG_CDATA_TOKEN_" + i + after;
						match = cdataRE.exec(pieces[1]);
						i++;
					}
				}
				pieces[1] = pieces[1].replace(/>([^>]+)</g, "><__text>$1</__text><");
				if (hasCData) {
					for (var i = 0; i < cdataBlocks.length; i++) {
						pieces[1] = pieces[1].replace("__SVG_CDATA_TOKEN_" + i, cdataBlocks[i]);
					}
				}
				svg = pieces[0] + separator + pieces[1];
				for (var i = 2; i < pieces.length; i++) {
					svg = svg + pieces[i];
				}
			}
			svg = svg.replace(/<NESTEDSVG/g, "<svg");
			if (this.renderer == FlashHandler) {
				svg = FlashHandler._encodeFlashData(svg);
				svg = svg.replace(/xmlns(\:[^=]*)?=['"]http\:\/\/www\.w3\.org\/2000\/svg['"]/g, "xmlns$1='" + svgnsFake + "'");
			}
			var xml = this._addTracking(svg, normalizeWhitespace);
			if (typeof XMLSerializer != "undefined") {
				svg = (new XMLSerializer()).serializeToString(xml);
			} else {
				svg = xml.xml;
			}
			if (this.renderer == FlashHandler) {
				svg = svg.replace(new RegExp(svgnsFake, "g"), svgns);
			}
			return {
				svg: svg,
				xml: xml
			};
		},
		_processSVGScript: function(script) {
			var origSVG;
			if (!isXHTML) {
				origSVG = script.innerHTML;
			} else {
				origSVG = "";
				for (var i = 0; i < script.childNodes.length; i++) {
					origSVG += script.childNodes[i].textContent;
				}
			}
			var results = this._cleanSVG(origSVG, true, true);
			var svg = results.svg;
			var xml = results.xml;
			var rootID = xml.documentElement.getAttribute("id");
			var rootOnload = xml.documentElement.getAttribute("onload");
			if (rootOnload) {
				var defineEvtCode = 'var evt = { target: document.getElementById("' + rootID + '") ,currentTarget: document.getElementById("' + rootID + '") ,preventDefault: function() { this.returnValue=false; }};';
				rootOnload = new Function(defineEvtCode + rootOnload);
				var f = (function(rootOnload, rootID) {
					return function() {
						var handler = svgweb.handlers[rootID];
						var root;
						if (svgweb.getHandlerType() == "flash") {
							root = handler.document.documentElement._getProxyNode();
						} else {
							root = document.getElementById(rootID);
						}
						return rootOnload.apply(root);
					};
				})(rootOnload, rootID);
				this._loadListeners.push(f);
			}
			var handler = new this.renderer({
				type: "script",
				svgID: rootID,
				xml: xml,
				svgString: svg,
				origSVG: origSVG,
				scriptNode: script
			});
			this.handlers[rootID] = handler;
			this.handlers.push(handler);
			handler.start();
		},
		_processSVGObject: function(obj) {
			var objID = obj.getAttribute("id");
			if (!objID) {
				obj.setAttribute("id", svgweb._generateID("__svg__random__", "__object"));
				objID = obj.getAttribute("id");
			}
			var handler = new this.renderer({
				type: "object",
				objID: objID,
				objNode: obj
			});
			this.handlers[objID] = handler;
			this.handlers.push(handler);
			handler.start();
			return objID;
		},
		_generateID: function(prefix, postfix) {
			if (!postfix) {
				postfix = "";
			}
			if (!prefix) {
				prefix = "";
			}
			return prefix + guid() + postfix;
		},
		_addTracking: function(svg, normalizeWhitespace) {
			var parseWhitespace = !normalizeWhitespace;
			var xmlDoc = parseXML(svg, parseWhitespace);
			var root = xmlDoc.documentElement;
			if (root && !root.getAttribute("id")) {
				root.setAttribute("id", this._generateID("__svg__random__", null));
			}
			if (this.getHandlerType() != "flash") {
				return xmlDoc;
			}
			var current = root;
			while (current) {
				if (current.nodeType == _Node.ELEMENT_NODE) {
					current.setAttribute("__guid", guid());
				}
				if (current.nodeType == _Node.ELEMENT_NODE && !current.getAttribute("id")) {
					current.setAttribute("id", svgweb._generateID("__svg__random__", null));
				}
				var next = current.firstChild;
				if (next) {
					current = next;
					continue;
				}
				while (current) {
					if (current != root) {
						next = current.nextSibling;
						if (next) {
							current = next;
							break;
						}
					}
					if (current == root) {
						current = null;
					} else {
						current = current.parentNode;
						if (current.nodeType != 1 || current.nodeName.toUpperCase() == "SVG") {
							current = null;
						}
					}
				}
			}
			return xmlDoc;
		},
		_handleDone: function(id, type, handler) {
			this.totalLoaded++;
			if (type == "script" && handler._scriptNode._onloadListeners) {
				for (var i = 0; i < handler._scriptNode._onloadListeners.length; i++) {
					var f = handler._scriptNode._onloadListeners[i];
					if (svgweb.getHandlerType() == "flash") {
						f = f.listener;
					} else {
						var methodStr = handler._svgRoot.addEventListener.toString();
						if (methodStr.indexOf("[native code]") != -1) {
							NativeHandler._patchAddEventListener(handler._svgRoot);
						}
					}
					try {
						var root = document.getElementById(handler.id);
						f.apply(root);
					} catch (exp) {
						console.log("Error while firing onload listener: " + exp.message || exp);
					}
				}
				handler._scriptNode._onloadListeners = [];
			}
			if (this.totalLoaded >= this.totalSVG) {
				this._fireOnLoad();
			}
		},
		_handleHTMLTitleBug: function() {
			var head = document.getElementsByTagName("head")[0];
			var title = head.getElementsByTagName("title");
			if (title.length === 0) {
				title = document.createElement("title");
				head.appendChild(title);
			}
		},
		_fireFlashError: function(logString) {},
		_exportID: function(node) {
			node.__defineGetter__("id", function() {
				return node.getAttribute("id");
			});
			node.__defineSetter__("id", function(newValue) {
				return node.setAttribute("id", newValue);
			});
		},
		_watchUnload: function() {
			window.attachEvent("onunload", function(evt) {
				window.detachEvent("onunload", arguments.callee);
				svgweb._fireUnload();
			});
		},
		_fireUnload: function() {
			if (!isIE) {
				return;
			}
			for (var i = 0; i < svgweb.handlers.length; i++) {
				if (svgweb.handlers[i].type == "object") {
					var removeMe = svgweb.handlers[i].flash;
					if (removeMe.parentNode) {
						svgweb.removeChild(removeMe, removeMe.parentNode);
					}
				} else {
					svgweb.handlers[i].document.documentElement = null;
				}
			}
			var container = document.getElementById("__htc_container");
			if (container) {
				for (var i = 0; i < container.childNodes.length; i++) {
					var child = container.childNodes[i];
					if (child.nodeType == 1 && child.namespaceURI == svgns) {
						child.detachEvent("onpropertychange", child._fakeNode.style._changeListener);
						child.style.item = null;
						child.style.setProperty = null;
						child.style.getPropertyValue = null;
					}
					if (child._fakeNode) {
						child._fakeNode._htcNode = null;
					}
					child._fakeNode = null;
					child._handler = null;
				}
				container.parentNode.removeChild(container);
				container = null;
			}
			for (var i = 0; i < svgweb.handlers.length; i++) {
				var handler = svgweb.handlers[i];
				handler.flash = null;
			}
			svgweb.handlers = null;
			for (var i = 0; i < svgweb._removedNodes.length; i++) {
				var node = svgweb._removedNodes[i];
				if (node._fakeNode) {
					node._fakeNode._htcNode = null;
				}
				node._fakeNode = null;
				node._handler = null;
			}
			svgweb._removedNodes = null;
			document.getElementById = document._getElementById;
			document._getElementById = null;
			document.getElementsByTagNameNS = document._getElementsByTagNameNS;
			document._getElementsByTagNameNS = null;
			document.createElementNS = document._createElementNS;
			document._createElementNS = null;
			document.createElement = document._createElement;
			document._createElement = null;
			document.createTextNode = document._createTextNode;
			document._createTextNode = null;
			document._importNodeFunc = null;
			document.createDocumentFragment = document._createDocumentFragment;
			document._createDocumentFragment = null;
			window.addEventListener = null;
			window._addEventListener = null;
			window.attachEvent = window._attachEvent;
			window._attachEvent = null;
			parseXMLCache = null;
		},
		_cleanupSVGObjects: function() {
			if (this.config.use == "flash" && this.config.hasNativeSVG()) {
				for (var i = 0; i < this._svgObjects.length; i++) {
					var obj = this._svgObjects[i];
					var div = document.createElement("div");
					for (var j = 0; j < obj.attributes.length; j++) {
						var attr = obj.attributes[j];
						div.setAttribute(attr.nodeName, attr.nodeValue);
					}
					var fallback = obj.innerHTML;
					div.innerHTML = fallback;
					obj.parentNode.replaceChild(div, obj);
					this._svgObjects[i] = div;
				}
			}
			for (var i = 0; i < this._svgObjects.length; i++) {
				this._svgObjects[i].style.visibility = "hidden";
			}
		},
		_interceptOnloadListeners: function() {
			if (window.addEventListener) {
				window._addEventListener = window.addEventListener;
				window.addEventListener = function(type, f, useCapture) {
					if (type.toLowerCase() != "svgload") {
						return window._addEventListener(type, f, useCapture);
					} else {
						svgweb.addOnLoad(f);
					}
				};
			} else {
				window.addEventListener = function(type, f, useCapture) {
					if (type.toLowerCase() == "svgload") {
						svgweb.addOnLoad(f);
					}
				};
			}
			if (isIE && window.attachEvent) {
				window._attachEvent = window.attachEvent;
				window.attachEvent = function(type, f) {
					if (type.toLowerCase() != "onsvgload") {
						return window._attachEvent(type, f);
					} else {
						svgweb.addOnLoad(f);
					}
				};
			}
		},
		_saveWindowOnload: function() {
			var onsvgload = window.onsvgload;
			if (document.getElementsByTagName("body")) {
				var body = document.getElementsByTagName("body")[0];
				if (body.getAttribute("onsvgload")) {
					callbackStr = body.getAttribute("onsvgload");
					onsvgload = (function(callbackStr) {
						return function() {
							eval(callbackStr);
						};
					})(callbackStr);
				}
			}
			if (onsvgload) {
				if (isIE) {
					this._loadListeners.splice(0, 0, onsvgload);
				} else {
					this._loadListeners.push(onsvgload);
				}
				window.onsvgload = onsvgload = null;
			}
		}
	});
	function RenderConfig() {
		if (!this._forceFlash()) {
			if (this.hasNativeSVG()) {
				this.supported = true;
				this.use = "native";
				return;
			}
		} else {
			console.log("Forcing Flash SVG viewer for this browser");
		}
		var info = new FlashInfo();
		if (info.capable) {
			if (info.isVersionOrAbove(9, 0, 0)) {
				this.supported = true;
				this.use = "flash";
			} else {
				this.supported = false;
				this.reason = "Flash 9+ required";
			}
		} else {
			this.supported = false;
			this.reason = "Flash 9+ or a different browser required";
		}
	}
	extend(RenderConfig, {
		supported: false,
		reason: null,
		use: null,
		_forceFlash: function() {
			var results = false;
			var hasMeta = false;
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name == "svg.render.forceflash" && meta[i].content.toLowerCase() == "true") {
					results = true;
					hasMeta = true;
				}
			}
			if (window.location.search.indexOf("svg.render.forceflash=true") != -1) {
				results = true;
			} else {
				if (hasMeta && window.location.search.indexOf("svg.render.forceflash=false") != -1) {
					results = false;
				}
			}
			return results;
		},
		hasNativeSVG: function() {
			if (document.implementation && document.implementation.hasFeature) {
				return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
			} else {
				return false;
			}
		}
	});
	function FlashInfo() {
		this._detectVersion();
	}
	FlashInfo.prototype = {
		version: -1,
		versionMajor: -1,
		versionMinor: -1,
		versionRevision: -1,
		capable: false,
		isVersionOrAbove: function(reqMajorVer, reqMinorVer, reqVer) {
			reqVer = parseFloat("." + reqVer);
			if (this.versionMajor >= reqMajorVer && this.versionMinor >= reqMinorVer && this.versionRevision >= reqVer) {
				return true;
			} else {
				return false;
			}
		},
		_detectVersion: function() {
			var versionStr;
			for (var testVersion = 25; testVersion > 0; testVersion--) {
				if (isIE) {
					var axo;
					try {
						if (testVersion > 6) {
							axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + testVersion);
						} else {
							axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
						}
						if (typeof axo == "object") {
							if (testVersion == 6) {
								axo.AllowScriptAccess = "always";
							}
							versionStr = axo.GetVariable("$version");
						}
					} catch (e) {
						continue;
					}
				} else {
					versionStr = this._JSFlashInfo(testVersion);
				}
				if (versionStr == -1) {
					this.capable = false;
					return;
				} else {
					if (versionStr !== 0) {
						var versionArray;
						if (isIE) {
							var tempArray = versionStr.split(" ");
							var tempString = tempArray[1];
							versionArray = tempString.split(",");
						} else {
							versionArray = versionStr.split(".");
						}
						this.versionMajor = versionArray[0];
						this.versionMinor = versionArray[1];
						this.versionRevision = versionArray[2];
						var versionString = this.versionMajor + "." + this.versionRevision;
						this.version = parseFloat(versionString);
						this.capable = true;
						break;
					}
				}
			}
		},
		_JSFlashInfo: function(testVersion) {
			if (navigator.plugins !== null && navigator.plugins.length > 0) {
				if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
					var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
					var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
					var descArray = flashDescription.split(" ");
					var tempArrayMajor = descArray[2].split(".");
					var versionMajor = tempArrayMajor[0];
					var versionMinor = tempArrayMajor[1];
					var tempArrayMinor = (descArray[3] || descArray[4]).split("r");
					var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
					var version = versionMajor + "." + versionMinor + "." + versionRevision;
					return version;
				}
			}
			return -1;
		}
	};
	function FlashHandler(args) {
		this.type = args.type;
		this._keyboardListeners = [];
		this._redrawManager = new _RedrawManager(this);
		if (this.type == "script") {
			this.id = args.svgID;
			this._xml = args.xml;
			this._svgString = args.svgString;
			this._origSVG = args.origSVG;
			this._scriptNode = args.scriptNode;
		} else {
			if (this.type == "object") {
				this.id = args.objID;
				this._objNode = args.objNode;
			}
		}
	}
	FlashHandler._unattachedDoc = parseXML('<?xml version="1.0"?>\n<svg xmlns="' + svgns + '"></svg>', false);
	FlashHandler._prepareBehavior = function(libraryPath, htcFilename) {
		var ns = null;
		for (var i = 0; i < document.namespaces.length; i++) {
			if (document.namespaces.item(i).name == "svg") {
				ns = document.namespaces.item(i);
				break;
			}
		}
		if (ns === null) {
			ns = document.namespaces.add("svg", svgns);
		}
		ns.doImport(libraryPath + htcFilename);
	};
	FlashHandler._getNode = function(nodeXML, handler) {
		var node;
		node = svgweb._guidLookup["_" + nodeXML.getAttribute("__guid")];
		var fakeTextNode = false;
		if (!node && nodeXML.nodeName == "__text") {
			fakeTextNode = true;
		}
		if (!node && !fakeTextNode && nodeXML.nodeType == _Node.ELEMENT_NODE) {
			node = new _Element(nodeXML.nodeName, nodeXML.prefix, nodeXML.namespaceURI, nodeXML, handler, true);
		} else {
			if (!node && (nodeXML.nodeType == _Node.TEXT_NODE || fakeTextNode)) {
				node = new _Node("#text", _Node.TEXT_NODE, null, null, nodeXML, handler, false);
			} else {
				if (!node) {
					throw new Error("Unknown node type given to _getNode: " + nodeXML.nodeType);
				}
			}
		}
		return node._getProxyNode();
	};
	FlashHandler._patchBrowserObjects = function(win, doc) {
		if (doc._getElementById) {
			return;
		}
		document._getElementById = document.getElementById;
		document.getElementById = FlashHandler._getElementById;
		document._getElementsByTagNameNS = document.getElementsByTagNameNS;
		document.getElementsByTagNameNS = FlashHandler._getElementsByTagNameNS;
		document._createElementNS = document.createElementNS;
		document.createElementNS = FlashHandler._createElementNS;
		document._createElement = document.createElement;
		document.createElement = FlashHandler._createElement;
		document._createTextNode = document.createTextNode;
		document.createTextNode = FlashHandler._createTextNode;
		document._importNodeFunc = FlashHandler._importNodeFunc;
		document._createDocumentFragment = document.createDocumentFragment;
		document.createDocumentFragment = FlashHandler._createDocumentFragment;
	};
	FlashHandler._getElementById = function(id) {
		var result = document._getElementById(id);
		if (result !== null) {
			return result;
		}
		for (var i = 0; i < svgweb.handlers.length; i++) {
			if (svgweb.handlers[i].type == "script") {
				result = svgweb.handlers[i].document.getElementById(id);
			}
			if (result) {
				return result;
			}
		}
		return null;
	};
	FlashHandler._getElementsByTagNameNS = function(ns, localName) {
		var results = createNodeList();
		if (document._getElementsByTagNameNS) {
			var matches = document._getElementsByTagNameNS(ns, localName);
			for (var j = 0; j < matches.length; j++) {
				results.push(matches[j]);
			}
		}
		for (var i = 0; i < svgweb.handlers.length; i++) {
			if (svgweb.handlers[i].type == "script") {
				var doc = svgweb.handlers[i].document;
				var matches = doc.getElementsByTagNameNS(ns, localName);
				for (var j = 0; j < matches.length; j++) {
					results.push(matches[j]);
				}
			}
		}
		return results;
	};
	FlashHandler._createElementNS = function(ns, qname) {
		if (ns === null || ns == "http://www.w3.org/1999/xhtml") {
			if (isIE) {
				return document.createElement(qname);
			} else {
				return document._createElementNS(ns, qname);
			}
		}
		var namespaceFound = false;
		if (ns == svgns) {
			ns = svgnsFake;
			namespaceFound = true;
		}
		if (!isIE) {
			for (var i = 0; !namespaceFound && i < svgweb.handlers.length; i++) {
				if (svgweb.handlers[i].type == "script" && svgweb.handlers[i].document._namespaces["_" + ns]) {
					namespaceFound = true;
					break;
				}
			}
			if (!namespaceFound) {
				return document._createElementNS(ns, qname);
			}
		}
		var prefix;
		for (var i = 0; i < svgweb.handlers.length; i++) {
			if (svgweb.handlers[i].type == "script") {
				prefix = svgweb.handlers[i].document._namespaces["_" + ns];
				if (prefix) {
					break;
				}
			}
		}
		if (prefix == "xmlns" || !prefix) {
			prefix = null;
		}
		var node = new _Element(qname, prefix, ns);
		return node._getProxyNode();
	};
	FlashHandler._createElement = function(nodeName, forSVG) {
		if (!forSVG) {
			return document._createElement(nodeName);
		} else {
			if (forSVG && nodeName.toLowerCase() == "object") {
				var obj = document._createElement("object");
				obj._onloadListeners = [];
				var addEventListener = obj.addEventListener;
				(function(_obj, _addEventListener) {
					_obj.addEventListener = function(type, listener, useCapture) {
						if (type.toLowerCase() == "svgload") {
							this._onloadListeners.push(listener);
						} else {
							if (!addEventListener) {
								this.attachEvent("on" + type, listener);
							} else {
								_addEventListener(type, listener, useCapture);
							}
						}
					};
				})(obj, addEventListener);
				return obj;
			}
		}
	};
	FlashHandler._createTextNode = function(data, forSVG) {
		if (!forSVG) {
			return document._createTextNode(data);
		} else {
			var doc = FlashHandler._unattachedDoc;
			var nodeXML;
			if (isIE) {
				nodeXML = doc.createElement("__text");
			} else {
				nodeXML = doc.createElementNS(svgnsFake, "__text");
			}
			nodeXML.appendChild(doc.createTextNode(data));
			var textNode = new _Node("#text", _Node.TEXT_NODE, null, null, nodeXML);
			textNode._nodeValue = data;
			textNode.ownerDocument = document;
			return textNode._getProxyNode();
		}
	};
	FlashHandler._importNodeFunc = function(doc, node, allChildren) {
		switch (node.nodeType) {
			case 1:
				var newNode = doc.createElement(node.nodeName);
				if (node.attributes && node.attributes.length > 0) {
					for (var i = 0; i < node.attributes.length; i++) {
						var attrName = node.attributes[i].nodeName;
						var attrValue = node.getAttribute(attrName);
						newNode.setAttribute(attrName, attrValue);
					}
				}
				if (allChildren && node.childNodes && node.childNodes.length > 0) {
					for (var i = 0; i < node.childNodes.length; i++) {
						newNode.appendChild(document._importNodeFunc(doc, node.childNodes[i], allChildren));
					}
				}
				return newNode;
				break;
			case 3:
				return doc.createTextNode(node.nodeValue);
				break;
		}
	};
	FlashHandler._createDocumentFragment = function(forSVG) {
		if (forSVG) {
			return new _DocumentFragment(document)._getProxyNode();
		} else {
			return document._createDocumentFragment();
		}
	};
	FlashHandler._encodeFlashData = function(str) {
		str = str.toString().replace(/\\/g, "\\\\");
		str = str.replace(/&/g, "__SVG__AMPERSAND");
		return str;
	};
	extend(FlashHandler, {
		flashID: null,
		flash: null,
		start: function() {
			if (this.type == "script") {
				this._handleScript();
			} else {
				if (this.type == "object") {
					this._handleObject();
				}
			}
		},
		_stringToMsg: function(msg) {
			if (msg == null || typeof msg != "string") {
				return msg;
			}
			var results = {};
			var tokens = msg.split(/__SVG__DELIMIT/g);
			for (var i = 0; i < tokens.length; i++) {
				var cutAt = tokens[i].indexOf(":");
				var propName = tokens[i].substring(0, cutAt);
				var propValue = tokens[i].substring(cutAt + 1);
				if (propValue === "true") {
					propValue = true;
				} else {
					if (propValue === "false") {
						propValue = false;
					} else {
						if (propValue === "null") {
							propValue = null;
						} else {
							if (propValue === "undefined") {
								propValue = undefined;
							}
						}
					}
				}
				results[propName] = propValue;
			}
			return results;
		},
		debugMsg: function(msg) {
			if (msg === undefined) {
				return "undefined";
			} else {
				if (msg === null) {
					return "null";
				}
			}
			var result = [];
			for (var i in msg) {
				result.push(i + ":" + msg[i]);
			}
			result = result.join(", ");
			return "{" + result + "}";
		},
		sendToFlash: function(invoke, args) {
			var message = args.join("__SVG__DELIMIT");
			if (this._redrawManager.isSuspended()) {
				this._redrawManager.batch(invoke, message);
			} else {
				return this.flash[invoke](message);
			}
		},
		onMessage: function(msg) {
			msg = this._stringToMsg(msg);
			if (msg.type == "event") {
				this._onEvent(msg);
				return;
			} else {
				if (msg.type == "log") {
					this._onLog(msg);
					return;
				} else {
					if (msg.type == "script") {
						this._onObjectScript(msg);
						return;
					} else {
						if (msg.type == "viewsource") {
							this._onViewSource();
							return;
						} else {
							if (msg.type == "viewsourceDynamic") {
								this._onViewSourceDynamic(msg);
								return;
							} else {
								if (msg.type == "error") {
									this._onFlashError(msg);
								}
							}
						}
					}
				}
			}
		},
		fireOnLoad: function(id, type) {
			svgweb._handleDone(id, type, this);
		},
		_handleScript: function() {
			this.document = new _Document(this._xml, this);
			this.document.documentElement = new _SVGSVGElement(this._xml.documentElement, this._svgString, this._scriptNode, this);
		},
		_handleObject: function() {
			this._svgObject = new _SVGObject(this._objNode, this);
			this._objNode = null;
		},
		_onLog: function(msg) {
			console.log("FLASH: " + msg.logString);
		},
		_onEvent: function(msg) {
			if (msg.eventType.substr(0, 5) == "mouse" || msg.eventType == "click") {
				this._onMouseEvent(msg);
				return;
			} else {
				if (msg.eventType == "onRenderingFinished") {
					if (this.type == "script") {
						this.document.documentElement._onRenderingFinished(msg);
					} else {
						if (this.type == "object") {
							this._svgObject._onRenderingFinished(msg);
						}
					}
					return;
				} else {
					if (msg.eventType == "onFlashLoaded") {
						if (this.type == "script") {
							this.document.documentElement._onFlashLoaded(msg);
						} else {
							if (this.type == "object") {
								this._svgObject._onFlashLoaded(msg);
							}
						}
						return;
					}
				}
			}
		},
		_onMouseEvent: function(msg) {
			var target = this._getElementByGuid(msg.targetGUID);
			var currentTarget = this._getElementByGuid(msg.currentTargetGUID);
			var evt = {
				target: target._getProxyNode(),
				currentTarget: currentTarget._getProxyNode(),
				type: msg.eventType,
				clientX: new Number(msg.stageX),
				clientY: new Number(msg.stageY),
				screenX: new Number(msg.stageX),
				screenY: new Number(msg.stageY),
				altKey: msg.altKey,
				ctrlKey: msg.ctrlKey,
				shiftKey: msg.shiftKey,
				preventDefault: function() {
					this.returnValue = false;
				}
			};
			var handlers = currentTarget._listeners[msg.eventType];
			if (handlers) {
				for (var i = 0; i < handlers.length; i++) {
					var handler = handlers[i];
					var listener = handler.listener;
					listener(evt);
				}
			}
			if (msg.scriptCode != null) {
				if (this.type == "object") {
					var defineEvtCode = 'var evt = { target: document.getElementById("' + target._getProxyNode().getAttribute("id") + '") ,\ncurrentTarget:document.getElementById("' + currentTarget._getProxyNode().getAttribute("id") + '") ,\ntype: "' + msg.eventType + '",\nclientX: ' + new Number(msg.stageX) + ",\nclientY: " + new Number(msg.stageY) + ",\nscreenX: " + new Number(msg.stageX) + ",\nscreenY: " + new Number(msg.stageY) + ",\naltKey: " + msg.altKey + ",\nctrlKey: " + msg.ctrlKey + ",\nshiftKey: " + msg.shiftKey + ",\npreventDefault: function() { this.returnValue=false; }\n};\n";
					var executeInContext = ";(function (evt) { " + msg.scriptCode + "; }).call(evt.target, evt);\n";
					this.sandbox_eval(this._svgObject._sandboxedScript(defineEvtCode + executeInContext));
				} else {}
			}
		},
		_getElementByGuid: function(guid) {
			var node = svgweb._guidLookup["_" + guid];
			if (node) {
				return node;
			}
			var results;
			if (this.type == "script") {
				results = xpath(this._xml, null, '//*[@__guid="' + guid + '"]');
			} else {
				if (this.type == "object") {
					results = xpath(this._svgObject._xml, null, '//*[@__guid="' + guid + '"]');
				}
			}
			var nodeXML, node;
			if (results.length) {
				nodeXML = results[0];
			} else {
				return null;
			}
			node = FlashHandler._getNode(nodeXML, this);
			node._passThrough = true;
			return node;
		},
		_onFlashError: function(msg) {
			this._onLog(msg);
			svgweb._fireFlashError("FLASH: " + msg.logString);
			throw new Error("FLASH: " + msg.logString);
		},
		_onObjectScript: function(msg) {
			this._svgObject._scriptsToExec.push(msg.script);
		},
		_onViewSource: function() {
			var origSVG = this._origSVG;
			if (!origSVG) {
				origSVG = "SVG Source Not Available";
			}
			origSVG = origSVG.replace(/>/g, "&gt;").replace(/</g, "&lt;");
			var w = window.open("", "_blank");
			w.document.write("<html><body><pre>" + origSVG + "</pre></body></html>");
			w.document.close();
		},
		_onViewSourceDynamic: function(msg) {
			if (msg.source.indexOf("<?xml") == -1) {
				msg.source = '<?xml version="1.0"?>\n' + msg.source;
			}
			msg.source = msg.source.replace(/<svg:([^ ]+) /g, "<$1 ");
			msg.source = msg.source.replace(/<\/svg:([^>]+)>/g, "</$1>");
			msg.source = msg.source.replace(/\n\s*<__text[^\/]*\/>/gm, "");
			msg.source = msg.source.replace(/<__text[^>]*>([^<]*)<\/__text>/gm, "$1");
			msg.source = msg.source.replace(/<__text[^>]*>/g, "");
			msg.source = msg.source.replace(/<\/__text>/g, "");
			msg.source = msg.source.replace(/\s*__guid="[^"]*"/g, "");
			msg.source = msg.source.replace(/ id="__svg__random__[^"]*"/g, "");
			msg.source = msg.source.replace(/>\n\n/g, ">\n");
			msg.source = msg.source.replace(/>/g, "&gt;");
			msg.source = msg.source.replace(/</g, "&lt;");
			var w = window.open("", "_blank");
			w.document.write("<body><pre>" + msg.source + "</pre></body>");
			w.document.close();
		}
	});
	function NativeHandler(args) {
		this.type = args.type;
		this._xml = args.xml;
		if (this.type == "object") {
			this.id = args.objID;
			this._objNode = args.objNode;
		} else {
			if (this.type == "script") {
				this.id = args.svgID;
				this._svgString = args.svgString;
				this._scriptNode = args.scriptNode;
			}
		}
	}
	NativeHandler._patchBrowserObjects = function(win, doc) {
		if (doc._getElementById) {
			return;
		}
		doc._getElementById = doc.getElementById;
		doc.getElementById = function(id) {
			var result = doc._getElementById(id);
			if (result !== null) {
				if (result.parentNode === null) {
					return null;
				} else {
					return result;
				}
			}
			result = xpath(doc, null, '//*[@id="' + id + '"]');
			if (result.length) {
				var node = result[0];
				if (node.namespaceURI !== null && node.namespaceURI != svgns && node.namespaceURI != "http://www.w3.org/1999/xhtml") {
					svgweb._exportID(node);
				}
				return node;
			} else {
				return null;
			}
		};
		doc._getElementsByTagNameNS = doc.getElementsByTagNameNS;
		doc.getElementsByTagNameNS = function(ns, localName) {
			var result = doc._getElementsByTagNameNS(ns, localName);
			if (result !== null && result.length !== 0) {
				if (ns !== null && ns != "http://www.w3.org/1999/xhtml" && ns != svgns) {
					for (var i = 0; i < result.length; i++) {
						var node = result[i];
						svgweb._exportID(node);
					}
					return result;
				}
				return result;
			}
			if (result === null || result.length === 0) {
				result = createNodeList();
			}
			var xpathResults;
			for (var i = 0; i < svgweb.handlers.length; i++) {
				var handler = svgweb.handlers[i];
				if (handler.type == "object") {
					continue;
				}
				var prefix = handler._namespaces["_" + ns];
				if (!prefix) {
					continue;
				}
				var expr;
				if (prefix == "xmlns") {
					expr = "//*[namespace-uri()='" + svgns + "' and name()='" + localName + "']";
				} else {
					if (prefix) {
						expr = "//" + prefix + ":" + localName;
					} else {
						expr = "//" + localName;
					}
				}
				xpathResults = xpath(doc, handler._svgRoot, expr, handler._namespaces);
				if (xpathResults !== null && xpathResults !== undefined && xpathResults.length > 0) {
					for (var j = 0; j < xpathResults.length; j++) {
						var node = xpathResults[j];
						if (node.namespaceURI !== null && node.namespaceURI != svgns && node.namespaceURI != "http://www.w3.org/1999/xhtml") {
							svgweb._exportID(node);
						}
						result.push(node);
					}
					return result;
				}
			}
			return createNodeList();
		};
		doc._createElementNS = doc.createElementNS;
		doc.createElementNS = function(ns, localName) {
			if (ns != svgns || localName != "svg") {
				return doc._createElementNS(ns, localName);
			}
			var svg = doc._createElementNS(ns, localName);
			svg = NativeHandler._patchAddEventListener(svg);
			return svg;
		};
		doc._createElement = doc.createElement;
		doc.createElement = function(name, forSVG) {
			if (!forSVG) {
				return doc._createElement(name);
			}
			if (forSVG && name == "object") {
				var obj = doc._createElement(name);
				obj = NativeHandler._patchAddEventListener(obj);
				return obj;
			} else {
				throw "Unknown createElement() call for SVG: " + name;
			}
		};
		NativeHandler._patchCloneNode();
		if (isFF) {
			NativeHandler._patchStyleObject(win);
		}
		var rootElement = doc.rootElement;
		if (rootElement && rootElement.localName == "svg" && rootElement.namespaceURI == svgns) {
			NativeHandler._patchSvgFileAddEventListener(win, doc);
		}
	};
	NativeHandler._patchCloneNode = function() {
		var proto;
		if (typeof SVGSVGElement != "undefined") {
			proto = SVGSVGElement.prototype;
		} else {
			proto = document.createElementNS(svgns, "svg").__proto__;
		}
		if (proto._cloneNode) {
			return;
		}
		proto._cloneNode = proto.cloneNode;
		proto.cloneNode = function(deepClone) {
			var results = this._cloneNode(deepClone);
			NativeHandler._patchAddEventListener(results);
			return results;
		};
	};
	NativeHandler._patchAddEventListener = function(root) {
		if (!NativeHandler._objectAddEventListener) {
			NativeHandler._objectAddEventListener = root.addEventListener;
		}
		root._addEventListener = NativeHandler._objectAddEventListener;
		root._onloadListeners = [];
		root.addEventListener = (function(self) {
			return function(type, f, useCapture) {
				if (type.toLowerCase() == "svgload") {
					this._onloadListeners.push(f);
				} else {
					root._addEventListener(type, f, useCapture);
				}
			};
		})();
		return root;
	};
	NativeHandler._patchStyleObject = function(win) {
		var patchMe = win.CSSStyleDeclaration;
		for (var i = 0; i < _Style._allStyles.length; i++) {
			var styleName = _Style._allStyles[i];
			var stylePropName = styleName.replace(/([A-Z])/g, "-$1").toLowerCase();
			(function(styleName, stylePropName) {
				patchMe.prototype.__defineSetter__(styleName, function(styleValue) {
					return this.setProperty(stylePropName, styleValue, null);
				});
				patchMe.prototype.__defineGetter__(styleName, function() {
					return this.getPropertyValue(stylePropName);
				});
			})(styleName, stylePropName);
		}
	};
	NativeHandler._patchSvgFileAddEventListener = function(win, doc) {
		var _addEventListener = win.addEventListener;
		win.addEventListener = function(type, listener, useCapture) {
			if (type.toLowerCase() != "svgload") {
				_addEventListener(type, listener, useCapture);
			} else {
				if (doc.readyState == "complete") {
					listener();
				}
			}
		};
		win.__defineGetter__("onsvgload", function() {
			return this.__onsvgload;
		});
		win.__defineSetter__("onsvgload", function(listener) {
			this.__onsvgload = listener;
			this.addEventListener("SVGLoad", listener, false);
		});
	};
	extend(NativeHandler, {
		start: function() {
			if (this.type == "object") {
				this._handleObject();
			} else {
				if (this.type == "script") {
					this._handleScript();
				}
			}
		},
		_handleScript: function() {
			this._namespaces = this._getNamespaces();
			this._processSVGScript(this._xml, this._svgString, this._scriptNode);
			this._loaded = true;
			svgweb._handleDone(this.id, "script", this);
		},
		_handleObject: function() {
			this._objNode.style.overflow = "hidden";
			this._objNode.style.visibility = "visible";
			if (this._objNode._svgWindow) {
				this._onObjectLoad(this._objNode._svgFunc, this._objNode._svgWindow);
			} else {
				this._objNode._svgHandler = this;
				var self = this;
				var loadFunc = function() {
					if (!self._objNode.contentDocument) {
						return;
					}
					var win = self._objNode.contentDocument.defaultView;
					self._onObjectLoad(self._objNode._svgFunc, win);
				};
				if (this._objNode._addEventListener) {
					this._objNode._addEventListener("load", loadFunc, false);
				} else {
					this._objNode.addEventListener("load", loadFunc, false);
				}
			}
		},
		_onObjectLoad: function(func, win) {
			if (this._loaded) {
				return;
			}
			this._loaded = true;
			var doc = win.document;
			NativeHandler._patchBrowserObjects(win, doc);
			var root = doc.rootElement;
			if (root) {
				this._patchCurrentTranslate(root);
			}
			win.svgns = svgns;
			win.xlinkns = xlinkns;
			this._namespaces = this._getNamespaces(doc);
			if (func) {
				func.apply(win);
			}
			for (var i = 0; this._objNode._onloadListeners && i < this._objNode._onloadListeners.length; i++) {
				func = this._objNode._onloadListeners[i];
				func.apply(this._objNode);
			}
			svgweb._fireOnLoad();
		},
		_processSVGScript: function(xml, svgString, scriptNode) {
			var importedSVG = document.importNode(xml.documentElement, true);
			scriptNode.parentNode.replaceChild(importedSVG, scriptNode);
			this._svgRoot = importedSVG;
			this._patchCurrentTranslate(this._svgRoot);
		},
		_getNamespaces: function(doc) {
			var results = [];
			var attrs;
			if (doc) {
				attrs = doc.documentElement.attributes;
			} else {
				attrs = this._xml.documentElement.attributes;
			}
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				if (/^xmlns:?(.*)$/.test(attr.nodeName)) {
					var m = attr.nodeName.match(/^xmlns:?(.*)$/);
					var prefix = (m[1] ? m[1] : "xmlns");
					var namespaceURI = attr.nodeValue;
					if (!results["_" + prefix]) {
						results["_" + prefix] = namespaceURI;
						results["_" + namespaceURI] = prefix;
						results.push(namespaceURI);
					}
				}
			}
			return results;
		},
		_patchCurrentTranslate: function(root) {
			var t;
			if (typeof SVGRoot != "undefined") {
				t = root.currentTranslate;
			} else {
				if (typeof root.currentTranslate.__proto__ != "undefined") {
					t = root.currentTranslate.__proto__;
				} else {
					if (typeof SVGPoint != "undefined") {
						t = SVGPoint.prototype;
					}
				}
			}
			t.setX = function(newValue) {
				return this.x = newValue;
			};
			t.getX = function() {
				return this.x;
			};
			t.setY = function(newValue) {
				return this.y = newValue;
			};
			t.getY = function() {
				return this.y;
			};
			t.setXY = function(newValue1, newValue2) {
				this.x = newValue1;
				this.y = newValue2;
			};
		}
	});
	function _RedrawManager(handler) {
		this._handler = handler;
		this._batch = [];
		this._nextID = 1;
		this._ids = [];
		this._timeoutIDs = {};
	}
	extend(_RedrawManager, {
		isSuspended: function() {
			return (this._ids.length > 0);
		},
		batch: function(method, message) {
			this._batch.push(method + ":" + message);
		},
		suspendRedraw: function(ms) {
			if (ms === undefined) {
				throw "Not enough arguments to suspendRedraw";
			}
			var id = this._nextID;
			this._nextID++;
			var self = this;
			var timeoutID = window.setTimeout(function() {
				self.unsuspendRedraw(id);
				delete self._timeoutIDs["_" + id];
			}, ms);
			this._ids.push(id);
			this._timeoutIDs["_" + id] = timeoutID;
			this._handler.flash.jsSuspendRedraw();
			return id;
		},
		unsuspendRedraw: function(id) {
			var idx = -1;
			for (var i = 0; i < this._ids.length; i++) {
				if (this._ids[i] == id) {
					idx = i;
					break;
				}
			}
			if (idx == -1) {
				throw "Unknown id passed to unsuspendRedraw: " + id;
			}
			if (this._timeoutIDs["_" + id] != undefined) {
				window.clearTimeout(this._timeoutIDs["_" + id]);
			}
			this._ids.splice(idx, 1);
			delete this._timeoutIDs["_" + id];
			if (this.isSuspended()) {
				return;
			}
			var sendMe = this._batch.join("__SVG__METHOD__DELIMIT");
			this._batch = [];
			try {
				this._handler.flash.jsUnsuspendRedrawAll(sendMe);
			} catch (exp) {
				console.log("unsuspendRedraw exception: " + exp);
			}
		},
		unsuspendRedrawAll: function() {
			for (var i = 0; i < this._ids.length; i++) {
				this.unsuspendRedraw(this._ids[i]);
			}
		},
		forceRedraw: function() {}
	});
	function _DOMImplementation() {}
	extend(_DOMImplementation, {
		hasFeature: function(feature, version) {}
	});
	function _Node(nodeName, nodeType, prefix, namespaceURI, nodeXML, handler, passThrough) {
		if (nodeName === undefined && nodeType === undefined) {
			return;
		}
		this.nodeName = nodeName;
		this._nodeXML = nodeXML;
		this._handler = handler;
		this._listeners = {};
		this._detachedListeners = [];
		this.fake = true;
		if (namespaceURI == svgnsFake) {
			namespaceURI = svgns;
		}
		this._attached = true;
		if (!this._handler) {
			this._attached = false;
		}
		if (nodeType == _Node.ELEMENT_NODE && !this._nodeXML && !this._handler) {
			var xml = '<?xml version="1.0"?>\n';
			if (namespaceURI == svgns && !prefix) {
				xml += "<" + nodeName + ' xmlns="' + svgnsFake + '"/>';
			} else {
				xml += "<" + nodeName + " xmlns:" + prefix + '="' + namespaceURI + '"/>';
			}
			this._nodeXML = parseXML(xml).documentElement;
		} else {
			if (nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				var xml = '<?xml version="1.0"?>\n<__document__fragment></__document__fragment>';
				this._nodeXML = parseXML(xml).documentElement;
			}
		}
		if (nodeType != _Node.DOCUMENT_NODE && this._nodeXML) {
			if (!this._nodeXML.getAttribute("__guid")) {
				this._nodeXML.setAttribute("__guid", guid());
			}
			this._guid = this._nodeXML.getAttribute("__guid");
			svgweb._guidLookup["_" + this._guid] = this;
		}
		if (nodeType == _Node.ELEMENT_NODE) {
			if (nodeName.indexOf(":") != -1) {
				this.localName = nodeName.match(/^[^:]*:(.*)$/)[1];
			} else {
				this.localName = nodeName;
			}
		}
		if (nodeType) {
			this.nodeType = nodeType;
		} else {
			this.nodeType = _Node.ELEMENT_NODE;
		}
		if (nodeType == _Node.ELEMENT_NODE || nodeType == _Node.DOCUMENT_NODE || nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
			this.prefix = prefix;
			this.namespaceURI = namespaceURI;
			this._nodeValue = null;
		} else {
			if (nodeType == _Node.TEXT_NODE) {
				this._nodeValue = this._nodeXML.firstChild.nodeValue;
				this.prefix = null;
				this.namespaceURI = null;
				if (this._nodeValue === undefined) {
					this._nodeValue = null;
				}
			}
		}
		this.ownerDocument = document;
		if (this._attached && this._handler.type == "object") {
			this.ownerDocument = this._handler.document;
		}
		if (passThrough === undefined) {
			passThrough = false;
		}
		this._passThrough = passThrough;
		if (isIE) {
			this._createEmptyMethods();
		}
		this._childNodes = this._createChildNodes();
		if (nodeType == _Node.TEXT_NODE) {
			this._nodeXML.setAttribute("__fakeTextNode", true);
		}
		if (!isIE) {
			this._defineNodeAccessors();
		} else {
			if (isIE && this.nodeType != _Node.DOCUMENT_NODE) {
				this._createHTC();
			}
		}
	}
	mixin(_Node, {
		ELEMENT_NODE: 1,
		TEXT_NODE: 3,
		DOCUMENT_NODE: 9,
		DOCUMENT_FRAGMENT_NODE: 11
	});
	extend(_Node, {
		_listeners: null,
		_detachedListeners: null,
		insertBefore: function(newChild, refChild) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.DOCUMENT_FRAGMENT_NODE) {
				throw "Not supported";
			}
			if (newChild.parentNode) {
				newChild.parentNode.removeChild(newChild);
			}
			newChild = this._getFakeNode(newChild);
			refChild = this._getFakeNode(refChild);
			var isFragment = (newChild.nodeType == _Node.DOCUMENT_FRAGMENT_NODE);
			var fragmentChildren;
			if (isFragment) {
				fragmentChildren = newChild._getChildNodes(true);
			}
			if (isFragment && fragmentChildren.length == 0) {
				newChild._reset();
				return newChild._getProxyNode();
			}
			var findResults = this._findChild(refChild);
			if (findResults === null) {
				throw new Error("Invalid child passed to insertBefore");
			}
			var position = findResults.position;
			var importMe = [];
			if (isFragment) {
				for (var i = 0; i < fragmentChildren.length; i++) {
					importMe.push(fragmentChildren[i]);
				}
			} else {
				importMe.push(newChild);
			}
			for (var i = 0; i < importMe.length; i++) {
				var importedNode = this._importNode(importMe[i], false);
				this._nodeXML.insertBefore(importedNode, refChild._nodeXML);
				this._processAppendedChildren(importMe[i], this, this._attached, this._passThrough);
			}
			if (this._attached && this._passThrough) {
				var xmlString = FlashHandler._encodeFlashData(xmlToStr(newChild, this._handler.document._namespaces));
				this._handler.sendToFlash("jsInsertBefore", [refChild._guid, this._guid, position, xmlString]);
			}
			if (!isIE) {
				for (var i = 0; i < importMe.length; i++) {
					this._defineChildNodeAccessor(this._childNodes.length);
					this._childNodes.length++;
				}
			}
			if (newChild.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				newChild._reset();
			}
			return newChild._getProxyNode();
		},
		replaceChild: function(newChild, oldChild) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.DOCUMENT_FRAGMENT_NODE) {
				throw "Not supported";
			}
			if (newChild.parentNode) {
				newChild.parentNode.removeChild(newChild);
			}
			newChild = this._getFakeNode(newChild);
			oldChild = this._getFakeNode(oldChild);
			var isFragment = (newChild.nodeType == _Node.DOCUMENT_FRAGMENT_NODE);
			var fragmentChildren;
			if (isFragment) {
				fragmentChildren = newChild._getChildNodes(true);
			}
			if (isFragment && fragmentChildren.length == 0) {
				newChild._reset();
				return newChild._getProxyNode();
			}
			var findResults = this._findChild(oldChild);
			if (findResults === null) {
				throw new Error("Invalid child passed to replaceChild");
			}
			var position = findResults.position;
			this.removeChild(oldChild);
			var importMe = [];
			if (isFragment) {
				for (var i = 0; i < fragmentChildren.length; i++) {
					importMe.push(fragmentChildren[i]);
				}
			} else {
				importMe.push(newChild);
			}
			if (!isIE) {
				for (var i = 0; i < importMe.length; i++) {
					this._defineChildNodeAccessor(this._childNodes.length);
					this._childNodes.length++;
				}
			}
			var addToEnd = false;
			if (position >= this._nodeXML.childNodes.length) {
				addToEnd = true;
			}
			var insertAt = position;
			for (var i = 0; i < importMe.length; i++) {
				var importedNode = this._importNode(importMe[i], false);
				if (addToEnd) {
					this._nodeXML.appendChild(importedNode);
				} else {
					var placeBefore = this._nodeXML.childNodes[insertAt];
					this._nodeXML.insertBefore(importedNode, placeBefore);
					insertAt++;
				}
			}
			if (this._attached && this._passThrough) {
				var xmlString = FlashHandler._encodeFlashData(xmlToStr(newChild, this._handler.document._namespaces));
				this._handler.sendToFlash("jsAddChildAt", [this._guid, position, xmlString]);
			}
			this._processAppendedChildren(newChild, this, this._attached, this._passThrough);
			oldChild._setUnattached();
			svgweb._removedNodes.push(oldChild._getProxyNode());
			if (newChild.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				newChild._reset();
			}
			return oldChild._getProxyNode();
		},
		removeChild: function(child) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.DOCUMENT_FRAGMENT_NODE) {
				throw "Not supported";
			}
			if (child.nodeType != _Node.ELEMENT_NODE && child.nodeType != _Node.TEXT_NODE) {
				throw "Not supported";
			}
			child = this._getFakeNode(child);
			var findResults = this._findChild(child);
			if (findResults === null) {
				throw new Error("Invalid child passed to removeChild");
			}
			var position = findResults.position;
			this._nodeXML.removeChild(findResults.nodeXML);
			if (child.nodeType == _Node.ELEMENT_NODE) {
				var childID = child._getId();
				if (childID && this._attached) {
					this._handler.document._nodeById["_" + childID] = undefined;
				}
			}
			child._persistEventListeners();
			if (!isIE) {
				delete this._childNodes[this._childNodes.length - 1];
				this._childNodes.length--;
			} else {
				this._childNodes.splice(position, 1);
			}
			if (this._attached && this._passThrough) {
				this._handler.sendToFlash("jsRemoveChild", [child._guid]);
			}
			child._setUnattached();
			svgweb._removedNodes.push(child._getProxyNode());
			return child._getProxyNode();
		},
		appendChild: function(child) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.DOCUMENT_FRAGMENT_NODE) {
				throw "Not supported";
			}
			if (child.parentNode) {
				child.parentNode.removeChild(child);
			}
			child = this._getFakeNode(child);
			var isFragment = (child.nodeType == _Node.DOCUMENT_FRAGMENT_NODE);
			var fragmentChildren;
			if (isFragment) {
				fragmentChildren = child._getChildNodes(true);
			}
			if (isFragment && fragmentChildren.length == 0) {
				child._reset();
				return child._getProxyNode();
			}
			if (isFragment) {
				for (var i = 0; i < fragmentChildren.length; i++) {
					this._importNode(fragmentChildren[i]);
				}
			} else {
				this._importNode(child);
			}
			if (isIE) {
				if (isFragment) {
					for (var i = 0; i < fragmentChildren.length; i++) {
						this._childNodes.push(fragmentChildren[i]._htcNode);
					}
				} else {
					this._childNodes.push(child._htcNode);
				}
			} else {
				if (isFragment) {
					for (var i = 0; i < fragmentChildren.length; i++) {
						this._defineChildNodeAccessor(this._childNodes.length);
						this._childNodes.length++;
					}
				} else {
					this._defineChildNodeAccessor(this._childNodes.length);
					this._childNodes.length++;
				}
			}
			if (this._attached && this._passThrough) {
				var xmlString = FlashHandler._encodeFlashData(xmlToStr(child, this._handler.document._namespaces));
				this._handler.sendToFlash("jsAppendChild", [this._guid, xmlString]);
			}
			this._processAppendedChildren(child, this, this._attached, this._passThrough);
			if (child.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				child._reset();
			}
			return child._getProxyNode();
		},
		hasChildNodes: function() {
			return (this._getChildNodes().length > 0);
		},
		isSupported: function(feature, version) {
			if (version == "2.0") {
				if (feature == "Core") {
					return true;
				} else {
					if (feature == "Events" || feature == "UIEvents" || feature == "MouseEvents") {
						return true;
					}
				}
			} else {
				return false;
			}
		},
		hasAttributes: function() {
			if (this.nodeType == _Node.ELEMENT_NODE) {
				for (var i in this._attributes) {
					if (/^_xmlns/i.test(i)) {
						continue;
					}
					if (i == "_id" && /^__svg__random__/.test(this._attributes[i])) {
						continue;
					}
					if (i == "___guid" && /^__guid/.test(this._attributes[i])) {
						continue;
					}
					if (i == "___fakeTextNode" && /^__fakeTextNode/.test(this._attributes[i])) {
						continue;
					}
					if (/^_.*/.test(i) && this._attributes.hasOwnProperty(i)) {
						return true;
					}
				}
				return false;
			} else {
				return false;
			}
		},
		addEventListener: function(type, listener, useCapture, _adding) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.TEXT_NODE) {
				throw "Not supported";
			}
			if (!_adding && !this._attached) {
				this._detachedListeners.push({
					type: type,
					listener: listener,
					useCapture: useCapture
				});
				return;
			}
			if (this._listeners[type] === undefined) {
				this._listeners[type] = [];
			}
			this._listeners[type].push({
				type: type,
				listener: listener,
				useCapture: useCapture
			});
			this._listeners[type]["_" + listener.toString() + ":" + useCapture] = listener;
			if (type == "keydown") {
				var wrappedListener = (function(listener) {
					return function(evt) {
						if (!evt.preventDefault) {
							evt.preventDefault = function() {
								this.returnValue = false;
								evt = null;
							};
						}
						listener(evt);
					};
				})(listener);
				wrappedListener.__type = type;
				wrappedListener.__listener = listener;
				wrappedListener.__useCapture = useCapture;
				this._handler._keyboardListeners.push(wrappedListener);
				this._addEvent(document, type, wrappedListener);
				return;
			}
			this._handler.sendToFlash("jsAddEventListener", [this._guid, type]);
		},
		removeEventListener: function(type, listener, useCapture) {
			if (this.nodeType != _Node.ELEMENT_NODE && this.nodeType != _Node.TEXT_NODE) {
				throw "Not supported";
			}
			var pos;
			if (!this._attached) {
				pos = this._findListener(this._detachedListeners, type, listener, useCapture);
				if (pos !== null) {
					delete this._detachedListeners[pos];
				}
				return;
			}
			pos = this._findListener(this._listeners, type, listener, useCapture);
			if (pos !== null) {
				delete this._listeners[pos];
				delete this._listeners[type]["_" + listener.toString() + ":" + useCapture];
			}
			if (type == "keydown") {
				pos = this._findListener(this._keyboardListeners, type, listener, useCapture);
				if (pos !== null) {
					delete this._keyboardListeners[pos];
				}
			}
			this._handler.sendToFlash("jsRemoveEventListener", [this._guid, type]);
		},
		getScreenCTM: function() {
			var msg = this._handler.sendToFlash("jsGetScreenCTM", [this._guid]);
			msg = this._handler._stringToMsg(msg);
			return new _SVGMatrix(new Number(msg.a), new Number(msg.b), new Number(msg.c), new Number(msg.d), new Number(msg.e), new Number(msg.f), this._handler);
		},
		getCTM: function() {
			return this.getScreenCTM();
		},
		cloneNode: function(deepClone) {
			var clone;
			if (this.nodeType == _Node.ELEMENT_NODE && this.namespaceURI != svgns) {
				clone = new _Element(this.nodeName, this.prefix, this.namespaceURI);
			} else {
				if (this.nodeType == _Node.ELEMENT_NODE) {
					clone = document.createElementNS(this.namespaceURI, this.nodeName);
				} else {
					if (this.nodeType == _Node.TEXT_NODE) {
						clone = document.createTextNode(this._nodeValue, true);
					} else {
						if (this.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
							clone = document.createDocumentFragment(true);
						} else {
							throw "cloneNode not supported for nodeType: " + this.nodeType;
						}
					}
				}
			}
			clone = this._getFakeNode(clone);
			var attrs = this._nodeXML.attributes;
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs.item(i);
				var m = attr.name.match(/([^:]+):?(.*)/);
				var ns = attr.namespaceURI;
				if (isSafari && attr.name.indexOf("xmlns") != -1) {
					clone._nodeXML.setAttribute(attr.name, attr.nodeValue);
				} else {
					var attrNode;
					var doc = clone._nodeXML.ownerDocument;
					if (isIE) {
						attrNode = doc.createNode(2, attr.name, ns);
					} else {
						attrNode = doc.createAttributeNS(ns, attr.name);
					}
					attrNode.nodeValue = attr.nodeValue;
					if (isIE) {
						clone._nodeXML.setAttributeNode(attrNode);
					} else {
						clone._nodeXML.setAttributeNodeNS(attrNode);
					}
				}
			}
			clone._nodeXML.setAttribute("__guid", clone._guid);
			if (isIE) {
				var copyStyle = this._htcNode.style;
				for (var i = 0; i < copyStyle.length; i++) {
					var styleName = copyStyle.item(i);
					var styleValue = copyStyle.getPropertyValue(styleName);
					clone._htcNode.style.length++;
					clone.style.length++;
					clone.style._ignoreStyleChanges = true;
					clone._htcNode.style[styleName] = styleValue;
					clone.style._ignoreStyleChanges = false;
				}
			}
			if (clone.nodeType == _Node.ELEMENT_NODE) {
				clone._importAttributes(clone, clone._nodeXML);
			}
			if (deepClone && (clone.nodeType == _Node.ELEMENT_NODE || clone.nodeType == _Node.DOCUMENT_FRAGMENT_NODE)) {
				var children = this._getChildNodes();
				for (var i = 0; i < children.length; i++) {
					var childClone = children[i].cloneNode(true);
					clone.appendChild(childClone);
				}
			}
			clone.ownerDocument = this.ownerDocument;
			return clone._getProxyNode();
		},
		toString: function() {
			if (this.namespaceURI == svgns) {
				return "[_SVG" + this.localName.charAt(0).toUpperCase() + this.localName.substring(1) + "]";
			} else {
				if (this.prefix) {
					return "[" + this.prefix + ":" + this.localName + "]";
				} else {
					if (this.localName) {
						return "[" + this.localName + "]";
					} else {
						return "[" + this.nodeName + "]";
					}
				}
			}
		},
		_addEvent: function(obj, type, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(type, fn, false);
			} else {
				if (obj.attachEvent) {
					obj["e" + type + fn] = fn;
					obj[type + fn] = (function(obj, type, fn) {
						return function() {
							obj["e" + type + fn](window.event);
						};
					})(obj, type, fn);
					obj.attachEvent("on" + type, obj[type + fn]);
				}
			}
		},
		nodeName: null,
		nodeType: null,
		ownerDocument: null,
		namespaceURI: null,
		localName: null,
		prefix: null,
		_getParentNode: function() {
			if (this.nodeType == _Node.DOCUMENT_NODE || this.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				return null;
			}
			if (this.nodeName == "svg" && this._handler.type == "script") {
				return this._handler.flash.parentNode;
			} else {
				if (this.nodeName == "svg" && this._handler.type == "object") {
					return this._handler.document;
				}
			}
			var parentXML = this._nodeXML.parentNode;
			if (parentXML === null || parentXML.nodeType == _Node.DOCUMENT_NODE) {
				return null;
			}
			var node = FlashHandler._getNode(parentXML, this._handler);
			return node;
		},
		_getFirstChild: function() {
			if (this.nodeType == _Node.TEXT_NODE) {
				return null;
			}
			var childXML = this._nodeXML.firstChild;
			if (childXML === null) {
				return null;
			}
			var node = FlashHandler._getNode(childXML, this._handler);
			this._getFakeNode(node)._passThrough = this._passThrough;
			return node;
		},
		_getLastChild: function() {
			if (this.nodeType == _Node.TEXT_NODE) {
				return null;
			}
			var childXML = this._nodeXML.lastChild;
			if (childXML === null) {
				return null;
			}
			var node = FlashHandler._getNode(childXML, this._handler);
			this._getFakeNode(node)._passThrough = this._passThrough;
			return node;
		},
		_getPreviousSibling: function() {
			if (this.nodeType == _Node.DOCUMENT_NODE || this.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				return null;
			}
			if (this.nodeName == "svg" && this._handler.type == "script") {
				var sibling = this._handler.flash.previousSibling;
				if (sibling && sibling.nodeType == 1 && sibling.className && sibling.className.indexOf("embedssvg") != -1) {
					var rootID = sibling.getAttribute("id").replace("_flash", "");
					var node = svgweb.handlers[rootID].document.documentElement;
					return node._getProxyNode();
				} else {
					return sibling;
				}
			}
			var siblingXML = this._nodeXML.previousSibling;
			if (siblingXML === null || siblingXML.nodeType == 7) {
				return null;
			}
			var node = FlashHandler._getNode(siblingXML, this._handler);
			this._getFakeNode(node)._passThrough = this._passThrough;
			return node;
		},
		_getNextSibling: function() {
			if (this.nodeType == _Node.DOCUMENT_NODE || this.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				return null;
			}
			if (this.nodeName == "svg" && this._handler.type == "script") {
				var sibling = this._handler.flash.nextSibling;
				if (sibling && sibling.nodeType == 1 && sibling.className && sibling.className.indexOf("embedssvg") != -1) {
					var id = sibling.getAttribute("id").replace("_flash", "");
					var node = this._handler.document._nodeById["_" + id];
					return node._getProxyNode();
				} else {
					return sibling;
				}
			}
			var siblingXML = this._nodeXML.nextSibling;
			if (siblingXML === null) {
				return null;
			}
			var node = FlashHandler._getNode(siblingXML, this._handler);
			this._getFakeNode(node)._passThrough = this._passThrough;
			return node;
		},
		_passThrough: false,
		_attached: true,
		_fake: true,
		_defineNodeAccessors: function() {
			this.__defineGetter__("parentNode", hitch(this, this._getParentNode));
			this.__defineGetter__("firstChild", hitch(this, this._getFirstChild));
			this.__defineGetter__("lastChild", hitch(this, this._getLastChild));
			this.__defineGetter__("previousSibling", hitch(this, this._getPreviousSibling));
			this.__defineGetter__("nextSibling", hitch(this, this._getNextSibling));
			this.__defineGetter__("childNodes", (function(self) {
				return function() {
					return self._childNodes;
				};
			})(this));
			if (this.nodeName == "#text") {
				this._childNodes.length = 0;
			} else {
				var children = this._nodeXML.childNodes;
				this._childNodes.length = children.length;
				for (var i = 0; i < children.length; i++) {
					this._defineChildNodeAccessor(i);
				}
			}
			if (this.nodeType == _Node.TEXT_NODE) {
				this.__defineGetter__("data", (function(self) {
					return function() {
						return self._nodeValue;
					};
				})(this));
				this.__defineSetter__("data", (function(self) {
					return function(newValue) {
						return self._setNodeValue(newValue);
					};
				})(this));
				this.__defineGetter__("textContent", (function(self) {
					return function() {
						return self._nodeValue;
					};
				})(this));
				this.__defineSetter__("textContent", (function(self) {
					return function(newValue) {
						return self._setNodeValue(newValue);
					};
				})(this));
			} else {
				this.__defineGetter__("textContent", (function() {
					return function() {
						return "";
					};
				})());
			}
			this.__defineGetter__("nodeValue", (function(self) {
				return function() {
					return self._nodeValue;
				};
			})(this));
			this.__defineSetter__("nodeValue", (function(self) {
				return function(newValue) {
					return self._setNodeValue(newValue);
				};
			})(this));
		},
		_defineChildNodeAccessor: function(i) {
			var self = this;
			this._childNodes.__defineGetter__(i, function() {
				var childXML = self._nodeXML.childNodes[i];
				var node = FlashHandler._getNode(childXML, self._handler);
				node._passThrough = self._passThrough;
				return node;
			});
		},
		_getChildNodes: function(returnFakeNodes) {
			if (!isIE) {
				return this._childNodes;
			}
			if (returnFakeNodes === undefined) {
				returnFakeNodes = false;
			}
			var results = createNodeList();
			if (this.nodeName == "#text") {
				return results;
			}
			if (this._nodeXML.childNodes.length == this._childNodes.length && !returnFakeNodes) {
				return this._childNodes;
			} else {
				for (var i = 0; i < this._nodeXML.childNodes.length; i++) {
					var childXML = this._nodeXML.childNodes[i];
					var node = FlashHandler._getNode(childXML, this._handler);
					node._fakeNode._passThrough = this._passThrough;
					if (returnFakeNodes) {
						node = node._fakeNode;
					}
					results.push(node);
				}
				this._childNodes = results;
				return results;
			}
		},
		_createHTC: function() {
			if (!this._htcContainer) {
				this._htcContainer = document.getElementById("__htc_container");
				if (!this._htcContainer) {
					var body = document.getElementsByTagName("body")[0];
					var c = document.createElement("div");
					c.id = "__htc_container";
					c.style.position = "absolute";
					c.style.top = "-5000px";
					c.style.left = "-5000px";
					body.appendChild(c);
					this._htcContainer = c;
				}
			}
			var htcNode = document.createElement("svg:" + this.nodeName);
			htcNode._fakeNode = this;
			htcNode._handler = this._handler;
			this._htcContainer.appendChild(htcNode);
			this._htcNode = htcNode;
		},
		_setNodeValue: function(newValue) {
			if (this.nodeType != _Node.TEXT_NODE) {
				return newValue;
			}
			this._nodeValue = newValue;
			this._nodeXML.firstChild.nodeValue = newValue;
			if (this._attached && this._passThrough) {
				var flashStr = FlashHandler._encodeFlashData(newValue);
				var parentGUID = this._nodeXML.parentNode.getAttribute("__guid");
				this._handler.sendToFlash("jsSetText", [parentGUID, this._guid, flashStr]);
			}
			return newValue;
		},
		_getFakeNode: function(node) {
			if (!node) {
				node = this;
			}
			if (isIE && node._fakeNode) {
				node = node._fakeNode;
			}
			return node;
		},
		_processAppendedChildren: function(child, parent, attached, passThrough) {
			var current;
			var suspendID;
			if (child.nodeType == _Node.DOCUMENT_FRAGMENT_NODE) {
				current = this._getFakeNode(child._getFirstChild());
				if (attached && passThrough) {
					suspendID = this._handler._redrawManager.suspendRedraw(10000);
				}
			} else {
				current = child;
			}
			while (current) {
				var currentXML = current._nodeXML;
				current._handler = this._handler;
				var id = currentXML.getAttribute("id");
				if (attached && current.nodeType == _Node.ELEMENT_NODE && id) {
					this._handler.document._nodeById["_" + id] = current;
				}
				if (attached) {
					if (this._handler.type == "script") {
						current.ownerDocument = document;
					} else {
						if (this._handler.type == "object") {
							current.ownerDocument = this._handler.document;
						}
					}
				}
				if (attached) {
					for (var i = 0; i < current._detachedListeners.length; i++) {
						var addMe = current._detachedListeners[i];
						current.addEventListener(addMe.type, addMe.listener, addMe.useCapture, true);
					}
					current._detachedListeners = [];
				}
				var lastVisited = current;
				var children = current._getChildNodes();
				var next = (children && children.length > 0) ? children[0] : null;
				if (next) {
					current = next;
					if (isIE) {
						current = current._fakeNode;
					}
				}
				while (!next && current) {
					if (current != child) {
						next = current._getNextSibling();
						if (next) {
							current = next;
							if (isIE) {
								current = current._fakeNode;
							}
							break;
						}
					}
					if (current == child) {
						current = null;
					} else {
						current = current._getParentNode();
						if (current && isIE) {
							current = current._fakeNode;
						}
						if (current && (current.nodeType != 1 || current.nodeName.toUpperCase() == "SVG")) {
							current = null;
						}
					}
				}
				lastVisited._attached = attached;
				lastVisited._passThrough = passThrough;
			}
			if (child.nodeType == _Node.DOCUMENT_FRAGMENT_NODE && attached && passThrough) {
				this._handler._redrawManager.unsuspendRedraw(suspendID);
			}
		},
		_importNode: function(child, doAppend) {
			if (typeof doAppend == "undefined") {
				doAppend = true;
			}
			var doc;
			if (this._attached) {
				doc = this._handler.document._xml;
			} else {
				doc = this._nodeXML.ownerDocument;
			}
			var importedNode;
			if (typeof doc.importNode == "undefined") {
				importedNode = document._importNodeFunc(doc, child._nodeXML, true);
			} else {
				importedNode = doc.importNode(child._nodeXML, true);
			}
			if (doAppend) {
				this._nodeXML.appendChild(importedNode);
			}
			child._importChildXML(importedNode);
			return importedNode;
		},
		_importChildXML: function(newXML) {
			this._nodeXML = newXML;
			var children = this._getChildNodes();
			for (var i = 0; i < children.length; i++) {
				var currentChild = children[i];
				if (isIE && currentChild._fakeNode) {
					currentChild = currentChild._fakeNode;
				}
				currentChild._nodeXML = this._nodeXML.childNodes[i];
				currentChild._importChildXML(this._nodeXML.childNodes[i]);
			}
		},
		_findChild: function(child, ignoreTextNodes) {
			if (ignoreTextNodes === undefined) {
				ignoreTextNodes = false;
			}
			var results = {};
			var elementIndex = 0;
			for (var i = 0; i < this._nodeXML.childNodes.length; i++) {
				var currentXML = this._nodeXML.childNodes[i];
				if (currentXML.nodeType != _Node.ELEMENT_NODE && currentXML.nodeType != _Node.TEXT_NODE) {
					continue;
				}
				if (ignoreTextNodes && (currentXML.getAttribute("__fakeTextNode") || currentXML.nodeType == _Node.TEXT_NODE)) {
					continue;
				}
				if (currentXML.nodeType == _Node.ELEMENT_NODE) {
					elementIndex++;
				}
				if (currentXML.nodeType == _Node.ELEMENT_NODE && currentXML.getAttribute("__guid") == child._guid) {
					results.position = (ignoreTextNodes) ? elementIndex : i;
					results.nodeXML = currentXML;
					return results;
				}
			}
			return null;
		},
		_setUnattached: function() {
			var children = this._getChildNodes();
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (isIE) {
					child = child._fakeNode;
				}
				child._setUnattached();
			}
			this._attached = false;
			this._passThrough = false;
			this._handler = null;
		},
		_getProxyNode: function() {
			if (!isIE) {
				return this;
			} else {
				return this._htcNode;
			}
		},
		_createChildNodes: function() {
			var childNodes;
			if (!isIE) {
				childNodes = {};
				childNodes.item = function(index) {
					if (index >= this.length) {
						return null;
					} else {
						return this[index];
					}
				};
			} else {
				childNodes = createNodeList();
			}
			return childNodes;
		},
		_getTextContent: function() {
			if (this.nodeType == _Node.TEXT_NODE) {
				return this._nodeValue;
			} else {
				return "";
			}
		},
		_setTextContent: function(newValue) {
			if (this.nodeType == _Node.TEXT_NODE) {
				return this._setNodeValue(newValue);
			} else {
				return "";
			}
		},
		_getData: function() {
			if (this.nodeType == _Node.TEXT_NODE) {
				return this._nodeValue;
			} else {
				return undefined;
			}
		},
		_setData: function(newValue) {
			if (this.nodeType == _Node.TEXT_NODE) {
				return this._setNodeValue(newValue);
			} else {
				return undefined;
			}
		},
		_createEmptyMethods: function() {
			if (this.nodeType == _Node.TEXT_NODE) {
				this.getAttribute = this.getAttributeNS = this.setAttribute = this.setAttributeNS = this.removeAttribute = this.removeAttributeNS = this.hasAttribute = this.hasAttributeNS = this.getElementsByTagNameNS = this._getId = this._setId = this._getX = this._getY = this._getWidth = this._getHeight = this._getCurrentScale = this._setCurrentScale = this._getCurrentTranslate = this.createSVGRect = this.createSVGPoint = function() {
					return undefined;
				};
			}
		},
		_persistEventListeners: function() {
			for (var eventType in this._listeners) {
				for (var i = 0; i < this._listeners[eventType].length; i++) {
					var l = this._listeners[eventType][i];
					this._detachedListeners.push({
						type: l.type,
						listener: l.listener,
						useCapture: l.useCapture
					});
				}
			}
			this._listeners = [];
			var children = this._getChildNodes();
			for (var i = 0; i < children.length; i++) {
				var c = children[i];
				if (c._fakeNode) {
					c = c._fakeNode;
				}
				c._persistEventListeners();
			}
		},
		_findListener: function(listenerArray, type, listener, useCapture) {
			for (var i = 0; i < listenerArray.length; i++) {
				var l = listenerArray[i];
				if (l.listener == listener && l.type == type && l.useCapture == useCapture) {
					return i;
				}
			}
			return null;
		}
	});
	function _Element(nodeName, prefix, namespaceURI, nodeXML, handler, passThrough) {
		if (nodeName === undefined && namespaceURI === undefined && nodeXML === undefined && handler === undefined) {
			return;
		}
		_Node.apply(this, [nodeName, _Node.ELEMENT_NODE, prefix, namespaceURI, nodeXML, handler, passThrough]);
		this._attributes = {};
		this._attributes._id = "";
		this._importAttributes(this, this._nodeXML);
		if (!isIE) {
			this._defineAccessors();
		}
		if (this.namespaceURI == svgns) {
			if (isIE && this._attached && this._handler.type == "script" && this.nodeName == "svg") {} else {
				this.style = new _Style(this);
			}
			if (isIE && this._attached && this._handler.type == "script" && this.nodeName == "svg") {} else {
				if (isIE) {
					this.style._ignoreStyleChanges = false;
				}
			}
		}
	}
	_Element.prototype = new _Node;
	extend(_Element, {
		getAttribute: function(attrName) {
			return this.getAttributeNS(null, attrName, true);
		},
		getAttributeNS: function(ns, localName, _forceNull) {
			var value;
			if (ns == null && localName == "__guid") {
				return null;
			}
			if (this._attached && this._passThrough && !this._handler._redrawManager.isSuspended()) {
				value = this._handler.sendToFlash("jsGetAttribute", [this._guid, false, false, ns, localName, true]);
			} else {
				if (!isIE) {
					value = this._nodeXML.getAttributeNS(ns, localName);
				} else {
					if (isIE) {
						if (!ns) {
							value = this._nodeXML.getAttribute(localName);
						} else {
							for (var i = 0; i < this._nodeXML.attributes.length; i++) {
								var attr = this._nodeXML.attributes.item(i);
								var attrName = new String(attr.name).match(/[^:]*:?(.*)/)[1];
								if (attr.namespaceURI && attr.namespaceURI == ns && attrName == localName) {
									value = attr.nodeValue;
									break;
								}
							}
						}
					}
				}
			}
			if (ns == "null" && localName == "id" && !value) {
				return "";
			}
			if (value === undefined || value === null || /^[ ]*$/.test(value)) {
				return (_forceNull) ? null : "";
			}
			return value;
		},
		removeAttribute: function(name) {
			this.removeAttributeNS(null, name);
		},
		removeAttributeNS: function(ns, localName) {
			if (localName == "id" && this._attached && this.namespaceURI == svgns) {
				var doc = this._handler.document;
				var elementId = this._nodeXML.getAttribute("id");
				doc._nodeById["_" + elementId] = undefined;
			}
			var attrNode;
			if (!ns) {
				attrNode = this._nodeXML.getAttributeNode(localName);
			} else {
				for (var i = 0; i < this._nodeXML.attributes.length; i++) {
					var current = this._nodeXML.attributes.item(i);
					var m = new String(current.name).match(/([^:]+:)?(.*)/);
					var prefix, attrName;
					if (current.name.indexOf(":") != -1) {
						prefix = m[1];
						attrName = m[2];
					} else {
						attrName = m[1];
					}
					if (current.namespaceURI && current.namespaceURI == ns && attrName == localName) {
						attrNode = current;
						break;
					}
				}
			}
			if (!attrNode) {
				console.log("No attribute node found for: " + localName + " in the namespace: " + ns);
				return;
			}
			this._nodeXML.removeAttributeNode(attrNode);
			var qName = localName;
			if (ns) {
				qName = prefix + ":" + localName;
			}
			this._attributes["_" + qName] = undefined;
			if (this._attached && this._passThrough) {
				this._handler.sendToFlash("jsRemoveAttribute", [this._guid, ns, localName]);
			}
		},
		setAttribute: function(attrName, attrValue) {
			this.setAttributeNS(null, attrName, attrValue);
		},
		setAttributeNS: function(ns, qName, attrValue) {
			if (attrValue === null || typeof attrValue == "undefined") {
				attrValue = "";
			}
			var localName = qName;
			if (qName.indexOf(":") != -1) {
				localName = qName.split(":")[1];
			}
			if (this._attached && qName == "id") {
				var doc = this._handler.document;
				var elementId = this._nodeXML.getAttribute("id");
				doc._nodeById["_" + elementId] = undefined;
				if (elementId === 0 || elementId) {
					doc._nodeById["_" + attrValue] = this;
				}
			}
			if (isSafari && localName == "style" && this._nodeXML.parentNode !== null && this._nodeXML.parentNode.nodeName == "clipPath") {
				var addBeforeXML = this._nodeXML.nextSibling;
				var origParent = this._nodeXML.parentNode;
				this._nodeXML.parentNode.removeChild(this._nodeXML);
				this._nodeXML.setAttribute("style", attrValue);
				if (addBeforeXML) {
					origParent.insertBefore(this._nodeXML, addBeforeXML);
				} else {
					origParent.appendChild(this._nodeXML);
				}
			} else {
				if (ns && isIE) {
					var attrNode = this._nodeXML.ownerDocument.createNode(2, qName, ns);
					attrNode.nodeValue = attrValue;
					this._nodeXML.setAttributeNode(attrNode);
				} else {
					if (isIE) {
						this._nodeXML.setAttribute(qName, attrValue);
					} else {
						this._nodeXML.setAttributeNS(ns, qName, attrValue);
					}
				}
			}
			this._attributes["_" + qName] = attrValue;
			if (this._attached && this._passThrough) {
				var flashStr = FlashHandler._encodeFlashData(attrValue);
				this._handler.sendToFlash("jsSetAttribute", [this._guid, false, ns, localName, flashStr]);
			}
		},
		hasAttribute: function(localName) {
			return this.hasAttributeNS(null, localName);
		},
		hasAttributeNS: function(ns, localName) {
			if (!ns && !isIE) {
				return this._nodeXML.hasAttribute(localName);
			} else {
				if (!isIE) {
					return this._nodeXML.hasAttributeNS(ns, localName);
				} else {
					var attrNode = null;
					for (var i = 0; i < this._nodeXML.attributes.length; i++) {
						var current = this._nodeXML.attributes.item(i);
						var m = new String(current.name).match(/(?:[^:]+:)?(.*)/);
						var attrName = m[1];
						var currentNS = current.namespaceURI;
						if (currentNS == "") {
							currentNS = null;
						}
						if (ns == currentNS && attrName == localName) {
							attrNode = current;
							break;
						}
					}
					return (attrNode != null);
				}
			}
		},
		getElementsByTagNameNS: function(ns, localName) {
			var results = createNodeList();
			var matches;
			if (ns == "") {
				ns = null;
			}
			if (ns == svgns) {
				ns = svgnsFake;
			}
			if (this._nodeXML.getElementsByTagNameNS) {
				results = this._nodeXML.getElementsByTagNameNS(ns, localName);
			} else {
				var namespaces = null;
				if (this._attached) {
					namespaces = this._handler.document._namespaces;
				}
				var prefix = "xmlns";
				if (ns && ns != "*" && namespaces) {
					prefix = namespaces["_" + ns];
					if (prefix === undefined) {
						return createNodeList();
					}
				}
				var query;
				if (ns == "*" && localName == "*") {
					query = "//*[ancestor::*[@__guid = '" + this._guid + "']]";
				} else {
					if (ns == "*") {
						query = "//*[namespace-uri()='*' and local-name()='" + localName + "' and ancestor::*[@__guid = '" + this._guid + "']]";
					} else {
						if (localName == "*") {
							query = "//*[namespace-uri()='" + ns + "' and ancestor::*[@__guid = '" + this._guid + "']]";
						} else {
							query = "//" + localName + "[ancestor::*[@__guid = '" + this._guid + "']]| //*[namespace-uri()='" + ns + "' and local-name()='" + localName + "' and ancestor::*[@__guid = '" + this._guid + "']]";
						}
					}
				}
				matches = xpath(this._nodeXML.ownerDocument, this._nodeXML, query, namespaces);
				if (matches !== null && matches !== undefined && matches.length > 0) {
					for (var i = 0; i < matches.length; i++) {
						if (matches[i] === this._nodeXML) {
							continue;
						}
						results.push(matches[i]);
					}
				}
			}
			if (ns == "*" && localName == "*") {
				var temp = [];
				for (var i = 0; i < results.length; i++) {
					if (results[i].nodeType == _Node.ELEMENT_NODE && results[i].nodeName != "__text") {
						temp.push(results[i]);
					}
				}
				results = temp;
			}
			var nodes = createNodeList();
			for (var i = 0; i < results.length; i++) {
				var elem = FlashHandler._getNode(results[i], this._handler);
				elem._passThrough = true;
				nodes.push(elem);
			}
			return nodes;
		},
		style: null,
		_setClassName: function(className) {},
		_getClassName: function() {},
		_setTransform: function(transform) {},
		_getTransform: function() {},
		_getViewBox: function() {},
		_getId: function() {
			if (this._attributes._id) {
				return this._attributes._id;
			} else {
				return "";
			}
		},
		_setId: function(id) {
			return this.setAttribute("id", id);
		},
		ownerSVGElement: null,
		_getX: function() {
			var value = this._trimMeasurement(this.getAttribute("x"));
			return new _SVGAnimatedLength(new _SVGLength(new Number(value)));
		},
		_getY: function() {
			var value = this._trimMeasurement(this.getAttribute("y"));
			return new _SVGAnimatedLength(new _SVGLength(new Number(value)));
		},
		_getWidth: function() {
			var value = this._trimMeasurement(this.getAttribute("width"));
			return new _SVGAnimatedLength(new _SVGLength(new Number(value)));
		},
		_getHeight: function() {
			var value = this._trimMeasurement(this.getAttribute("height"));
			return new _SVGAnimatedLength(new _SVGLength(new Number(value)));
		},
		_getCurrentScale: function() {
			return this._currentScale;
		},
		_setCurrentScale: function(newScale) {
			if (newScale !== this._currentScale) {
				this._currentScale = newScale;
				this._handler.sendToFlash("jsSetCurrentScale", [newScale]);
			}
			return newScale;
		},
		_getCurrentTranslate: function() {
			return this._currentTranslate;
		},
		createSVGPoint: function() {
			return new _SVGPoint(0, 0);
		},
		createSVGRect: function() {
			return new _SVGRect(0, 0, 0, 0);
		},
		_trimMeasurement: function(value) {
			if (value !== null) {
				value = value.replace(/[a-z]/gi, "");
			}
			return value;
		},
		_getInnerHTML: function() {},
		_setInnerHTML: function(newValue) {},
		_allEvents: ["onfocusin", "onfocusout", "onactivate", "onclick", "onmousedown", "onmouseup", "onmouseover", "onmousemove", "onmouseout", "onload", "onunload", "onabort", "onerror", "onresize", "onscroll", "onzoom", "onbegin", "onend", "onrepeat"],
		_handleEvent: function(evt) {},
		_prepareEvents: function() {},
		_attributes: null,
		_importAttributes: function(target, nodeXML) {
			for (var i = 0; i < nodeXML.attributes.length; i++) {
				var attr = nodeXML.attributes[i];
				this._attributes["_" + attr.nodeName] = attr.nodeValue;
			}
		},
		_defineAccessors: function() {
			var props;
			var self = this;
			if (this.nodeName == "svg" || this.nodeName == "use") {
				this.__defineGetter__("x", function() {
					return self._getX();
				});
				this.__defineGetter__("y", function() {
					return self._getY();
				});
				this.__defineGetter__("width", function() {
					return self._getWidth();
				});
				this.__defineGetter__("height", function() {
					return self._getHeight();
				});
			}
			if (this.nodeName == "svg") {
				this.__defineGetter__("currentTranslate", function() {
					return self._getCurrentTranslate();
				});
				this.__defineGetter__("currentScale", function() {
					return self._getCurrentScale();
				});
				this.__defineSetter__("currentScale", function(newScale) {
					return self._setCurrentScale(newScale);
				});
			}
			this.__defineGetter__("id", hitch(this, this._getId));
			this.__defineSetter__("id", hitch(this, this._setId));
		},
		_defineAccessor: function(prop, readWrite) {
			var self = this;
			var getMethod = function() {
				return self.getAttribute(prop);
			};
			this.__defineGetter__(prop, getMethod);
			if (readWrite) {
				var setMethod = function(newValue) {
					return self.setAttribute(prop, newValue);
				};
				this.__defineSetter__(prop, setMethod);
			}
		}
	});
	function _DocumentFragment(doc) {
		_Node.apply(this, ["#document-fragment", _Node.DOCUMENT_FRAGMENT_NODE, null, null, null, null]);
		this.ownerDocument = doc;
	}
	_DocumentFragment.prototype = new _Node;
	extend(_DocumentFragment, {
		_reset: function() {
			while (this._nodeXML.firstChild) {
				this._nodeXML.removeChild(this._nodeXML.firstChild);
			}
			this._childNodes = this._createChildNodes();
			if (!isIE) {
				this._defineNodeAccessors();
			}
		}
	});
	function _Style(element) {
		this._element = element;
		this._setup();
	}
	_Style._allStyles = ["font", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "direction", "letterSpacing", "textDecoration", "unicodeBidi", "wordSpacing", "clip", "color", "cursor", "display", "overflow", "visibility", "clipPath", "clipRule", "mask", "opacity", "enableBackground", "filter", "floodColor", "floodOpacity", "lightingColor", "stopColor", "stopOpacity", "pointerEvents", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "fill", "fillOpacity", "fillRule", "imageRendering", "marker", "markerEnd", "markerMid", "markerStart", "shapeRendering", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "textRendering", "alignmentBaseline", "baselineShift", "dominantBaseline", "glyphOrientationHorizontal", "glyphOrientationVertical", "kerning", "textAnchor", "writingMode"];
	_Style._allRootStyles = ["border", "verticalAlign", "backgroundColor", "top", "right", "bottom", "left", "position", "width", "height", "margin", "marginTop", "marginBottom", "marginRight", "marginLeft", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "zIndex", "overflowX", "overflowY", "float", "clear"];
	extend(_Style, {
		_ignoreStyleChanges: true,
		_setup: function() {
			this._normalizeStyle();
			if (!isIE) {
				for (var i = 0; i < _Style._allStyles.length; i++) {
					var styleName = _Style._allStyles[i];
					this._defineAccessor(styleName);
				}
				if (this._element.nodeName == "svg") {
					for (var i = 0; i < _Style._allRootStyles.length; i++) {
						var styleName = _Style._allRootStyles[i];
						this._defineAccessor(styleName);
					}
				}
				this.__defineGetter__("length", hitch(this, this._getLength));
			} else {
				var htcStyle = this._element._htcNode.style;
				var parsedStyle = this._fromStyleString();
				for (var i = 0; i < parsedStyle.length; i++) {
					var styleName = this._toCamelCase(parsedStyle[i].styleName);
					var styleValue = parsedStyle[i].styleValue;
					htcStyle[styleName] = styleValue;
				}
				htcStyle.length = 0;
				this.length = 0;
				htcStyle.item = hitch(this, this.item);
				htcStyle.setProperty = hitch(this, this.setProperty);
				htcStyle.getPropertyValue = hitch(this, this.getPropertyValue);
				this._changeListener = hitch(this, this._onPropertyChange);
				this._element._htcNode.attachEvent("onpropertychange", this._changeListener);
			}
		},
		_defineAccessor: function(styleName) {
			var self = this;
			this.__defineGetter__(styleName, function() {
				return self._getStyleAttribute(styleName);
			});
			this.__defineSetter__(styleName, function(styleValue) {
				return self._setStyleAttribute(styleName, styleValue);
			});
		},
		_setStyleAttribute: function(styleName, styleValue) {
			var stylePropName = this._fromCamelCase(styleName);
			var parsedStyle = this._fromStyleString();
			var foundStyle = false;
			for (var i = 0; i < parsedStyle.length; i++) {
				if (parsedStyle[i].styleName === stylePropName) {
					parsedStyle[i].styleValue = styleValue;
					foundStyle = true;
					break;
				}
			}
			if (!foundStyle) {
				parsedStyle.push({
					styleName: stylePropName,
					styleValue: styleValue
				});
			}
			var styleString = this._toStyleString(parsedStyle);
			this._element._nodeXML.setAttribute("style", styleString);
			this._element._attributes._style = styleString;
			if (isIE) {
				var htcStyle = this._element._htcNode.style;
				if (!foundStyle) {
					htcStyle.length++;
					this.length++;
				}
				this._ignoreStyleChanges = true;
				htcStyle[styleName] = styleValue;
				this._ignoreStyleChanges = false;
			}
			if (this._element._attached && this._element._passThrough) {
				var flashStr = FlashHandler._encodeFlashData(styleValue);
				this._element._handler.sendToFlash("jsSetAttribute", [this._element._guid, true, null, stylePropName, flashStr]);
			}
		},
		_getStyleAttribute: function(styleName) {
			var stylePropName = this._fromCamelCase(styleName);
			if (this._element._attached && this._element._passThrough && !this._element._handler._redrawManager.isSuspended()) {
				var value = this._element._handler.sendToFlash("jsGetAttribute", [this._element._guid, true, false, null, stylePropName, false]);
				return value;
			} else {
				var parsedStyle = this._fromStyleString();
				for (var i = 0; i < parsedStyle.length; i++) {
					if (parsedStyle[i].styleName === stylePropName) {
						return parsedStyle[i].styleValue;
					}
				}
				return null;
			}
		},
		_fromStyleString: function() {
			var styleValue = this._element._nodeXML.getAttribute("style");
			if (styleValue === null || styleValue === undefined) {
				return [];
			}
			var baseStyles;
			if (styleValue.indexOf(";") == -1) {
				baseStyles = [styleValue];
			} else {
				baseStyles = styleValue.split(/\s*;\s*/);
				if (!baseStyles[baseStyles.length - 1]) {
					baseStyles = baseStyles.slice(0, baseStyles.length - 1);
				}
			}
			var results = [];
			for (var i = 0; i < baseStyles.length; i++) {
				var style = baseStyles[i];
				var styleSet = style.split(":");
				if (styleSet.length == 2) {
					var attrName = styleSet[0];
					var attrValue = styleSet[1];
					attrName = attrName.replace(/^\s+/, "");
					attrValue = attrValue.replace(/^\s+/, "");
					var entry = {
						styleName: attrName,
						styleValue: attrValue
					};
					results.push(entry);
				}
			}
			return results;
		},
		_toStyleString: function(parsedStyle) {
			var results = "";
			for (var i = 0; i < parsedStyle.length; i++) {
				results += parsedStyle[i].styleName + ": ";
				results += parsedStyle[i].styleValue + ";";
				if (i != (parsedStyle.length - 1)) {
					results += " ";
				}
			}
			return results;
		},
		_fromCamelCase: function(styleName) {
			return styleName.replace(/([A-Z])/g, "-$1").toLowerCase();
		},
		_toCamelCase: function(stylePropName) {
			if (stylePropName.indexOf("-") == -1) {
				return stylePropName;
			}
			var results = "";
			var sections = stylePropName.split("-");
			results += sections[0];
			for (var i = 1; i < sections.length; i++) {
				results += sections[i].charAt(0).toUpperCase() + sections[i].substring(1);
			}
			return results;
		},
		setProperty: function(stylePropName, styleValue, priority) {
			var styleName = this._toCamelCase(stylePropName);
			this._setStyleAttribute(styleName, styleValue);
			return styleValue;
		},
		getPropertyValue: function(stylePropName) {
			var styleName = this._toCamelCase(stylePropName);
			return this._getStyleAttribute(styleName);
		},
		item: function(index) {
			var parsedStyle = this._fromStyleString();
			return parsedStyle[index].styleName;
		},
		_getLength: function() {
			var parsedStyle = this._fromStyleString();
			return parsedStyle.length;
		},
		_normalizeStyle: function() {
			if (!this._element._nodeXML.getAttribute("style")) {
				return;
			}
			if (!/[A-Z]/.test(this._element._nodeXML.getAttribute("style"))) {
				return;
			}
			var parsedStyle = this._fromStyleString();
			for (var i = 0; i < parsedStyle.length; i++) {
				parsedStyle[i].styleName = parsedStyle[i].styleName.toLowerCase();
				if (parsedStyle[i].styleValue.indexOf("url(") == -1) {
					parsedStyle[i].styleValue = parsedStyle[i].styleValue.toLowerCase();
				}
			}
			var results = "";
			for (var i = 0; i < parsedStyle.length; i++) {
				results += parsedStyle[i].styleName + ": " + parsedStyle[i].styleValue + "; ";
			}
			if (results.charAt(results.length - 1) == " ") {
				results = results.substring(0, results.length - 1);
			}
			var origPassThrough = this._element._passThrough;
			this._element._passThrough = false;
			this._element.setAttribute("style", results);
			this._element._passThrough = origPassThrough;
		},
		_onPropertyChange: function() {
			if (this._ignoreStyleChanges) {
				return;
			}
			var prop = window.event.propertyName;
			if (prop && /^style\./.test(prop) && prop != "style.length") {
				var styleName = prop.match(/^style\.(.*)$/)[1];
				var styleValue = this._element._htcNode.style[styleName];
				this._setStyleAttribute(styleName, styleValue);
			}
		}
	});
	function _SVGObject(svgNode, handler) {
		this._handler = handler;
		this._svgNode = svgNode;
		this._scriptsToExec = [];
		this._htcLoaded = false;
		this._swfLoaded = false;
		for (var i = 0; this._svgNode._onloadListeners && i < this._svgNode._onloadListeners.length; i++) {
			var wrappedListener = (function(handler, listener) {
				return function() {
					listener.apply(handler.flash);
				};
			})(this._handler, this._svgNode._onloadListeners[i]);
			svgweb.addOnLoad(wrappedListener);
		}
		if (isIE) {
			this._loadHTC();
		}
		this.url = this._svgNode.getAttribute("src");
		if (!this.url) {
			this.url = this._svgNode.getAttribute("data");
		}
		var successFunc = hitch(this, function(svgStr) {
			this._handler._origSVG = svgStr;
			var results = svgweb._cleanSVG(svgStr, true, false);
			this._svgString = results.svg;
			this._xml = results.xml;
			this.document = new _Document(this._xml, this._handler);
			this._handler.document = this.document;
			var nodeXML = this._xml.documentElement;
			this._savedParams = this._getPARAMs(this._svgNode);
			this._handler._inserter = new FlashInserter("object", this._xml.documentElement, this._svgNode, this._handler);
		});
		if (this.url.substring(0, 5) == "data:") {
			successFunc(this.url.substring(this.url.indexOf(",") + 1));
		} else {
			this._fetchURL(this.url, successFunc, hitch(this, this._fallback));
		}
	}
	extend(_SVGObject, {
		_scriptsToExec: null,
		_utf8encode: function(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else {
					if ((c > 127) && (c < 2048)) {
						utftext += escape(String.fromCharCode((c >> 6) | 192));
						utftext += escape(String.fromCharCode((c & 63) | 128));
					} else {
						utftext += escape(String.fromCharCode((c >> 12) | 224));
						utftext += escape(String.fromCharCode(((c >> 6) & 63) | 128));
						utftext += escape(String.fromCharCode((c & 63) | 128));
					}
				}
			}
			return utftext;
		},
		_fetchURL: function(url, onSuccess, onFailure) {
			var req = xhrObj();
			if (isIE) {
				url = this._utf8encode(url);
				url += (url.indexOf("?") == -1) ? "?" : "&";
				url += new Date().getTime();
			}
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					if (req.status == 200) {
						onSuccess(req.responseText);
					} else {
						onFailure(req.status + ": " + req.statusText);
					}
					req = null;
				}
			};
			req.open("GET", url, true);
			req.send(null);
		},
		_fallback: function(error) {
			console.log("onError (fallback), error=" + error);
		},
		_loadHTC: function() {
			this._dummyNode = document.createElement("svg:__force__load");
			this._dummyNode._handler = this._handler;
			this._readyStateListener = hitch(this, this._onHTCLoaded);
			this._dummyNode.attachEvent("onreadystatechange", this._readyStateListener);
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(this._dummyNode);
		},
		_onFlashLoaded: function(msg) {
			this._handler.flash = document.getElementById(this._handler.flashID);
			if (this._savedParams.length) {
				for (var i = 0; i < this._savedParams.length; i++) {
					var param = this._savedParams[i];
					this._handler.flash.appendChild(param);
					param = null;
				}
				this._savedParams = null;
			}
			this._handler.flash.top = this._handler.flash.parent = window;
			this._swfLoaded = true;
			if (!isIE || this._htcLoaded) {
				this._onEverythingLoaded();
			}
		},
		_onHTCLoaded: function() {
			var head = document.getElementsByTagName("head")[0];
			head.removeChild(this._dummyNode);
			this._dummyNode.detachEvent("onreadystatechange", this._readyStateListener);
			this._dummyNode = null;
			head = null;
			this._htcLoaded = true;
			if (this._swfLoaded) {
				this._onEverythingLoaded();
			}
		},
		_onEverythingLoaded: function() {
			var size = this._handler._inserter._determineSize();
			this._handler.sendToFlash("jsHandleLoad", [this._getRelativeTo("object"), this._getRelativeTo("page"), size.pixelsWidth, size.pixelsHeight, false, this._svgString]);
		},
		_onRenderingFinished: function(msg) {
			this._handler.flash.style.visibility = "visible";
			var rootXML = this._xml.documentElement;
			var rootID = rootXML.getAttribute("id");
			var root = new _SVGSVGElement(rootXML, null, null, this._handler);
			var doc = this._handler.document;
			doc.documentElement = root._getProxyNode();
			doc.rootElement = root._getProxyNode();
			doc._nodeById["_" + rootID] = root;
			if (isIE) {
				this._handler.flash.setAttribute("contentDocument", null);
			}
			this._handler.flash.contentDocument = doc;
			this._handler.window = new _SVGWindow(this._handler);
			doc.defaultView = this._handler.window;
			var onload = root.getAttribute("onload");
			if (onload) {
				var defineEvtCode = 'var evt = { target: document.getElementById("' + root.getAttribute("id") + '") ,currentTarget: document.getElementById("' + root.getAttribute("id") + '") ,preventDefault: function() { this.returnValue=false; }};';
				onload = "(function(){" + defineEvtCode + onload + "}).apply(document.documentElement);";
				this._scriptsToExec.push(onload);
			}
			var finalScript = "";
			for (var i = 0; i < this._scriptsToExec.length; i++) {
				finalScript += this._scriptsToExec[i] + "\n";
			}
			this._executeScript(finalScript);
			this._handler._loaded = true;
			this._handler.fireOnLoad(this._handler.id, "object");
		},
		_getRelativeTo: function(toWhat) {
			var results = "";
			if (toWhat == "object") {
				var pathname = this.url.replace(/[^:]*:\/\/[^\/]*/).match(/\/?[^\?\#]*/)[0];
				if (pathname && pathname.length > 0 && pathname.indexOf("/") != -1) {
					results = pathname.replace(/\/([^\/]*)$/, "/");
				}
			} else {
				var pathname = window.location.pathname.toString();
				if (pathname && pathname.length > 0 && pathname.indexOf("/") != -1) {
					results = pathname.replace(/\/([^\/]*)$/, "/");
				}
			}
			return results;
		},
		_executeScript: function(script) {
			var iframe = document.createElement("iframe");
			iframe.setAttribute("src", "about:blank");
			iframe.style.position = "absolute";
			iframe.style.top = "-1000px";
			iframe.style.left = "-1000px";
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(iframe);
			var iframeDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
			var iframeWin = iframe.contentWindow;
			this._handler.document.defaultView = iframeWin;
			script = this._sandboxedScript(script);
			script = script + ";__svgHandler.sandbox_eval = " + (isIE ? "window.eval;" : "function(scriptCode) { return window.eval(scriptCode) };");
			iframeDoc.write("<script>" + script + "<\/script>");
			iframeDoc.close();
			this._handler.window._fireOnload();
		},
		_sandboxedScript: function(script) {
			var addToTop = 'var __svgHandler = top.svgweb.handlers["' + this._handler.id + '"];\nwindow.svgns = "' + svgns + '";\nwindow.xlinkns = "' + xlinkns + '";\n';
			var timeoutOverride = "window._timeoutIDs = [];\nwindow._setTimeout = window.setTimeout;\nwindow.setTimeout = \n       (function() {\n          return function(f, ms) {\n            var timeID = window._setTimeout(f, ms);\n            window._timeoutIDs.push(timeID);\n            return timeID;\n          };\n        })();\n";
			var intervalOverride = "window._intervalIDs = [];\nwindow._setInterval = window.setInterval;\nwindow.setInterval = \n       (function() {\n          return function(f, ms) {\n            var timeID = window._setInterval(f, ms);\n            window._intervalIDs.push(timeID);\n            return timeID;\n          };\n        })();\n";
			script = addToTop + timeoutOverride + intervalOverride + "\n\n" + script;
			script = script.replace(/top\.document/g, "top.DOCUMENT");
			script = script.replace(/top\.window/g, "top.WINDOW");
			script = script.replace(/(^|[^A-Za-z0-9_])document(\.|'|"|\,| |\))/g, "$1__svgHandler.document$2");
			script = script.replace(/window\.(location|addEventListener|onload|frameElement)/g, "__svgHandler.window.$1");
			script = script.replace(/top\.DOCUMENT/g, "top.document");
			script = script.replace(/top\.WINDOW/g, "top.window");
			return script;
		},
		_getPARAMs: function(svgNode) {
			var params = [];
			for (var i = 0; i < svgNode.childNodes.length; i++) {
				var child = svgNode.childNodes[i];
				if (child.nodeName.toUpperCase() == "PARAM") {
					params.push(child.cloneNode(false));
				}
			}
			return params;
		}
	});
	function _SVGWindow(handler) {
		this._handler = handler;
		this.fake = true;
		this.frameElement = this._handler.flash;
		this.location = this._createLocation();
		this.alert = window.alert;
		this.top = this.parent = window;
		this._onloadListeners = [];
	}
	extend(_SVGWindow, {
		addEventListener: function(type, listener, capture) {
			if (type.toLowerCase() == "SVGLoad") {
				this._onloadListeners.push(listener);
			}
		},
		_fireOnload: function() {
			for (var i = 0; i < this._onloadListeners.length; i++) {
				try {
					this._onloadListeners[i]();
				} catch (exp) {
					console.log("The following exception occurred from an SVG onload listener: " + (exp.message || exp));
				}
			}
			if (this.onload) {
				try {
					this.onload();
				} catch (exp) {
					console.log("The following exception occurred from an SVG onload listener: " + (exp.message || exp));
				}
			}
		},
		_createLocation: function(fakeLocation) {
			var loc = {};
			var url = this._handler._svgObject.url;
			var windowLocation;
			if (fakeLocation) {
				windowLocation = fakeLocation;
			} else {
				windowLocation = window.location;
			}
			if (/^data:/.test(url)) {
				loc.href = url;
				loc.toString = function() {
					return this.href;
				};
				return loc;
			}
			if (/^http/.test(url)) {} else {
				if (url.charAt(0) == "/") {
					url = windowLocation.protocol + "//" + windowLocation.host + url;
				} else {
					if (windowLocation.pathname.indexOf("/") == -1) {
						url = windowLocation.protocol + "//" + windowLocation.host + "/" + url;
					} else {
						var relativeTo = windowLocation.pathname;
						for (var i = relativeTo.length - 1; i >= 0; i--) {
							if (relativeTo.charAt(i) == "/") {
								break;
							}
							relativeTo = relativeTo.substring(0, i);
						}
						url = windowLocation.protocol + "//" + windowLocation.host + relativeTo + url;
					}
				}
			}
			var results = url.match(/^(https?:)\/\/([^\/:]*):?([0-9]*)([^\?#]*)([^#]*)(#.*)?$/);
			loc.protocol = (results[1]) ? results[1] : windowLocation.href;
			if (loc.protocol.charAt(loc.protocol.length - 1) != ":") {
				loc.protocol += ":";
			}
			loc.hostname = results[2];
			loc.port = "";
			if (results[3]) {
				loc.port = results[3];
			}
			var sameDomain = true;
			if (loc.protocol != windowLocation.protocol || loc.hostname != windowLocation.hostname || (loc.port && loc.port != windowLocation.port)) {
				sameDomain = false;
			}
			if (sameDomain && !loc.port) {
				loc.port = windowLocation.port;
			}
			if (loc.port) {
				loc.host = loc.hostname + ":" + loc.port;
			} else {
				loc.host = loc.hostname;
			}
			loc.pathname = (results[4]) ? results[4] : "";
			loc.search = (results[5]) ? results[5] : "";
			loc.hash = (results[6]) ? results[6] : "";
			loc.href = loc.protocol + "//" + loc.host + loc.pathname + loc.search + loc.hash;
			loc.toString = function() {
				return this.protocol + "//" + this.host + this.pathname + this.search + this.hash;
			};
			return loc;
		}
	});
	function FlashInserter(embedType, nodeXML, replaceMe, handler) {
		this._embedType = embedType;
		this._nodeXML = nodeXML;
		this._replaceMe = replaceMe;
		this._handler = handler;
		this._parentNode = replaceMe.parentNode;
		if (this._embedType == "object") {
			this._explicitWidth = this._replaceMe.getAttribute("width");
			this._explicitHeight = this._replaceMe.getAttribute("height");
		}
		this._setupFlash();
	}
	extend(FlashInserter, {
		_setupFlash: function() {
			var size = this._determineSize();
			var background = this._determineBackground();
			var style = this._determineStyle();
			var className = this._determineClassName();
			var customAttrs = this._determineCustomAttrs();
			var elementID;
			if (this._embedType == "script") {
				elementID = this._nodeXML.getAttribute("id");
				this._handler.flashID = elementID + "_flash";
			} else {
				if (this._embedType == "object") {
					elementID = this._replaceMe.getAttribute("id");
					this._handler.flashID = elementID;
				}
			}
			var flash = this._createFlash(size, elementID, background, style, className, customAttrs);
			this._insertFlash(flash);
		},
		_insertFlash: function(flash) {
			if (!isIE) {
				var flashObj;
				if (!isXHTML) {
					var div = document.createElement("div");
					div.innerHTML = flash;
					flashObj = div.childNodes[0];
					div.removeChild(flashObj);
					for (var i = 0; i < flashObj.childNodes.length; i++) {
						var check = flashObj.childNodes[i];
						if (check.nodeName.toUpperCase() == "EMBED") {
							flashObj = check;
							break;
						}
					}
				} else {
					if (isXHTML) {
						flashObj = flash;
					}
				}
				this._replaceMe.parentNode.replaceChild(flashObj, this._replaceMe);
				return flashObj;
			} else {
				var self = this;
				window.setTimeout(function() {
					self._replaceMe.outerHTML = flash;
					self = null;
				}, 1);
			}
		},
		_determineSize: function() {
			var parentWidth = this._parentNode.clientWidth;
			var parentHeight = this._parentNode.clientHeight;
			if (parentHeight == 0) {
				this.invalidParentHeight = true;
			}
			if (parentWidth == 0) {
				parentWidth = this._parentNode.offsetWidth;
			}
			if (!isSafari) {
				parentWidth -= this._getMargin(this._parentNode, "margin-left");
				parentWidth -= this._getMargin(this._parentNode, "margin-right");
				parentHeight -= this._getMargin(this._parentNode, "margin-top");
				parentHeight -= this._getMargin(this._parentNode, "margin-bottom");
			}
			if (isStandardsMode) {
				return this._getStandardsSize(parentWidth, parentHeight);
			} else {
				return this._getQuirksSize(parentWidth, parentHeight);
			}
		},
		_getQuirksSize: function(parentWidth, parentHeight) {
			var pixelsWidth, pixelsHeight;
			if (this._embedType == "script") {
				var grandParent = this._parentNode;
				while (grandParent && grandParent.style) {
					if (grandParent.nodeName.toLowerCase() == "div") {
						break;
					}
					if (grandParent.nodeName.toLowerCase() == "body") {
						if (this._nodeXML.getAttribute("style") && this._nodeXML.getAttribute("style").indexOf("fixed") != -1) {
							if (window.innerHeight && window.innerHeight > 0) {
								parentHeight = window.innerHeight;
							} else {
								if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientHeight > 0) {
									parentHeight = document.documentElement.clientHeight;
								} else {
									parentHeight = document.body.clientHeight;
								}
							}
							this.invalidParentHeight = false;
						} else {
							this.invalidParentHeight = true;
							parentHeight = 0;
						}
						break;
					}
					grandParent = grandParent.parentNode;
				}
			}
			var objWidth = this._explicitWidth;
			var objHeight = this._explicitHeight;
			var xmlWidth = this._nodeXML.getAttribute("width");
			if (xmlWidth && xmlWidth.indexOf("%") == -1) {
				xmlWidth = parseInt(xmlWidth).toString();
			}
			var xmlHeight = this._nodeXML.getAttribute("height");
			if (xmlHeight && xmlHeight.indexOf("%") == -1) {
				xmlHeight = parseInt(xmlHeight).toString();
			}
			if (objWidth && objHeight) {
				if (objWidth.indexOf("%") != -1) {
					pixelsWidth = parentWidth * parseInt(objWidth) / 100;
				} else {
					pixelsWidth = objWidth;
				}
				if (objHeight.indexOf("%") != -1) {
					if (parentHeight > 0) {
						pixelsHeight = parentHeight * parseInt(objHeight) / 100;
					} else {
						console.log("SVGWeb: unhandled resize scenario.");
						parentHeight = 200;
					}
				} else {
					pixelsHeight = objHeight;
				}
				return {
					width: objWidth,
					height: pixelsHeight,
					pixelsWidth: pixelsWidth,
					pixelsHeight: pixelsHeight,
					clipMode: this._nodeXML.getAttribute("viewBox") ? "neither" : "both"
				};
			}
			var viewBox, boxWidth, boxHeight;
			if (objWidth) {
				if (objWidth.indexOf("%") != -1) {
					pixelsWidth = parentWidth * parseInt(objWidth) / 100;
				} else {
					pixelsWidth = objWidth;
				}
				if (this._nodeXML.getAttribute("viewBox")) {
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						objHeight = pixelsWidth * (xmlHeight / xmlWidth);
					} else {
						viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
						boxWidth = viewBox[2];
						boxHeight = viewBox[3];
						objHeight = pixelsWidth * (boxHeight / boxWidth);
					}
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: "neither"
					};
				} else {
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						objHeight = pixelsWidth * (xmlHeight / xmlWidth);
					} else {
						if (xmlHeight && xmlHeight.indexOf("%") == -1) {
							objHeight = xmlHeight;
						} else {
							objHeight = 150;
						}
					}
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: "both"
					};
				}
			}
			if (objHeight) {
				if (objHeight.indexOf("%") != -1) {
					pixelsHeight = parentHeight * parseInt(objHeight) / 100;
				} else {
					pixelsHeight = objHeight;
				}
				if (this._nodeXML.getAttribute("viewBox")) {
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						objWidth = pixelsHeight * (xmlWidth / xmlHeight);
					} else {
						viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
						boxWidth = viewBox[2];
						boxHeight = viewBox[3];
						objWidth = pixelsHeight * (boxWidth / boxHeight);
					}
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: objWidth,
						pixelsHeight: pixelsHeight,
						clipMode: "neither"
					};
				} else {
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						objWidth = pixelsHeight * (xmlWidth / xmlHeight);
						pixelsWidth = objWidth;
					} else {
						if (xmlWidth) {
							objWidth = xmlWidth;
						} else {
							objWidth = "100%";
						}
						if (objWidth.indexOf("%") != -1) {
							pixelsWidth = parentWidth * parseInt(objWidth) / 100;
						} else {
							pixelsWidth = objWidth;
						}
					}
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: pixelsHeight,
						clipMode: "both"
					};
				}
			}
			if (xmlWidth) {
				objWidth = xmlWidth;
			} else {
				objWidth = "100%";
			}
			if (objWidth.indexOf("%") != -1) {
				pixelsWidth = parentWidth * parseInt(objWidth) / 100;
			} else {
				pixelsWidth = objWidth;
			}
			if (xmlHeight && xmlHeight.indexOf("%") == -1) {
				objHeight = xmlHeight;
				return {
					width: objWidth,
					height: objHeight,
					pixelsWidth: pixelsWidth,
					pixelsHeight: objHeight,
					clipMode: this._nodeXML.getAttribute("viewBox") ? "neither" : "both"
				};
			} else {
				if (this._nodeXML.getAttribute("viewBox")) {
					if (this._embedType == "script" && (xmlHeight == null || xmlHeight.indexOf("%") != -1) && !this.invalidParentHeight) {
						if (xmlHeight == null) {
							xmlHeight = "100%";
						}
						if (objHeight == null) {
							objHeight = "100%";
						}
						pixelsHeight = parentHeight * parseInt(xmlHeight) / 100;
						return {
							width: objWidth,
							height: pixelsHeight,
							pixelsWidth: pixelsWidth,
							pixelsHeight: pixelsHeight,
							clipMode: "neither"
						};
					}
					var viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
					var boxWidth = viewBox[2];
					var boxHeight = viewBox[3];
					objHeight = pixelsWidth * (boxHeight / boxWidth);
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: "neither"
					};
				} else {
					objHeight = 150;
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: "both"
					};
				}
			}
		},
		_getStandardsSize: function(parentWidth, parentHeight) {
			var pixelsWidth, pixelsHeight;
			var objWidth = this._explicitWidth;
			var objHeight = this._explicitHeight;
			var xmlWidth = this._nodeXML.getAttribute("width");
			if (xmlWidth && xmlWidth.indexOf("%") == -1) {
				xmlWidth = parseInt(xmlWidth).toString();
			}
			var xmlHeight = this._nodeXML.getAttribute("height");
			if (xmlHeight && xmlHeight.indexOf("%") == -1) {
				xmlHeight = parseInt(xmlHeight).toString();
			}
			if (objWidth && !objHeight) {
				return this._getQuirksSize(parentWidth, parentHeight);
			}
			if (!objWidth && !objHeight) {
				return this._getQuirksSize(parentWidth, parentHeight);
			}
			if (!objWidth && objHeight) {
				if (xmlWidth) {
					objWidth = xmlWidth;
				} else {
					objWidth = "100%";
				}
				if (objWidth.indexOf("%") != -1) {
					pixelsWidth = parentWidth * parseInt(objWidth) / 100;
				} else {
					pixelsWidth = objWidth;
				}
				if (objHeight.indexOf("%") == -1) {
					pixelsHeight = objHeight;
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						objWidth = objHeight * (xmlWidth / xmlHeight);
						pixelsWidth = objWidth;
					} else {
						if (this._nodeXML.getAttribute("viewBox")) {
							viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
							boxWidth = viewBox[2];
							boxHeight = viewBox[3];
							objWidth = pixelsHeight * (boxWidth / boxHeight);
							pixelsWidth = objWidth;
						}
					}
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: this._nodeXML.getAttribute("viewBox") ? "neither" : "both"
					};
				} else {
					if (xmlHeight && xmlHeight.indexOf("%") == -1) {
						pixelsHeight = xmlHeight;
					} else {
						if (this._nodeXML.getAttribute("viewBox")) {
							viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
							boxWidth = viewBox[2];
							boxHeight = viewBox[3];
							pixelsHeight = pixelsWidth * (boxHeight / boxWidth);
						} else {
							pixelsHeight = 150;
						}
					}
					return {
						width: objWidth,
						height: pixelsHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: pixelsHeight,
						clipMode: this._nodeXML.getAttribute("viewBox") ? "neither" : "both"
					};
				}
			}
			if (objWidth && objHeight) {
				if (objWidth.indexOf("%") != -1) {
					pixelsWidth = parentWidth * parseInt(objWidth) / 100;
				} else {
					pixelsWidth = objWidth;
				}
				if (objHeight.indexOf("%") == -1) {
					return {
						width: objWidth,
						height: objHeight,
						pixelsWidth: pixelsWidth,
						pixelsHeight: objHeight,
						clipMode: this._nodeXML.getAttribute("viewBox") ? "neither" : "both"
					};
				} else {
					if (xmlWidth && xmlWidth.indexOf("%") == -1 && xmlHeight && xmlHeight.indexOf("%") == -1) {
						pixelsHeight = pixelsWidth * (xmlHeight / xmlWidth);
						return {
							width: objWidth,
							height: pixelsHeight,
							pixelsWidth: pixelsWidth,
							pixelsHeight: pixelsHeight,
							clipMode: "neither"
						};
					} else {
						if (!this.invalidParentHeight) {
							pixelsHeight = parentHeight * parseInt(objHeight) / 100;
							return {
								width: objWidth,
								height: pixelsHeight,
								pixelsWidth: pixelsWidth,
								pixelsHeight: pixelsHeight,
								clipMode: "neither"
							};
						} else {
							if (this._nodeXML.getAttribute("viewBox")) {
								viewBox = this._nodeXML.getAttribute("viewBox").split(/\s+|,/);
								boxWidth = viewBox[2];
								boxHeight = viewBox[3];
								objHeight = pixelsWidth * (boxHeight / boxWidth);
								return {
									width: objWidth,
									height: objHeight,
									pixelsWidth: pixelsWidth,
									pixelsHeight: objHeight,
									clipMode: "neither"
								};
							} else {
								if (xmlHeight && xmlHeight.indexOf("%") == -1) {
									pixelsHeight = xmlHeight;
								} else {
									pixelsHeight = 150;
								}
								return {
									width: objWidth,
									height: pixelsHeight,
									pixelsWidth: pixelsWidth,
									pixelsHeight: pixelsHeight,
									clipMode: "both"
								};
							}
						}
					}
				}
			}
		},
		_getMargin: function(node, styleProp) {
			var y;
			if (node.currentStyle) {
				y = parseInt(node.currentStyle[styleProp]);
			} else {
				if (window.getComputedStyle) {
					y = parseInt(document.defaultView.getComputedStyle(node, null).getPropertyValue(styleProp));
				}
			}
			if (y) {
				return y;
			} else {
				return 0;
			}
		},
		_determineBackground: function() {
			var transparent = false;
			var color = null;
			var style = this._nodeXML.getAttribute("style");
			if (style && style.indexOf("background-color") != -1) {
				var m = style.match(/background\-color:\s*([^;]*)/);
				if (m) {
					color = m[1];
				}
			}
			if (color === null) {
				transparent = true;
			}
			return {
				color: color,
				transparent: transparent
			};
		},
		_determineStyle: function() {
			var style = this._nodeXML.getAttribute("style");
			if (!style) {
				style = "";
			}
			if (style.length > 0 && style.charAt(style.length - 1) != ";") {
				style += ";";
			}
			if (this._embedType == "script" && style.indexOf("display:") == -1) {
				style += "display: inline;";
			}
			if (this._embedType == "script" && style.indexOf("overflow:") == -1) {
				style += "overflow: hidden;";
			}
			return style;
		},
		_determineClassName: function() {
			var className = this._nodeXML.getAttribute("class");
			if (!className) {
				return "embedssvg";
			} else {
				return className + " embedssvg";
			}
		},
		_determineCustomAttrs: function() {
			var results = [];
			if (this._embedType == "object") {
				var node = this._replaceMe;
				var commonObj = document._createElement("object");
				for (var j = 0; j < node.attributes.length; j++) {
					var attr = node.attributes[j];
					var attrName = attr.nodeName;
					var attrValue = attr.nodeValue;
					if (!attrValue && attrValue !== "true") {
						continue;
					}
					if (commonObj.getAttribute(attrName)) {
						continue;
					}
					if (/^(id|name|width|height|data|class|style|codebase|type|_listeners|addEventListener|onload)$/.test(attrName)) {
						continue;
					}
					results.push({
						attrName: attrName.toString(),
						attrValue: attrValue.toString()
					});
				}
			}
			return results;
		},
		_createFlash: function(size, elementID, background, style, className, customAttrs) {
			var flashVars = "uniqueId=" + encodeURIComponent(elementID) + "&sourceType=string&clipMode=" + size.clipMode + "&debug=true&svgId=" + encodeURIComponent(elementID);
			var src;
			if (this._isXDomain) {
				src = svgweb.xDomainURL + "svg.swf";
			} else {
				src = svgweb.libraryPath + "svg.swf";
			}
			var protocol = window.location.protocol;
			if (protocol.charAt(protocol.length - 1) == ":") {
				protocol = protocol.substring(0, protocol.length - 1);
			}
			var flash;
			if (isXHTML) {
				flash = document.createElement("embed");
				flash.setAttribute("src", src);
				flash.setAttribute("quality", "high");
				if (background.color) {
					flash.setAttribute("bgcolor", background.color);
				}
				if (background.transparent) {
					flash.setAttribute("wmode", "transparent");
				}
				flash.setAttribute("width", size.width);
				flash.setAttribute("height", size.height);
				flash.setAttribute("id", this._handler.flashID);
				flash.setAttribute("name", this._handler.flashID);
				flash.setAttribute("swLiveConnect", "true");
				flash.setAttribute("allowScriptAccess", "always");
				flash.setAttribute("type", "application/x-shockwave-flash");
				flash.setAttribute("FlashVars", flashVars);
				flash.setAttribute("pluginspage", protocol + "://www.macromedia.com/go/getflashplayer");
				flash.setAttribute("style", style);
				flash.setAttribute("className", className);
				for (var i = 0; i < customAttrs.length; i++) {
					flash.setAttribute(customAttrs[i].attrName, customAttrs[i].attrValue);
				}
			} else {
				var customAttrStr = "";
				for (var i = 0; i < customAttrs.length; i++) {
					customAttrStr += " " + customAttrs[i].attrName + '="' + customAttrs[i].attrValue + '"';
				}
				flash = '<object\n classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"\n codebase="' + protocol + '://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"\n width="' + size.width + '"\n height="' + size.height + '"\n id="' + this._handler.flashID + '"\n name="' + this._handler.flashID + '"\n style="' + style + '"\n class="' + className + '"\n ' + customAttrStr + '\n>\n <param name="allowScriptAccess" value="always"></param>\n <param name="movie" value="' + src + '"></param>\n <param name="quality" value="high"></param>\n <param name="FlashVars" value="' + flashVars + '"></param>\n ' + (background.color ? '<param name="bgcolor" value="' + background.color + '"></param>\n ' : "") + (background.transparent ? '<param name="wmode" value="transparent"></param>\n ' : "") + '<embed src="' + src + '" quality="high" ' + (background.color ? 'bgcolor="' + background.color + '" \n' : "") + (background.transparent ? 'wmode="transparent" \n' : "") + 'width="' + size.width + '" height="' + size.height + '" id="' + this._handler.flashID + '" name="' + this._handler.flashID + '" swLiveConnect="true" allowScriptAccess="always" type="application/x-shockwave-flash" FlashVars="' + flashVars + '" pluginspage="' + protocol + '://www.macromedia.com/go/getflashplayer" style="' + style + '"\n class="' + className + '"\n ' + customAttrStr + "\n /></object>";
			}
			return flash;
		}
	});
	function _SVGSVGElement(nodeXML, svgString, scriptNode, handler) {
		_Element.apply(this, ["svg", null, svgns, nodeXML, handler, true]);
		this._nodeXML = nodeXML;
		this._svgString = svgString;
		this._scriptNode = scriptNode;
		this._htcLoaded = false;
		this._swfLoaded = false;
		if (this._handler.type == "script") {
			var rootID = this._nodeXML.getAttribute("id");
			var doc = this._handler.document;
			doc._nodeById["_" + rootID] = this;
		}
		this._currentScale = 1;
		this._currentTranslate = this._createCurrentTranslate();
		if (isIE && this._handler.type == "script") {
			this._addRedrawMethods();
			this.style = new _Style(this);
			this._readyStateListener = hitch(this, this._onHTCLoaded);
			this._htcNode.attachEvent("onreadystatechange", this._readyStateListener);
		} else {
			if (isIE && this._handler.type == "object") {
				this._addRedrawMethods();
			}
		}
		if (this._handler.type == "script") {
			this._handler._inserter = new FlashInserter("script", this._nodeXML, this._scriptNode, this._handler);
		}
	}
	_SVGSVGElement.prototype = new _Element;
	extend(_SVGSVGElement, {
		suspendRedraw: function(ms) {
			return this._handler._redrawManager.suspendRedraw(ms);
		},
		unsuspendRedraw: function(id) {
			this._handler._redrawManager.unsuspendRedraw(id);
		},
		unsuspendRedrawAll: function() {
			this._handler._redrawManager.unsuspendRedrawAll();
		},
		forceRedraw: function() {},
		nearestViewportElement: null,
		farthestViewportElement: null,
		getBBox: function() {},
		getTransformToElement: function(element) {},
		_onHTCLoaded: function() {
			this._htcNode.detachEvent("onreadystatechange", this._readyStateListener);
			this.style._ignoreStyleChanges = false;
			this._htcLoaded = true;
			if (this._swfLoaded) {
				this._onEverythingLoaded();
			}
		},
		_onFlashLoaded: function(msg) {
			this._handler.flash = document.getElementById(this._handler.flashID);
			this._swfLoaded = true;
			if (!isIE || this._htcLoaded) {
				this._onEverythingLoaded();
			}
		},
		_onEverythingLoaded: function() {
			var size = this._handler._inserter._determineSize();
			this._handler.sendToFlash("jsHandleLoad", [this._getRelativeTo("object"), this._getRelativeTo("page"), size.pixelsWidth, size.pixelsHeight, true, this._svgString]);
		},
		_onRenderingFinished: function(msg) {
			if (this._handler.type == "script") {
				this._handler.flash.documentElement = this._getProxyNode();
			}
			if (this._attached) {
				if (this._handler.type == "script") {
					this.ownerDocument = document;
				} else {
					if (this._handler.type == "object") {
						this.ownerDocument = this._handler.document;
					}
				}
			}
			this._handler.document.rootElement = this._getProxyNode();
			var elementId = this._nodeXML.getAttribute("id");
			this._handler._loaded = true;
			this._handler.fireOnLoad(elementId, "script");
		},
		_getRelativeTo: function() {
			var results = "";
			var pathname = window.location.pathname.toString();
			if (pathname && pathname.length > 0 && pathname.indexOf("/") != -1) {
				results = pathname.replace(/\/([^\/]*)$/, "/");
			}
			return results;
		},
		_addRedrawMethods: function() {
			this._htcNode.suspendRedraw = (function() {
				return function(ms) {
					return this._fakeNode.suspendRedraw(ms);
				};
			})();
			this._htcNode.unsuspendRedraw = (function() {
				return function(id) {
					return this._fakeNode.unsuspendRedraw(id);
				};
			})();
			this._htcNode.unsuspendRedrawAll = (function() {
				return function() {
					return this._fakeNode.unsuspendRedrawAll();
				};
			})();
			this._htcNode.forceRedraw = (function() {
				return function() {
					return this._fakeNode.forceRedraw();
				};
			})();
		},
		_createCurrentTranslate: function() {
			var p = new _SVGPoint(0, 0, true, hitch(this, this._updateCurrentTranslate));
			return p;
		},
		_updateCurrentTranslate: function(type, newValue1, newValue2) {
			if (type == "xy") {
				this._handler.sendToFlash("jsSetCurrentTranslate", ["xy", newValue1, newValue2]);
			} else {
				this._handler.sendToFlash("jsSetCurrentTranslate", [type, newValue1]);
			}
		}
	});
	function _Document(xml, handler) {
		_Node.apply(this, ["#document", _Node.DOCUMENT_NODE, null, null, xml, handler], svgns);
		this._xml = xml;
		this._handler = handler;
		this._nodeById = {};
		this._namespaces = this._getNamespaces();
		this.implementation = new _DOMImplementation();
		if (this._handler.type == "script") {
			this.defaultView = window;
		} else {
			if (this._handler.type == "object") {}
		}
	}
	_Document.prototype = new _Node;
	extend(_Document, {
		_nodeById: null,
		implementation: null,
		documentElement: null,
		createElementNS: function(ns, qname) {
			var prefix = this._namespaces["_" + ns];
			if (prefix == "xmlns" || !prefix) {
				prefix = null;
			}
			var node = new _Element(qname, prefix, ns);
			return node._getProxyNode();
		},
		createTextNode: function(data) {
			var doc = FlashHandler._unattachedDoc;
			var nodeXML;
			if (isIE) {
				nodeXML = doc.createElement("__text");
			} else {
				nodeXML = doc.createElementNS(svgnsFake, "__text");
			}
			nodeXML.appendChild(doc.createTextNode(data));
			var textNode = new _Node("#text", _Node.TEXT_NODE, null, null, nodeXML, this._handler);
			textNode._nodeValue = data;
			textNode.ownerDocument = this;
			return textNode._getProxyNode();
		},
		createDocumentFragment: function(forSVG) {
			return new _DocumentFragment(this)._getProxyNode();
		},
		getElementById: function(id) {
			var results = xpath(this._xml, null, '//*[@id="' + id + '"]');
			var nodeXML, node;
			if (results.length) {
				nodeXML = results[0];
			} else {
				return null;
			}
			node = FlashHandler._getNode(nodeXML, this._handler);
			node._passThrough = true;
			return node;
		},
		getElementsByTagNameNS: function(ns, localName) {
			if (this._handler.type == "script" && !this._handler._loaded) {
				return [];
			}
			var results = this.rootElement.getElementsByTagNameNS(ns, localName);
			if (ns == svgns && localName == "svg") {
				results.push(this.rootElement);
			}
			return results;
		},
		_getNamespaces: function() {
			var results = [];
			var attrs = this._xml.documentElement.attributes;
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				if (/^xmlns:?(.*)$/.test(attr.nodeName)) {
					var m = attr.nodeName.match(/^xmlns:?(.*)$/);
					var prefix = (m[1] ? m[1] : "xmlns");
					var namespaceURI = attr.nodeValue;
					if (!results["_" + prefix]) {
						results["_" + prefix] = namespaceURI;
						results["_" + namespaceURI] = prefix;
						results.push(namespaceURI);
					}
				}
			}
			return results;
		}
	});
	function createNodeList() {
		var results = [];
		results.item = function(i) {
			if (i >= this.length) {
				return null;
			} else {
				return this[i];
			}
		};
		return results;
	}
	function createCharacterData(data) {
		var results = (data !== undefined) ? new String(data) : new String();
		results.data = results.toString();
		return results;
	}
	function _SVGMatrix(a, b, c, d, e, f, _handler) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
		this.f = f;
		this._handler = _handler;
	}
	extend(_SVGMatrix, {
		multiply: function(secondMatrix) {},
		inverse: function() {
			var msg = this._handler.sendToFlash("jsMatrixInvert", [this.a, this.b, this.c, this.d, this.e, this.f]);
			msg = this._handler._stringToMsg(msg);
			return new _SVGMatrix(new Number(msg.a), new Number(msg.b), new Number(msg.c), new Number(msg.d), new Number(msg.e), new Number(msg.f), this._handler);
		},
		translate: function(x, y) {},
		scale: function(scaleFactor) {},
		scaleNonUniform: function(scaleFactorX, scaleFactorY) {},
		rotate: function(angle) {},
		rotateFromVector: function(x, y) {},
		flipX: function() {},
		flipY: function() {},
		skewX: function(angle) {},
		skewY: function(angle) {}
	});
	function _SVGLength(value) {
		this.value = value;
	}
	function _SVGAnimatedLength(value) {
		this.baseVal = value;
		this.animVal = undefined;
	}
	function _SVGTransform(type, matrix, angle) {
		this.type = type;
		this.matrix = matrix;
		this.angle = angle;
	}
	mixin(_SVGTransform, {
		SVG_TRANSFORM_UNKNOWN: 0,
		SVG_TRANSFORM_MATRIX: 1,
		SVG_TRANSFORM_TRANSLATE: 2,
		SVG_TRANSFORM_SCALE: 3,
		SVG_TRANSFORM_ROTATE: 4,
		SVG_TRANSFORM_SKEWX: 5,
		SVG_TRANSFORM_SKEWY: 6
	});
	extend(_SVGTransform, {
		type: null,
		matrix: null,
		angle: null,
		setMatrix: function(matrix) {},
		setTranslate: function(tx, ty) {},
		setScale: function(sx, sy) {},
		setRotate: function(angle, cx, cy) {},
		setSkewX: function(angle) {},
		setSkewY: function(angle) {}
	});
	function _SVGPoint(x, y, formalAccessors, callback) {
		if (formalAccessors === undefined) {
			formalAccessors = false;
		}
		this._formalAccessors = formalAccessors;
		this.x = x;
		this.y = y;
		if (formalAccessors) {
			this.setX = hitch(this, function(newValue) {
				this.x = newValue;
				callback("x", newValue);
			});
			this.getX = hitch(this, function() {
				return this.x;
			});
			this.setY = hitch(this, function(newValue) {
				this.y = newValue;
				callback("y", newValue);
			});
			this.getY = hitch(this, function() {
				return this.y;
			});
			this.setXY = hitch(this, function(newX, newY) {
				this.x = newX;
				this.y = newY;
				callback("xy", newX, newY);
			});
		}
	}
	extend(_SVGPoint, {
		matrixTransform: function(m) {
			return new _SVGPoint(m.a * this.x + m.c * this.y + m.e, m.b * this.x + m.d * this.y + m.f, this._formalAccessors);
		}
	});
	function _SVGRect(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	window.svgweb = new SVGWeb();
})();