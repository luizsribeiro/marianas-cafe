function saveObject(key, obj){
    localStorage.setItem(key, JSON.stringify(obj))
}

function getObject(key){
    return JSON.parse(localStorage.getItem(key))
}