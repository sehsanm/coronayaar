module.exports = {
    objectFilter: (obj, fields) => {
        let ret = {} ; 
        console.log('-->' , obj);
        fields.forEach(element => {
            console.log('----' , element , '-' , obj[element]); 
            if (obj[element] !== null && obj[element] !== undefined){
            
                ret[element] = obj[element] ; 
                console.log(ret , element); 
            }   
        });
        return ret ; 
    }
}