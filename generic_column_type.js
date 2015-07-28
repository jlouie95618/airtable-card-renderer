'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousGenericColumnType = root.GenericColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var Class = root.Class;
    var config = root.config;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('generic_column_type requires Underscore'); }
    }
    if (typeof Class === 'undefined') {
        if (has_require) { Class = require('./vendor/class.js'); }
        else { throw new Error('generic_column_type requires the Class file'); }
    }
    if (typeof config === 'undefined') {
        if (has_require) { config = require('./config.js'); }
        else { throw new Error('generic_column_type requires the config file'); }
    }

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
            this._config = config;
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
            var columnName = $('<div/>').append(name.toUpperCase()).attr('class', 'element-name');
            var columnContent = $('<div/>').append(content).attr('class', 'element-content');
            elem.append(columnName);
            elem.append(columnContent);
            return elem;
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = GenericColumnType;
        }
        exports.GenericColumnType = GenericColumnType;
    } else {
        root.GenericColumnType = GenericColumnType;
    }

}).call(this);