import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
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
    '/logout' , '/addArticle' , '/navcategorie', '/modifyArticle','/DeleteArticle', '/categorie'
]

export const adminPath = [
    "/admin",'/DeleteArticle'
]

//L'admin n'a que très peu d'accès puisqu'il peut juste supprimer
//les articles hors du concept du site ou ceux qui auraient pu dépassé 
//un délai de commentaires

//Sur ce path, nous définissons chaque url correspondant à chaque composant
// En définissant également sous quel path peut on accéder à certains url type /logout pour le user path