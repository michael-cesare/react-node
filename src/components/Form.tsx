import React, { Component } from "react";

class Form extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ""
    };
  }

  _handleChange = (event: any) => {
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
