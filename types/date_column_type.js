'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var moment = require('moment');

var GenericColumnType = require('../generic_column_type.js');

var DateColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var dateTime;
        if (this._displayValue.indexOf('T') > -1) {
            dateTime = moment(this._displayValue).format('lll');
        } else {
            dateTime = moment(this._displayValue).format('ll');
        }
        console.log(moment(this._displayValue).format('lll'));
        if (this._verbose) {
            console.log(dateTime);
            console.log(Date);
            console.log('UTC Versions');
            console.log(dateTime.getUTCDate());
            console.log(dateTime.getUTCFullYear());
            console.log(dateTime.getUTCMonth());
            console.log(dateTime.getUTCDay());
            console.log(dateTime.getUTCHours());
            console.log(dateTime.getUTCMinutes());
            console.log(dateTime.getUTCSeconds());
            console.log('Non-UTC Versions');
            console.log(dateTime.getDate());
            console.log(dateTime.getFullYear());
            console.log(dateTime.getMonth());
            console.log(dateTime.getDay());
            console.log(dateTime.getHours());
            console.log(dateTime.getMinutes());
            console.log(dateTime.getSeconds());
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, dateTime); 
    }
});

module.exports = DateColumnType;
