'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var MultiselectColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var elem;
        var list = "";
        var elemNum = 0;
        var boldedColumnName = $('<strong></strong>').append(this._columnName);
        // displayValue is stored as an Array of objects
        _.each(this._displayValue, function(item) {
            item = _.escape(item);
            if (elemNum === (that._displayValue.length - 1)) {
                list += item;
            } else {
                list += item + ', ';
            }
            elemNum++;
        });

        if (isForCompact) {
            elem = $('<div></div>');
            elem.append($('<strong></strong>').append(this._columnName));
            elem.append($('<div></div>').append(list));
        } else {
            elem = $('<dl></dl>');
            elem.append($('<dt></dt>').append(this._columnName));
            elem.append($('<dd></dd>').append(list));
        }
        return elem;
    }
});

module.exports = MultiselectColumnType;
