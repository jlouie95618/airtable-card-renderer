'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var ForeignKeyColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var elem = $('<div>Foreign Key</div>');
        return elem;
    }
});

module.exports = ForeignKeyColumnType;
