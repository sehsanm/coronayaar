export default  {
    fields : [
        {
            name: 'type' ,
            type: 'text' , 
            label:'نوع نیازمندی', 
            options : [
                {value: "دستکش" , label: "دستکش"},
                {value: "گان" , label: "گان"},
                {value: "ماسک" , label: "ماسک"},
            ],
            helper: '' 

        } , 
        {
            name: 'quantity' , 
            type: 'number', 
            label: 'تعداد مورد نیاز' , 
        },
        {
            name: 'urgency' , 
            type: 'text', 
            label: 'فوریت نیازمندی' , 
            options : [
                {value: "اورژانسی" , label: "اورژانسی"},
                {value: "فوری" , label: "فوری"},
                {value: "فرصت کافی" , label: "فرصت کافی"},
            ],
            helper: '' 
        },
        {
            name: 'description' , 
            type: 'longtext', 
            label: 'توضیحات' , 
        },
    ]
}