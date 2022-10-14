import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'

const Selection=({updateForm})=>{
    
    const showMarque=["2","3","4"]
    const showDecennies=["2","3","4","5"]
    
    const [allData, setAllData] = useState({
            categorie:null,
            marque:null,
            genre:null,
            decennie:null,
            vinyle:null,
        });
    
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [decennies, setDecennies] = useState([]);
    const [marques, setMarques] = useState([]);
    
    
    const [vinyle, setVinyle] = useState("33");
    const [selectCategories, setSelectCategories]= useState(2);
    const [marque, setMarque]= useState(2);
    const [genre, setGenre]= useState(2);
    const [decennie, setDecennie]= useState(2);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/selectXcategories`)
        .then((res) => {
            
            if (res.data.response === true) {
                setCategories(res.data.categories)
                setGenres(res.data.genres)
                setDecennies(res.data.decennie)
                setMarques(res.data.marque)
            } else {
                window.alert("Veuillez choisir une catégorie ")
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    },[])
    
    const handleChange = (value, type) => {
        const data = {
            ...allData
        }
        if(type === 'categorie'){
            setSelectCategories(value)
            data.categorie = value
            setAllData(data)
        } else if(type === 'marque'){
            setMarque(value)
            data.marque = value
            setAllData(data)
        } else if(type === 'vinyle'){
            setVinyle(value)
            data.vinyle = value
            setAllData(data)
        } else if(type === 'genre'){
            setGenre(value)
            data.genre = value
        } else if(type === 'decennie'){
            setDecennie(value)
            data.decennie = value
            setAllData(data)
        }
        
        updateForm(data)
    }
        
    return (
        
        <div>
            <h3>Choisissez votre catégorie</h3>
            <label>
                Categorie:
                <select value={selectCategories} onChange={(e) => handleChange(e.target.value,'categorie')}>
                    {categories[0] && categories.map((e,i) => 
                        <option key={i} value={e.id}>{e.name}</option>
                    )}
                    
                </select>
            </label>
            
            {showMarque.includes(selectCategories) && 
                <label>
                    Marque
                    <select value={marque} onChange={(e) => handleChange(e.target.value,'marque')}>
                        {marques[0] && marques.map((e,i) => {
                            return (<option key={i} value={e.id}>{e.name}</option>)})
                        }
                    </select>
                </label>
            }
            
            {selectCategories === "5" && 
                <Fragment>
                    <label>
                        type Vinyle
                        <select value={vinyle} onChange={(e) => handleChange(e.target.value,'vinyle')}>
                            <option value="1">33 RPM</option>
                            <option value="2">45 RPM</option>
                        </select>
                    </label>
                    <label>
                        Genre
                        <select value={genre} onChange={(e) => handleChange(e.target.value,'genre')}>
                            {genres[0] && genres.map((e,i) => { 
                                return (
                                    <option key={i} value={e.id}>{e.name}</option>)}
                                )
                            }
                        </select>
                    </label>
                </Fragment>
            }
            
            {showDecennies.includes(selectCategories) && 
                <label>
                    Decennies
                    <select value={decennie} onChange={(e) => handleChange(e.target.value,'decennie')}>
                        {decennies[0] && decennies.map((e,i) => {
                            return(<option key={i} value={e.id}>{e.date}</option>)})
                        }
                    </select>
                </label>
            }
        </div>
    );
}

export default Selection
