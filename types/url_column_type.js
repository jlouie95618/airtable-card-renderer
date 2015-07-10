'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var UrlColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var elem;
        var https = 'https://';
        var link = $('<a></a>').append(this._displayValue);
        if (this._displayValue.indexOf(https) === 0) {
            link.attr('href', this._displayValue);
        } else {
            link.attr('href', https + this._displayValue);
        }
        if (isForCompact) {
            elem = $('<div></div>');
            elem.append($('<strong></strong>').append(this._columnName));
            elem.append($('<div></div>').append(link));
        } else {
            elem = $('<dl></dl>');
            elem.append($('<dt></dt>').append(this._columnName));
            elem.append($('<dd></dd>').append(link));        
        }
        return elem;
    }
});

module.exports = UrlColumnType;
