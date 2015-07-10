'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var ColumnTypeConstructors = require('./column_types.js');
var config = require('./config.js');
var tags = require('./tags.js');

var ExpandedCard = Class.extend({
    init: function(record, cardNum, style, verbose) {
        this._record = record;
        this._cardNum = cardNum;
        this._style = style;
        this._verbose = verbose;
    },
    // Expanded Card - will eventually be its own subclass
    generateCard: function() {
        var expandedCard = $('<div></div>');
        expandedCard.attr('class', 'expanded');
        // Create id to uniquely identify this particular card
        if (this._cardNum !== undefined) {
            expandedCard.attr('id', 'expanded-' + this._cardNum);
        }
        expandedCard.append(this._fillCardWithRecord()).hide();
        return expandedCard;

        // Code to consider using...
        // _.each(content, function(FieldTypeConstructor, columnName) {
        //     var elem = new FieldTypeConstructor(columnName, 
        //         record[columnName], this._verbose);
        //     innerElems.append($(tags.leftElem).append(elem));
        // });
    },

    _fillCardWithRecord: function() {
        var that = this;
        var record = this._record;
        var constructors = {};
        var keys = _.keys(this._record);
        var info = $(tags.infoTag);
        _.each(keys, function(key) {
            constructors[key] = ColumnTypeConstructors[record[key].fieldType];
        });
        _.each(constructors, function(FieldTypeConstructor, columnName) {
            if (that._verbose) { 
                console.log('Expanded Content Object: ', record[columnName]);
            }
            var elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement();
            if (that._verbose) { console.log(elem); }
            info.append($('<div id=\"element\"></div>').append(elem));
        });
        return info;
    }


});

module.exports = ExpandedCard;
