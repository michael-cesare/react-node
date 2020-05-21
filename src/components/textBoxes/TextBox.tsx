import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

interface TextBoxProps {
  title: string,
  value: string,
  onChange: (event: React.EventHandler<React.MouseEvent<TextEvent>>) => void,
  otherProps?: any,
  isPassword?: boolean,
};

const TextBox: FC<TextBoxProps> = ({ title, value, onChange, ...otherProps }) => {
  const _handleChange = (event: any) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
  }

  const fieldType = otherProps && otherProps.isPassword ? 'password' : 'text';

  return (
    <Box color="text.primary">
      <TextField
        label={title}
        type={fieldType}
        variant="outlined"
        color="primary"
        value={value}
        onChange={_handleChange}
      />
    </Box>
  );
}

export default TextBox;
