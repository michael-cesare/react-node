import React, { FC } from "react";
import Typography from '@material-ui/core/Typography'
import styled from "styled-components";

const FooterContainer = styled.div`
  width:100%;
  background-color: grey;
  display:block;
  color: white;
  padding: 0;
`;

const Footer: FC<any> = ({ ...otherProps }) => {
  return (
    <FooterContainer>
      <footer>
        <Typography>
          {`© ${new Date().getFullYear()} Copyright: github.com! All Rights Reserved`}
        </Typography>
      </footer>
    </FooterContainer>
  );
}

export default Footer;
