import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
import Profil from "../components/profil";
import Admin from "../components/admin";
import Logout from "../components/logout";
import AddArticle from "../components/addarticle";
import ShowArticle from "../components/articles"
import ArticleDetails from "../components/articledetails"
import ModifyArt from "../components/articlesmodify"
import DeleteArt from "../components/deletearticle"
import GetCategorie from "../components/categorie"
import Error404 from "../components/error404"
import NavCategorie from "../components/navcategories"
export const routes = [
   
    { path:'/', element:<Home /> },
    { path:'/register', element:<Register/> },
    { path:'/login', element:<Login /> },
    { path:'/profil', element:<Profil /> },
    { path:'/admin', element:<Admin /> },
    { path:'/*', element:<Error404 /> },
    { path:'/logout', element:<Logout /> },
    { path :'/addArticle', element:<AddArticle/> },
    { path :'/articles', element:<ShowArticle/> },
    { path :'/articledetails/:id', element:<ArticleDetails/> },
    { path :'/modifyArticle/:id', element:<ModifyArt/> },
    { path :'/DeleteArticle/:id', element:<DeleteArt/> },
    { path :'/categorie/:id', element:<GetCategorie/> },
    { path :'/navcategorie', element:<NavCategorie />}
    
]


export const userPath = [
    '/profil', '/logout'   
    
]


export const adminPath = [
    "/admin"
]

