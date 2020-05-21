import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type ButtonProps = {
  value: string,
}

const ButtonBox: FC<ButtonProps> = ({ value }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      type="submit"
      color="secondary"
    >
      {value}
    </Button>
  );
}

export default ButtonBox;
