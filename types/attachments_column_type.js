'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var AttachmentsColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var content = $('<div/>');
        _.each(this._displayValue, function(attachmentObject) {
            var anchor = $('<a/>').attr('href', attachmentObject.url);
            if ((attachmentObject.type).indexOf('image') !== -1) {
                var image = $('<img/>').attr('src', attachmentObject.url);
                image.attr('alt', attachmentObject.filename);
                anchor.append(image.attr('class', 'img-as-content'));
            } else {
                anchor.text(attachmentObject.filename);
            }
            content.append(anchor);
        });

        return this._createBasicLayout(isForCompact, 
                this._columnName, content); 
    }
});

module.exports = AttachmentsColumnType;
