function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

function $(id) {
    return document.getElementById(id);
}
function $query(selector) {
    return document.querySelectorAll(selector);
}
function getNodeIndex(element) {
    var children = element.parentNode.childNodes;
    for (var i = 0; i < children.length; i++) {
        if(children[i] == element) {
            return i;
        }
    }
}

var data = [];

function renderData () {
    $('output').innerHTML = data.map(function (num) {
        return '<div>' + num + '</div>';
    }).join('');
}
var calc = {
    pushLeft: function (num) {
        data.unshift(num);
    },
    pushRight: function (num) {
        data.push(num);
    },
    popLeft: function () {
        $('numInput').value = '';
        alert(data.shift());
    },
    popRight: function () {
        $('numInput').value = '';
        alert(data.pop());
    },
    deleteCurrent: function (cur) {
        alert(cur);
    }
};

function init () {
    addEvent($query('div#top button')[0], 'click', function () {
        var input = $('numInput').value;
        if (input) {
            calc.pushLeft(input);
            $('numInput').value = '';
            renderData();
        }
    });
    addEvent($query('div#top button')[1], 'click', function () {
        var input = $('numInput').value;
        if (input) {
            calc.pushRight(input);
            $('numInput').value = '';
            renderData();
        }
    });
    addEvent($query('div#top button')[2], 'click', function () {
        calc.popLeft();
        renderData();
    });
    addEvent($query('div#top button')[3], 'click', function () {
        calc.popRight();
        renderData();
    });

    $('output').addEventListener('click', function (ev) {
        var bindEvent = ev || event;
        if (bindEvent.target.nodeName.toUpperCase() == 'DIV') {
            alert(bindEvent.target.innerHTML);
            var deleteNum = parseInt(bindEvent.target.innerHTML);
            for (var i = 0; i < data.length; i++) {
                if (deleteNum == data[i]) {
                    data.splice(i, 1);
                }
            }
            this.removeChild(bindEvent.target);
        }
    });
}

init();