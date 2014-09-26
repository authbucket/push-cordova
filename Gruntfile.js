module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        clean: {
            build: ['platforms/*', 'plugins/*', 'www/*'],
        },

        copy: {
            vendor: {
                files: {
                    'www/css/bootstrap-theme.min.css': 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                    'www/css/bootstrap.min.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'www/js/angular.min.js': 'bower_components/angular/angular.min.js',
                    'www/js/bootstrap.min.js': 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'www/js/jquery.min.js': 'bower_components/jquery/dist/jquery.min.js'
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            src: {
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

        imagemin: {
            options: {
                optimizationLevel: 3,
                force: true,
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'www/img/'
                }]
            }
        },

        jshint: {
            options: {
                force: true,
                eqnull: true,
                browser: true,
            },
            src: {
                files: {
                    src: ['Gruntfile.js', 'src/**/*.js'],
                }
            }
        },

        less: {
            options: {
                paths: ["src/less"],
                compress: true,
            },
            src: {
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

        uglify: {
            src: {
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

        shell: {
            options: {
                execOptions: {
                    maxBuffer: 1024 * 1024
                }
            },
            plugin: {
                command: [
                    'cordova plugin add https://github.com/phonegap-build/PushPlugin.git',
                    'cordova plugin add org.apache.cordova.console',
                    'cordova plugin add org.apache.cordova.device',
                    'cordova plugin add org.apache.cordova.file',
                    'cordova plugin add org.apache.cordova.media',
                ].join('&&')
            },
            platform: {
                command: [
                    'cordova platform add android',
                    'cordova platform add ios'
                ].join('&&')
            },
            build: {
                command: [
                    'cordova build android',
                    'cordova build ios'
                ].join('&&')
            }
        },

        nodeunit: {
            tests: ['test/*_test.js'],
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
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', function(which) {
        var test = path.join(__dirname, 'test', 'fixtures', which + '.js');
        if (grunt.file.exists(test)) {
            grunt.config('nodeunit.tests', test);
        }
        grunt.task.run('nodeunit');
    });

    // Define task(s).
    grunt.registerTask('init', ['shell:plugin', 'shell:platform', 'copy']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('make', ['uglify', 'less', 'imagemin', 'htmlmin', 'shell:build']);
    grunt.registerTask('test',['nodeunit']);

    // Default task.
    grunt.registerTask('default', ['init', 'lint','test', 'make']);

};
