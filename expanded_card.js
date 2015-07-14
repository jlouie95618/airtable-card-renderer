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
        var expandedCard = $(tags.div);
        expandedCard.attr('class', 'expanded');
        // Create id to uniquely identify this particular card
        if (this._cardNum !== undefined) {
            expandedCard.attr('id', 'expanded-' + this._cardNum);
        }
        expandedCard.append(this._fillCardWithRecord()).hide();
        return expandedCard;
    },

    _fillCardWithRecord: function() {
        var that = this;
        var record = this._record;
        var constructors = {};
        var keys = _.keys(this._record);
        var info = $(tags.div).attr('id', 'info');
        _.each(keys, function(key) {
            constructors[key] = ColumnTypeConstructors[record[key].fieldType];
        });
        _.each(constructors, function(FieldTypeConstructor, columnName) {
            var elem;
            var container;
            if (that._verbose) { 
                console.log('Expanded Content Object: ', record[columnName]);
            }
            elem = new FieldTypeConstructor(columnName, 
                record[columnName], that._verbose).generateElement();
            if (that._verbose) { console.log(elem); }
            container = $(tags.div).attr('id', 'element');
            info.append(container.append(elem));
        });
        return info;
    }


});

module.exports = ExpandedCard;
