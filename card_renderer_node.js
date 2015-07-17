'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var CompactCard = require('./card_types/compact_card.js');
var ExpandedCard = require('./card_types/expanded_card.js');
var Card = require('./card_types/card.js');
// var CellTypes = require('./cell_types.js');
var config = require('./config.js');

// The renderer itself doubles as a Card container,
//  determining which cards to activate/expand, etc.
var CardRenderer = Class.extend({
    init: function(expandedCardStyle, verbose) {
        this._expandedCardStyle = expandedCardStyle;
        this._verbose = verbose;
        this._numCards = 0;
    },
    // Publicly Accessible Functionality:
    renderCard: function(record) { // record = object with field and value pairs
        var that = this;
        var numCards = this._numCards;
        var verbose = this._verbose;
        var style = this._expandedCardStyle;
        var card;
        var compactCard; 
        var expandedCard;
        var recordContainer = $('<div></div>').attr('class', 'record');
        if (style) {
            // implementation for a compact and expanded card implementation
            compactCard = new CompactCard(record, numCards, verbose);
            expandedCard = new ExpandedCard(record, numCards, style, verbose);
            if (verbose) {
                console.log('this._numCards', numCards);
                console.log('inputted (into CardRenderer) record:', record);
            }
            recordContainer.append(compactCard.generateCard());
            recordContainer.append(expandedCard.generateCard());
            recordContainer.click({cardIndex: numCards}, function(eventData) {
                that._activateExpandedView(eventData);
            });
        } else {
            // Code pertaining to just a single card, but is expanded when a
            //  'More Info' button is clicked.
            card = new Card(record, numCards, verbose);
            recordContainer.append(card.generateCard());
            recordContainer.append(card.createMoreInfoButton());
        }
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
        if (this._verbose) { console.log(chrome.runtime); }
        if (chrome.runtime) {
            // Install styling for cards:
            switch(this._expandedCardStyle) {
                case 1:
                    compactStyle.attr('href', config.compactStyling);
                case 2:
                    compactStyle.attr('href', config.expandedStyling);
                default:
                    compactStyle.attr('href', config.defaultStyling);
            }
        }
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
