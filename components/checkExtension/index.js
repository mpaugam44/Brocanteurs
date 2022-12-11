import {fileTypeFromFile} from 'file-type'

const checkAcceptedExtensions = async (file,acceptedExt) => {
	
	
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
	
		if(acceptedExt.includes(fileType.ext)) {
	    return true
		}
		return false
	}	
}

export {checkAcceptedExtensions};