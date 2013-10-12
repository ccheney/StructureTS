module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        // This will load in our package.json file so we can have access
        // to the project name and appVersion number.
        pkg: grunt.file.readJSON('package.json'),

        // Constants for the Gruntfile so we can easily change the path for
        // our environments.
        BASE_PATH: '../',
        DEVELOPMENT_PATH: '../dev/',
        PRODUCTION_PATH: '../www/',

        // A code block that will be added to all our minified code files.
        // Gets the name and appVersion from the above loaded 'package.json' file.
        banner: [
                 '/*',
                 '* Project: <%= pkg.name %>',
                 '* Version: <%= pkg.appVersion %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
                 '* Development By: <%= pkg.developedBy %>',
                 '* Copyright(c): <%= grunt.template.today("yyyy") %>',
                 '*/'
        ],

        // YUIDoc plugin that will generate our JavaScript documentation.
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.appVersion %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= DEVELOPMENT_PATH %>' + 'scripts/com/',
                    outdir: '<%= BASE_PATH %>docs',
                    themedir: '',
                    extension: '.ts',                                   // Default '.js' <comma-separated list of file extensions>
                    exclude: ''
                }
            }
        },

        // The different constants name that will be use to build our html files.
        // Example: <!-- @if NODE_ENV == 'DEVELOPMENT' -->
        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        // Allows us to pass in variables to files that have place holders so we
        // can similar files with different data.
        // Example: <!-- @echo appVersion --> or <!-- @echo filePath -->
        preprocess : {
            // Task to create the dev.html file that will be used during development.
            // Passes the app version and creates the /dev.html
            dev : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            },
            // Task to create the index.html file that will be used in production.
            // Passes the app version and creates the /index.html
            prod : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= PRODUCTION_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            }
        },

        manifest: {
            generate: {
                options: {
                    basePath: '<%= PRODUCTION_PATH %>',
                    exclude: [
                        'images/moblie-icons/icon-144x144.png',
                        'images/moblie-icons/icon-100x100.png',
                        'images/moblie-icons/icon-29x29.png',
                        'images/moblie-icons/icon-50x50.png',
                        'images/moblie-icons/icon-58x58.png',
                        'images/moblie-icons/icon-72x72.png'
                    ],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true,
                    master: []
                },
                src: [
                    'data/**/*.json',
                    'images/**/*.jpg',
                    'images/**/*.png',
                    'scripts/**/*.js',
                    'styles/**/*.css'
                ],
                dest: '<%= PRODUCTION_PATH %>' + 'cache.manifest'
            }
        },

        // Minifies our css files that we specify and adds the banner to the top
        // of the minified css file.
        cssmin: {
            main: {
                options: {
                    banner: '<%= banner.join("\\n") %>',
                    keepSpecialComments: 0                                                  // '*' for keeping all (default), 1 for keeping first one, 0 for removing all
                },
                files: {
                    '<%= PRODUCTION_PATH %>css/app.css': [
                        '<%= DEVELOPMENT_PATH %>' + 'styles/phonegap.css',
                        '<%= DEVELOPMENT_PATH %>' + 'styles/styles.css'
                    ]
                }
            }
        },

        // After the preprocess plugin creates our /index.html we remove all comments
        // and white space from the file so it will be minified.
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>' + 'index.html'
                }
            }
        },

        // Copies certain files over from the dev/ folder to the prod/ so we don't
        // have to do it manually.
        copy: {
            prod:  {
                files: [
                    // Copy favicon.ico file from dev/ to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'favicon.ico', dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the image folder from dev/images/ to prod/images/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['images/**'], dest: '<%= PRODUCTION_PATH %>' },
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['pdfs/**'], dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the image folder from dev/images/ to prod/images/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['data/**'], dest: '<%= PRODUCTION_PATH %>' }
                ]
            }
        },

        // Takes the minified JavaScript file and adds the banner to the top.
        concat: {
            prod: {
                options: {
                    banner: '<%= banner.join("\\n") %> \n'
                },
                src: [
                    '<%= DEVELOPMENT_PATH %>' + 'libs/jquery/jquery-2.0.3.js',
                    '<%= DEVELOPMENT_PATH %>' + 'libs/lodash/lodash.js',
                    '<%= DEVELOPMENT_PATH %>' + 'libs/handlebars/handlebars.js',
                    '<%= DEVELOPMENT_PATH %>' + 'scripts/_compiled/json.js',
                    '<%= DEVELOPMENT_PATH %>' + 'scripts/_compiled/templates.tmpl.js',
                    '<%= DEVELOPMENT_PATH %>' + 'scripts/_compiled/app.js'
                ],
                dest: '<%= PRODUCTION_PATH %>' + 'js/app.js'
            },
            // Add the comment banner to the app.min.js file.
            addBanner: {
                options: {
                    banner: '<%= banner.join("\\n") %> \n'
                },
                src: ['<%= PRODUCTION_PATH %>' + 'js/app.min.js'],
                dest: '<%= PRODUCTION_PATH %>' + 'js/app.min.js'
            }
        },

        // The JSON to JavaScript plugin.
        json: {
            prod: {
                options: {
                    namespace: 'JSON_DATA',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['<%= DEVELOPMENT_PATH %>' + 'data/**/*.json'],
                dest:  '<%= DEVELOPMENT_PATH %>' + 'scripts/_compiled/json.js'
            }
        },

        // http://handlebarsjs.com/
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    // Registers all files that start with '_' as a partial.
                    partialRegex: /^_/,
                    // Path to all partials in a single folder. Example: ../dev/templates/partials/
                    //partialsPathRegex: /\.\.\/dev\/templates\/partials\//,
                    processName: function(filename) {
                        //Shortens the file path for the template.
                        return filename.slice(filename.indexOf("template"), filename.length);
                    },
                    processPartialName: function(filePath) {
                        //Shortens the file path for the template.
                        return filePath.slice(filePath.indexOf("template"), filePath.length);
                    }
                },
                files: {
                    '<%= DEVELOPMENT_PATH %>scripts/_compiled/templates.tmpl.js': ['<%= DEVELOPMENT_PATH %>' + 'templates/**/*.hbs']
                }
            }
        },

        typescript: {
            main: {
                src: ['<%= DEVELOPMENT_PATH %>' + 'scripts/ZombieApp.ts'],
                dest: '<%= DEVELOPMENT_PATH %>' + 'scripts/_compiled/app.js',
                options: {
                    target: 'es3', //or es5
                    base_path: '',
                    sourcemap: false,
                    declaration: false,
                    nolib: false,
                    comments: false
                }
            }
        },

        uglify: {
            options: {
                output: {
                    beautify: false,
                    comments: false
                },
                compress: {
                    sequences: false,
                    global_defs: {
                        DEBUG: false
                    }
                },
                warnings: false,
                mangle: true
            },
            dist: {
                files: {
                    '<%= PRODUCTION_PATH %>scripts/app.js': [
                        '<%= PRODUCTION_PATH %>' + 'scripts/app.min.js'
                    ]
                }
            }
        },

        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            prod: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.0",
                    bases: ['<%= PRODUCTION_PATH %>'],
                    livereload: true
                }
            }
        },

        // grunt-watch will monitor the projects files
        watch: {
            prod: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'scripts/**/*.ts',
                    '<%= DEVELOPMENT_PATH %>' + 'templates/**/*.hbs'
                ],
                tasks: ['prod']
            },
            typescript: {
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'scripts/**/*.ts'
                ],
                tasks: ['typescript']
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            prod: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.prod.options.port%>'
            }
        }

    });

    // Grunt tasks.
    grunt.registerTask('default', ['server']);
    grunt.registerTask('prod', ['cssmin', 'handlebars', 'typescript', 'concat:prod']);
//    grunt.registerTask('dev', ['env:dev', 'preprocess:dev', 'json', 'handlebars', 'typescript']);
//    grunt.registerTask('prod', ['env:prod', 'preprocess:prod', 'cssmin', 'htmlmin', 'handlebars', 'typescript', 'concat:prod', 'uglify', 'copy:prod', 'concat:addBanner', 'manifest']);
//
    grunt.registerTask('server', ['prod', 'express:prod', 'open:prod', 'watch:prod']);

};