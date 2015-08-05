'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var Class = require('./vendor/class.js');

var CardData = Class.extend({
    _AIRTABLE_BASE_URL: 'https://airtable.com',
    init: function(record, targetEmail, baseUrl, order) {
        this._record = record;
        this._baseUrl = baseUrl;
        this._targetEmail = this._findEmail(targetEmail);
        if (order) {
            this.setFieldOrder(order);
        } else {
            this.setFieldOrder(_.keys(this._record.fields));
        }
        if (baseUrl) {
            this._recordUrl = baseUrl;
        } else {
            this._recordUrl = this._AIRTABLE_BASE_URL;
        }
        if (record._rawJson && record._rawJson.url) {
            this._recordUrl += record._rawJson.url;
        }

    },
    toJson: function() {
        return JSON.stringify(this);  
    },
    setFieldOrder: function(order) {
        if (_.size(this._record.fields) === 1) {
            this._order = order;
        } else {
            var temp = this._findColumnName(this._targetEmail);
            this._order = _.without(order, temp);
        }
    },
    setFirstElem: function(elem) {
        if (elem) {
            this._firstElem = elem;
        } else {
            this._firstElem = this._record.fields[this._order[0]];
            if (_.size(this._order) > 1) {
                this._order = _.without(this._order, this._order[0]);
            }
        }
    },
    _findColumnName: function(targetEmail) {
        var fields = this._record.fields;
        var keys = _.keys(this._record.fields);
        return _.find(keys, function(key) {
            return fields[key].displayValue === targetEmail;
        });
    },
    getFirstElem: function() {
        return this._firstElem;
    },
    getFields: function() {
        return this._record.fields;
    },
    getFieldOrder: function() {
        return this._order;
    },
    getTargetEmail: function() {
        return this._targetEmail;
    },
    getRecordUrl: function() {
        return this._recordUrl;
    },
    _findEmail: function(targetEmail) {
        if (targetEmail) { return targetEmail }
        var result;
        var emailObject = _.find(this._record.fields, function(fieldObject) {
            return fieldObject.fieldType === 'email'; 
        });
        if (emailObject) {
            result = emailObject.displayValue;
        }
        return result;
    }
});

CardData.fromJson = function(jsonString) {
    var preCardData = JSON.parse(jsonString);
    var cardData = new CardData(preCardData._record, 
        preCardData._targetEmail, preCardData._baseUrl, 
        preCardData._order);
    cardData.setFirstElem(preCardData._firstElem);

    return cardData;
}

module.exports = CardData;
