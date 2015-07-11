'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var FormulaColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        return this._createBasicLayout(isForCompact, 
                this._columnName, '\"Formula\" support in progress');  
    }
});

module.exports = FormulaColumnType;
