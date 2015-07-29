'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousAttachmentsColumnType = root.AttachmentsColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('attachments_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('attachments_column_type requires the GenericColumnType file'); }
    }

    var AttachmentsColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
            this._numImages = this._determineNumImages(contentObject.displayValue);
        },
        generateElement: function(isForCompact) {
            var that = this;
            var content = $('<div/>');
            var images;
            var docs;
            _.each(this._displayValue, function(attachmentObject) {
                var anchor = $('<a/>').attr('href', attachmentObject.url);
                var icon;
                var iconText;
                var image;
                if ((attachmentObject.type).indexOf('image') !== -1) {
                    if (that._numImages > 1) {
                        image = $('<div/>').attr('class', 'img-content-grid');
                        image.css('background-image', 
                            'url(' + attachmentObject.url + ')');
                        anchor.append(image);
                    } else {
                        image = $('<img/>').attr('src', attachmentObject.url);
                        image.attr('alt', attachmentObject.filename);
                        anchor.append(image.attr('class', 'img-content'));
                    }
                    if (!images) { images = $('<div/>'); }
                    images.append(anchor);

                } else {
                    iconText = '  ' + attachmentObject.filename;
                    icon = $('<i/>').attr('class', 
                        'airtable-gmail-ext-icon-file-alt').text(iconText);
                    anchor.append(icon);
                    if (!docs) { docs = $('<div/>'); }
                    docs.append(anchor);
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
            if (this._verbose) { console.log('numImages: ', numImages); }
            return numImages;
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = AttachmentsColumnType;
        }
        exports.AttachmentsColumnType = AttachmentsColumnType;
    } else {
        root.AttachmentsColumnType = AttachmentsColumnType;
    }

}).call(this);
