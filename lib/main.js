var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var data = require("sdk/self").data;
var preferences = require("sdk/simple-prefs").prefs;
/**首选项**/
var tab = preferences.tabselect;
var wikilan = preferences.wikilan;
var translan = preferences.translan;
var transapi = preferences.transapi;

require("sdk/simple-prefs").on("", function() {
	tab = preferences.tabselect;
	wikilan = preferences.wikilan;
	translan = preferences.translan;
	transapi = preferences.transapi;
});

tabs.on("ready", runScript);
tabs.on("deactivate", function(dtab) {
	dtab.attach({
		contentScript: 'if(document.getElementById("content-div")){document.getElementById("content-div").style.display="none";}'
	});
});
//装载contentScript
function runScript(tab) {
	var worker = tab.attach({
		contentScriptFile: [data.url("jquery-1.11.2.min.js"), data.url("content.js")],
	});
	worker.port.on("text-selected", function(text) {
		getTransTxt(worker, text.toString());
		//worker.port.emit("show-panel",text);
	});
}

function onBaiduDict(worker, text, addr) {
	var wikiaddr = "https://" + wikilan + ".wikipedia.org/w/index.php?useformat=mobile&title=" + text;
	Request({
		url: addr,
		onComplete: function(response) {
			if (!response.json) {
				worker.port.emit("get-transtext", [text, 'connect translate API faile']);
				return;
			}
			if (response.json.errno != 0 || (response.json.data.length == 0)) {
				onBaiduTrans(worker, text, "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=lOGL1i3l6ZUuRGdPSGe194VO&q=" + encodeURIComponent(text) + "&from=auto&to=" + translan);
				return;
			} else {
				var transTxt = "<p>"+response.json.data.word_name + ":<br/>";
				response.json.data.symbols[0].ph_en&&(transTxt+="&nbsp;en["+response.json.data.symbols[0].ph_en+"]");
				response.json.data.symbols[0].ph_am&&(transTxt+="&nbsp;am["+response.json.data.symbols[0].ph_am+"]");
				response.json.data.symbols[0].ph_zh&&(transTxt+="&nbsp;pinyin["+response.json.data.symbols[0].ph_zh+"]");
				transTxt +="<br/>";
				for (var index in response.json.data.symbols[0].parts) {
					if(response.json.data.symbols[0].parts[index].part!='') transTxt += response.json.data.symbols[0].parts[index].part + '<br/>';
					for (var pindex in response.json.data.symbols[0].parts[index].means) {
						var tag = parseInt(pindex)+1;
						transTxt += tag + ':' + response.json.data.symbols[0].parts[index].means[pindex] + '<br/>';
					}
				}
			}
			//console.log("translate:" + transTxt);
			worker.port.emit("get-transtext", [wikiaddr, transTxt+"</p>"]);
		}
	}).get();
}

function onBaiduTrans(worker, text, addr) {
	var wikiaddr = "https://" + wikilan + ".wikipedia.org/w/index.php?useformat=mobile&title=" + text;
	Request({
		url: addr,
		onComplete: function(response) {
			if (!response.json) {
				worker.port.emit("get-transtext", [text, '<p>connect translate API faile</p>']);
				return;
			}
			var transTxt = '<p>';
			if (response.json.error_msg) {
				transTxt = '翻译出错了！';
			} else {
				for (var index in response.json.trans_result) {
					transTxt += response.json.trans_result[index].dst;
				}
			}
			//console.log("translate:" + transTxt);
			worker.port.emit("get-transtext", [wikiaddr, transTxt+'</p>']);
		}
	}).get();
}

function getTransTxt(worker, text) {
	var transaddr = '';
	if ((text.search(/^\s?[a-zA-Z]{1,20}\s?$/i))>=0) { //词典API
		text = text.replace(/\s+/i,"");//去空格
		transaddr = "http://openapi.baidu.com/public/2.0/translate/dict/simple?client_id=lOGL1i3l6ZUuRGdPSGe194VO&q=";
		transaddr += encodeURIComponent(text) + "&from=en&to=" + translan;
		onBaiduDict(worker,text,transaddr);
	}
	else if ((text.search(/^\s?[\u4E00-\u9FA5]{1,4}\s?/))>=0) {
		text = text.replace(/\s+/i,"");
		onBaiduDict(worker,text,"http://openapi.baidu.com/public/2.0/translate/dict/simple?client_id=lOGL1i3l6ZUuRGdPSGe194VO&q=" + encodeURIComponent(text) + "&from=zh&to=" + translan);
	} else { //翻译API
		onBaiduTrans(worker,text,"http://openapi.baidu.com/public/2.0/bmt/translate?client_id=lOGL1i3l6ZUuRGdPSGe194VO&q=" + encodeURIComponent(text) + "&from=auto&to=" + translan);
	}
}