/*global describe, beforeEach, it*/

var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var _ = require('underscore');

describe('Webapp generator', function () {
  // not testing the actual run of generators yet
  it('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  describe('run test', function () {

    var expectedContent = [
      ['bower.json', /"name": "tmp"/],
      ['package.json', /"name": "tmp"/]
    ];
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html'
    ];

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    var runGen;

    beforeEach(function () {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

    it('creates expected files', function (done) {
      runGen.withOptions(options).on('end', function () {

        assert.file([].concat(
          expected,
          'app/styles/main.css',
          'app/scripts/main.js',
          'app/scripts/api.js',
          'app/scripts/errorLogger.js',
          'app/scripts/events.js'
        ));
        assert.noFile([
          'app/styles/main.scss',
          'app/scripts/main.coffee'
        ]);

        assert.fileContent(expectedContent);
        assert.noFileContent([
          ['Gruntfile.js', /coffee/],
          ['Gruntfile.js', /modernizr/],
          ['app/index.html', /modernizr/],
          ['bower.json', /modernizr/],
          ['package.json', /modernizr/],
          ['Gruntfile.js', /bootstrap/],
          ['app/index.html', /bootstrap/],
          ['bower.json', /bootstrap/],
          ['Gruntfile.js', /sass/],
          ['app/index.html', /Sass/],
          ['app/scripts/main.js', /router/],
          ['.gitignore', /\.sass-cache/],
          ['package.json', /grunt-contrib-sass/],
          ['package.json', /grunt-sass/],
          ['Gruntfile.js', /bootstrap-sass-official/],
          ['app/index.html', /Sass is a mature/],
          ['bower.json', /bootstrap-sass-official/]
        ]);
        done();
      });
    });
  
    it('creates expected express server files', function (done) {
      runGen.withOptions(options).withPrompt({server: 'Yes'})
      .on('end', function () {

        assert.file([].concat(
          expected,
          'server.js'
        ));

        assert.fileContent([].concat(
          expectedContent,
          [['package.json', /express/]]
        ));

        done();
      });
    });

    it('creates expected modernizr components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['includeModernizr']})
      .on('end', function () {

        assert.fileContent([
          ['Gruntfile.js', /modernizr/],
          ['app/index.html', /modernizr/],
          ['bower.json', /modernizr/],
          ['package.json', /modernizr/],
        ]);

        done();
      });
    });

    it('creates expected react components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['includeReact']})
      .on('end', function () {
        assert.file([
          'app/scripts/router.jsx', 'app/scripts/product/index.js','app/scripts/common/index.js'
          ]);
        assert.fileContent([
          ['app/scripts/main.js', /router/]
        ]);

        done();
      });
    });

    it('creates expected bootstrap components', function (done) {
      runGen.withOptions(options).withPrompt({framework: 'Bootstrap'})
      .on('end', function () {

        assert.fileContent([
          ['Gruntfile.js', /bootstrap/],
          ['app/index.html', /bootstrap/],
          ['bower.json', /bootstrap/]
        ]);

        done();
      });
    });

    it('creates expected ruby SASS components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['includeSass']})
      .on('end', function () {

        assert.fileContent([
          ['Gruntfile.js', /sass/],
          ['app/index.html', /Sass/],
          ['.gitignore', /\.sass-cache/],
          ['package.json', /grunt-contrib-sass/]
        ]);

        assert.noFileContent([
          ['package.json', /grunt-sass/],
          ['app/index.html', /Sass is a mature/]
        ]);

        done();
      });
    });

    it('creates expected node SASS files', function (done) {
      runGen.withOptions(options).withPrompt({
        features: ['includeSass'],
        libsass: true
      }).on('end', function () {

        assert.fileContent([
          ['package.json', /grunt-sass/]
        ]);

        assert.noFileContent([
          ['package.json', /grunt-contrib-sass/],
          ['Gruntfile.js', /bootstrap-sass-official/]
        ]);

        done();
      });
    });

    it('creates expected SASS and Bootstrap components', function (done) {
      runGen.withOptions(options).withPrompt({
        framework: 'Bootstrap',
        features: ['includeSass'],
      }).on('end', function () {

        assert.fileContent([
          ['Gruntfile.js', /bootstrap-sass-official/],
          ['app/index.html', /Sass is a mature/],
          ['bower.json', /bootstrap-sass-official/]
        ]);

        done();
      });
    });
  });
});
