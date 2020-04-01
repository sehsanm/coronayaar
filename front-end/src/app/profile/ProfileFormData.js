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
    ]
}