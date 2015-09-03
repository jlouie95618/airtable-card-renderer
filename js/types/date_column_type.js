'use strict'; // indicate to use Strict Mode

var moment = require('moment');

var GenericColumnType = require('../generic_column_type.js');

var DateColumnType = GenericColumnType.extend({
    _MONTHS_OF_THE_YEAR: { 
        1: 'Jan', 2: 'Feb', 3: 'Mar',
        4: 'Apr', 5: 'May', 6: 'Jun',
        7: 'Jul', 8: 'Aug', 9: 'Sep',
        10: 'Oct', 11: 'Nov', 12: 'Dec',
    },
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var dateTime;
        var utcDate;
        var temp;
        if (this._fieldType === 'datetime') {
            dateTime = moment(this._displayValue).format('lll');
        } else if (this._fieldType === 'date') {
            dateTime = moment(this._displayValue).format('ll');
        } else if (this._fieldType === 'datetimeUTC') {
            utcDate = new Date(this._displayValue);
            temp = this._MONTHS_OF_THE_YEAR[utcDate.getUTCMonth() + 1] + 
                ' ' + utcDate.getUTCDate() + ', ' + utcDate.getUTCFullYear();
            temp += ' ' + utcDate.getUTCHours() + ':' + utcDate.getUTCMinutes();
            dateTime = temp;
        } else {
            utcDate = this._displayValue.split('-');
            temp = new Date(utcDate[0], utcDate[1], utcDate[2]);
            dateTime = this._MONTHS_OF_THE_YEAR[temp.getUTCMonth()] + 
                ' ' + temp.getUTCDate() + ', ' + temp.getUTCFullYear();
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, dateTime); 
    }
});

module.exports = DateColumnType;
