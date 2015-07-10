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
        var images = null;
        var constructors = {};
        var compactCard = $('<div></div>');
        if (this._verbose) { console.log('cardNum: ', this._cardNum); }
        compactCard.attr('class', 'compact');
        if (this._cardNum !== undefined) {
            compactCard.attr('id', 'compact-' + this._cardNum);
        }

        // Create image tag and pull it from the record
        images = this._findImageAttachments(record);
        if (this._verbose) { console.log('Images Array: ', images); }
        info.append(this._createFirstElem(keys[0], record[keys[0]].displayValue));
        info.append(this._createImgElem(images));
        var key1 = keys[1]; var key2 = keys[2]; var key3 = keys[3];
        console.log(key1, key2, key3);
        // console.log(ColumnTypeConstructors[record[keys[1]].fieldType],
        //             ColumnTypeConstructors[record[keys[2]].fieldType],
        //             ColumnTypeConstructors[record[keys[3]].fieldType]);
        
        // console.log({
        //     key1: ColumnTypeConstructors[record[keys[1]].fieldType], 
        //     key2: ColumnTypeConstructors[record[keys[2]].fieldType], 
        //     key3: ColumnTypeConstructors[record[keys[3]].fieldType]
        // });

        // {
        //     key1: ColumnTypeConstructors[record[keys[1]].fieldType], 
        //     key2: ColumnTypeConstructors[record[keys[2]].fieldType], 
        //     key3: ColumnTypeConstructors[record[keys[3]].fieldType]
        // }

        constructors[key1] = ColumnTypeConstructors[record[keys[1]].fieldType];
        constructors[key2] = ColumnTypeConstructors[record[keys[2]].fieldType];
        constructors[key3] = ColumnTypeConstructors[record[keys[3]].fieldType];

        info.append(this._createInnerElems(constructors, record));

        compactCard.append(info);

        return compactCard;

    },
    _findImageAttachments: function(record) {
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
    _createFirstElem: function(name, firstContentDisplayValue) {
        var elem = $(tags.firstElem);
        elem.append('<strong>' + firstContentDisplayValue + '</strong>');
        return elem;
    },
    _createImgElem: function(imagesArray) {// eventually implement to allow for a 'slideshow'?
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
    _createInnerElems: function(fieldTypeConstructors, record) {
        var that = this;
        var innerElems = $(tags.innerElems);
        var counter = 0;
        console.log(fieldTypeConstructors, record);
        _.each(fieldTypeConstructors, function(FieldTypeConstructor, columnName) {
            console.log('This should be the content object 2.0: ', record[columnName]);
            var elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement();
            console.log(elem);
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
