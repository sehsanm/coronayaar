import Joi from '@hapi/joi' ; 
export default {
    fields: [
        {
            name: "quantity",
            type: "number",
            label: "تعدادی که می توانید تامین کنید", 

        }, 
        {
            name: "pledgeDate", 
            type: "date", 
            label: "تاریخ تخمینی تحویل"
        },
        {
            name: "description", 
            type: "longtext",
            label: "توضیحات"
        }
    ],
    schema: Joi.object({
        quantity: Joi.number().required().min(1).error(new Error('تعداد باید عددی بیشتر از یک باشد')), 
        pledgeDate: Joi.any().required(), 
        description: Joi.string()
    }), 
    
}