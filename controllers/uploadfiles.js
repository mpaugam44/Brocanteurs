import formidable from 'formidable';
import fs from 'fs';

const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	if (accepted.includes(type)) {
	    return true
	}
	return false
}
//On appelle notre cont qui va vérifier les formats que l'on souhaite accepter

const uploadFile = (req, res) => {
    const form = formidable({keepExtensions: true});
    
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        
        if(!files.files.length){
            let newFilename = files.files.newFilename;
            let oldPath = files.files.filepath;
            let newPath = `public/img/${newFilename}`;
            const file = files.files
            if(files.originalFilename !== ''){
                if(checkAcceptedExtensions(file)){
                    fs.copyFile(oldPath, newPath, (err) => {
                        if (err) throw err;
                        res.json({response:true})
                    }) 
                }
            }
        } else {
            for(let i = 0; i < files.files.length; i++) {
                const file = files.files[i]
                let newFilename = file.newFilename;
                let oldPath = file.filepath;
                let newPath = `public/img/${newFilename}`;
                if(files.originalFilename !== ''){
                    if(checkAcceptedExtensions(file)){
                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) throw err;
                            res.json({response:true})
                        }) 
                    }
                }
            }
        }
    })
}

// Ici grâce à formidable nous allons pouvoir charger un fichier photo en l'intégrant à notre espace public
export default uploadFile