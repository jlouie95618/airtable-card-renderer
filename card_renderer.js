'use strict'; // indicate to use Strict Mode

// Globals:
var _ = require('underscore');

$(document).ready(function() {
    var recordElems = document.getElementsByClassName('record');
    _.each(recordElems, function(elem, key) {
        elem.addEventListener('dblclick', function(e) {
            expandRecord(elem, key);
        }, false);
    });
});



var installOnDom = function () {

};

// This function retrieves the html/css content that is 
//  appropriate for the desired style of rendering
var setRenderStyle = function(flag) {
    if (flag === 0) {

    } else if (flag === 1) {

    }
};

function retrieveForChromeExtension() {

}

function retrieveFromURL() {
    // body...
}

var renderCard = function(fields) {

};

function generateCompactView() {

}

function generateExpandedView() {

}

function expandRecord(elem, index) {
    console.log(elem);
    console.log('index: ', index);
    console.log('clicked!');
    $('#compact-' + index).toggle('slow');
    $('#expanded-' + index).toggle('slow');
}

// Finally, export the relevant functions:
// module.exports = {
// 	installOnDom: installOnDom,
// 	setRenderStyle: setRenderStyle,
//     renderCard: renderCard
// };
