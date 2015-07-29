'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousLookupColumnType = root.LookupColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var moment = root.moment;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('lookup_column_type requires Underscore'); }
    }
    if (typeof moment === 'undefined') {
        if (has_require) { moment = require('moment'); }
        else { throw new Error('lookup_column_type requires the moment file'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('lookup_column_type requires the GenericColumnType file'); }
    }

    var LookupColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
            this._lookupResultType = contentObject.lookupResultType;
        },
        generateElement: function(isForCompact) {
            var that = this;
            var content = $('<div/>');
            var list = '';
            var elemNum = 0;
            var dateArray;
            var numImages;
            var images;
            var docs;
            if (this._verbose) {
                console.log('lookupResultType: ', this._lookupResultType);
            }
            if (this._lookupResultType === 'multipleAttachment') {
                numImages = this._determineNumImages(this._displayValue);
                _.each(this._displayValue, function(item) {
                    var anchor;
                    var icon;
                    var iconText;
                    var image;
                    // The case when the item is an object i.e. a document,
                    //  file or picture, etc.
                    if (typeof item === 'object') {
                        anchor = $('<a/>').attr('href', item.url);
                        if ((item.type).indexOf('image') !== -1) {
                            if (numImages > 1) {
                                image = $('<div/>').attr('class', 'img-content-grid');
                                image.css('background-image', 'url(' + item.url + ')');
                                anchor.append(image);
                            } else {
                                image = $('<img/>').attr('src', item.url);
                                image.attr('alt', item.filename);
                                anchor.append(image.attr('class', 'img-content'));
                            }
                            if (!images) { images = $('<div/>'); }
                            images.append(anchor);
                        } else {
                            iconText = '  ' + item.filename;
                            icon = $('<i/>').attr('class', 
                                'airtable-gmail-ext-icon-file-alt').text(iconText);
                            anchor.attr('title', item.filename);
                            anchor.append(icon);
                            if (!docs) { docs = $('<div/>'); }
                            docs.append(anchor);
                        }

                    } else { // Case when the column contains string/number values
                        item = _.escape(item);
                        if (elemNum === (that._displayValue.length - 1)) {
                            list += item;
                        } else {
                            list += item + ', ';
                        }
                        elemNum++;
                    }
                });
                if (list !== '') { content = list; }
            } else if (this._lookupResultType === 'date') {
                dateArray = this._displayValue.split(' ');
                if (this._verbose) {
                    console.log('days: ', dateArray[0]);
                    console.log('time: ', dateArray[1]);
                }
                content = moment(dateArray[0]).format('ll');
                if (dateArray.length > 1) {
                    content += (' ' + dateArray[1]);
                }
            } else { // case when value is text or a number
                content = this._displayValue;
            }

            if (images) { content.append(images); }
            if (docs) { content.append(docs); }

            return this._createBasicLayout(isForCompact, 
                    this._columnName, content);
        },
        _determineNumImages: function(displayValue) {
            var numImages = 0;
            _.each(displayValue, function(value) {
                if (value && typeof value.type === 'string' && 
                    (value.type).indexOf('image') === 0) {
                    numImages++;
                }
            });
            if (this._verbose) { console.log('numImages: ', numImages); }
            return numImages;
        }        
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = LookupColumnType;
        }
        exports.LookupColumnType = LookupColumnType;
    } else {
        root.LookupColumnType = LookupColumnType;
    }

}).call(this);
