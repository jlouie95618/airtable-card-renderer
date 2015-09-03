'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var AttachmentsColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
        this._numImages = this._determineNumImages(this._displayValue);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var content = $('<div/>');
        // Refrain from defining images/docs here because
        //  we need to use 'undefined' as a flag for whether
        //  the images/docs section should be appended
        var images; // collection of anchor elements with images
        var docs; // collection of anchor elements for files/etc.
        _.each(this._displayValue, function(attachmentObject) {
            var anchor = $('<a/>').attr('href', attachmentObject.url);
            // NOTE: Rudimentary but effective check to see if a given 
            //  attachment is an image; if there is a more sophisticated way of 
            //  checking that an attachment is an image, replace this check
            if ((attachmentObject.type).indexOf('image') !== -1) {
                images = that._handleImageLookup(images, attachmentObject, anchor);
            } else {
                docs = that._handleDocumentLookup(docs, attachmentObject, anchor);
            }
        });
        if (images) { content.append(images); }
        if (docs) { content.append(docs); }
        return this._createBasicLayout(isForCompact, 
                this._columnName, content); 
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
    _handleImageLookup: function(images, item, anchor) {
        var image;
        if (this._numImages > 1) { // Tile images so that its 3 in a row
            image = $('<div/>').attr('class', 'img-content-grid');
            image.css('background-image', 'url(' + item.url + ')');
            anchor.append(image);
        } else { // only one image present, have it occupy entire sidebar width
            image = $('<img/>').attr('src', item.url);
            image.attr('alt', item.filename);
            anchor.append(image.attr('class', 'img-content'));
        }
        // If first time using this method and undefined, define
        //  images to just be a div container
        if (!images) { images = $('<div/>'); }
        images.append(anchor);
        return images;
    },
    _handleDocumentLookup: function(docs, item, anchor) {
        var iconText = '  ' + item.filename;
        var icon = $('<i/>').attr('class', 
            'airtable-gmail-ext-icon-file-alt').text(iconText);
        anchor.attr('title', item.filename);
        anchor.append(icon);
        // If first time seeing docs, initialize it
        if (!docs) { docs = $('<div/>'); }
        docs.append(anchor);     
        return docs;       
    }
});

module.exports = AttachmentsColumnType;
