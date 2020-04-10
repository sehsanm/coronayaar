export default {
    validateForm: async (form , data) => {
        return new Promise((resolve, reject)=> {
            if (form.schema) {
                let {error} = form.schema.validate(data) ;
                if (error)  {
                    if (error.message)
                        reject([error.message]);
                    else if(error.details){
                        reject(error.details.map(d => d.message)); 
                    }else{
                        reject([error + '' ]) ;
                    }
                }
            }

            resolve(data); 
        });
    }
}