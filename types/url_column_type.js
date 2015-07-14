'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var UrlColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var https = 'https://';
        var http = 'http://';
        var link = $(this._tags.a).append(this._displayValue);
        if (this._displayValue.indexOf(https) === 0 ||
            this._displayValue.indexOf(http) === 0) {
            link.attr('href', this._displayValue);
        } else {
            link.attr('href', https + this._displayValue);
        }
        return this._createBasicLayout(isForCompact, 
                this._columnName, link);
    }
});

module.exports = UrlColumnType;
