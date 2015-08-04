'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var Class = require('./vendor/class.js');

var CompactCard = require('./card_types/compact_card.js');
var ExpandedCard = require('./card_types/expanded_card.js');
var Card = require('./card_types/card.js');
var CardData = require('./card_data.js');
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
    renderCard: function(record) {
        var that = this;
        var numCards = this._numCards;
        var verbose = this._verbose;
        var style = this._expandedCardStyle;
        var card;
        var compactCard; 
        var expandedCard;
        var recordContainer = $('<div/>').addClass('record');

        // If record isn't an instance of the wrapper, create the wrapper
        //  using generic info that is defined within the CardData class
        if (!(record instanceof CardData)) {
            record = new CardData(record);
        }
        if (style) { // If the rendering style is not equal to the zero flag
            // Implementation for a compact and expanded card implementation
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
        }
        this._numCards++;
        return recordContainer;
    },
    installStyling: function(divElement, expandedCardStyle) {
        var compactStyle = $('<link/>');
        compactStyle.attr('rel', 'stylesheet');
        compactStyle.attr('type', 'text/css');
        if (this._verbose) { console.log(divElement); } 
        if (!this._expandedCardStyle) {
            this._expandedCardStyle = expandedCardStyle;
        }
        if (this._verbose) { console.log(chrome.runtime); }
        if (chrome.runtime) {
            // Install styling for cards in chrome extension:
            switch(this._expandedCardStyle) {
                case 1:
                    compactStyle.attr('href', config.chromeExtension + 
                        chrome.runtime.id + config.compactStyling);
                    break;
                case 2:
                    compactStyle.attr('href', config.chromeExtension + 
                        chrome.runtime.id + config.expandedStyling);
                    break;
                default:
                    compactStyle.attr('href', config.chromeExtension + 
                        chrome.runtime.id + config.defaultStyling);
                    break;
            }
        } else {
            // In the case that we aren't doing things in chrome, refer
            //  to local files
            switch(this._expandedCardStyle) {
                case 1:
                    compactStyle.attr('href', '.' + config.compactStyling);
                    break;
                case 2:
                    compactStyle.attr('href', '.' + config.expandedStyling);
                    break;
                default:
                    compactStyle.attr('href', '.' + config.defaultStyling);
                    break;
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
