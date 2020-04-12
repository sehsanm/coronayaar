const statusMapping = {
    approved: 'تایید شده',
    rejected: 'رد شده' , 
    pending: 'در انتظار تایید'
}
export default {
    convertStatus: (status)=> {
        return statusMapping[status] ; 
    }
}