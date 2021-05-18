import React from 'react';
import './Inputs.css';

class Inputs extends React.Component {
    constructor(props) {
      super(props);
      this.handleClickSearch = this.handleClickSearch.bind(this);
      this.handleClickGenerateError = this.handleClickGenerateError.bind(this);
    }

    handleClickSearch(e) {
        this.props.onClickSearch();
    }

    handleClickGenerateError(e) {
            this.props.onClickGenerateError();
        }
  
    render() {
      return (
          <div className="Logger">
            <button onClick={this.handleClickGenerateError}>Log Error</button><br/>
            <button onClick={this.handleClickSearch}>Search</button><br/>
          </div>
        );
    }
  }

  export default Inputs;