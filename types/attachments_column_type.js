'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var AttachmentsColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {


        console.log('Stuff for Attachments:');
        console.log(this._displayValue);
        console.log(this._fieldType);
        console.log(this._columnName);


        return this._createBasicLayout(isForCompact, 
                this._columnName, '\"Attachments\" support in progress'); 
    }
});

module.exports = AttachmentsColumnType;
