//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}
/*
 思路如下：
 tag1
 1，判断如果是空格或者逗号或者回车键，就获取input的值，放在一个数组data里面去
 2，对data去重判断，判断input是否重复，有重复就不渲染，无重复就渲染span
 tag2
 1，点击button按钮，以逗号，空格，回车进行截取textarea的值，放入dat数组
 2，对dat进行去重判断，如果重复就不渲染，无重复就渲染


 */
// 定义全局变量
var ipt = document.getElementsByTagName("input")[0],
    textare = document.getElementsByTagName("textarea")[0],
    tag_List = document.getElementById("taglist"),
    testList = document.getElementById("textlist"),
    bnt = document.getElementsByTagName("button")[0],
    span = document.getElementsByTagName("span"),
    p = document.getElementsByTagName("h5");
//定义全局数组
var data = [],
    dat = [],
    tmpArr = [],
    switching = true;
//定义全局函数,用以复用
var queue = {
    //去重trim
    sift: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data.indexOf(data[i]) == i) {
                switching = true;
            } else {
                switching = false;
            }
        }
    },
};
window.onload = function () {
    addEventHandler(ipt, "keyup", enter);
    addEventHandler(bnt, "click", bntclick);
    addEventHandler(tag_List,'mouseover',function(e){
        if(e.target && e.target.nodeName=="SPAN"){
            e.target.firstChild.insertData(0,"点击删除");//每一个等于span的第一个子元素，其实也只有一个子元素
            e.target.style.backgroundColor="red";
        }

    });
    addEventHandler(tag_List,"mouseout",function(e){
        if(e.target&& e.target.nodeName=="SPAN"){
            e.target.firstChild.deleteData(0,4);
            e.target.style.backgroundColor="#FFFFFF";
        }
    });
    addEventHandler(tag_List,"click",function(e){
        if(e.target&& e.target.nodeName=="SPAN"){
            tag_List.removeChild(e.target);
        }
    })


}
function enter() {

    if (/(,| |\，)$/.test(ipt.value) || event.keyCode == 13) {
        var n = ipt.value.trim().replace(/^\s+|,|\s+$/g, "");
        data.push(n);
        console.log(data);
        queue.sift(data);
        if (n !== "" && switching) {
            tag_List.innerHTML += "<span  onmouseover='onmou()' style='border:solid 1px #FF4342;  margin-right: 20px;'>" + n + "</span>"
        }
        ipt.value = "";
        if (span.length > 10) {
            tag_List.removeChild(span[0]);
        }

    }
}
function bntclick() {
    var pp = textare.value.split(/,|\s|，|\r/g);
    for (var i = 0; i < pp.length; i++) {

        dat.push(pp[i]);
        queue.sift(dat);

        if (switching && pp[i] !== "") {
            testList.innerHTML += "<h5 style='border:solid 1px #FF4342;  margin-right: 20px;float: left'>" + pp[i] + " </h5>";
            textare.value = "";
        }
        if (p.length > 10) {
            testList.removeChild(p[0]);
        }

    }
    console.log(dat);
}