import {useEffect, Fragment, useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import {ReducerContext} from "./reducer/reducer"
import {useNavigate} from "react-router-dom";

const Selection  =()=>{
    const [state, dispatch] = useContext( ReducerContext) 
    
    const showMarque=["2","3","4"]
    const showDecennies=["2","3","4","5"]
    
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [decennies, setDecennies] = useState([]);
    const [marques, setMarques] = useState([]);
    const navigate = useNavigate();
    
    
    const [vinyle, setVinyle] = useState("33");
    const [selectCategories, setSelectCategories]= useState(2);
    const [marque, setMarque]= useState(2);
    const [genre, setGenre]= useState(2);
    const [decennie, setDecennie]= useState(2);
    
        useEffect(() => {
    
            axios.get(`${BASE_URL}/selectXcategories`)
            .then((res) => {
            console.log(res);
                if (res.data.response === true) {
                    setCategories(res.data.categories)
                    setGenres(res.data.genres)
                    setDecennies(res.data.decennie)
                    setMarques(res.data.marque)
                }
                else {
                window.alert("Veuillez choisir une catégorie ")
                }
            })
            .catch((err) =>{
            console.log(err);
            })
        },[])
        
        
        /*const submit = (e) => {
            e.preventDefault()
            
            let data = {
                    marque,
                    decennie,
                    categories:selectCategories,
                }
            
            if(selectCategories ==='5'){
                data = {
                    decennie,
                    genre,
                    categories:selectCategories,
                    vinyle
                }  
            } 
            
            // completer URL
            // creer la route côté Back
            // creer le controller côté Back
            axios.post(`${BASE_URL}/`,data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }*/
    
    return (
        
        <div>
            <h3>Choisissez votre catégorie</h3>
            <label>
                Categorie:
                <select value={selectCategories} onChange={(e) => setSelectCategories(e.target.value)}>
                    {categories[0] && categories.map((e,i) => 
                        <option key={i} value={e.id}>{e.name}</option>
                    )}
                    
                </select>
            </label>
            
            
                {showMarque.includes(selectCategories) && 
                    <label>
                    Marque
                        <select value={marque} onChange={(e) => setMarque(e.target.value)}>
                            {marques[0] && marques.map((e,i) => <option key={i} value={e.id}>{e.name}</option>)}
                        </select>
                        
                    </label>
                }
            
            
                {selectCategories === "5" && 
                    <Fragment>
                        <label>
                            type Vinyle
                            <select value={vinyle} onChange={(e) => setVinyle(e.target.value)}>
                                <option value="33">33</option>
                                <option value="45">45</option>
                            </select>
                            
                        </label>
                        <label>
                            Genre
                            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                                {genres[0] && genres.map((e,i) => <option key={i} value={e.id}>{e.name}</option>)}
                            </select>
                        </label>
                    </Fragment>
                }
            
            {showDecennies.includes(selectCategories) && 
                <label>
                    Decennies
                    <select value={decennie} onChange={(e) => setDecennie(e.target.value)}>
                            {decennies[0] && decennies.map((e,i) => <option key={i} value={e.id}>{e.date}</option>)}
                    </select>
                </label>
            }
            
        </div>
    
    );
    
}
//<button onClick={submit}>Valider</button>

export default Selection
