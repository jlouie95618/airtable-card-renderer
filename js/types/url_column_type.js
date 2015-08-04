'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousUrlColumnType = root.UrlColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('url_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('url_column_type requires the GenericColumnType file'); }
    }

    var UrlColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            var https = 'https://';
            var http = 'http://';
            var link = $('<a/>').append(this._displayValue);
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

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = UrlColumnType;
        }
        exports.UrlColumnType = UrlColumnType;
    } else {
        root.UrlColumnType = UrlColumnType;
    }

}).call(this);
