import React, { Component } from "react";
import ReactDOM from 'react-dom';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };
  }

  _handleChange = (event) => {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    const { value } = this.state;

    return (
      <form>
        <input
          type="text"
          value={value}
          onChange={this._handleChange}
        />
        test
      </form>
    );
  }
}

export default Form;
