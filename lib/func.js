const datefns = require('date-fns')
const add = datefns.add
const sub = datefns.sub

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

function findNewestDateInArrayOfObjects(arr, key, idKey="._id"){
    if (arr.length < 1){return}
    if (!keyIsInObject(arr[0],key)){return}

    let newestDateObj = {}
    newestDateObj[key] = new Date(1971)
    newestDateObj[idKey] = "0"

    arr.forEach((el, i)=>{
        if (el[key] > newestDateObj[key]){
            newestDateObj[key] = el[key]
            newestDateObj[idKey] = el[idKey]
        }
    })
    return newestDateObj
}

function findNextClosestInterval(currentDate, previousDate, interval){
    //let testPreviousDate = sub(previousDate, {minutes: 5, seconds: 23})
    let tempDate =  previousDate //

    while (tempDate < currentDate){
        tempDate = add(tempDate,interval)
    }
    return tempDate
}

function keyIsInObject(obj, keyToFind){
    let keyIsInside = false
    for (let key in obj){
        if(key === keyToFind){
            keyIsInside = true
        }
    }
    return keyIsInside
}

module.exports = {removeItemFromArray, mergeObjectWithAnotherObject, findNewestDateInArrayOfObjects, findNextClosestInterval}