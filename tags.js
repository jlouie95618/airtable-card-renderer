var tags = {
    // HTML div tags:
    record: '<div class=\"record\"></div>',
    infoTag: '<div id=\"info\"></div>',
    compact: '<div id=\"compact\"></div>',
    expanded: '<div id=\"expanded\"></div>',
    firstElem: '<div id=\"first-elem\"></div>',
    innerElems: '<div id=\"inner-elems\"></div>',
    leftElem: '<div id=\"left-elem\"></div>',
    middleElem: '<div id=\"middle-elem\"></div>',
    rightElem: '<div id=\"right-elem\"></div>',
    elem: '<div id=\"elem\"></div>',

    // Img related tags:
    imgElemFront: '<img id=\"img-elem\" src=\"',
    imgElemEnd: '\">',

    // Styling tags:
    stylingFront: '<link rel=\"stylesheet\" type=\"text/css\" href=\"',
    chromeExtension: 'chrome-extension://',
    // Requires chrome.runtime.id in the middle
    defaultStyling: '/css/sidebar_style.css\">',
};

module.exports = tags;
