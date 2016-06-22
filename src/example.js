import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TWzipcode from 'react-twzipcode';

class App extends Component {
  handleChange(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <TWzipcode css={['form-control county-sel', 'form-control district-sel', 'form-control zipcode']}
          handleChangeCounty={this.handleChange.bind(this)}
          handleChangeDistrict={this.handleChange.bind(this)}
          handleChangeZipcode={this.handleChange.bind(this)}
          detect={true}
          zipcodePlaceholder={'郵遞區號'} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
