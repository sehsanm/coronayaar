import React from 'react';
import SearchAccordion from './SearchAccordion';
import RequestList from '../request/RequestList';


export default function Home(props) {
    return <RequestList filter={{status : 'approved'  ,  quantityLeft : {$gt : 0} }} />
}