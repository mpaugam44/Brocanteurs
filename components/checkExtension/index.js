import {fileTypeFromFile} from 'file-type'

const checkAcceptedExtensions = async (file) => {
	
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	//On définit les ext. acceptés 
	const fileType = await fileTypeFromFile(file.filepath)
	console.log(fileType)
	// on  vérifie si le type correspond à l'ext.
	// si le type et l'ext ne correspondent pas le fileType est undefined
	// sinon il contient par exemple { ext: 'png', mime: 'image/png' }

	if(!fileType) {
	return false
	}
	
	else{
	
		if(accepted.includes(fileType.ext)) {
	    return true
		}
		return false
	}	
}

export {checkAcceptedExtensions};