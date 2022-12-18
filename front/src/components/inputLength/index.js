export const inputsLength = (stringToTest, maxLength) => {
    if(stringToTest.toString().length <= maxLength){
        return true;
    } else {
        return false
    }
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

// Ici nous appelons nos cont qui vont vérifier les différents sécurités que nous donnons à nos input 
// C'est à dire l'email, le mot de passe où nous vérifions les caractères autorisés et la longueur des textes