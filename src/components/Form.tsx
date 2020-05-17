import React from "react";

class Form extends React.Component {
  state = {
    value: "",
  };

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
      </form>
    );
  }
}

export default Form;
