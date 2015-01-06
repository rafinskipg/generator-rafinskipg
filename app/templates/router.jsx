var ProductList = require('./product').list;
var UsersList = require('./user').list;
var ProductForm = require('./product').form;
var PageNotFound = require('./common').notFound;
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var React = require('react');


var App = React.createClass({
  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

function start () {
  var routes = (
    <Route name="app" path="/" handler={App}>
      <DefaultRoute handler={ProductList} />
      <Route name="create" handler={ProductForm} ></Route>
      <Route name="products" handler={ProductList} ></Route>
      <Route name="users" handler={UsersList} ></Route>
      <Route name="product" path="/product/:id" handler={ProductForm} ></Route>
      <NotFoundRoute handler={PageNotFound}></NotFoundRoute>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
  });
}

module.exports = {
  start: start
}