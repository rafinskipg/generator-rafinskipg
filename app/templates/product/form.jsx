var events = require('../events');
var React = require('react');
var Router = require('react-router');
var api = require('../api');

var ProductForm = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    if(this.getParams().id){
      //TODO: Consider separate forms for editing. I wanted to reuse the same, but code became uglier
      this.edition = this.getParams().id;
      
      events.suscribe('product', 'ProductForm', function(product){
        if(this.isMounted()){
          this.setState({ 
            name: product.name,
            description: product.description
          });
        }
      }.bind(this));

      api.fetch({
        name: 'product',
        path: 'product/'+ this.edition
      });

    }else{
      this.edition = false;
    }

    events.suscribe(['productCreated', 'productUpdated'], 'ProductForm', function(product){
      window.location.hash = '#';
    });

    return {
      name: 'My new brilliant product!',
      description: ''
    };
  },
  handleChange: function(field, event){
    var nextState = {}
    nextState[field] = event.target.value;
    this.setState(nextState)
  },

  handleImageChange: function(event) {
    console.log("handleChange() file handle = " + JSON.stringify(event.target.files));
    this.setState( {files: event.target.files} );
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var name = this.edition ? 'productUpdated' : 'productCreated';
    var path = this.edition ? 'product/'+this.edition : 'product';
    var action = this.edition ? 'update' : 'create';

    api[action]({
      name: name,
      path: path, 
      data: {
        name: this.state.name,
        description: this.state.description
      }
    });
  },

  render: function() {
    return (
      <form role="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'name')} value={this.state.name} id="name" placeholder="Enter Name"></input>
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea className="form-control" onChange={this.handleChange.bind(this, 'description')} value={this.state.description} id="description" placeholder="Enter a description of your product"></textarea>
        </div>
        <div className="form-group">
          <input type="file" onChange={this.handleImageChange} name="picture" multiple></input>
        </div>
        <button type="submit" className="btn btn-default">Save!</button>
      </form>
    );
  }
});


module.exports = ProductForm