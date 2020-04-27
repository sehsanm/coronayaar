import React, {  } from "react";
import MaterialTable from "material-table";
import RequestCardLoader from "./RequestCardLoader";
import UIUtil from '../../components/UIUtil' ; 

function detailPanelRender(rowData) {
  return <RequestCardLoader id={rowData._id} />
}

function RequestListTable(props) {
  return (
    <div>
      <MaterialTable
        title={props.title || "درخواست های کمک ثبت شده در سیستم"}
        detailPanel={[
          {
            render: detailPanelRender
          }
        ]}
        options={{
          search: true , 
          filtering: true,
        }}
        columns={[
          {
            title: "مورد نیاز",
            field: "type",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "تعداد",
            field: "quantity",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "استان",
            field: "user.profile.orgProvince",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "شهر",
            field: "user.profile.orgCity",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          },
          {
            title: "نام مرکز",
            field: "user.profile.orgName",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
          }
        ]}
        localization={UIUtil.TABLE_LOCALIZATION}
        data={props.data}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}

      />
    </div>
  );
}

export default RequestListTable;
