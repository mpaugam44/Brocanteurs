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

const uploadFile = (req, res) => {
    const form = formidable({keepExtensions: true});
    
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        
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
    })
}


export default uploadFile