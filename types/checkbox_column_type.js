'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousCheckboxColumnType = root.CheckboxColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('checkbox_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('checkbox_column_type requires the GenericColumnType file'); }
    }

    var CheckboxColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            var checkboxStatus;
            if (this._displayValue) {
                checkboxStatus = 'Yes';
            } else {
                checkboxStatus = 'No';
            }
            return this._createBasicLayout(isForCompact, 
                    this._columnName, checkboxStatus);
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = CheckboxColumnType;
        }
        exports.CheckboxColumnType = CheckboxColumnType;
    } else {
        root.CheckboxColumnType = CheckboxColumnType;
    }

}).call(this);
