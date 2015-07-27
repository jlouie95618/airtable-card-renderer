'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousCurrencyColumnType = root.CurrencyColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('currency_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('currency_column_type requires the GenericColumnType file'); }
    }

    var CurrencyColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {

            // console.log(this._displayValue);
            // console.log(this._fieldType);
            // console.log(this._columnName);
            
            return this._createBasicLayout(isForCompact, 
                    this._columnName, '\"Currency\" support in progress'); 
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = CurrencyColumnType;
        }
        exports.CurrencyColumnType = CurrencyColumnType;
    } else {
        root.CurrencyColumnType = CurrencyColumnType;
    }

}).call(this);
