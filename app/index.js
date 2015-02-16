'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });
    this.testFramework = this.options['test-framework'];

    this.pkg = require('../package.json');
  },
  prompting: {
    framework: function () {
      var done = this.async();

      // welcome message
      if (!this.options['skip-welcome-message']) {
        this.log(require('yosay')('Welcome to my generator, I would love to Browserify your NPM. Ask me more at @rafinskipg'));
        this.log(chalk.magenta(
          'Out of the box I include HTML5 Boilerplate, Browserify, jQuery, and a ' +
          'Gruntfile.js to build your app.'
        ));
      }

      var prompt = [{
        type: 'list',
        name: 'framework',
        message: 'Select a front end framework:',
        choices: [
          'Bootstrap',
          'Foundation',
          'None'
        ]
      }];

      this.prompt(prompt, function (responses) {
        this.includeBootstrap = responses.framework === 'Bootstrap';
        this.includeFoundation = responses.framework === 'Foundation';
        done();
      }.bind(this));
    },

    server: function () {
      var done = this.async();

      
      var prompt = [{
        type: 'list',
        name: 'server',
        message: 'Do you need an express server for serving your distribution folder on Heroku/Nitrous/etc without using grunt?:',
        choices: [
          'Yes',
          'Nope'
        ]
      }];

      this.prompt(prompt, function (responses) {
        this.expressServer = responses.server === 'Yes';
        done();
      }.bind(this));
    },
    
    askFor: function () {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name: 'React',
          value: 'includeReact',
          checked: true
        },{
          name: 'Sass',
          value: 'includeSass',
          checked: true
        },{
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: false
        },{
          name: 'FontAwesome',
          value: 'includeFontAwesome',
          checked: true
        }]
      }, {
        when: function (answers) {
          return answers && answers.features &&
            answers.features.indexOf('includeSass') !== -1;
        },
        type: 'confirm',
        name: 'libsass',
        value: 'includeLibSass',
        message: 'Would you like to use libsass? Read up more at \n' +
          chalk.green('https://github.com/andrew/node-sass#node-sass'),
        default: false
      }];

      this.prompt(prompts, function (answers) {
        var features = answers.features;

        function hasFeature(feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.includeSass = hasFeature('includeSass');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeFontAwesome = hasFeature('includeFontAwesome');
        this.includeReact = hasFeature('includeReact');

        this.includeLibSass = answers.libsass;
        this.includeRubySass = !answers.libsass;

        done();
      }.bind(this));
    }
  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  testfiles: function () {
    this.bulkDirectory('test', 'test');
  },

  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };

    if (this.includeBootstrap) {
      var bs = 'bootstrap' + (this.includeSass ? '-sass-official' : '');
      bower.dependencies[bs] = "~3.2.0";
    } else if (this.includeFoundation) {
      bower.dependencies.foundation = "~5.5.0";
    }

    bower.dependencies.jquery = "~2.1.0";

    if (this.includeFontAwesome) {
      bower.dependencies['font-awesome'] = "~4.2.0";
    }

    if (this.includeModernizr) {
      bower.dependencies.modernizr = "~2.8.2";
    }

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  mainStylesheet: function () {
    var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
    this.template(css, 'app/styles/' + css);
  },

  writeIndex: function () {
    this.indexFile = this.engine(
      this.readFileAsString(join(this.sourceRoot(), 'index.html')),
      this
    );

    // wire Bootstrap plugins
    if (this.includeBootstrap && !this.includeSass) {
      var bs = 'bower_components/bootstrap/js/';

      this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'scripts/plugins.js',
        sourceFileList: [
          bs + 'affix.js',
          bs + 'alert.js',
          bs + 'dropdown.js',
          bs + 'tooltip.js',
          bs + 'modal.js',
          bs + 'transition.js',
          bs + 'button.js',
          bs + 'popover.js',
          bs + 'carousel.js',
          bs + 'scrollspy.js',
          bs + 'collapse.js',
          bs + 'tab.js'
        ],
        searchPath: '.'
      });
    }

    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'bundle.js',
      sourceFileList: ['bundle.js'],
      searchPath: ['app', '.tmp']
    });
  },

  app: function () {
    this.directory('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.write('app/index.html', this.indexFile);

    this.template('main.js', 'app/scripts/main.js');
    this.copy('api.js', 'app/scripts/api.js');
    this.copy('events.js', 'app/scripts/events.js');
    this.copy('settings.js', 'app/scripts/settings.js');
    this.copy('errorLogger.js', 'app/scripts/errorLogger.js');

    if (this.includeReact) {
      this.copy('router.jsx', 'app/scripts/router.jsx');
      this.bulkDirectory('product', 'app/scripts/product');  
      this.bulkDirectory('common', 'app/scripts/common');  
    }

    this.bulkDirectory('mock', 'app/mock');
  },

  express: function(){
    if(this.expressServer){
      this.copy('_express.js', 'server.js');
    }
  },

  install: function () {
    this.on('end', function () {
      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install']
        }
      });

      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});
