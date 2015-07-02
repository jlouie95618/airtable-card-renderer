'use strict'; // indicate to use Strict Mode
// Constants:

$(document).ready(function() {
    var classElems = document.getElementsByClassName('record');
    for (var i = 0; i < classElems.length; i++) {
        classElems[i].addEventListener('click', expandRecord, false);
    }
})

function expandRecord () {
    console.log('clicked!');
    console.log($('#compact'));
    $('#compact').toggle('slow');
    $('#expanded').toggle('slow');
}

// var installOnDom = function () {
    
// };

// var setRenderStyle = function() {
    
// };

// var renderCard = function() {

// };

// function compactView() {

// }

// function expandedView() {

// }

// Finally, export the relevant functions:
// module.exports = {
// 	installOnDom: installOnDom,
// 	setRenderStyle: setRenderStyle,
//     renderCard: renderCard
// };
