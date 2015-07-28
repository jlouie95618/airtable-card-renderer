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
        },
        generateElement: function(isForCompact) {
            var content = $('<div/>');
            _.each(this._displayValue, function(attachmentObject) {
                var anchor = $('<a/>').attr('href', attachmentObject.url);
                var icon;
                var iconText;
                if ((attachmentObject.type).indexOf('image') !== -1) {
                    var image = $('<img/>').attr('src', attachmentObject.url);
                    image.attr('alt', attachmentObject.filename + ' ');
                    anchor.append(image.attr('class', 'img-content'));
                } else {
                    iconText = '  ' + attachmentObject.filename;
                    icon = $('<i/>').attr('class', 
                        'airtable-gmail-ext-icon-file-alt').text(iconText);
                    anchor.append(icon);
                }
                content.append($('<div/>').append(anchor));
            });

            return this._createBasicLayout(isForCompact, 
                    this._columnName, content); 
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
