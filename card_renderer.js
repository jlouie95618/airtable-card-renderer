'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousCardRenderer = root.CardRenderer;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var Class = root.Class;
    var CompactCard = root.CompactCard;
    var ExpandedCard = root.ExpandedCard;
    var Card = root.Card;
    var config = root.config;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('card_renderer requires Underscore'); } 
    }
    if (typeof Class === 'undefined') {
        if (has_require) { Class = require('./vendor/class.js'); }
        else { throw new Error('card_renderer requires the Class file'); } 
    }
    if (typeof CompactCard === 'undefined') {
        if (has_require) { CompactCard = require('./card_types/compact_card.js'); }
        else { throw new Error('card_renderer requires the CompactCard class'); } 
    }
    if (typeof ExpandedCard === 'undefined') {
        if (has_require) { ExpandedCard = require('./card_types/expanded_card.js'); }
        else { throw new Error('card_renderer requires the ExpandedCard class'); } 
    }
    if (typeof Card === 'undefined') {
        if (has_require) { Card = require('./card_types/card.js'); }
        else { throw new Error('card_renderer requires the Card class'); } 
    }
    if (typeof config === 'undefined') {
        if (has_require) { config = require('./config.js'); }
        else { throw new Error('card_renderer requires the config class'); } 
    }

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
            var recordContainer = $('<div></div>').addClass('record');
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
                // card.constructViewInAirtableButton();
                // recordContainer.append(card.createMoreInfoButton());
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

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = CardRenderer;
        }
        exports.CardRenderer = CardRenderer;
    } else {
        root.CardRenderer = CardRenderer;
    }

}).call(this);
