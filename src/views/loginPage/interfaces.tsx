
// import { IUser } from '../../../common/interfaces/IUser'

interface ILoginForm {
  username?: string,
  password?: string,
};

interface ILoginPage {
  loginForm: ILoginForm,
};

export {
  ILoginPage,
  ILoginForm,
};
