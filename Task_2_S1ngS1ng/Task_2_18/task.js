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

var data = [1, 2, 3];

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
            // for (var i = 0; i < $('top').length; i++) {
            //     (function (index) {
            //         $('top').chidNodes.onclick = function () {
            //             alert(index);
            //         };
            //     })(i);
            // }
}

init();