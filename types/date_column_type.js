'use strict'; // indicate to use Strict Mode

var moment = require('moment');

var GenericColumnType = require('../generic_column_type.js');

var DateColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, true);
    },
    generateElement: function(isForCompact) {
        var dateTime;
        if (this._displayValue.indexOf('T') > -1) {
            dateTime = moment(this._displayValue).format('lll');
        } else {
            dateTime = moment(this._displayValue).format('ll');
        }
        if (this._verbose) {
            console.log(moment(this._displayValue).format('lll'));
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, dateTime); 
    }
});

module.exports = DateColumnType;
