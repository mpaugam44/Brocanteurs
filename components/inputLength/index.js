/*export const inputLength = (input, length = 255) => {
    return input.length < length
}
*/
// on exporte notre limiteur de longueur d'input dans notre regsiter.js grâce à cette fonctione et
// une boucle for 
export const inputsLength = (inputs,length = 255) => {
    console.log(inputs)
    for(let i=0; i< inputs.length; i++){
        let maxLength = inputs[i].maxLength || length
        let value = inputs[i].value || inputs[i]
        if(value.length > maxLength){
            return false
        }
    }
    return true
}