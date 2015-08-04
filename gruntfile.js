'use strict'; // indicate to use Strict Mode    
module.exports = function(grunt) {
    // Set project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            './build/card_renderer.browser.js': './js/card_renderer.js'
        },
        jshint: {
            // define the files to lint
            files: ['./js/card_renderer.js', './js/generic_column_type.js', 
                    './js/column_types.js', './js/config.js', 
                    './js/card_types/*', './js/types/*'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                strict: true,
                globalstrict: true,
                globals: {
                    $: true,
                    require: true,
                    module: true,
                    console: true,
                    chrome: true,
                    document: true,
                    InboxSDK: true,
                    Date: true,
                    exports: true
                },
                validthis: true
            }
        },
        replace: {
            emailproduction: {
                src: './js/types/email_column_type.js',
                overwrite: true,
                replacements: [{
                    from: /production|staging|development/g,
                    to: 'production'
                }]
            },
            emailstaging: {
                src: './js/types/email_column_type.js',
                overwrite: true,
                replacements: [{
                    from: /production|staging|development/g,
                    to: 'staging'
                }]
            },
            emaildevelopment: {
                src: './js/types/email_column_type.js',
                overwrite: true,
                replacements: [{
                    from: /production|staging|development/g,
                    to: 'development'
                }]
            },
            css: {
                src: './css/ios7-style-font-icons.min.css',
                dest: './css/airtable-gmail-ext-ios7-style-font-icons.min.css',
                replacements: [{
                    from: '.icon-',
                    to: '.airtable-gmail-ext-icon-'
                }, {
                    from: '.icons-',
                    to: '.airtable-gmail-ext-icons-'
                }, {
                    from: '\'ios7-style-font-icons\'',
                    to: '\'airtable-gmail-ext-ios7-style-font-icons\''
                }]
            }
        }
    });

    // Load the relevant plugins for the default task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-text-replace');

    var env = grunt.option('env') || 'production';
    grunt.registerTask('default', ['jshint', 
        'replace:email' + env, 
        'replace:css', 
        'browserify']);
};
