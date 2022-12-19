import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'

const Selection=({updateForm, value})=>{
    
    const showMarque=["2","3","4"]
    const showDecennies=["2","3","4","5"]
    
    const [allData, setAllData] = useState({
            categorie:"2",
            marque:"1",
            genre:"",
            decennie:"1",
            vinyle:"",
        });
    
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [decennies, setDecennies] = useState([]);
    const [marques, setMarques] = useState([]);
    
    //On appelle ici tout nos states nécessaires pour aller selectionner les informations qu'on va utiliser pour le addarticle
    
    useEffect(() => {
        if(value){
            setAllData(value)
        }
    },[])
    
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
    
    // On récupère grâce à notre axios get les datas de l'article qu'on va ensuite ajouter grâce au addarticle vers la bd
    
    const handleChange = (value, type) => {
        const data = {
            ...allData
        }
        data[type] = value
        if(type === 'categorie' && value !== '5'){
            
            data['vinyle'] = ''
            data['genre'] = ''
        } else if (type === 'categorie' && value ==='5'){
            data['vinyle'] = '1'
            data['genre'] = '1'
        }
       
        setAllData(data)
        updateForm(data)
    }
    
    //On permet à notre select de prendre la la bonne la bonne value pour les categories qui découlent elles mêmes vers d'autres catégories.
    // Dans le return on recupere alldata de chaque categorie en dévelppant un rendu conditionnel pour chacune des catégories qui va inclure une autre catégories ou non.
    
    return (
        
        <div className="select-wrapper">
            <h2>Choisissez votre catégorie</h2>
            <label className="label_uniform">
                Categorie:
                
                <select value={allData.categorie} required onChange={(e) => handleChange(e.target.value,'categorie')}>
                    {categories[0] && categories.map((e,i) => 
                        <option key={i} value={e.id}>{e.name}</option>
                    )}
                    
                </select>
            </label>
            
            {showMarque.includes(allData.categorie) && 
                <label className="label_uniform">
                    Marque
                    <select value={allData.marque} required onChange={(e) => handleChange(e.target.value,'marque')}>
                        {marques[0] && marques.map((e,i) => {
                            return (<option key={i} value={e.id}>{e.name}</option>)})
                        }
                    </select>
                </label>
            }
            
            {allData.categorie === "5" && 
                <Fragment>
                    <label className="label_uniform">
                         Vinyle
                        <select value={allData.vinyle} required onChange={(e) => handleChange(e.target.value,'vinyle')}>
                            <option value="1">33 RPM</option>
                            <option value="2">45 RPM</option>
                        </select>
                    </label>
                    <label className="label_uniform">
                        Genre
                        <select value={allData.genre} required onChange={(e) => handleChange(e.target.value,'genre')}>
                            {genres[0] && genres.map((e,i) => { 
                                return (
                                    <option key={i} value={e.id}>{e.name}</option>)}
                                )
                            }
                        </select>
                    </label>
                </Fragment>
            }
            
            {showDecennies.includes(allData.categorie) && 
                <label className="label_uniform">
                    Decennies
                    <select value={allData.decennie} required onChange={(e) => handleChange(e.target.value,'decennie')}>
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
