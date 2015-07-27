'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousNumberColumnType = root.NumberColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('number_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('number_column_type requires the GenericColumnType file'); }
    }

    var NumberColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            if (this._verbose) {
                console.log('Raw Number _displayValue: ', this._displayValue);
                console.log(typeof this._displayValue);
            }
            return this._createBasicLayout(isForCompact, 
                    this._columnName, this._displayValue);     
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = NumberColumnType;
        }
        exports.NumberColumnType = NumberColumnType;
    } else {
        root.NumberColumnType = NumberColumnType;
    }

}).call(this);
