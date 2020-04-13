import fa from "moment/locale/fa";
import jMoment from "moment-jalaali";

jMoment.locale("fa", fa);
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

let persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g
];
let arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g
];

let englishNumbers = [
    /0/g,
    /1/g,
    /2/g,
    /3/g,
    /4/g,
    /5/g,
    /6/g,
    /7/g,
    /8/g,
    /9/g
];

export default {
    validateForm: async (form, data) => {
        return new Promise((resolve, reject) => {
            if (form.schema) {
                let { error } = form.schema.validate(data);
                if (error) {
                    if (error.message)
                        reject([error.message]);
                    else if (error.details) {
                        reject(error.details.map(d => d.message));
                    } else {
                        reject([error + '']);
                    }
                }
            }

            resolve(data);
        });
    },

    fixNumbers: function (str) {
        if (typeof str === "string") {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    },

    toPersian: function (str) {
        if (typeof str === "string") {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    },


    toJalali: (dateObj) => jMoment(dateObj).format('jYYYY/mm/DD'),
    fromNow: (dateObj) => jMoment(dateObj).fromNow(),
}