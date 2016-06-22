import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TWzipcode from 'react-twzipcode';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(data) {
    console.log(data);  // eslint-disable-line
  }

  render() {
    return (
      <div>
        <TWzipcode css={['form-control county-sel',
                         'form-control district-sel',
                         'form-control zipcode']}
          handleChangeCounty={this.handleChange}
          handleChangeDistrict={this.handleChange}
          handleChangeZipcode={this.handleChange}
          zipcodePlaceholder={'郵遞區號'}
          detect
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
