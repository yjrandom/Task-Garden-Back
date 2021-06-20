
function removeItemFromArray(valueToFind, arr){
    if (Array.isArray(arr)){
        let index = arr.indexOf(valueToFind)
        if (index >= 0){
            arr.splice(index, 1)
        }
    }
    return arr
}

function mergeObjectWithAnotherObject(originalObject, newObject){
    for (let key in newObject){
        originalObject[key] = newObject[key]
    }
    return originalObject
}

module.exports = {removeItemFromArray, mergeObjectWithAnotherObject}