'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var MultiselectColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var list = '';
        var elemNum = 0;
        // displayValue is stored as an Array of objects
        _.each(this._displayValue, function(item) {
            item = _.escape(item);
            if (elemNum === (that._displayValue.length - 1)) {
                list += item;
            } else {
                list += item + ', ';
            }
            elemNum++;
        });
        return this._createBasicLayout(isForCompact, 
                this._columnName, list);
    }
});

module.exports = MultiselectColumnType;
