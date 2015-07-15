'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var GenericColumnType = Class.extend({
	init: function(columnName, contentObject, verbose) {
        // Escape inputted information so that the person
        //  cannot mess with the Javascript on the page
		this._columnName = _.escape(columnName);
        this._fieldType = _.escape(contentObject.fieldType);
        // If the displayValue is an array of things like
        //  attachments or multiselect options, we don't
        //  want to get rid of the 'array/object' structure
        if (typeof contentObject.displayValue === 'object') {
            this._displayValue = contentObject.displayValue;
        } else {
            this._displayValue = _.escape(contentObject.displayValue);
        }
        this._config = require('./config.js');
        this._verbose = verbose;
        if (this._verbose) { 
            console.log('GenericColumnType Constructor: ', contentObject);
        }
	},
    generateElement: function() {
        return $('<div/>');
    },
    _createBasicLayout: function(isForCompact, name, content) {
        var elem = $('<div/>');
        var columnName = $('<div/>').append(name).attr('class', 'column-name');
        var columnContent = $('<div/>').append(content).attr('class', 'column-content');
        elem.append(columnName);
        elem.append(columnContent);
        return elem;
    }
});

module.exports = GenericColumnType;
