'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('../vendor/class.js');

var ColumnTypeConstructors = require('../column_types.js');
var config = require('../config.js');

var Card = Class.extend({
    init: function(record, cardNum, verbose) {
        this._record = record;
        this._cardNum = cardNum;
        this._verbose = verbose;
    },
    generateCard: function() {
        var that = this;
        var info = $('<div/>').attr('class', 'info');
        var keys;
        // Create image tag and pull it from the record
        var images = this._findImageAttachments();
        var constructors = {};
        var targetEmail;
        var emailKey;


        // console.log('original keys: ', this._record._keys);


        if (this._record._targetEmailAddr) {
            targetEmail = this._findEmail(this._record._targetEmailAddr);
            emailKey = this._removeTargetEmailFromFields(this._record._targetEmailAddr);
            this._record = _.omit(this._record, '_targetEmailAddr');
        } else {
            targetEmail = this._findEmail();
        }





        if (this._record._keys) { // case when order specified by an array of keys
            keys = this._record._keys;
            this._record = _.omit(this._record, '_keys');
            keys = _.without(keys, '_keys');
            if (emailKey) { 
                keys = _.without(keys, emailKey);
            }
        } else { // case when order is implied by the object itself
            keys = _.keys(this._record);
        }





        this._card = $('<div/>');
        if (this._verbose) { 
            console.log('cardNum: ', this._cardNum); 
            console.log('Images Array: ', images);
            console.log('Record: ', this._record);
            console.log('keys: ', keys);
        }
        this._card.attr('class', 'card');
        // Generate the inner-elems div
        info.append(this._createImgElem(images));
        // Generate the first-elem div
        info.append(this._displayHeaderValue(keys[0], 
            this._record[keys[0]].displayValue, targetEmail));
        
        // console.log('keys: ', keys);
        _.each(keys, function(key) {
            // console.log(key);
            if (key !== keys[0]) { // want to omit the very first key
                constructors[key] = ColumnTypeConstructors[that._record[key].fieldType];
            }
        });
        // Append the constructed elements onto the appropriate parent elements
        this._card.append(info.append(this._createCardContent(constructors)));
        return this._card;

    },
    createMoreInfoButton: function() {
        var that = this;
        var button = $('<button/>').text('More Info');
        button.attr('class', 'more-info-button');
        button.click(function(eventData) {
            that._card.toggleClass('card');
            that._card.toggleClass('card-expanded');
            button.toggleClass('more-info-button');
            button.toggleClass('collapse-button');
            if (button[0].innerText === 'More Info') {
                button.text('Collapse');
            } else if (button[0].innerText === 'Collapse') {
                button.text('More Info');
            }
        });
        return button;
    },
    _removeTargetEmailFromFields: function(targetEmail) {
        var that = this;
        var email = targetEmail;
        var key;
        _.each(this._record, function(fieldObject, objectKey) {
            if (email && fieldObject.displayValue === targetEmail) {
                key = objectKey;
                that._record = _.omit(that._record, objectKey);
                email = null; // keep from omitting more than one field
            }
        });
        this._record = that._record;
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
                if (targetEmail === contentObject.displayValue) {
                    elem = new Constructor(null, 
                        record[fieldName], that._verbose).generateElement(true);    
                }   
            } else if (that._containsEmailWord(fieldName)) {
                elem.append(_.escape(contentObject.displayValue));
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
    // eventually implement to allow for a 'slideshow'?...
    _createImgElem: function(imagesArray) {
        if (this._verbose) { console.log('images: ', imagesArray); }
        var first = imagesArray[0];
        var container = $('<div/>').attr('class', 'img-container');
        if (!imagesArray || imagesArray.length === 0 || !first) {
            this._noImage = true;
            container.attr('class', 'no-image');
            return container.append($('<img/>').attr('class', 'no-img'));
        } else {
            container.css('background-image', 'url(' + first.url + ')');
        }
        return container;
    },
    _displayHeaderValue: function(name, firstContentDisplayValue, emailElem) {
        var elem = $('<div/>');
        var headerTitle = $('<div/>').append(_.escape(firstContentDisplayValue));
        if (this._noImage) { 
            elem.attr('class', 'header-no-image'); 
        } else {
            elem.attr('class', 'header');
        }
        elem.append(headerTitle.attr('class', 'title'));
        elem.append(emailElem.attr('class', 'email-header'));
        return elem;
    },
    _createCardContent: function(fieldTypeConstructors) {
        var that = this;
        var record = this._record;
        var contents = $('<div/>').attr('class', 'card-content');
        var counter = 0; // more descriptive name for counter?...
        if (this._verbose) { console.log(fieldTypeConstructors, record); }
        _.each(fieldTypeConstructors, function(FieldTypeConstructor, columnName) {
            var container = $('<div/>').attr('class', 'element');
            // Construct new instance of a particular type, then 
            //  generate the appropriate element
            var elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement(true);
            if (that._verbose) { 
                console.log('Content Object: ', record[columnName]);
                console.log(elem);
            }
            contents.append(container.append(elem));
            counter++;

        });
        return contents;
    },

});

module.exports = Card;
