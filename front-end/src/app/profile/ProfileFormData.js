import Joi from '@hapi/joi' ; 
export default {
    fields: [
        {
            name: "orgName", 
            label: "نام سازمان",
            type: "text",
        },
        {
            name: "orgType", 
            label: "نوع  سازمان",
            type: "text",
            options: [
                {value: "hospital" , label:"مرکز درمانی"},
                {value: "charity" , label:"خیریه"},
                {value: "other" , label:"سایر"},
            ]
        },
        {
            name: "orgPhone", 
            label: "شماره تماس",
            type: "text",
        },
        {
            name: "orgDescription", 
            label: "توضیحات",
            type: "longtext",
        }, 
        {
            name: "orgProvince", 
            label: "استان",
            type: "text",
            dynamicOptions: true
        },        
        {
            name: "orgCity", 
            label: "شهر",
            type: "text",
            dynamicOptions: true
        },       
    ], 
    schema: Joi.object({
        orgName : Joi.string().min(5).required().error(new Error('نام سازمان را وارد کنید')) ,
        orgType: Joi.string().required().error(new Error('نوع سازمان  را وارد کنید')) ,
        orgPhone: Joi.string().pattern(/([0-9]|[۰-۹])+/).required().error(new Error('تلفن تماس  را وارد کنید')) ,
        orgDescription: Joi.string() ,
        orgProvince: Joi.string().required().error(new Error('استان  را وارد کنید')) ,
        orgCity: Joi.string().required().error(new Error('شهر  را وارد کنید')) ,

    }), 

}