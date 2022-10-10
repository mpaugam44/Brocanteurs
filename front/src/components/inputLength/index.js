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