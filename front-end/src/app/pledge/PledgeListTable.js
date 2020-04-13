import React, {  } from "react";
import MaterialTable from "material-table";
import ObjectUtil from '../../components/ObjectUtil' ;


function PledgeListTable(props) {
  return (
    <div>
      <MaterialTable
        title="قرارهای تامین نیازمندی"
        detailPanel={[
          {
            render: ()=>{}
          }
        ]}
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
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} از {count}",
            labelRowsSelect: "نتیجه"
          },
          toolbar: {
            nRowsSelected: "{0}مورد انتخاب شده ",
            searchPlaceholder: "جستجو"
          },
          header: {
            actions: "Actions"
          },

          body: {
            emptyDataSourceMessage: "هیچ نتیجه ای یافت  نشد",
            filterRow: {
              filterTooltip: "Filter"
            }
          }
        }}
        data={props.data}
      />
    </div>
  );
}

export default PledgeListTable;
