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
    
    const handleChange = (value, type) => {
        const data = {
            ...allData
        }
        data[type] = value
        if(type === 'categorie' && value !== '5'){
            // setAllData({...allData, vinyle: '', genre:''})
            data['vinyle'] = ''
            data['genre'] = ''
        } else if (type === 'categorie' && value ==='5'){
            data['vinyle'] = '1'
            data['genre'] = '1'
        }

        setAllData(data)
        updateForm(data)
    }
    
    
    return (
        
        <div>
            <h3>Choisissez votre catégorie</h3>
            <label>
                Categorie:
                <select value={allData.categorie} required onChange={(e) => handleChange(e.target.value,'categorie')}>
                    {categories[0] && categories.map((e,i) => 
                        <option key={i} value={e.id}>{e.name}</option>
                    )}
                    
                </select>
            </label>
            
            {showMarque.includes(allData.categorie) && 
                <label>
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
                    <label>
                        type Vinyle
                        <select value={allData.vinyle} required onChange={(e) => handleChange(e.target.value,'vinyle')}>
                            <option value="1">33 RPM</option>
                            <option value="2">45 RPM</option>
                        </select>
                    </label>
                    <label>
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
                <label>
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
