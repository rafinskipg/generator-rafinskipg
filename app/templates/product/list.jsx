var events = require('../events');
var api = require('../api');
var React = require('react');

var ProductRow = React.createClass({
  getInitialState: function() {
    return this.props.product;
  },
  handleEdit: function(ev){
    ev.preventDefault();
    //window.location.hash = '#/product/' + this.state._id;
    alert('edit');
  },
  handleDelete: function(ev){
    ev.preventDefault();
    //Intended to fail
    /*api.kill({
      name: 'productDeleted',
      path: 'product/' + this.state._id
    });*/
    alert('Delete');
  },

  render: function() {
    return (
      <div className="product">
        {this.state.name} <a onClick={this.handleEdit}>Edit</a> <a onClick={this.handleDelete}>**Delete</a>
        <div className="description">
          {this.state.description}
        </div>
      </div>
    );
  }
});

var ListBox = React.createClass({
  getInitialState: function(props){
    //Suscribe to products data
    events.suscribe('products', 'ProductsList', function(products){
      if(this.isMounted()){
        this.setState({products: products});
      }
    }.bind(this));

    api.fetch({
      path : 'products.json',
      name : 'products'
    });

    props = props || this.props;

    // Set initial application state using props
    return {
      products: props.products || []
    };

  },

  render: function() {
      var self = this;
      var rows = [];
      
      this.state.products.forEach(function(product) {
        rows.push(<ProductRow product={product} />);
      });

      return (
          <div>
            <div className="title">Boilerplate Product List</div>
            {rows}
          </div>
      );
  }
});


var List = React.createClass({
  render: function() {
      return (
          <div className="list-container">
            <div className="productList">
              <ListBox/>
            </div>
          </div>
      );
  }
});


module.exports = List