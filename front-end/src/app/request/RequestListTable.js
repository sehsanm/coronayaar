import React, { useState, useEffect,  } from 'react' ; 
import MaterialTable from 'material-table' ; 
import authProvider from '../../services/AuthService';
import userService from '../../services/UserService';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton, Chip, Avatar, CardContent, Card , Typography} from '@material-ui/core'


function detailPanelRender(rowData) { 
    return (<Card>
        <CardContent>
            <Typography variant="body2" component="p">{rowData.org.orgName}</Typography>
            <Typography variant="body2" component="p">{rowData.org.orgDescription}</Typography>
        </CardContent>
    </Card>); 
}

function RequestListTable(props) {
    return (
        <div>
            <MaterialTable
                title="درخواست های کمک ثبت شده در سیستم"
                detailPanel=
                {[{
                    render: detailPanelRender, 
                }]}

                options={
                    {
                        search: true,
                    }
                } 
                columns={[
                    {title: "مورد نیاز" , field: "type" , cellStyle: {textAlign:"center" }}, 
                    {title: "تعداد" , field: "quantity" , cellStyle:{textAlign:"center" }}, 
                    {title: "فوریت" , field: "urgency" , cellStyle: {textAlign:"center" }}, 
                    {title: "استان" , field: "org.orgProvince", cellStyle: {textAlign:"center" }},
                    {title: "شهر" , field: "org.orgCity", cellStyle: {textAlign:"center" }},
                    {title: "نام مرکز" , field: "org.orgName", cellStyle: {textAlign:"center" }}, 
                                 
                ]}

                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} از {count}' , 
                        labelRowsSelect: 'نتیجه'
                    },
                    toolbar: {
                        nRowsSelected: '{0}مورد انتخاب شده ' , 
                        searchPlaceholder: "جستجو"
                    },
                    header: {
                        actions: 'Actions'
                    },

                    body: {
                        emptyDataSourceMessage: 'هیچ نتیجه ای یافت  نشد',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
                
                data={props.data}
            />
        </div>
    ); 
}

export default RequestListTable ; 