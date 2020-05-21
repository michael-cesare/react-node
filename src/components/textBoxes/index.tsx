import React, { FC } from "react";
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";

type TextBoxProps = {
  title: string,
  value: string,
  onChange: (event: React.MouseEvent<TextEvent>) => void,
};

const TextBox: FC<TextBoxProps> = ({ title, value, onChange, ...otherProps }) => {
  const _handleClick = (event: any) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
  }

  return (
     <Box my={4}>
      <TextField
        label="Filled"
        variant="filled"
        color="secondary"
        value={value}
        onChange={this._handleChange}
      />
    </Box>
  );
}

export default TextBox;
