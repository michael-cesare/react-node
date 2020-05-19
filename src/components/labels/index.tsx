import React, { FC } from "react";
import FormLabel from "./FormLabel";
import LabelBox from "./LabelBox";

type FieldProps = {
  type: string,
  title?: string,
  name: string,
  value: string,
};

const Label: FC<FieldProps> = ({ type, title, name, value, ...otherProps }) => {
  let rtnLabel;
  if (type === 'form-label') {
    rtnLabel = (
      <FormLabel
        name={name}
        title={title}
        value={value}
        {...otherProps}
      />
    );
  } else {
    rtnLabel = (
      <LabelBox
        name={name}
        value={value}
        {...otherProps}
      />
    );
  }

  return rtnLabel;
}

export default Label;
