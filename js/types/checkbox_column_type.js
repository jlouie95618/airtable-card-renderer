'use strict'; // indicate to use Strict Mode

var GenericColumnType = require('../generic_column_type.js'); 

var CheckboxColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var checkboxStatus;
        // Somewhat arbitrary display value for the checkbox; if
        //  a different display value is desired; please change
        if (this._displayValue) { checkboxStatus = 'Yes'; } 
        else { checkboxStatus = 'No'; }
        return this._createBasicLayout(isForCompact, 
                this._columnName, checkboxStatus);
    }
});

module.exports = CheckboxColumnType;
