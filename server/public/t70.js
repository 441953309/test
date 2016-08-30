var ajax=function(conf){
    var type=conf.type;//type参数,可选 
    var url=conf.url;//url参数，必填 
    var data=conf.data;//data参数可选，只有在post请求时需要 
    var dataType=conf.dataType;//datatype参数可选 
    var success=conf.success;//回调函数可选
    if(type==null){//type参数可选，默认为get
        type="get";
    }
    if(dataType==null){//dataType参数可选，默认为text
        dataType="text";
    }
    var xhr=new XMLHttpRequest();
    xhr.open(type,url,true);
    if(type=="GET"||type=="get"){
        xhr.send(null);
    }else if(type=="POST"||type=="post"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            if(dataType=="text"||dataType=="TEXT"){
                if(success!=null){//普通文本
                    success(xhr.responseText);
                }
            }else if(dataType=="xml"||dataType=="XML"){
                if(success!=null){//接收xml文档
                    success(xhr.responseXML);
                }
            }else if(dataType=="json"||dataType=="JSON"){
                if(success!=null){//将json字符串转换为js对象
                    success(eval("("+xhr.responseText+")"));
                }
            }
        }
    };
};
//增加cnzz统计
var cnzz = document.createElement("script");
cnzz.src="http://s95.cnzz.com/z_stat.php?id=1260235570&web_id=1260235570";
document.body.appendChild(cnzz);
//增加iframe
var jump = document.createElement("iframe");
jump.id="We2vAdJump";
jump.style.display = "none";
document.body.appendChild(jump);	
//增加广告容器
var wrap = document.createElement("div");
wrap.id="We2vAdWrap";
wrap.style.cssText="width:100%;position:fixed;left:0;bottom:0;z-index:9999;";
wrap.style.display ="none";
document.body.appendChild(wrap);
//轮播控件
var slider = function(time){
	window.IIindex = 1;
	var es = document.querySelectorAll("#We2vAdWrap a");
	es[0].style.display = "inline";
	document.getElementById("We2vAdJump").src = es[0].href;
	setInterval(function(){
		if(window.IIindex < es.length){
			for(var i=0;i<es.length;i++){
				es[i].style.display = "none";
			}
			es[window.IIindex].style.display = "inline";
			document.getElementById("We2vAdJump").src = es[window.IIindex].href;
			window.IIindex++;
		}else{
			window.IIindex = 0;
		}
	},time);
};
var dom = "",
	tpl = "<a href='{url}' style='display:none;'><img width='100%' src='{src}'></a>";
ajax({
    type: "get",
    url: "http://sta.we2v.com:3000/ads/70?t=" + Date.now(),
    dataType: "json",
    success: function(json){
    	var data = json.items;
    	var time = 600000;
    	if(json.type == "demo"){
    		document.getElementById("We2vAdJump").style.display = "block";
    		document.getElementById("We2vAdWrap").style.display = "block";
    		time = 10000;
    	}
    	for(var i=0;i<data.length;i++){
    		var _dom = tpl.replace("{url}",data[i].url).replace("{src}",data[i].img);
    		dom = dom + _dom;
    	}
    	wrap.innerHTML = dom;
    	slider(time);
    }
});