'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var moment = require('moment');

var GenericColumnType = require('../generic_column_type.js');

var LookupColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
        this._lookupResultType = contentObject.lookupResultType;
    },
    generateElement: function(isForCompact) {
        var that = this;
        var content = $('<div/>');
        var list = '';
        var elemNum = 0;
        var images;
        var docs;
        if (this._lookupResultType === 'multipleAttachment') {
            _.each(this._displayValue, function(item) {
                var anchor;
                // The case when the item is an object i.e. a document,
                //  file or picture, etc.
                if (typeof item === 'object') {
                    anchor = $('<a/>').attr('href', item.url);
                    if ((item.type).indexOf('image') !== -1) { // case where handling image
                        images = that._handleImageLookup(images, item, anchor);
                    } else { // case where item is a document
                        docs = that._handleDocumentLookup(docs, item, anchor);
                    }
                } else { // Case when the column contains string/number values
                    item = _.escape(item);
                    if (elemNum === (that._displayValue.length - 1)) {
                        list += item;
                    } else {
                        list += item + ', ';
                    }
                    elemNum++;
                }
            });
            if (list !== '') { content = list; }
        } else if (this._lookupResultType === 'date') { // case when look up field is a date
            content = this._handleDateLookup(content);
        } else { // case when value is text or a number
            content = this._displayValue;
        }
        if (images) { content.append(images); }
        if (docs) { content.append(docs); }
        return this._createBasicLayout(isForCompact, 
                this._columnName, content);
    },
    _handleImageLookup: function(images, item, anchor) {
        var image;
        var numImages = this._determineNumImages(this._displayValue);
        if (numImages > 1) {
            image = $('<div/>').attr('class', 'img-content-grid');
            image.css('background-image', 'url(' + item.url + ')');
            anchor.append(image);
        } else {
            image = $('<img/>').attr('src', item.url);
            image.attr('alt', item.filename);
            anchor.append(image.attr('class', 'img-content'));
        }
        if (!images) { images = $('<div/>'); }
        images.append(anchor);
        return images;
    },
    _determineNumImages: function(displayValue) {
        var numImages = 0;
        _.each(displayValue, function(value) {
            if (value && typeof value.type === 'string' && 
                (value.type).indexOf('image') === 0) {
                numImages++;
            }
        });
        return numImages;
    },
    _handleDocumentLookup: function(docs, item, anchor) {
        var iconText = '  ' + item.filename;
        var icon = $('<i/>').attr('class', 
            'airtable-gmail-ext-icon-file-alt').text(iconText);
        anchor.attr('title', item.filename);
        anchor.append(icon);
        if (!docs) { docs = $('<div/>'); }
        docs.append(anchor);     
        return docs;       
    },
    _handleDateLookup: function(content) {
        var dateArray = this._displayValue.split(' ');
        content = moment(dateArray[0]).format('ll');
        if (dateArray.length > 1) {
            content += (' ' + dateArray[1]);
        }
        return content;
    }
});

module.exports = LookupColumnType;
