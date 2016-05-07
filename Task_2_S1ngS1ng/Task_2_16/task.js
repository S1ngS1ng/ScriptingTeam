/**
 * Created by Xing on 4/16/16.
 */

var aqiData = [];
var obj = {};
function $(id) {
    return document.getElementById(id);
}

function addRow(table, data) {
    var tableRef = table.getElementsByTagName('tbody')[0];
    if (data.city) {
        var row = tableRef.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = data.city;
        cell2.innerHTML = data.value;
        cell3.innerHTML = '<button>删除</button>';
    }
}

function addAqiData() {
    obj = {};
    obj.city = $('aqi-city-input').value.trim();
    obj.value = $('aqi-value-input').value.trim();
    if(obj.city) aqiData.push(obj);
    return obj;
}

function renderAqiList() {
    var table = $('aqi-table');
    addRow(table, addAqiData());
    $('aqi-city-input').value = '';
    $('aqi-value-input').value = '';
}

function addBtnHandle() {
    renderAqiList();
}

function delBtnHandle(element) {
    var index = parseInt(element.parentElement.parentElement.rowIndex);
    $('aqi-table').deleteRow(index);
    aqiData.splice((index - 1), 1);
}

function init() {

    $('add-btn').addEventListener('click', addBtnHandle);

    $('aqi-table').addEventListener('click', function (ev) {
        var bindEvent = ev || event;
        if (bindEvent.target.nodeName.toUpperCase() == 'BUTTON') {
            delBtnHandle(bindEvent.target);
        }
    });
}

init();