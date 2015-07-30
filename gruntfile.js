'use strict'; // indicate to use Strict Mode    
module.exports = function(grunt) {
    // Set project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            'card_renderer.browser.js': 'card_renderer.js'
        },
        jshint: {
            // define the files to lint
            files: ['card_renderer.js','card_renderer_node.js', 'config.js',
                    'tags.js', 'generic_column_type.js', 'column_types.js',
                    'card_types/*', 'types/*'],
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
                src: './types/email_column_type.js',
                overwrite: true,
                replacements: [{
                    from: /production|staging|development/g,
                    to: 'production'
                }]
            },
            emailstaging: {
                src: './types/email_column_type.js',
                overwrite: true,
                replacements: [{
                    from: /production|staging|development/g,
                    to: 'staging'
                }]
            },
            emaildevelopment: {
                src: './types/email_column_type.js',
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
