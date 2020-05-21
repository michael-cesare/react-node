export interface IUser {
  username: string,
  password: string|null,
  name: string,
  email: string,
  id: string,
  groupName: string,
};

export interface IUsers {
  users: IUser[],
};

export const newUser = () => {
  const user:IUser = ({
    username: '',
    password: null,
    name: '',
    email: '',
    id: '',
    groupName: '',
  })

  return user
};

export const mapUser = (obj) => {
  const user:IUser = ({
    username: obj && obj.username ? obj.username: '',
    password: obj && obj.password ? obj.password: null,
    name: obj && obj.name ? obj.name: '',
    email: obj && obj.email ? obj.email: '',
    id: obj && obj.id ? obj.id: '',
    groupName: obj && obj.groupName ? obj.groupName: '',
  })

  return user
};