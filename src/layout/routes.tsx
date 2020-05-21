import HomePage from "../views/homePage";
import LoginPage from "../views/loginPage";
import ProfilePage from "../views/profilePage";

export default [
    {
        path: "/",
        component: HomePage,
        isPrivate: false,
        exact: true,
    },
    {
        path: "/home",
        component: HomePage,
        isPrivate: false,
        exact: true,
    },
    {
        path: "/login",
        component: LoginPage,
        isPrivate: false,
        exact: true,
    },
    {
        path: "/profile",
        component: ProfilePage,
        isPrivate: true,
        exact: true,
    },
];