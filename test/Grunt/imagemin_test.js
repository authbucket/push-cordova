var grunt = require('grunt');
//var path = require('path');

exports.imagemin = {

    cordova_test: function (test) {
        'use strict';
        test.expect(1);

        var expected = true;
        var actual;


        actual = grunt.file.isFile("src/img/logo.png");
        test.equal(actual, expected, 'should create a imagemin for cordova project');

        test.done();
    }
};

    
