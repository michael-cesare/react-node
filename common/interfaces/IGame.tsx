export interface IMedia {
  url: string,
  title: string,
  description: string,
};

export interface IGame {
  slug: string,
  media: IMedia,
  navUrl: string,
};

export interface IGames {
  games: IGame[],
};