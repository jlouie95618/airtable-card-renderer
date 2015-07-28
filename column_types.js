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

    if (typeof root.AttachmentsColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'multipleAttachment': require('./types/attachments_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the AttachmentsColumnType class');
        }
    } else {
        ColumnTypeConstructors.multipleAttachment = root.AttachmentsColumnType;
    }

    if (typeof root.CheckboxColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'checkbox': require('./types/checkbox_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the CheckboxColumnType class');
        }
    } else {
        ColumnTypeConstructors.checkbox = root.CheckboxColumnType;
    }

    if (typeof root.CountColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'count': require('./types/count_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the CountColumnType class');
        }
    } else {
        ColumnTypeConstructors.count = root.CountColumnType;
    }  

    if (typeof root.CurrencyColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'currency': require('./types/currency_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the CurrencyColumnType class');
        }
    } else {
        ColumnTypeConstructors.currency = root.CurrencyColumnType;
    }

    if (typeof root.DateColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'date': require('./types/date_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the DateColumnType class');
        }
    } else {
        ColumnTypeConstructors.date = root.DateColumnType;
    }   

    if (typeof root.EmailColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'email': require('./types/email_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the EmailColumnType class');
        }
    } else {
        console.log();
        ColumnTypeConstructors.email = root.EmailColumnType;
    }   

    if (typeof root.ForeignKeyColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'foreignKey': require('./types/foreign_key_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the ForeignKeyColumnType class');
        }
    } else {
        ColumnTypeConstructors.foreignKey = root.ForeignKeyColumnType;
    }   

    if (typeof root.FormulaColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'formula': require('./types/formula_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the FormulaColumnType class');
        }
    } else {
        ColumnTypeConstructors.formula = root.FormulaColumnType;
    }   

    if (typeof root.LookupColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'lookup': require('./types/lookup_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the LookupColumnType class');
        }
    } else {
        ColumnTypeConstructors.lookup = root.LookupColumnType;
    } 

    if (typeof root.MultilineTextColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'multilineText': require('./types/multiline_text_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the MultilineTextColumnType class');
        }
    } else {
        ColumnTypeConstructors.multilineText = root.MultilineTextColumnType;
    } 

    if (typeof root.MultiselectColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'multiSelect': require('./types/multiselect_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the MultiselectColumnType class');
        }
    } else {
        ColumnTypeConstructors.multiSelect = root.MultiselectColumnType;
    } 

    if (typeof root.NumberColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'number': require('./types/number_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the NumberColumnType class');
        }
    } else {
        ColumnTypeConstructors.number = root.NumberColumnType;
    } 

    if (typeof root.PercentColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'percent': require('./types/percent_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the PercentColumnType class');
        }
    } else {
        ColumnTypeConstructors.percent = root.PercentColumnType;
    } 

    if (typeof root.PhoneColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'phone': require('./types/phone_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the PhoneColumnType class');
        }
    } else {
        ColumnTypeConstructors.phone = root.PhoneColumnType;
    }

    if (typeof root.RollupColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'rollup': require('./types/rollup_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the RollupColumnType class');
        }
    } else {
        ColumnTypeConstructors.rollup = root.RollupColumnType;
    }

    if (typeof root.SelectColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'select': require('./types/select_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the SelectColumnType class');
        }
    } else {
        ColumnTypeConstructors.select = root.SelectColumnType;
    }

    if (typeof root.TextColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'text': require('./types/text_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the TextColumnType class');
        }
    } else {
        ColumnTypeConstructors.text = root.TextColumnType;
    }

    if (typeof root.UrlColumnType === 'undefined') {
        if (has_require) {
            ColumnTypeConstructors = _.extend(ColumnTypeConstructors, { 
                'url': require('./types/url_column_type.js')
            });
        } else {
            throw new Error('ColumnTypeConstructors requires the UrlColumnType class');
        }
    } else {
        ColumnTypeConstructors.url = root.UrlColumnType;
    }


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ColumnTypeConstructors;
        }
        exports.ColumnTypeConstructors = ColumnTypeConstructors;
    } else {
        root.ColumnTypeConstructors = ColumnTypeConstructors;
    }

}).call(this);
