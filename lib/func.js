const datefns = require('date-fns')
const add = datefns.add
const sub = datefns.sub
const max = datefns.max

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

function appendArrayWithAnotherArray(originalArr, newArr){
    let arr = originalArr
   //console.log(arr)
    for (let i of newArr){
        arr.push(i)
    }
    //console.log(arr)
    return arr
}

function findNewestDateInArrayOfObjects(arr, key, idKey="._id"){
    if (arr.length < 1){return}
    if (!keyIsInObject(arr[0],key)){return}
    let arrOfDates = arr.map(el => el[key])
    let newestDate = max(arrOfDates)
    return newestDate

}

function getCurrentDayStart(currentDate = new Date()){
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth()
    let day = currentDate.getDate()
    let currentDayStart = new Date(year, month, day)

    return currentDayStart
}

function findNextClosestInterval(currentDate, previousDate, interval){
    //let testPreviousDate = sub(previousDate, {minutes: 5, seconds: 23})
    let tempDate =  previousDate
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

module.exports = {removeItemFromArray,
    mergeObjectWithAnotherObject,
    findNewestDateInArrayOfObjects,
    findNextClosestInterval,
    getCurrentDayStart,
    appendArrayWithAnotherArray
    }
