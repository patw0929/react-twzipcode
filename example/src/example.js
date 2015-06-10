var React = require('react');
var TWzipcode = require('react-twzipcode');

var App = React.createClass({
  handleChange (data) {
    console.log(data);
  },
  render () {
    return (
      <div>
        <TWzipcode css={['form-control county-sel', 'form-control district-sel', 'form-control zipcode']}
                   handleChangeCounty={this.handleChange}
                   handleChangeDistrict={this.handleChange}
                   handleChangeZipcode={this.handleChange} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
