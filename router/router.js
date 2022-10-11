import express from "express";

import registerSubmit from "../controllers/register.js";
import connexionSubmit from "../controllers/login.js";
import isLogged from "../controllers/isLogged.js";
//import showForm from "../controllers/addarticle.js";
//import addArticle from "..controllers/addarticle.js";
import SelectSubCategories from "../controllers/selectXcategories.js"
//import getSelectedCategories from "../controllers/getSelectedCategories.js"

const router = express.Router();

router.post("/api/register", registerSubmit); // route back de l'enregistrement de l'utilisateur dans la BDD

router.post("/api/login", connexionSubmit); // route back de la connexion de l'utilisateur

router.get("/api/isLogged", isLogged); // route back de la co  de l'utilisateur 

//router.get("/api/form", showForm); 

//router.post("/api/add", addArticle);

router.get("/api/selectXcategories", SelectSubCategories); 

//router.post("/api/selectXcategories", getSelectedCategories)



export default router;