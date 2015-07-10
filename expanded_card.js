'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var Class = require('./vendor/class.js');

var config = require('./config.js');
var tags = require('./tags.js');

var ExpandedCard = Class.extend({
    init: function(record, cardNum, verbose) {
        this._record = record;
        this._cardNum = cardNum;
        this._verbose = verbose;
    },
    // Expanded Card - will eventually be its own subclass
    generateCard: function() {
        var info = $(tags.infoTag);
        var expandedCard = $('<div></div>');
        expandedCard.attr('class', 'expanded');
        if (this._cardNum !== undefined) {
            expandedCard.attr('id', 'expanded-' + this._cardNum);
        }

        expandedCard.append(info).hide();
        return expandedCard;

        // Code to consider using...
        // _.each(content, function(FieldTypeConstructor, columnName) {
        //     var elem = new FieldTypeConstructor(columnName, 
        //         record[columnName], this._verbose);
        //     innerElems.append($(tags.leftElem).append(elem));
        // });




    },
});

module.exports = ExpandedCard;
