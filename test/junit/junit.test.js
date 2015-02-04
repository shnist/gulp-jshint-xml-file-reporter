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

function getJsonErrors(jsonErrors) {
    var errors = require(jsonErrors);

    xmlText = xmlEmitter.getHeader(errors);
    xmlText = xmlText.concat(xmlEmitter.formatContent(errors));
    xmlText = xmlText.concat(xmlEmitter.getFooter());
}

describe.only('junit', function () {
    describe('when there are errors in a single javascript file', function () {

        before(function (done) {
            var mockFilePath = './test/junit/fixtures/mock_one_file.xml';
            getMock(mockFilePath, done);
        });

        beforeEach(function () {
            var jsonErrorsFilePath = './fixtures/errors_one_file';
            getJsonErrors(jsonErrorsFilePath);
        });

        it('should transform JSHint results in junit XML', function () {
            xmlText.should.equal(mockXMLResults);
        });
    });
});
