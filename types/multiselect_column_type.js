'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var MultiselectColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function() {
        var elem = $('<div></div>');
        _.each(this._displayValue, function(item) {
            elem.append(item + ", ");
        });
        return elem;
    }
});

module.exports = MultiselectColumnType;
