module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        // This will load in our package.json file so we can have access
        // to the project name and version number.
        pkg: grunt.file.readJSON('package.json'),


        // Constants for the Gruntfile so we can easily change the path for
        // our environments.
        BASE_PATH: '',
        EXAMPLE_PATH: 'examples/',
        SRC_PATH: 'src/',
        DEPLOY_PATH: 'deploy/',
        TEST_PATH: 'test/',
        JS_PATH: 'js/',


        // A code block that will be added to all our minified code files.
        // Gets the name and version from the above loaded 'package.json' file.
        // To use: '<%= banner.join("\\n") %>'
        banner: [
            '/*',
            '* Project: <%= pkg.name %>',
            '* Version: <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
            '* Development By: <%= pkg.developedBy %>',
            '* Copyright(c): <%= grunt.template.today("yyyy") %>',
            '*/'
        ],

        typescript: {
            website: {
                src: ['<%= EXAMPLE_PATH %>SinglePageWebsite/dev/scripts/WebsiteApp.ts'],
                dest: '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/scripts/_compiled/app.js',
                options: {
                    target: 'es3', //or es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            todo: {
                src: ['<%= EXAMPLE_PATH %>ParseTodoApp/dev/scripts/TodoApp.ts'],
                dest: '<%= EXAMPLE_PATH %>ParseTodoApp/prod/scripts/todoApp.js',
                options: {
                    target: 'es3', //or es3
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            film: {
                src: ['<%= EXAMPLE_PATH %>WindowFilm/dev/scripts/WindowFilmApp.ts'],
                dest: '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/typescript.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            gallery: {
                src: ['<%= EXAMPLE_PATH %>PhotoGalleryApp/dev/scripts/PhotoGalleryApp.ts'],
                dest: '<%= EXAMPLE_PATH %>PhotoGalleryApp/prod/scripts/photoGalleryApp.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            canvas: {
                src: ['<%= EXAMPLE_PATH %>CanvasBannerAd/assets/scripts/BannerAd.ts'],
                dest: '<%= EXAMPLE_PATH %>CanvasBannerAd/assets/scripts/deploy/bannerAd.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            bubble: {
                src: ['<%= EXAMPLE_PATH %>EventBubbling/scripts/EventBubblingApp.ts'],
                dest: '<%= EXAMPLE_PATH %>EventBubbling/scripts/eventBubblingApp.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            listener: {
                src: ['<%= EXAMPLE_PATH %>EventListener/scripts/EventListenerApp.ts'],
                dest: '<%= EXAMPLE_PATH %>EventListener/scripts/eventListenerApp.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            test: {
                src: ['<%= TEST_PATH %>Test.spec.ts'],
                dest: '<%= TEST_PATH %>spec/Test.spec.js',
                options: {
                    target: 'es3', // Options: es3, es5
                    basePath: '',
                    sourceMap: false,
                    declaration: false
                }
            },
            js: {
                src: ['<%= SRC_PATH %>com/**/*.ts'],
                dest: '<%= JS_PATH %>',
                options: {
                    target: 'es3', // Options: es3, es5
                    module: 'amd', //or commonjs
                    comments: true,
                    declaration: true
                }
            }
        },

        jasmine: {
            pivotal: {
                src: '<%= TEST_PATH %>js/**/*.js',
                options: {
                    specs: '<%= TEST_PATH %>spec/*.spec.js',
                    helpers: '<%= TEST_PATH %>spec/*Helper.js'
                }
            }
        },

        ts: {
            js: {
                src: ['<%= SRC_PATH %>com/codebelt/**/*.ts'],        // The source typescript files, http://gruntjs.com/configuring-tasks#files
                outDir: '<%= JS_PATH %>',   // If specified, the generate javascript files are placed here. Only works if out is not specified
                options: {                         // use to override the default options, http://gruntjs.com/configuring-tasks#options
                    target: 'es3',                 // 'es3' (default) | 'es5'
                    module: 'amd',            // 'amd' (default) | 'commonjs'
                    sourceMap: false,               // true (default) | false
                    declaration: false,            // true | false (default)
                    removeComments: false           // true (default) | false
                }
            }
        },

        jst: {
            website: {
                options: {
                    namespace: "JST",                 //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                        //interpolate : /\{\{(.+?)\}\}/g    //Mustache Syntax
                    },
                    processName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    }
                },
                files: {
                    "<%= EXAMPLE_PATH %>SinglePageWebsite/dev/scripts/templates.js": ["<%= EXAMPLE_PATH %>SinglePageWebsite/dev/templates/**/*.tpl"]
                }
            },
            film: {
                options: {
                    namespace: "JST",                 //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                        //interpolate : /\{\{(.+?)\}\}/g    //Mustache Syntax
                    },
                    processName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    }
                },
                files: {
                    "<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/templates.js": ["<%= EXAMPLE_PATH %>WindowFilm/dev/templates/**/*.tpl"]
                }
            }
        },

        handlebars: {
            website: {
                options: {
                    namespace: 'JST',
                    // Registers all files that start with '_' as a partial.
                    partialRegex: /^_/,
                    // Shortens the file path for the template.
                    processName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    },
                    // Shortens the file path for the template.
                    processPartialName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    }
                },
                files: {
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/scripts/_compiled/templates.tmpl.js': ['<%= EXAMPLE_PATH %>SinglePageWebsite/dev/templates/**/*.hbs']
                }
            }
        },

        clean: {
            options: {
                force: false
            },
            build: {
                src: ['<%= DEPLOY_PATH %>templates.js']
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    '<%= DEPLOY_PATH %>scripts/app.min.js': [
                                                                    '<%= DEPLOY_PATH %>templates.js',
                                                                    '<%= DEPLOY_PATH %>scripts/app.min.js'
                                                                ]
                }
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.ts',
                    paths: '<%= SRC_PATH %>' + 'com/codebelt/',
                    outdir: '<%= BASE_PATH %>' + 'docs/',
                    themedir: '',
                    exclude: ''
                }
            }
        },

        json: {
            film: {
                options: {
                    namespace: 'JSON_DATA'
                },
                src: ['<%= EXAMPLE_PATH %>WindowFilm/dev/data/**/*.json'],
                dest: '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/json.js'
            }
        },

        watch: {
            website: {
                files: [
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/scripts/**/*.ts',
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/styles/**/*.css',
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/templates/**/*.hbs',
                    '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/config.html',
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['website']
            },
            todo: {
                files: [
                    '<%= EXAMPLE_PATH %>ParseTodoApp/**/*.ts',
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['todo']
            },
            film: {
                files: [
                    '<%= EXAMPLE_PATH %>WindowFilm/dev/**/*.ts',
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['film']
            },
            gallery: {
                files: [
                    '<%= EXAMPLE_PATH %>PhotoGalleryApp/dev/**/*.ts',
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['gallery']
            },
            bubble: {
                files: [
                    '<%= EXAMPLE_PATH %>EventBubbling/script/**/*.ts',
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['bubble']
            },
            temp: {
                files: [
                    '<%= EXAMPLE_PATH %>WindowFilm/prod/scripts/typescript.js'
                ],
                tasks: ['temp']
            },
            docs: {
                files: [
                    '<%= SRC_PATH %>com/**/*.ts'
                ],
                tasks: ['yuidoc']
            }
        },

        // Copies certain files over from the dev/ folder to the prod/ so we don't
        // have to do it manually.
        copy: {
            website:  {
                files: [
                    // Copy the image folder from dev/images/ to prod/images/.
                    {
                        expand: true,
                        cwd: '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/',
                        src: ['images/**'],
                        dest: '<%= EXAMPLE_PATH %>SinglePageWebsite/prod/'
                    },
                    {
                        expand: true,
                        cwd: '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/',
                        src: ['data/**'],
                        dest: '<%= EXAMPLE_PATH %>SinglePageWebsite/prod/'
                    }
                ]
            }
        },

        // Testing out image compression.
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '<%= EXAMPLE_PATH %>SinglePageWebsite/dev/images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: '<%= BASE_PATH %>imageOutput/'                  // Destination path prefix
                }]
            }
        },

        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            website: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.0",
                    bases: ['<%= EXAMPLE_PATH %>SinglePageWebsite/dev/'],
                    livereload: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            website: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.website.options.port%>'
            }
        }

    });

    // Default task.
    grunt.registerTask('default', ['website']);
    grunt.registerTask('websiteServer', ['website', 'express:website', 'open:website', 'watch:website']);
    grunt.registerTask('website', ['typescript:website', 'handlebars:website']);
    grunt.registerTask('todo', ['typescript:todo']);
    grunt.registerTask('canvas', ['typescript:canvas']);
    grunt.registerTask('bubble', ['typescript:bubble']);
    grunt.registerTask('listener', ['typescript:listener']);
    grunt.registerTask('gallery', ['typescript:gallery']);
    grunt.registerTask('test', ['typescript:test', 'jasmine']);
    grunt.registerTask('docs', ['yuidoc']);
    grunt.registerTask('all', ['todo', 'canvas', 'bubble', 'listener', 'website']);

};
