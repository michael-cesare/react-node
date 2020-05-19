import React, { FC } from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { IMenu } from './interfaces'

type MenuType = {
  menu: IMenu,
};

const NavBar: FC<MenuType> = ({ menu, ...otherProps }) => {
  const ssrUrl = API_BASE_URL;

  return(
    <AppBar
      position="static"
      style={{
        width: '100%',
        padding: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
      }}
      id="footer-text"
    >
      <Toolbar>
        {menu.items.map((i) => (
          <React.Fragment key={i.slug}>
            <Button
              size="small"
              color="secondary"
              href={`${ssrUrl}${i.url}`} target="_blank">
              {i.name}
            </Button>
          </React.Fragment>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;