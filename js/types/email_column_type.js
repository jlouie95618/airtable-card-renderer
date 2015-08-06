'use strict'; // indicate to use Strict Mode

var GenericColumnType = require('../generic_column_type.js');

var EmailColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var email = $('<div/>').append(this._displayValue);
        var mailToIcon = $('<div/>');
        if (typeof InboxSDK !== 'undefined') {
            mailToIcon = $(this._createEmailIcon());
            mailToIcon.click(function() { // need to have this change depending on environment!
                InboxSDK.load('1.0', that._config.productionAppId).then(function(sdk) {
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
            mailToIcon.attr('src', '../../' + this._config.mailToIcon);
        }
        return mailToIcon;
    }
});

module.exports = EmailColumnType;
