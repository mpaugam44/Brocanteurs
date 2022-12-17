export const inputsLength = (inputs,length = 255) => {
    for(let i=0; i< inputs.length; i++){
        let maxLength = inputs[i].maxLength || length
        let value = inputs[i].value || inputs[i]
        if(value.length > maxLength){
            return false
        }
    }
    return true
}

export const checkRegExPassword = (password) =>{
    const regEx =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?\.\_\-])(?=.{8,})/;


    if(regEx.test(password)){
        return true
    } else {
        return false
    }
}

export const checkRegExEmail = (email) =>{
     const regEx =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(regEx.test(email)){
        return true
    } else {
        return false
    }
}

