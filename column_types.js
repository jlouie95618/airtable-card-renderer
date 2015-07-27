'use strict';

(function () {

    var root = this;
    var previousColumnTypeConstructors = root.ColumnTypeConstructors;

    var has_require = typeof require !== 'undefined';

    var ColumnTypeConstructors = {
        'multipleAttachment': addToExportsOrRoot(root, 'AttachmentsColumnType', 
            has_require, './types/attachments_column_type.js'),
        'checkbox': addToExportsOrRoot(root, 'CheckboxColumnType', 
            has_require, './types/checkbox_column_type.js'),
        'count': addToExportsOrRoot(root, 'CountColumnType', 
            has_require, './types/count_column_type.js'),    
        'currency': addToExportsOrRoot(root, 'CurrencyColumnType', 
            has_require, './types/currency_column_type.js'),
        'date': addToExportsOrRoot(root, 'DateColumnType', 
            has_require, './types/date_column_type.js'),
        'email': addToExportsOrRoot(root, 'EmailColumnType', 
            has_require, './types/email_column_type.js'),
        'foreignKey': addToExportsOrRoot(root, 'ForeignKeyColumnType', 
            has_require, './types/foreign_key_column_type.js'),
        'formula': addToExportsOrRoot(root, 'FormulaColumnType', 
            has_require, './types/formula_column_type.js'),
        'lookup': addToExportsOrRoot(root, 'LookupColumnType', 
            has_require, './types/lookup_column_type.js'),
        'multilineText': addToExportsOrRoot(root, 'MultilineTextColumnType', 
            has_require, './types/multiline_text_column_type.js'),
        'multiSelect': addToExportsOrRoot(root, 'MultiselectColumnType', 
            has_require, './types/multiselect_column_type.js'),
        'number': addToExportsOrRoot(root, 'NumberColumnType', 
            has_require, './types/number_column_type.js'),
        'percent': addToExportsOrRoot(root, 'PercentColumnType', 
            has_require, './types/percent_column_type.js'),
        'phone': addToExportsOrRoot(root, 'PhoneColumnType', 
            has_require, './types/phone_column_type.js'),
        'rollup': addToExportsOrRoot(root, 'RollupColumnType', 
            has_require, './types/rollup_column_type.js'),
        'select': addToExportsOrRoot(root, 'SelectColumnType', 
            has_require, './types/select_column_type.js'),
        'text': addToExportsOrRoot(root, 'TextColumnType', 
            has_require, './types/text_column_type.js'),
        'url': addToExportsOrRoot(root, 'UrlColumnType', 
            has_require, './types/url_column_type.js')
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ColumnTypeConstructors;
        }
        exports.ColumnTypeConstructors = ColumnTypeConstructors;
    } else {
        root.ColumnTypeConstructors = ColumnTypeConstructors;
    }

}).call(this);




function addToExportsOrRoot (root, moduleStr, has_require, path) {
    console.log(moduleStr);
    console.log(path);
    var errorMessage = 'ColumnTypeConstructors requires the ' + moduleStr + ' class';
    if (typeof root[moduleStr] === 'undefined') {
        if (has_require) { return require(path); }
        else { throw new Error(errorMessage); }
    } else {
        return root[moduleStr];
    }
}