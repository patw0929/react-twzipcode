import React from 'react';
// import { default as TWzipcode } from 'react-twzipcode';
import { default as TWzipcode } from './containers/App';

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
