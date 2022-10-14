import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
import Profil from "../components/profil";
import Admin from "../components/admin";
import Logout from "../components/logout";
import AddArticle from "../components/addarticle";


export const routes = [
    { path:'/', element:<Home /> },
    { path:'/register', element:<Register/> },
    { path:'/login', element:<Login /> },
    { path:'/profil', element:<Profil /> },
    { path:'/admin', element:<Admin /> },
    { path:'/logout', element:<Logout /> },
    { path : '/addArticle', element:<AddArticle/> },
   
]


export const userPath = [
    '/profil', '/logout'   
    
]


export const adminPath = [
    "/admin"
]

