var events = require('../events');
var React = require('react');
var api = require('../api');

var NotFound = React.createClass({
  getInitialState: function() {
    return {
      message: 'You are lost, buddy!'
    };
  },
  render: function() {
    return (
      <div className="notFound">
        <div className="icon">
          <div className="iconmelon">
              <svg viewBox="0 0 32 32">
                <g filter="" dangerouslySetInnerHTML={{__html:
                  "<use xlink:href=\"#robo\"></use>"
                  }}>
                </g>
              </svg>
          </div>
        </div>
        <div className="text">{this.state.message}</div>
      </div>
    );
  }
});


module.exports = NotFound