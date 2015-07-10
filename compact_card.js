'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var ColumnTypeConstructors = require('./column_types.js');
var config = require('./config.js');
var tags = require('./tags.js');

var CompactCard = Class.extend({
    init: function(record, cardNum, verbose) {
        this._record = record;
        this._cardNum = cardNum;
        this._verbose = verbose;
    },
    // Compact Card - will eventually be its own subclass
    generateCard: function() {
        var record = this._record;
        var info = $(tags.infoTag);
        var keys = _.keys(record);
        // Create image tag and pull it from the record
        var images = this._findImageAttachments();
        var constructors = {};
        var compactCard = $('<div></div>');
        if (this._verbose) { console.log('cardNum: ', this._cardNum); }
        if (this._verbose) { console.log('Images Array: ', images); }
        compactCard.attr('class', 'compact');
        // Create id to uniquely identify this particular card
        if (this._cardNum !== undefined) {
            compactCard.attr('id', 'compact-' + this._cardNum);
        }
        // Generate the first-elem div
        info.append(this._displayFirstElemValue(keys[0], record[keys[0]].displayValue));
        // Generate the middle-elem div
        info.append(this._createImgElem(images));
        constructors[keys[1]] = ColumnTypeConstructors[record[keys[1]].fieldType];
        constructors[keys[2]] = ColumnTypeConstructors[record[keys[2]].fieldType];
        constructors[keys[3]] = ColumnTypeConstructors[record[keys[3]].fieldType];
        info.append(this._createInnerElems(constructors));

        compactCard.append(info);

        return compactCard;

    },
    _findImageAttachments: function() {
        var record = this._record;
        var that = this;
        var type = 'image'
        var images = []; // will become an array of objects
        _.each(record, function(contentObject, fieldName) {
            if (contentObject.fieldType === 'multipleAttachment') {
                var attachmentArray = contentObject.displayValue;
                _.each(attachmentArray, function(attachmentObject, index) {
                    if (attachmentObject.type.indexOf(type) === 0) {
                        attachmentObject.fieldName = fieldName;
                        images.push(attachmentObject);
                        delete attachmentArray[index];
                    } 
                });
            }
        });
        return images;
    },
    _displayFirstElemValue: function(name, firstContentDisplayValue) {
        var elem = $(tags.firstElem);
        elem.append('<strong>' + firstContentDisplayValue + '</strong>');
        return elem;
    },
    // eventually implement to allow for a 'slideshow'?
    _createImgElem: function(imagesArray) {
        var elem = $('<img>');
        var first = null;
        elem.attr('id', 'img-elem');
        if (!imagesArray || imagesArray.length === 0) {
            elem.attr('alt', config.icon);
            elem.attr('src', config.chromeExtension + chrome.runtime.id + config.icon);
        } else {
            first = imagesArray[0];
            elem.attr('alt', first.filename);
            elem.attr('src', first.url);
        }
        return elem;
    },
    _createInnerElems: function(fieldTypeConstructors) {
        var that = this;
        var record = this._record;
        var innerElems = $(tags.innerElems);
        var counter = 0; // more descriptive name for counter?
        if (this._verbose) { console.log(fieldTypeConstructors, record); }
        _.each(fieldTypeConstructors, function(FieldTypeConstructor, columnName) {
            if (that._verbose) { 
                console.log('Content Object: ', record[columnName]);
            }
            // Construct new instance of a particular type, then 
            //  generate the appropriate element
            var elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement();
            if (that._verbose) { console.log(elem); }
            if (counter === 0) {
                innerElems.append($(tags.leftElem).append(elem));
            } else if (counter === 1) {
                innerElems.append($(tags.middleElem).append(elem));
            } else {
                innerElems.append($(tags.rightElem).append(elem));
            }
            counter++;

        });

        return innerElems;
    },

});

module.exports = CompactCard;
