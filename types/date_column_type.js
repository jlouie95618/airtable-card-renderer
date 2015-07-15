'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var DateColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var dateTime = new Date(this._displayValue);
        if (this._verbose) {
            console.log(dateTime);
            console.log(Date);
            console.log(dateTime.getUTCHours());
            console.log(dateTime.getUTCMinutes());
            console.log(dateTime.getUTCSeconds());
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, dateTime); 
    }
});

module.exports = DateColumnType;
