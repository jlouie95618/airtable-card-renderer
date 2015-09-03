'use strict';

var config = {
    productionAppId: 'sdk_airtable-ch-ext_5ca3d8a66b',
    stagingAppId: 'sdk_airtable-ch-sta_3816999c84',
    developmentAppId: 'sdk_airtable-ch-dev_d41135c420', 
    chromeExtension: 'chrome-extension://',
    defaultStyling: 'https://s3-us-west-1.amazonaws.com/airtable-gmail-chrome-extension/production-remote/css/default.css',//'css/default.css', // switch back to default once done testing '/css/sidebar_style.css',//
    compactStyling: 'https://s3-us-west-1.amazonaws.com/airtable-gmail-chrome-extension/production-remote/css/compact.css',//'css/compact.css',
    expandedStyling: 'https://s3-us-west-1.amazonaws.com/airtable-gmail-chrome-extension/production-remote/css/expanded.css',//'css/expanded.css',
    mailToIcon: 'email_icon.png',
    openLinkToRec: 'OPEN_LINK_TO_RECORD',
    productionBaseUrl: 'https://airtable.com',
    stagingBaseUrl: 'https://staging.airtable.com',
    developmentBaseUrl: 'https://hyperbasedev.com:3000'
};

module.exports = config;
