'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('../vendor/class.js');

var ColumnTypeConstructors = require('../column_types.js');
var config = require('../config.js');

var CompactCard = Class.extend({
    init: function(record, cardNum, verbose) {
        this._record = record;
        this._cardNum = cardNum;
        this._verbose = verbose;
    },
    // Compact Card - will eventually be its own subclass
    generateCard: function() {
        var record = this._record;
        var info = $('<div/>').attr('class', 'info');
        var keys = _.keys(record);
        // Create image tag and pull it from the record
        var images = this._findImageAttachments();
        var constructors = {};
        var compactCard = $('<div/>');
        if (this._verbose) { 
            console.log('cardNum: ', this._cardNum); 
            console.log('Images Array: ', images);
            console.log('Record: ', record);
            console.log('keys: ', keys);
        }
        compactCard.attr('class', 'compact');
        // Create id to uniquely identify this particular card
        if (this._cardNum !== undefined) {
            compactCard.attr('class', 'compact-' + this._cardNum);
        }
        // Generate the inner-elems div
        info.append(this._createImgElem(images));
        // Generate the first-elem div
        info.append(this._displayFirstElemValue(keys[0], 
            record[keys[0]].displayValue, this._findEmail()));
        if (keys.length < 3) {
            _.each(keys, function(key) {
                if (key !== keys[0]) { // want to omit the very first key
                    constructors[key] = ColumnTypeConstructors[record[key].fieldType];
                }
            });
        } else {
            for (var i = 1; i <= 3; i++) {
                constructors[keys[i]] = ColumnTypeConstructors[record[keys[i]].fieldType];
            }
        }
        // Append the constructed elements onto the appropriate parent elements
        info.append(this._createInnerElems(constructors));
        compactCard.append(info);
        return compactCard;

    },
    _findEmail: function() {
        var that = this;
        var record = this._record;
        var elem = $('<div/>');
        _.each(record, function(contentObject, fieldName) {
            var Constructor;
            if (contentObject.fieldType === 'email') {
                Constructor = ColumnTypeConstructors[contentObject.fieldType];
                elem = new Constructor(null, 
                    record[fieldName], that._verbose).generateElement(true);
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
        console.log('images: ', imagesArray);
        var elem = $('<img/>');
        var first = null;
        var container = $('<div/>').attr('class', 'img-elem');
        if (!imagesArray || imagesArray.length === 0) {
            this._noImage = true;
            return elem.attr('style', 'display: none;');
        } else {
            first = imagesArray[0];
            elem.attr('alt', first.filename);
            elem.attr('src', first.url);
        }
        elem.attr('style', 'width: 100%; height: 100%; border-radius: 50%');
        return container.append(elem);
    },
    _displayFirstElemValue: function(name, firstContentDisplayValue, emailElem) {
        var elem = $('<div/>').attr('class', 'first-elem');
        var firstElemName = $('<div/>').append(_.escape(firstContentDisplayValue));
        firstElemName.attr('class', 'title');
        emailElem.attr('class', 'email-header');
        if (this._noImage) { elem.attr('style', 'word-wrap: normal; width: 180px;'); }
        elem.append(firstElemName);
        elem.append(emailElem);
        return elem;
    },
    _createInnerElems: function(fieldTypeConstructors) {
        var that = this;
        var record = this._record;
        var innerElems = $('<div/>').attr('class', 'inner-elems');
        var counter = 0; // more descriptive name for counter?
        if (this._verbose) { console.log(fieldTypeConstructors, record); }
        _.each(fieldTypeConstructors, function(FieldTypeConstructor, columnName) {
            var container;
            // Construct new instance of a particular type, then 
            //  generate the appropriate element
            var elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement(true);
            if (that._verbose) { 
                console.log('Content Object: ', record[columnName]);
                console.log(elem);
            }
            // This approach is somewhat cumbersome; ideas for a better approach?...
            if (counter === 0) {
                container = $('<div/>').attr('class', 'left-elem');
                innerElems.append(container.append(elem));
            } else if (counter === 1) {
                container = $('<div/>').attr('class', 'middle-elem');
                innerElems.append(container.append(elem));
            } else if (counter === 2){
                container = $('<div/>').attr('class', 'right-elem');
                innerElems.append(container.append(elem));
            }
            innerElems.append('<br>');
            counter++;

        });
        return innerElems;
    },

});

module.exports = CompactCard;
