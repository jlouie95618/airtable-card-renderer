'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousForeignKeyColumnType = root.ForeignKeyColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('foreign_key_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('foreign_key_column_type requires the GenericColumnType file'); }
    }

    var ForeignKeyColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            var that = this;
            var list = '';
            var elemNum = 0;
            // displayValue is stored as an Array of objects
            _.each(this._displayValue, function(item) {
                item = _.escape(item);
                if (elemNum === (that._displayValue.length - 1)) {
                    list += item;
                } else {
                    list += item + ', ';
                }
                elemNum++;
            });
            return this._createBasicLayout(isForCompact, 
                    this._columnName, list);
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ForeignKeyColumnType;
        }
        exports.ForeignKeyColumnType = ForeignKeyColumnType;
    } else {
        root.ForeignKeyColumnType = ForeignKeyColumnType;
    }

}).call(this);
