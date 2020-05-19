import React, { FC } from "react";

import NavBar from './navBar';
import { IMenuItem, IMenu } from './interfaces'

type HeaderProps = {
};

const Header: FC<HeaderProps> = ({ ...otherProps }) => {
  const _handlePageClick = (pageSlug: string) => {
    if (console) {
      console.log(pageSlug);
    }
  }

  const getMenu = () => {
    const item1: IMenuItem = {
      url: '/profile',
      slug: 'profile',
      name: 'profile',
    };
    const item2: IMenuItem = {
      url: '/login',
      slug: 'login',
      name: 'login',
    };
    const data:IMenu = {
      items: [item1, item2]
    };

    return data;
  }

  const menu = getMenu();

  return (
    <NavBar
      menu={menu}
    />
  );
}

export default Header;
