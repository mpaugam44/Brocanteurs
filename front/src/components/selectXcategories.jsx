import {useEffect, Fragment, useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import {ReducerContext} from "./reducer/reducer"

const Selection  =()=>{
    const [state, dispatch] = useContext( ReducerContext) 
    
    const showMarque=[
        "tourne disque",
        "enceintes",
        "ampli"
    ]
    
    const showDecenies=[
        "tourne disque",
        "enceintes",
        "ampli",
        "vinyle"
    ]
    
    const [categories, setCategories] = useState([]);
    
    
    
    const [vinyle, setVinyle] = useState("33");
    const [selectCategories, setSelectCategories]= useState('vinyle');
    const [marque, setMarque]= useState('marque');
    const [genre, setGenre]= useState('genres');
    const [decenie, setDecenie]= useState('decenie');
    
    
    
    return (
        
        <div>
            <h3>Choisissez votre catégorie</h3>
            <select value={selectCategories} onChange={(e) => setSelectCategories(e.target.value)}>
                <option value ="vinyle">Vinyles</option>
                <option value = "enceintes">Enceintes</option>
                <option value = "ampli">Ampli</option>
                <option value = "tourne disque">Tourne disque</option>
            </select>
            
            {showMarque.includes(selectCategories) && 
                <select value={marque} onChange={(e) => setMarque(e.target.value)}>
                    <option value ="marque">Les marque</option>
                </select>
            }
            
            {selectCategories === "vinyle" && 
                <Fragment>
                    <select value={vinyle} onChange={(e) => setVinyle(e.target.value)}>
                        <option value ="33">33</option>
                        <option value ="45">45</option>
                    </select>
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value ="genres">Les genres</option>
                    </select>
                </Fragment>
            }
            
            {showDecenies.includes(selectCategories) && 
                <select value={decenie} onChange={(e) => setDecenie(e.target.value)}>
                    <option value ="decenie">Les decenies</option>
                </select>
            }
        </div>
    
    );
    
}

export default Selection
