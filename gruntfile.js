'use strict'; // indicate to use Strict Mode    
module.exports = function(grunt) {
    // Set project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                    Date: true
                }
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
            }

        }
    });

    // Load the relevant plugins for the default task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-text-replace');

    var env = grunt.option('env') || 'production';
    grunt.registerTask('default', ['jshint', 'replace:email' + env]);
};
