define([
	"rias"
], function(rias){
	return {
	"_rsfVersion": 17,
	"_riaswVersion": "1.0",
	"region": "center",
	"caption": "新的页面模块",
	"title": "新的页面模块",
	"style": {
	},
	"_riaswChildren": [
		{
			"_riaswType": "rias.riasw.html.Tag",
			"_riaswIdOfModule": "tag1",
			"layoutPriority": 0,
			"region": "center",
			"splitter": false,
			"src": "/",
			"tagType": "iframe",
			"onload": function (){
		console.debug("iframe: " + this.src);
	}
		}
	]
}
	
});
