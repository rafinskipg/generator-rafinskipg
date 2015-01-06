# Rafinskipg generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-rafinskipg.svg?branch=master)](http://travis-ci.org/yeoman/generator-rafinskipg)

[Yeoman](http://yeoman.io) generator that scaffolds out a front-end web app using browserify, and optionally React.

![](http://i.imgur.com/uKTT2Hj.png)

## Features

* CSS Autoprefixing
* Built-in preview server with LiveReload
* Automagically compile Sass
* Automagically compile Browserified bundle
* Includes react
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Mocha Unit Testing with PhantomJS
* Bootstrap for Sass (Optional)
* Foundation (Optional)
* Leaner Modernizr builds (Optional)
* Express server for avoiding the use of grunt for tools like pm2 or heroku that prefers to use the easier way `node server.js` (Optional)

For more information on what `generator-rafinskipg` can do for you, take a look at the [Grunt tasks](https://github.com/yeoman/generator-rafinskipg/blob/master/app/templates/_package.json) used in our `package.json`.


## Getting Started

- Install: `npm install -g generator-rafinskipg`
- Run: `yo rafinskipg`
- Run `grunt` for building and `grunt serve` for preview[\*](#grunt-serve-note). `--allow-remote` option for remote access.


#### Third-Party Dependencies

To manually add dependencies, `bower install --save depName` to get the files, then add a `script` or `style` tag to your `index.html` or another appropriate place.

The components are installed in the root of the project at `/bower_components`. To reference them from index.html, use `src="bower_components"` or `src="/bower_components"`. Treat the `bower_components` directory as if it was a sibling to `index.html`.

*Testing Note*: a project checked into source control and later checked out needs to have `bower install` run from the `test` folder as well as from the project root.


#### Grunt Serve Note

Note: `grunt server` was used for previewing in earlier versions of the project, and has since been deprecated in favor of `grunt serve`.


## Docs

We have [recipes](docs/recipes) for integrating other popular technologies like Compass.


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework=<framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.

## Contribute

`generator-rafinskipg` is fork-friendly and you can always maintain a custom version which you `npm install && npm link` to continue using via `yo rafinskipg` or a name of your choosing.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
