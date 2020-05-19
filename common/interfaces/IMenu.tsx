export interface IMenuItem {
  url: string,
  slug: string,
  name: string,
};

export interface IMenu {
  items: IMenuItem[],
};
