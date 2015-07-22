'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var LookupColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var content = $('<div/>');
        var list = '';
        var elemNum = 0;
        _.each(this._displayValue, function(item) {
            var anchor;
            var icon;
            var iconText;
            // The case when the item is an object i.e. a document,
            //  file or picture, etc.
            if (typeof item === 'object') {
                anchor = $('<a/>').attr('href', item.url);
                if ((item.type).indexOf('image') !== -1) {
                    var image = $('<img/>').attr('src', item.url);
                    image.attr('alt', item.filename);
                    anchor.append(image.attr('class', 'img-as-content'));
                } else {
                    iconText = '  ' + item.filename;
                    icon = $('<i/>').attr('class', 'icon-file-alt').text(iconText);
                    anchor.append(icon);
                }
                content.append(anchor);
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

        if (list !== '') {
            content = list;
        }

        return this._createBasicLayout(isForCompact, 
                this._columnName, content);
    }
});

module.exports = LookupColumnType;
