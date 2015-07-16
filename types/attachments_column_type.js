'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var AttachmentsColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {

        if (this._verbose) {
            console.log('Stuff for Attachments:');
            console.log(this._displayValue); // array of attachment objects
            console.log(this._fieldType); // fieldType
            console.log(this._columnName); // Column Name i.e. Documents, Pictures, etc.
        }

        return this._createBasicLayout(isForCompact, 
                this._columnName, '\"Attachments\" support in progress'); 
    }
});

module.exports = AttachmentsColumnType;
