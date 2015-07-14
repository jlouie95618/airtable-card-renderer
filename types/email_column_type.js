'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var EmailColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var email = $(this._tags.div).append(this._displayValue);
        var mailToIcon = $(this._tags.div);
        email.attr('id', 'email-header');
        if (this._verbose) { console.log('InboxSDK: ', InboxSDK); }
        if (InboxSDK) {
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
        var mailToIcon = $(this._tags.img);
        mailToIcon.attr('id', 'mail-to-icon');
        mailToIcon.attr('alt', 'mail to icon');
        mailToIcon.attr('src', this._config.chromeExtension + 
            chrome.runtime.id + this._config.mailToIcon);
        return mailToIcon;
    }
});

module.exports = EmailColumnType;
