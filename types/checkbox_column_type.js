'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var CheckboxColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function() {
        var elem = $('<p></p>');
        if (this._displayValue) {
            elem.append(this._displayValue);        
        } else {
            elem.append(this._displayValue);
        }
        return elem
    }
});

module.exports = CheckboxColumnType;
