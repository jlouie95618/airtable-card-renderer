'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var MultilineTextColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var elem;
        var boldedColumnName = $('<strong></strong>').append(this._columnName);
        if (isForCompact) {
            elem = $('<div></div>');
            elem.append($('<strong></strong>').append(this._columnName));
            elem.append($('<div></div>').append(this._displayValue));
        } else {
            elem = $('<dl></dl>');
            elem.append($('<dt></dt>').append(this._columnName));
            elem.append($('<dd></dd>').append(this._displayValue));        
        }
        return elem;
    }
});

module.exports = MultilineTextColumnType;
