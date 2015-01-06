/**
 *
 * Truekr sample app
 */
<% if(includeReact) { %>
  var app = require('./router.jsx');
<% } %>

$(document).ready(function(){
  console.log('Welcome to allo allo');
  <% if(includeReact) { %>
  app.start();
  <% } %>
});