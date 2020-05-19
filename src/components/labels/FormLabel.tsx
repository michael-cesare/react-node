import React, { FC } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

type FieldProps = {
  title: string,
  name: string,
  value: string,
};

const Label: FC<FieldProps> = ({ title, name, value, ...otherProps }) => {
  return (
    <FormControl>
      <InputLabel htmlFor={`${name}-input`}>{title}</InputLabel>
      <Input id={name} aria-describedby={`${name}-text`} />
      <FormHelperText id={`${name}-text`}>{value}</FormHelperText>
    </FormControl>
  );
}

export default Label;
