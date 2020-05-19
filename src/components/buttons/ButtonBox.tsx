import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type ButtonProps = {
  title: string,
  value: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonBox: FC<ButtonProps> = ({ title, value, onClick, ...otherProps }) => {
  const _handleClick = (event: any) => {
    const { value } = event.target;
    if (onClick) {
      onClick(value);
    }
  }

  return (
    <Box color="text.primary">
      <Button onClick={this._handleClick} {...otherProps} >
        {value}
      </Button>
    </Box>
  );
}

export default ButtonBox;
