var grunt = require('grunt');
var path = require('path');

exports.cordovacli = {

    cordova_test: function (test) {
        'use strict';
        test.expect(5);
        
        var expected = true;
        var actual;
        
        
        actual = grunt.file.isDir(path.resolve("src"));
        test.equal(actual, expected, 'should create a Gruntfile.js for cordova project');

        actual = grunt.file.isDir(path.resolve("node_modules"));
        test.equal(actual, expected, 'should create a node_module');

        actual = grunt.file.isDir(path.resolve("platforms"));
        test.equal(actual, expected, 'should create a cordova project folder structure');
        
        actual = grunt.file.isDir(path.resolve("plugins"));
        test.equal(actual, expected, 'should create a cordova project folder structure');
        
        actual = grunt.file.isDir(path.resolve("www"));
        test.equal(actual, expected, 'should create a cordova project folder structure');
        
        test.done();
    }
};
