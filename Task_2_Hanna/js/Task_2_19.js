/**
 * Created by hannah on 2016/5/24.
 */
var daInput;
var datalist = document.getElementById("dataList");
var datli = document.getElementsByTagName("li");
var switching = false;
//默认数据显示
window.onload = function () {
    var rand = "";
    for (var i = 0; i < 10; i++) {
        var r = Math.floor(Math.random() * 90 + 10);
        var dli = document.createElement("li");
        dli.style.height = (r * 3) + "px";
        datalist.appendChild(dli);

        datli[i].innerHTML = datli[i].style.height.match(/\d+/ig);
        ;
    }
}
$("#right_in").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    daInput = $("#dat").val();
    if (datli.length > 61) {
        alert("不能超过了60位呢~")
    } else {

        if (/^[1-9]\d*$/.test(daInput) && daInput < 100 && daInput > 10) {

            var dli = document.createElement("li");
            dli.style.height = (daInput * 3) + "px";
            dli.innerHTML = (dli.style.height.match(/\d+/ig)) / 3;
            datalist.appendChild(dli);

        } else {
            alert("请输入10-100的正整数");
        }
        ;
    }

});
$("#left_in").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    //取数据
    var daInput = $("#dat").val();
    if (datli.length > 61) {
        alert("不能超过了60位呢~")
    } else {

        if (/^[1-9]\d*$/.test(daInput) && daInput < 100 && daInput > 10) {
            var dli = document.createElement("li");
            dli.style.height = (daInput * 3) + "px";
            dli.innerHTML = (dli.style.height.match(/\d+/ig)) / 3;
            var first = datalist.firstChild;
            datalist.insertBefore(dli, first);
        } else {
            alert("请输入10-100的正整数");
        }
    }
    ;
});
$("#right_out").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    datalist.removeChild(datalist.lastChild);
});
$("#left_out").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    datalist.removeChild(datli[0]);
});
$("#random").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    for (var i = 0; i < datli.length; i++) {
        var r = Math.floor(Math.random() * 90 + 10);
        datli[i].style.height = (r * 3) + "px";
        datli[i].innerHTML = (datli[i].style.height.match(/\d+/ig)) / 3;
        ;

    }
});

$("#l_h").click(function () {
    if (switching) {
        alert("排序呢~")
        return false;
    }
    var arr = [];
    snapshots = [];
    var timer = null;
//对数组li进行遍历，取出高度数组arr

    for (var i = 0; i < datli.length; i++) {
        var da = (datli[i].style.height).match(/\d+/ig);
        arr.push(da);
    }
    arr = arr.map(Number);
    function painting() {//绘制
//        var lis=[].slice.call( document.querySelectorAll("li") );			//将所有li元素的集合转换为数组对象
        var lis = [].slice.call(document.getElementsByTagName("li"));
        for (var i = 0; i < arr.length; i++) {
            if (lis.length != arr.length) {
                var l = document.createElement("li");
                datalist.appendChild(l);
            } else {
                break;								//当lis的数量等于数组的长度时，停止创建li元素
            }
            ;
        }
        ;
        var snapshot = snapshots.shift() || [];						//取出快照记录数组中的第一条记录
        console.log(snapshot);
        if (snapshot.length != 0) {
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.height = snapshot[i] + "px";
                lis[i].innerHTML = snapshot[i] / 3;
            }
            ;
        } else {
            clearInterval(timer);							//绘制结束
            switching = false;
            return;
        }
        ;
    };
    function bubbleSort(arr) {//对arr进行冒泡排序
        if (arr.length <= 1) {
            return arr;
        }
        ;
        var temp = 0;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    // console.log(arr instanceof Array);			//ture
                    snapshots.push(JSON.parse(JSON.stringify(arr)));	//记录下每次排序数组的快照
                }
                ;
            }
            ;
        }
        ;
        return arr;
    };
//        Array.prototype.bubbleSort = function () {//扩展数组应用
//                return bubbleSort(this);
//        }

    bubbleSort(arr);
    timer = setInterval(painting, 300);


    switching = true;

})
