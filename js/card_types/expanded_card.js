'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousExpandedCard = root.ExpandedCard;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var Class = root.Class;
    var ColumnTypeConstructors = root.ColumnTypeConstructors;
    var config = root.config;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('expanded_card requires Underscore'); }
    }

    if (typeof Class === 'undefined') {
        if (has_require) { Class = require('../vendor/class.js'); }
        else { throw new Error('expanded_card requires the Class file'); }
    }

    if (typeof ColumnTypeConstructors === 'undefined') {
        if (has_require) { ColumnTypeConstructors = require('../column_types.js'); }
        else { throw new Error('expanded_card requires the ColumnTypeConstructors file'); }
    }

    if (typeof config === 'undefined') {
        if (has_require) { config = require('../config.js'); }
        else { throw new Error('expanded_card requires the config file'); }
    }

    var ExpandedCard = Class.extend({
        init: function(record, cardNum, style, verbose) {
            this._record = record;
            this._cardNum = cardNum;
            this._style = style;
            this._verbose = verbose;
        },
        // Expanded Card - will eventually be its own subclass
        generateCard: function() {
            var expandedCard = $('<div/>');
            expandedCard.attr('class', 'expanded');
            // Create id to uniquely identify this particular card
            if (this._cardNum !== undefined) {
                expandedCard.attr('class', 'expanded-' + this._cardNum);
            }
            expandedCard.append(this._fillCardWithRecord()).hide();
            return expandedCard;
        },
        _fillCardWithRecord: function() {
            var that = this;
            var record = this._record;
            var constructors = {};
            var keys = _.keys(this._record);
            var info = $('<div/>').attr('class', 'info');
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
                container = $('<div/>').attr('class', 'element');
                info.append(container.append(elem));
            });
            return info;
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ExpandedCard;
        }
        exports.ExpandedCard = ExpandedCard;
    } else {
        root.ExpandedCard = ExpandedCard;
    }

}).call(this);
