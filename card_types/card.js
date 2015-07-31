'use strict'; // indicate to use Strict Mode


(function() {

    var root = this;
    var previousCard = root.Card;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var Class = root.Class;
    var ColumnTypeConstructors = root.ColumnTypeConstructors;
    var config = root.config;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('card requires Underscore'); }
    }
    if (typeof Class === 'undefined') {
        if (has_require) { Class = require('../vendor/class.js'); }
        else { throw new Error('card requires the Class file'); }
    }
    if (typeof ColumnTypeConstructors === 'undefined') {
        if (has_require) { ColumnTypeConstructors = require('../column_types.js'); }
        else { throw new Error('card requires the column_types.js file'); }
    }
    if (typeof config === 'undefined') {
        if (has_require) { config = require('../config.js'); }
        else { throw new Error('card requires the config class'); }
    }

    var Card = Class.extend({
        init: function(record, cardNum, verbose) {
            this._record = record;
            this._cardNum = cardNum;
            this._verbose = true;
        },
        generateCard: function() {
            var that = this;
            var info = $('<div/>').addClass('card-content');
            var topCard = $('<div/>').addClass('card-top');
            var bottomCard = $('<div/>').addClass('card-bottom');
            var keys;
            // Create image tag and pull it from the record
            var images = this._findImageAttachments();
            var constructors = {};
            var targetEmail = this._findEmail(this._record._targetEmailAddr);
            var emailKey = this._removeTargetEmailFromFields(this._record._targetEmailAddr);
            // Create the card div which will contain the separate record's contents
            this._card = $('<div/>').addClass('card');            
            if (this._record._keys) { // case when order specified by an array of keys
                keys = this._record._keys;
                if (emailKey && _.size(keys) > 1) {
                    keys = _.without(keys, emailKey);
                }
            } else { // case when order is implied by the object itself
                keys = _.keys(this._record);
            }
            if (this._verbose) { 
                console.log('cardNum: ', this._cardNum); 
                console.log('Images Array: ', images);
                console.log('Record: ', this._record);
                console.log('keys: ', keys);
            }
            // Generate the image element div
            topCard.append(this._createImgElem(images));
            // Generate the header div
            topCard.append(this._displayHeaderValue(keys[0], 
                this._record[keys[0]].displayValue, targetEmail));
            // Generate the card content constructors
            _.each(keys, function(key) {
                if (key !== keys[0]) { // want to omit the very first key
                    constructors[key] = ColumnTypeConstructors[that._record[key].fieldType];
                }
            });
            // Append the constructed elements onto the appropriate parent elements
            this._createCardContent(constructors, this._card, topCard, bottomCard, 3);
            // this._card.append(topCard.append());
            this._constructViewInAirtableButton(bottomCard);
            return this._card;

        },
        _constructViewInAirtableButton: function(bottomCard) {
            var button = $('<button/>').addClass('extension-options').text('View in Airtable');
            var buttonContainer = $('<div/>').addClass('card-button').append(button);
            this._addButtonAndListenerWithUrl(bottomCard, buttonContainer, 
                config.openLinkToRec, this._record._recordUrl);
        },
        _removeTargetEmailFromFields: function(targetEmail) {
            var that = this;
            var email = targetEmail;
            var key;
            if (targetEmail) {
                _.each(this._record, function(fieldObject, objectKey) {
                    if (email && fieldObject.displayValue === targetEmail) {
                        key = objectKey;
                        if (_.size(that._record._keys) > 1) {
                            that._record = _.omit(that._record, objectKey);
                        }
                        email = null; // keep from omitting more than one field
                    }
                });
                this._record = that._record;
            }
            return key;
        },
        _findEmail: function(targetEmail) { // DOUBLE CHECK FUNCTIONALITY HERE
            var that = this;
            var record = this._record;
            var elem = $('<div/>');
            _.each(record, function(contentObject, fieldName) {
                var Constructor;
                if (contentObject.fieldType === 'email') {
                    Constructor = ColumnTypeConstructors[contentObject.fieldType];
                    if (targetEmail && targetEmail === contentObject.displayValue) {
                        elem = new Constructor(null, 
                            record[fieldName], that._verbose).generateElement(true);    
                    }   
                } else if (that._containsEmailWord(fieldName)) {
                    elem.append(_.escape(contentObject.displayValue));
                    elem.addClass('mod-non-email-type');
                }
            });
            return elem;
        },
        _containsEmailWord: function(fieldName) {
            var lowerCaseFieldName = fieldName.toLowerCase();
            return lowerCaseFieldName === 'email' || 
                lowerCaseFieldName === 'email address' ||
                lowerCaseFieldName === 'e-mail' ||
                lowerCaseFieldName === 'e-mail address';
        },
        _findImageAttachments: function() {
            var record = this._record;
            var that = this;
            var type = 'image';
            var images = []; // will become an array of objects
            _.each(record, function(contentObject, fieldName) {
                if (contentObject.fieldType === 'multipleAttachment') {
                    var attachmentArray = contentObject.displayValue;
                    _.each(attachmentArray, function(attachmentObject, index) {
                        if (attachmentObject.type.indexOf(type) === 0) {
                            attachmentObject.fieldName = fieldName;
                            images.push(attachmentObject);
                            // delete attachmentArray[index]; // Is this necessary?
                        } 
                    });
                }
            });
            return images;
        },
        _createImgElem: function(imagesArray) {
            if (this._verbose) { console.log('images: ', imagesArray); }
            var first = imagesArray[0];
            var container = $('<div/>').addClass('img-container');
            if (!imagesArray || imagesArray.length === 0 || !first) {
                this._noImage = true;
                container.addClass('mod-no-image');
                return container;
            } else {
                // This particular attribute for the div must be done inline
                //  because there is no other way of determining the appropriate URL
                container.css('background-image', 'url(' + first.url + ')');
            }
            return container;
        },
        _displayHeaderValue: function(name, firstContentDisplayValue, emailElem) {
            var elem = $('<div/>');
            var headerTitle = $('<div/>').append(_.escape(firstContentDisplayValue));
            elem.addClass('header');
            elem.append(headerTitle.addClass('header-title'));
            elem.append(emailElem.addClass('header-email'));
            if (this._noImage) { 
                elem.addClass('mod-no-image');
                headerTitle.addClass('mod-no-image');
                emailElem.addClass('mod-no-image');
            }
            return elem;
        },
        _createCardContent: function(constructors, card, top, bottom, numElemInTopCard) {
            var that = this;
            var record = this._record;
            var first = true;
            var topContents = $('<div/>').addClass('elements-container');
            var bottomContents = $('<div/>').addClass('elements-container');
            var numElem = 0;
            var totalElems = _.size(constructors);
            if (this._verbose) { console.log(constructors, record); }
            _.each(constructors, function(FieldTypeConstructor, columnName) {
                var container = $('<div/>').addClass('element');
                // Construct new instance of a particular type, then 
                //  generate the appropriate element
                var elem = new FieldTypeConstructor(columnName, 
                    record[columnName], that._verbose).generateElement(true);

                if (that._verbose) { 
                    console.log('Content Object: ', record[columnName]);
                    console.log(elem);
                }
                if (!that._noImage && first) {
                    container.addClass('mod-image-present');
                    first = false;
                }
                if (numElem === (numElemInTopCard - 1)) {
                    container.addClass('mod-last-in-top');
                }
                if (numElem === (totalElems - 1)) {
                    container.addClass('mod-last-elem');
                }
                if (numElem < numElemInTopCard) {
                    topContents.append(container.append(elem));
                } else {
                    bottomContents.append(container.append(elem));
                }
                numElem++;
            });
            card.append(top.append(topContents));
            card.append(this._createSeeMoreButton(bottom));
            card.append(bottom.append(bottomContents));
        },
        _createSeeMoreButton: function(bottom) {
            var that = this;
            var button = $('<button/>').text('See More');
            button.addClass('see-more-button');
            button.click(function(eventData) {
                bottom.toggle();
                if (button[0].innerText === 'See More') {
                    button.text('See Less');
                } else if (button[0].innerText === 'See Less') {
                    button.text('See More');
                }
            });
            return button;
        },        
        // This function incorporates the button and event listener that allows a 
        //  button on the side bar to open/activate various actions from the sidebar.
        _addButtonAndListenerWithUrl: function(card, button, message, url) {
            var that = this;
            var request;
            if (url) {
                request = { type: message, url: url };
            } else {
                request = { type: message };
            }
            // Insert the HTML for the creation of the button
            $(card).append(button);
            // Add the event listener and tell the listener what to do when a click occurs
            $(button).click(function() {
                chrome.runtime.sendMessage(request, null, function(response) {
                    if (that._verbose) { console.log(response.message); }
                });
            });
        }

    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Card;
        }
        exports.Card = Card;
    } else {
        root.Card = Card;
    }

}).call(this);
