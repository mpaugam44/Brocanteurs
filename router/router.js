import express from "express";

import registerSubmit from "../controllers/register.js";
import connexionSubmit from "../controllers/login.js";
import {isLogged} from "../controllers/isLogged.js";
import {articleDetails, AddComs} from "../controllers/articlesdetails.js";
import {showComs} from "../controllers/coms.js";
import {addArticle} from "../controllers/addarticle.js";
import SelectSubCategories from "../controllers/selectXcategories.js"
import {showArticle} from "../controllers/articles.js"

const router = express.Router();

router.post("/api/register", registerSubmit); // route back de l'enregistrement de l'utilisateur dans la BDD

router.post("/api/login", connexionSubmit); // route back de la connexion de l'utilisateur

router.get("/api/articledetails/:id", articleDetails); 

router.post("/api/addArticle", addArticle);

router.get("/api/selectXcategories", SelectSubCategories); 

router.get("/api/articles", showArticle); 


router.post("/api/addComs/:id", AddComs);
router.post("/api/isLogged", isLogged);

router.get("/api/showComs/", showComs);



export default router;