import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TWzipcode from 'react-twzipcode'; // eslint-disable-line import/no-extraneous-dependencies

class App extends Component {
  state = {
    county: '',
    district: '',
    zipcode: '',
  };

  handleChange = (data) => {
    console.log(data);
  };

  changeTo = ({ county, district, zipcode }) => {
    console.log(county, district, zipcode);

    this.setState({
      county,
      district,
      zipcode,
    });
  };

  render() {
    return (
      <div>
        <TWzipcode
          css={ [
            'form-control county-sel',
            'form-control district-sel',
            'form-control zipcode',
          ] }
          handleChangeCounty={ this.handleChange }
          handleChangeDistrict={ this.handleChange }
          handleChangeZipcode={ this.handleChange }
          zipcodePlaceholder={ '郵遞區號' }
          countyValue={ this.state.county }
          districtValue={ this.state.district }
          zipcodeValue={ this.state.zipcode }
          detect
        />

        <hr />

        <button type="button" onClick={ () => { this.changeTo({ county: '台東縣' }); } }>改為台東縣</button>
        {this.state.county === '台東縣' && (
          <button type="button" onClick={ () => { this.changeTo({ district: '太麻里鄉' }); } }>改為太麻里鄉</button>
        )}
        <button type="button" onClick={ () => { this.changeTo({ zipcode: '251' }); } }>改為251</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
