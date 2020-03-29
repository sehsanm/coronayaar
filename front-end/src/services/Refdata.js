import provinces from './province.json'
import cities from './cities.json'
let  referenceData = () => {
    let p = provinces.map(pp => pp.name) ; 
    let cityMap = {} ; 
    cities.forEach(element => {
        if  (cityMap[element.province] === null || cityMap[element.province] === undefined) {
            cityMap[element.province] = [] ; 
        }   
        cityMap[element.province].push(element.city)
    });
    return {
        getProvinces : async() => {
            return Promise.resolve(p) ; 
        } , 
        getCities: async(province) => {
            console.log(province) ; 
            if (cityMap[province]) {
                return Promise.resolve(cityMap[province]) ;
            }else{
                return Promise.resolve([]);
            }  
        }
    }
} ; 
export default referenceData(); 

