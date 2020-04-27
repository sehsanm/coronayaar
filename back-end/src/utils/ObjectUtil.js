module.exports = {
    objectFilter: (obj, fields) => {
        let ret = {} ; 
        fields.forEach(element => {
            if (obj[element] !== null && obj[element] !== undefined){            
                ret[element] = obj[element] ; 
            }   
        });
        return ret ; 
    }, 

    mongoProject:(fields, inclusion) => {
        let ret = {}
        fields.forEach((v) => ret[v] = inclusion); 
        return ret ; 
    },
}