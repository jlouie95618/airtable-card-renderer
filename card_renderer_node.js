'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

// var CompactCard = require('./compact_card.js');
// var ExpandedCard = require('./expanded_card.js');
// var CellTypes = require('./cell_types.js');
var config = require('./config.js');
var tags = require('./tags.js');

// The renderer itself doubles as a Card container,
//  determining which cards to activate/expand, etc.
var CardRenderer = Class.extend({
    init: function(expandedCardStyle, verbose) {
        this._expandedCardStyle = expandedCardStyle;
        this._verbose = verbose;
        this._numCards = 0; // Not sure if this is necessary...
        this._cardListeners = {}; // Not sure if this is necessary...
    },
    // Publicly Accessible Functionality:
    renderCard: function(record) { // record = object with field and value pairs
        var that = this;
        var recordContainer = $(tags.record);
        if (this._verbose) { 
            console.log('inputted (into CardRenderer) record:', record);
        }
        recordContainer.append(this._generateCompactView(record));
        recordContainer.append(this._generateExpandedView(record));
        recordContainer.dblclick(function(eventData) {
            that._activateExpandedView(eventData);
        });
        this._numCards++;
        return recordContainer;
    },
    installStyling: function(divElement, expandedCardStyle) {
        if (this._verbose) { console.log(divElement); } 
        if (!this._expandedCardStyle) {
            this._expandedCardStyle = expandedCardStyle;
        }
        // Install styling for expanded cards:
        switch(this._expandedCardStyle) {
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
        // Compact card styling:
        console.log(chrome.runtime);
        $(divElement).append(tags.stylingFront + tags.chromeExtension + 
            chrome.runtime.id + tags.defaultStyling);
    },
    // Private Functionality:
    _activateExpandedView: function(eventData) { // TODO: implement event handler
        if (this._verbose) console.log(eventData);
        // $('#compact-' + this._numCards).toggle('slow');
        // $('#expanded-' + this._numCards).toggle('slow');
    },
    // Compact Card
    _generateCompactView: function(record) {
        var info = $(tags.infoTag);
        var compactCard = $('<div id=\"compact-' + this._numCards + '\"></div>');
        var keys = _.keys(record);
        compactCard.append(this._createFirstElem(keys[0], record[keys[0]].displayValue));
        compactCard.append(this._createImgElem());
        compactCard.append(this._createInnerElems(keys[1], keys[2], keys[3]));

        info.append(compactCard);

        return info;

    },
    _createFirstElem: function(name, firstContent) {
        var elem = $(tags.firstElem);
        elem.append('<strong>' + firstContent + '</strong>');
        return elem;
    },
    _createImgElem: function(imgContent) {
        var elem = $(tags.imgElem);

        return elem;
    },
    _createInnerElems: function(leftContent, middleContent, rightContent) {
        var elem = $(tags.innerElems);
        elem.append(tags.leftElem);
        elem.append(tags.middleElem);
        elem.append(tags.rightElem);
        return elem;
    },
    // Expanded Card
    _generateExpandedView: function(record) {
        var expandedCard = $('<div id=\"expanded-' + this._numCards + '\"></div>');

        return expandedCard;
    },
    _handleMultiWordKeys: function() {
        
    }
});

module.exports = CardRenderer;
