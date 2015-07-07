'use strict'; // indicate to use Strict Mode

// Constants and Globals:
var result = '';
var numRecords = 0;
var config = require('./config.js');
var _ = require('underscore');

// This function retrieves the html/css content that is 
//  appropriate for the desired style of rendering
var setRenderStyle = function(flag) {
    if (flag === 0) {
        if (chrome.extension) {
            result += '<link rel=\"stylesheet\" type=\"text/css\" href=\"';
            result += chrome.extension.getURL(config.expandedStyle);
            result += '\">';
        } else {} // TO IMPLEMENT...
    } else if (flag === 1) {} // TO IMPLEMENT...
};

function replaceStyle(stylePath) {

}

var renderCard = function(fields) {
    result += config.recordDivTag;
    result += generateCompactView(fields); // does fields need to be a deep/shallow copy?
    result += generateExpandedView(fields);
    result += config.closeDiv;
    numRecords++;
};

function generateCompactView(fieldsObject) {
    var firstTag = null;
    var innerElems = null;
    var imgTag = null;
    var keys = null;
    var img = _.find(fieldsObject, function(elem) {
        // check if image is present...
        return false;
    });

    if (!img) {
        imgTag = '<img id=\"img-elem\" src=\"';
        imgTag += chrome.extension.getURL(config.icon) + '\">';
    } else {
        // pull the image from the fieldsObject...
        // Remove img so that it doesn't interfere with
        //  the first 'four' elements that are to be 
        //  displayed on the card preview
        fieldsObject = _.without(fieldsObject, img);
    }
    keys = _.keys(fieldsObject);
    firstTag = generateDiv('first-elem', fieldsObject.keys[0]);
    innerElems = generateDiv('inner-elems', 
        generateDiv('left-elem', fieldsObject.keys[1]) + 
        generateDiv('middle-elem', fieldsObject.keys[2]) + 
        generateDiv('right-elem', fieldsObject.keys[3]));
    return generateDiv('compact-0', 
        generateDiv('info', firstTag + imgTag + innerElems), 
        'display: block');
}

function generateDiv(id, content, style) {
    var string = '<div';
    if (id) string += ' id=\"' + id + '\"';
    if (style) string += ' style=\"' + style + '\"';
    string += '>';
    if (content) string += content;
    string += config.closeDiv;
    return string;
}

function generateExpandedView(fields) {

}

// This helper function takes a key and replaces the key variable
//  with a new key string that omits the spaces between words/characters
function handleMultiWordKeys(recordFields, key) {
    if (key.split(' ').length > 1) { // Is there a more logical work around?...
        var newKey = key.split(' ').join('');
        recordFields[newKey] =  recordFields[key];
        delete recordFields[key];
        return newKey;
    }
    return key;
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