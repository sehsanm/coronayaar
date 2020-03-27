let  referenceData = () => {
    return {
        getProvinces : async() => {
            return Promise.resolve([
                'Tehran' , 
                'Gilan'
            ]) ; 
        } , 
        getCities: async(province) => {
            return Promise.resolve([
                'Tehran' , 
                'Eslamshahr'
            ]) ; 
        }
    }
} ; 
export default referenceData(); 

