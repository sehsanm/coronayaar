import React, {  } from "react";
import MaterialTable from "material-table";
import ObjectUtil from '../../components/ObjectUtil' ;
import UIUtil from '../../components/UIUtil' ; 

function PledgeListTable(props) {
  return (
    <div>
      <MaterialTable
        title="قرارهای تامین نیازمندی"
        options={{
          search: true
        }}
        columns={[
          {
            title: "سازمان تامین کننده",
            field: "user.profile.orgName",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "کاربر",
            field: "user.name",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "شماره تماس",
            field: "user.profile.orgPhone",
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
