'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var GenericColumnType = Class.extend({
	init: function(columnName, contentObject, verbose) {
        console.log('GenericColumnType Constructor: ', contentObject);
		this._columnName = columnName;
        this._fieldType = contentObject.fieldType;
        this._displayValue = contentObject.displayValue;
        this._verbose = verbose
	},
    generateElement: function() {
        return $('<div></div>');
    }
});

module.exports = GenericColumnType;
