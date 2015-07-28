'use strict';

(function () {

    var root = this;
    var previousColumnTypeConstructors = root.ColumnTypeConstructors;

    var has_require = typeof require !== 'undefined';

    var _ = root._;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('column_types requires Underscore'); }
    }

    var ColumnTypeConstructors = {};

    var requireTypes = {
        'multipleAttachment': { 
            'multipleAttachment': require('./types/attachments_column_type.js')
        },
        'checkbox': {
            'checkbox': require('./types/checkbox_column_type.js')
        },
        'count': { 
            'count': require('./types/count_column_type.js')
        },
        'currency': { 
            'currency': require('./types/currency_column_type.js')
        },
        'date': { 
            'date': require('./types/date_column_type.js')
        },
        'email': { 
            'email': require('./types/email_column_type.js')
        },
        'foreignKey': { 
            'foreignKey': require('./types/foreign_key_column_type.js')
        },
        'formula': { 
            'formula': require('./types/formula_column_type.js')
        },
        'lookup': { 
            'lookup': require('./types/lookup_column_type.js')
        },
        'multilineText': { 
            'multilineText': require('./types/multiline_text_column_type.js')
        },
        'multiSelect': { 
            'multiSelect': require('./types/multiselect_column_type.js')
        },
        'number': { 
            'number': require('./types/number_column_type.js')
        },
        'percent': { 
            'percent': require('./types/percent_column_type.js')
        },
        'phone': { 
            'phone': require('./types/phone_column_type.js')
        },
        'rollup': { 
            'rollup': require('./types/rollup_column_type.js')
        },
        'select': { 
            'select': require('./types/select_column_type.js')
        },
        'text': { 
            'text': require('./types/text_column_type.js')
        },
        'url': { 
            'url': require('./types/url_column_type.js')
        }
    };

    var classToFieldType = {
        'multipleAttachment': 'AttachmentsColumnType',
        'checkbox': 'CheckboxColumnType',
        'count': 'CountColumnType',
        'currency': 'CurrencyColumnType',
        'date': 'DateColumnType',
        'email': 'EmailColumnType',
        'foreignKey': 'ForeignKeyColumnType',
        'formula': 'FormulaColumnType',
        'lookup': 'LookupColumnType',
        'multilineText': 'MultilineTextColumnType',
        'multiSelect': 'MultiselectColumnType',
        'number': 'NumberColumnType',
        'percent': 'PercentColumnType',
        'phone': 'PhoneColumnType',
        'rollup': 'RollupColumnType',
        'select': 'SelectColumnType',
        'text': 'TextColumnType',
        'url': 'UrlColumnType'
    };

    _.each(requireTypes, function(requireObject, key) {
        var className = classToFieldType[key];
        if (typeof root[className] === 'undefined') {
            if (has_require) {
                ColumnTypeConstructors = _.extend(ColumnTypeConstructors, requireObject);
            } else {
                throw new Error('ColumnTypeConstructors requires the ' + className + ' class');
            }
        } else {
            ColumnTypeConstructors[key] = root[className];
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ColumnTypeConstructors;
        }
        exports.ColumnTypeConstructors = ColumnTypeConstructors;
    } else {
        root.ColumnTypeConstructors = ColumnTypeConstructors;
    }

}).call(this);
