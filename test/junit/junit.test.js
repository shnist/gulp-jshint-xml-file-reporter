'use strict';

var should = require('should'),
    fs = require('fs'),
    xmlEmitter = require('../../lib/junit_emitter'),
    mockXMLResults,
    xmlText;

function getMock(path, done) {
    fs.readFile(path, function (err, data) {
        if (err) return done(err);
        mockXMLResults = data.toString('utf8');
        done();
    });
}

function formatErrors(jsonErrors) {
    var errors = require(jsonErrors);

    //xmlText = xmlEmitter.getHeader(errors);
    xmlText = xmlEmitter.formatContent(errors);
    //xmlText = xmlText.concat(xmlEmitter.getFooter());
}

describe.only('junit', function () {
    describe('formatContent', function () {
        before(function (done) {
            var mockFilePath = './test/junit/fixtures/mock_one_file.xml';
            getMock(mockFilePath, done);
        });

        beforeEach(function () {
            var jsonErrorsFilePath = './fixtures/errors_one_file';
            formatErrors(jsonErrorsFilePath);
        });

        it('should transform JSHint results in junit XML', function () {
            xmlText.should.equal(mockXMLResults);
        });
    });

/*    describe('when there are errors across multiple files', function () {
        before(function (done) {
            var mockFilePath = './test/junit/fixtures/mock_multiple_files.xml';
            getMock(mockFilePath, done);
        });

        beforeEach(function () {
            var jsonErrorsFilePath = './fixtures/errors_multiple_files';
            getJsonErrors(jsonErrorsFilePath);
        });
    });*/
});
