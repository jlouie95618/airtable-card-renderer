'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousEmailColumnType = root.EmailColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('email_column_type requires Underscore'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('email_column_type requires the GenericColumnType file'); }
    }

    var EmailColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            var that = this;
            var email = $('<div/>').append(this._displayValue);
            var mailToIcon = $('<div/>');
            if (this._verbose && typeof InboxSDK !== 'undefined') { console.log('InboxSDK: ', InboxSDK); }
            if (typeof InboxSDK !== 'undefined') {
                mailToIcon = $(this._createEmailIcon());
                mailToIcon.click(function() { // need to have this change depending on environment!
                    InboxSDK.load('1.0', that._config.stagingAppId).then(function(sdk) {
                        sdk.Compose.openNewComposeView().then(function(composeView) {
                            composeView.setToRecipients([that._displayValue]);
                        });
                    });

                });
            }
            email.append(mailToIcon);
            return this._createBasicLayout(isForCompact, 
                    this._columnName, email);
        },
        _createEmailIcon: function() {
            var mailToIcon = $('<img>');
            mailToIcon.attr('class', 'mail-to-icon');
            mailToIcon.attr('alt', 'mail to icon');
            if (chrome.runtime) {
                mailToIcon.attr('src', this._config.chromeExtension + 
                    chrome.runtime.id + this._config.mailToIcon);
            } else {
                // Non-chrome extension version:
                mailToIcon.attr('src', '.' + this._config.mailToIcon);
            }
            return mailToIcon;
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EmailColumnType;
        }
        exports.EmailColumnType = EmailColumnType;
    } else {
        root.EmailColumnType = EmailColumnType;
    }

}).call(this);
