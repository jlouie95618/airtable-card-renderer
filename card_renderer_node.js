'use strict'; // indicate to use Strict Mode

// Constants:


var result = '';
var numRecords = 0;
var infoDivTag = '<div id=\"info\">';
var recordDivTag = '<div class=\"record\">';
var closeDiv = '</div>';
var compactStyle = 'template/css/sidebar_compact.css';
// This should be able to change depending on what the 
//  user wants their sidebar to look like
var expandedStyle = 'template/css/sidebar_expanded.css';

// This function retrieves the html/css content that is 
//  appropriate for the desired style of rendering
var setRenderStyle = function(flag) {
    if (flag === 0) {
        if (chrome.extension) {
            result += '<link rel=\"stylesheet\" type=\"text/css\" href=\"';
            result += chrome.extension.getURL(expandedStyle);
            result += '\">';
        } else {} // TO IMPLEMENT...
    } else if (flag === 1) {} // TO IMPLEMENT...
};

function replaceStyle(stylePath) {

}

var renderCard = function(fields) {
    createFramework();
    result += generateCompactView(fields);
    result += generateExpandedView(fields);
    numRecords++;

};

function createFramework() {
    result += recordDivTag;
    result += infoDivTag;
    result += (closeDiv + closeDiv);
}

function generateCompactView(fields) {

}

function generateExpandedView(fields) {

}

// This is the callback function definition; called within
//  an anonymous function
function expandRecord(elem, index) {
    console.log(elem);
    console.log('index: ', index);
    console.log('clicked!');
    $('#compact-' + index).toggle('slow');
    $('#expanded-' + index).toggle('slow');
}

// Finally, export the relevant functions:
// module.exports = {
// 	install: install,
// 	setRenderStyle: setRenderStyle,
//     renderCard: renderCard
// };














// Unused:
    // var recordElems = document.getElementsByClassName('record');
    // _.each(recordElems, function(elem, key) {
    //     elem.addEventListener('dblclick', function(e) {
    //         expandRecord(elem, key);
    //     }, false);
    // });

    // // What needs to be 'installed'? - well the 
    // var install = function (cardRenderPath) {
        // $(document).ready(function() {
        //     var script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.type = cardRenderPath;
        //     $('head').append(script);
        // }); 
    // };

    // get(chrome.extension.getURL(), null).then(function(content) {
    //     htmlContent = content;
    // });


    // // Simple helper function to make AJAX HTTP requests; as advised by
    // //  jQuery's documentation, I have opted to use $.ajax rather than $.get 
    // function get(url, header) {
    //     return $.ajax({
    //         url: url,
    //         type: 'GET',
    //         headers: header
    //     });
    // }