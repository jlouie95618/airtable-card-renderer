'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousCountColumnType = root.CountColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('count_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('count_column_type requires the GenericColumnType file'); }
    }

    var CountColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            return this._createBasicLayout(isForCompact, 
                    this._columnName, this._displayValue);
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = CountColumnType;
        }
        exports.CountColumnType = CountColumnType;
    } else {
        root.CountColumnType = CountColumnType;
    }

}).call(this);
