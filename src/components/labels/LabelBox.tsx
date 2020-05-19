import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography'

type FieldProps = {
  name: string,
  value: string,
};

const LabelBox: FC<FieldProps> = ({ name, value, ...otherProps }) => {
  return (
    <Box component="span" m={1}>
      <Typography
        variant="h5"
        component="h2"
        color="inherit"
        gutterBottom
        style={{ color: 'white', textAlign: 'center' }}
      >
        <span
          className={`${name}-input`}
          {...otherProps}
        >
          {value}
        </span>
      </Typography>
    </Box>
  );
}

export default LabelBox;
