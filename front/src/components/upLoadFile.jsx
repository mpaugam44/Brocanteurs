import {Fragment,useContext} from 'react'
import BASE_URL from "../config/API.js"
import axios from 'axios'
import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
     const [state, dispatch] = useContext(AppContext)
    
    const submit = (e) => {
        e.preventDefault()
       // const username = "Pseudo"
        const dataFile = new FormData();
        const pictures = {...e.target.photos.files};
        
        // ajouter d'autre input au formulaire
       // dataFile.append('username', username)
        
        // L'image
        dataFile.append('pictures', pictures[0], pictures[0].url)
        
        axios.post(`${BASE_URL}/uploadFile`, dataFile)
        .then((res)=> {
            console.log(res)
            res.data.response && console.log('succesfully upload');
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <Fragment>
            <h1>Ajouter photos</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='photos'>
                    <input type='file' multiple name='photos'/>
                    <input type='submit' value='Submit'/>
                </label>
            </form>
        </Fragment>
    )
}

export default UploadFile