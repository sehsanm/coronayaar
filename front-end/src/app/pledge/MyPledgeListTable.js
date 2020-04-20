import React, {  } from "react";
import MaterialTable from "material-table";
import ObjectUtil from '../../components/ObjectUtil' ;
import UIUtil from '../../components/UIUtil' ; 
import RequestCardLoader from '../request/RequestCardLoader' ; 
function PledgeListTable(props) {
  return (
    <div>
      <MaterialTable
        title="قرارهای تامین نیازمندی"
        detailPanel={[
          {
            render: (rowData)=> <RequestCardLoader id={rowData.request._id} /> 
          
          }
        ]}
        options={{
          search: true
        }}
        columns={[
          {
            title: "مرکز متقاضی",
            field: "request.org.orgName",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "شماره تماس",
            field: "request.org.orgPhone",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "تعداد قول داده شده",
            field: "quantity",
            render: rowData => `${rowData.quantity} -${rowData.request.type}`, 
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "تاریخ تحویل",
            field: "pledgeDate",
            render: rowData => `${ObjectUtil.toJalali(rowData.pledgeDate)} (${ObjectUtil.fromNow(rowData.pledgeDate)})`,
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
        ]}
        localization={UIUtil.TABLE_LOCALIZATION}
        data={props.data}
      />
    </div>
  );
}

export default PledgeListTable;
