module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Initialization.
        cordovacli: {
            options: {
                path: '.'
            },
            plugin: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'https://github.com/phonegap-build/PushPlugin.git',
                        'console',
                        'device',
                        'file',
                        'media',
                    ]
                }
            },
        },
        copy: {
            node_module: {
                files: {
                    'www/css/bootstrap-theme.min.css': 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                    'www/css/bootstrap.min.css': 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'www/js/bootstrap.min.js': 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'www/js/jquery.min.js': 'node_modules/jquery/dist/jquery.min.js'
                }
            }
        },

        // Preprocess.
        jshint: {
            options: {
                force: true,
                eqnull: true,
                browser: true,
            },
            allFiles: {
                src: ['Gruntfile.js', 'src/**/*.js'],
            }
        },

        // Process
        uglify: {
            my_target: {
                options: {
                    beautify: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**/*.js'],
                    dest: 'www/js/',
                    ext: '.min.js',
                    extDot: 'first'
                }]
            }
        },
        less: {
            compress: {
                options: {
                    paths: ["src/less"],
                    compress: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/less/',
                    src: ['**/*.less'],
                    dest: 'www/css/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            },
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'www/img/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    'www/index.html': 'src/index.html',
                }, {
                    expand: true,
                    cwd: 'src/templates/',
                    src: ['**/*.html'],
                    dest: 'www/templates/'
                }]
            }
        },

        // Cleanup
        clean: {
            cleanup: ['platforms/*', 'plugins/*', 'www/*']
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cordovacli');

    // Define task(s).
    grunt.registerTask('cleanup', ['clean']);
    grunt.registerTask('init', ['cordovacli', 'copy']);
    grunt.registerTask('preprocess', ['jshint']);
    grunt.registerTask('process', ['uglify', 'less', 'imagemin', 'htmlmin']);

    // Default task.
    grunt.registerTask('default', function() {
        grunt.task.run(['init', 'preprocess', 'process']);
    });
};
