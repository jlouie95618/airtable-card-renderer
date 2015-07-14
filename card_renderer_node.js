'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var CompactCard = require('./compact_card.js');
var ExpandedCard = require('./expanded_card.js');
// var CellTypes = require('./cell_types.js');
var config = require('./config.js');

// The renderer itself doubles as a Card container,
//  determining which cards to activate/expand, etc.
var CardRenderer = Class.extend({
    init: function(expandedCardStyle, verbose) {
        this._expandedCardStyle = expandedCardStyle;
        this._verbose = verbose;
        this._numCards = 0; // Not sure if this is necessary...
    },
    // Publicly Accessible Functionality:
    renderCard: function(record) { // record = object with field and value pairs
        var that = this;
        var numCards = this._numCards;
        var verbose = this._verbose;
        var style = this._expandedCardStyle;
        if (verbose) { console.log('this._numCards', numCards); }
        var compactCard = new CompactCard(record, numCards, verbose);
        var expandedCard = new ExpandedCard(record, numCards, style, verbose);
        var recordContainer = $('<div></div>').attr('class', 'record');
        if (verbose) { 
            console.log('inputted (into CardRenderer) record:', record);
        }
        recordContainer.append(compactCard.generateCard());
        recordContainer.append(expandedCard.generateCard());
        recordContainer.click({cardIndex: numCards}, function(eventData) {
            that._activateExpandedView(eventData);
        });
        this._numCards++;
        return recordContainer;
    },
    installStyling: function(divElement, expandedCardStyle) {
        var compactStyle = $('<link>');
        compactStyle.attr('rel', 'stylesheet');
        compactStyle.attr('type', 'text/css');
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
        if (this._verbose) { console.log(chrome.runtime); }
        compactStyle.attr('href', config.chromeExtension + chrome.runtime.id + config.defaultStyling);
        // compactStyle.attr('href', './templates/css/sidebar_compact.css');
        $(divElement).append(compactStyle);
    },
    // Private Functionality:
    _activateExpandedView: function(eventData) { // TODO: implement event handler
        if (this._verbose) { console.log(eventData.data.cardIndex); }
        if (this._verbose) { console.log(eventData); } 
        if (this._verbose) { console.log($('.compact#compact-' + eventData.data.cardIndex)); }
        if (this._verbose) { console.log($('.expanded#expanded-' + eventData.data.cardIndex)); }
        $('.compact#compact-' + eventData.data.cardIndex).toggle('slow');
        $('.expanded#expanded-' + eventData.data.cardIndex).toggle('slow');
    }
});

module.exports = CardRenderer;
