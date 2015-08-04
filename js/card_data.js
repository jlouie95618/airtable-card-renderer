'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var Class = require('./vendor/class.js');

var CardData = Class.extend({
    _AIRTABLE_BASE_URL: 'https://airtable.com',
    init: function(record, targetEmail, baseUrl) {
        this._record = record;
        this._targetEmail = this._findEmail(targetEmail);
        this.setFieldOrder(_.keys(this._record.fields));
        if (baseUrl) {
            this._recordUrl = baseUrl;
        } else {
            this._recordUrl = this._AIRTABLE_BASE_URL;
        }
        if (record._rawJson && record._rawJson.url) {
            this._recordUrl += record._rawJson.url;
        }

    },
    setFieldOrder: function(order) {
        console.log('order:', order);
        if (_.size(this._record.fields) == 1) {
            this._order = order;
        } else {
            this._order = _.without(order, 
                this._targetEmail);
        }
        // Because we are setting the ordering explicitly
        //  the position of the first element is implicitly
        //  set, so save that value for later use
        this._firstElem = this._record.fields[this._order[0]];
        if (_.size(this._order) > 1) {
            this._order = _.without(this._order, this._order[0]);
        }
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
        return _.find(this._record.fields, function(fieldObject) {
            return fieldObject.fieldType === 'email'; 
        });
    }
});

module.exports = CardData;
