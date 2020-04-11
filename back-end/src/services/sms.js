
var Kavenegar = require('kavenegar');

module.exports = function (services) {
    let api = Kavenegar.KavenegarApi({ apikey: services.env.sms.apiKey });
    let sender = services.env.sms.sender;
    return Promise.resolve({
        send: async (message, receptor) => {
            return new Promise((resolve, reject) => {
                api.Send({ message: message, receptor: receptor, sender: sender } , function(response, status){
                    if (status !== 200) {
                        reject(response) ; 
                    }else {
                        resolve(response); 
                    }
                })

            });
        }
    });
}
