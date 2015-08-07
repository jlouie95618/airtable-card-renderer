'use strict'; // indicate to use Strict Mode

var GenericColumnType = require('../generic_column_type.js');

var FormulaColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        console.log('contentObject', contentObject);
        console.log('typeof contentObject.displayValue', typeof contentObject.displayValue);
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        console.log('typeof this._displayValue', typeof this._displayValue);
        console.log(this._displayValue);
        return this._createBasicLayout(isForCompact, 
                this._columnName, this._displayValue);  
    }
});

module.exports = FormulaColumnType;
