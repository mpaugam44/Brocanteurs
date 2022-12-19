import {fileTypeFromFile} from 'file-type'

const checkAcceptedExtensions = async (file,acceptedExt) => {
	
	const fileType = await fileTypeFromFile(file.filepath)
	// on  vérifie si le type correspond à l'ext.
	// si le type et l'ext ne correspondent pas le fileType est undefined
	

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