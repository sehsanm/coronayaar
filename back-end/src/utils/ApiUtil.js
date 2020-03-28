let createError = (type , message) => { 
    return {
        type: type , 
        message: message 
    }; 
}
module.exports = {
    respond: (prom, response) => {
        return prom.then((v)=> response.status(200).send(v)).
        catch((err) => {
            console.log(err); 
            if (err === null || err === undefined){
                response.status(500).send({message : "Unknown Error"}) ; 
            } else if (err.type !== null && err.type !== undefined) {
                if(err.type == 'SECURITY' || err.type == 'DATA')
                    response.status(400).send(err) ;
                else
                    response.status(500).send(err) ; 
            }
        }); 
    }, 
    
    Errors: {
        Security: (msg) => createError('SECURITY', msg), 
        Data: (msg) => createError('DATA', msg), 
        General: (type, msg) => createError(type , msg), 
    }
}