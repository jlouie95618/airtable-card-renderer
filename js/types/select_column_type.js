'use strict'; // indicate to use Strict Mode

var GenericColumnType = require('../generic_column_type.js');

var SelectColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        return this._createBasicLayout(isForCompact, 
                this._columnName, this._displayValue);        
    }
});

module.exports = SelectColumnType;
