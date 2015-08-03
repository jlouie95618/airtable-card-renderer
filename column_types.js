'use strict';

var ColumnTypeConstructors = {
    'multipleAttachment': require('./types/attachments_column_type.js'),
    'checkbox': require('./types/checkbox_column_type.js'),
    'count': require('./types/count_column_type.js'),    
    'currency': require('./types/currency_column_type.js'),
    'date': require('./types/date_column_type.js'),
    'datetime': require('./types/date_column_type.js'),
    'email': require('./types/email_column_type.js'),
    'foreignKey': require('./types/foreign_key_column_type.js'),
    'formula': require('./types/formula_column_type.js'),
    'lookup': require('./types/lookup_column_type.js'),
    'multilineText': require('./types/multiline_text_column_type.js'),
    'multiSelect': require('./types/multiselect_column_type.js'),
    'number': require('./types/number_column_type.js'),
    'percent': require('./types/percent_column_type.js'),
    'phone': require('./types/phone_column_type.js'),
    'rollup': require('./types/rollup_column_type.js'),
    'select': require('./types/select_column_type.js'),
    'text': require('./types/text_column_type.js'),
    'url': require('./types/url_column_type.js')
};

module.exports = ColumnTypeConstructors;
