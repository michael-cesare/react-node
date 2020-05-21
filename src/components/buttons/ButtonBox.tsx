import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type ButtonProps = {
  value: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonBox: FC<ButtonProps> = ({ value, onClick, ...otherProps }) => {
  const _handleClick = (event: any) => {
    if (onClick) {
      onClick(event);
    }
  }
  return (
    <Box color="text.primary">
      <Button
        onClick={this._handleClick}
        {...otherProps}
      >
        {value}
      </Button>
    </Box>
  );
}

export default ButtonBox;
