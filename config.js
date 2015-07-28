'use strict';

(function () {

    var root = this;
    var previousConfig = root.config;

    var config = {
        productionAppId: 'sdk_airtable-ch-ext_5ca3d8a66b',
        stagingAppId: 'sdk_airtable-ch-sta_3816999c84',
        developmentAppId: 'sdk_airtable-ch-dev_d41135c420', 
        chromeExtension: 'chrome-extension://',
        defaultStyling: '/css/sidebar_style.css',//'/css/default.css', // switch back to default once done testing 
        expandedStyling: '/css/expanded.css',
        mailToIcon: '/email_icon.png',
        openLinkToRec: 'OPEN_LINK_TO_RECORD'
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = config;
        }
        exports.config = config;
    } else {
        root.config = config;
    }

}).call(this);

