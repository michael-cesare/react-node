import React, { FC } from "react";
import ButtonBox from "./ButtonBox";

type FieldProps = {
  type: string,
  title: string,
  name: string,
  value: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

const Label: FC<FieldProps> = ({ type, title, name, value, onClick, ...otherProps }) => {
  const _handleClick = (event: any) => {
    const { value } = event.target;
    if (onClick) {
      onClick(value);
    }
  }

  let rtnBtn;
  if (type === 'form-buttom') {

  } else {
    rtnBtn = (
      <ButtonBox
        title={title}
        value={value}
        onClick={this._handleClick} 
        {...otherProps}
      />
    );
  }

  return rtnBtn;
}

export default Label;
