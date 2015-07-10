'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var TextColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var elem;
        var boldedColumnName = $('<strong></strong>').append(this._columnName);
        if (isForCompact) {
            elem = $('<div></div>');
            elem.append(boldedColumnName);
            elem.append($('<div></div>').append(this._displayValue));
        } else {
            elem = $('<dl></dl>');
            elem.append($('<dt></dt>').append(boldedColumnName));
            elem.append($('<dd></dd>').append(this._displayValue));
        }
        return elem;
    }
});

module.exports = TextColumnType;
