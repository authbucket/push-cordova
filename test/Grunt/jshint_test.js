var grunt = require('grunt');
//var path = require('path');

exports.cordovacli = {

    cordova_test: function (test) {
        'use strict';
        test.expect(1);

        var expected = true;
        var actual;


        actual = grunt.file.isFile(("Gruntfile.js"));
        test.equal(actual, expected, 'should create a Gruntfile.js for cordova project');

        test.done();
    }
};

