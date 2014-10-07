var grunt = require('grunt');
//var path = require('path');

exports.htmlmin = {

    cordova_test: function (test) {
        'use strict';
        test.expect(2);

        var expected = true;
        var actual;

        actual = grunt.file.isFile("src/index.html");
        test.equal(actual, expected, 'should manage a html file for cordova project');

        actual = grunt.file.isFile("www/index.html");
        test.equal(actual, expected, 'should manage a html file for cordova project');

        test.done();
    }
};

