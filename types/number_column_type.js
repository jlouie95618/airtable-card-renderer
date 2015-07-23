'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var NumberColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        if (this._verbose) {
            console.log('Raw Number _displayValue: ', this._displayValue);
            console.log(typeof this._displayValue);
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, this._displayValue);     
    }
});

module.exports = NumberColumnType;
