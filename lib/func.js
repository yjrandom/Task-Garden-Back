
function removeItemFromArray(valueToFind, arr){

    if (Array.isArray(arr)){
        let index = arr.indexOf(valueToFind)
        console.log(index)
        if (index >= 0){
            arr.splice(index, 1)
        }
    }
    return arr
}

module.exports = {removeItemFromArray}