'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var Class = require('../vendor/class.js');

var ColumnTypeConstructors = require('../column_types.js');
var config = require('../config.js');

var Card = Class.extend({
    init: function(cardData, cardNum, verbose) {
        this._cardData = cardData;
        this._cardNum = cardNum;
        this._verbose = verbose;
    },
    generateCard: function() {
        var that = this;
        var info = $('<div/>').addClass('card-content');
        var topCard = $('<div/>').addClass('card-top');
        var bottomCard = $('<div/>').addClass('card-bottom');
        var order = this._cardData.getFieldOrder();
        var images = this._findImageAttachments();
        var constructors = {};
        var targetEmail = this._cardData.getTargetEmail();
        // Create the card div which will contain the separate record's contents
        this._card = $('<div/>').addClass('card');
        // Generate the image element div
        topCard.append(this._createImgElem(images));
        // Generate the header div
        topCard.append(this._displayHeaderValue(this._cardData.getFirstElem().displayValue, 
            this._createEmailElem(targetEmail)));
        // Generate the card content constructors
        _.each(order, function(key) {
            var field = (that._cardData.getFields())[key];
            constructors[key] = ColumnTypeConstructors[field.fieldType];
        });
        // Append the constructed elements onto the appropriate parent elements
        this._createCardContent(constructors, this._card, topCard, bottomCard, 3);
        // this._card.append(topCard.append());
        this._constructViewInAirtableButton(bottomCard);
        return this._card;

    },
    _createEmailElem: function(email) {
        var that = this;
        var recordFields = this._cardData.getFields();
        var elem = $('<div/>');
        _.each(recordFields, function(fieldObject, fieldName) {
            var Constructor;
            if (fieldObject.fieldType === 'email') {
                Constructor = ColumnTypeConstructors[fieldObject.fieldType];
                if (email === fieldObject.displayValue) {
                    elem = new Constructor(null, recordFields[fieldName],
                        that._verbose).generateElement(true);
                }
            } else if (that._containsEmailWord(fieldName)) {
                elem.append(_.escape(fieldObject.displayValue));
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
    _constructViewInAirtableButton: function(bottomCard) {
        var button = $('<button/>').addClass('extension-options').text('View in Airtable');
        var buttonContainer = $('<div/>').addClass('card-button').append(button);
        this._addButtonAndListenerWithUrl(bottomCard, buttonContainer, 
            config.openLinkToRec, this._cardData.getRecordUrl());
    },
    _findImageAttachments: function() {
        var recordFields = this._cardData.getFields();
        var that = this;
        var type = 'image';
        var images = []; // will become an array of objects
        _.each(recordFields, function(contentObject, fieldName) {
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
    _displayHeaderValue: function(firstContentDisplayValue, emailElem) {
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
        var recordFields = this._cardData.getFields();
        var first = true;
        var topContents = $('<div/>').addClass('elements-container');
        var bottomContents = $('<div/>').addClass('elements-container');
        var numElem = 0;
        var totalElems = _.size(constructors);
        _.each(constructors, function(FieldTypeConstructor, columnName) {
            var container = $('<div/>').addClass('element');
            // Construct new instance of a particular type, then 
            //  generate the appropriate element
            var elem = new FieldTypeConstructor(columnName, 
                recordFields[columnName], that._verbose).generateElement(true);
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

module.exports = Card;
