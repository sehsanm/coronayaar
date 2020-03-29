export default  {
    fields : [
        {
            name: 'type' ,
            type: 'text' , 
            label:'نوع نیازمندی', 
            options : [
                {label: "ماسک N95", value: "ماسک N95"},
                {label: "ماسک N99", value: "ماسک N99"},
                {label: "ماسک جراحی", value:"ماسک جراحی"},
                {label: "شیلد", value:"شیلد"},
                {label: "گان", value:"گان"},
                {label:   "لباس سرهمی", value:  "لباس سرهمی"},
                {label: "سرآستین", value:"سرآستین"},
                {label:"محلول آنتی‌سپتیک" , value:"محلول آنتی‌سپتیک"},
                {label: "الکل", value:"الکل"},
                {label:   "عینک محافظ", value:  "عینک محافظ"},
                {label: "دستکش لاتکس", value:"دستکش لاتکس"},
                {label: "دستکش استریل" , value: "دستکش استریل"},
  
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