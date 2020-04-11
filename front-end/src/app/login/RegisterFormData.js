import Joi from '@hapi/joi' ; 
export default {
    fields: [
        {
            name: "name", 
            type: "text", 
            label: "نام و  نام خانوادگی"
        },
        {
            name: "username",
            type: "text",
            label: "شماره موبایل", 

        }, 
        {
            name: "nationalCode", 
            type: "text",
            label: "شماره ملی"
        },
        {
            name: "password", 
            type: "password",
            label: "رمز عبور"
        },
    ],
    schema: Joi.object({
        name: Joi.string().required().min(5).error(new Error('نام و نام خانوادگی را وارد کنید')),
        username: Joi.string().required().pattern(/([0-9]|[۰-۹]){11}/).error(new Error('شماره موبایل با صفر را وارد کنید')),
        nationalCode: Joi.string().required().pattern(/([0-9]|[۰-۹]){10}/).error(new Error('کد ملی ۱۰ رقمی وارد کنید')),
        password: Joi.string().required().min(6).error(new Error('رمز عبور حداقل باید ۶ کاراکتر انگلیسی باشد')),

    }), 
    
}