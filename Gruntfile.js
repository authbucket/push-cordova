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
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/bootstrap/dist/css/bootstrap-theme.min.css'],
                    dest: 'www/css'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                    dest: 'www/css'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['node_modules/jquery/dist/jquery.min.js'],
                    dest: 'www/js'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
                    dest: 'www/js'
                }]
            }
        },

        // Preprocess.
        jshint: {
            all: ["Gruntfile.js", "src/**/*.js"]
        },
        jsbeautifier: {
            files: ["Gruntfile.js", "src/**/*.js"],
        },

        // Process
        uglify: {
            my_target: {
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
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Define task(s).
    grunt.registerTask('cleanup', ['clean']);
    grunt.registerTask('init', ['cordovacli', 'copy']);
    grunt.registerTask('preprocess', ['jshint', 'jsbeautifier']);
    grunt.registerTask('process', ['uglify', 'less', 'imagemin', 'htmlmin']);

    // Default task.
    grunt.registerTask('default', function() {
        grunt.task.run(['init', 'preprocess', 'process']);
    });
};
