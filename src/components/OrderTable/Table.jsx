import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { dateComparator } from "../../utils/helpers";

import Toolbar from "./Toolbar";
import Delete from "./Delete";
import PickupTimeStamp from "./PickupTimestamp";
import SignedAtTimeStamp from "./SignedAtTimestamp";

export default function Table({ orders, setOrders, setOrder }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOrders]);

  const toolbarDataGetter = (params) => {
    params.data.setOrder = setOrder;
    return params.data;
  };

  const rowDataGetter = (params) => {
    return params.data;
  };

  const columns = [
    {
      headerName: "",
      width: 61,
      cellRenderer: Delete,
      valueGetter: rowDataGetter,
    },
    {
      headerName: "UUID",
      field: "uuid",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 150,
    },
    {
      headerName: "Country",
      field: "country_code",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 80,
    },
    {
      headerName: "Type",
      field: "order_type",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 100,
    },
    {
      headerName: "Pick-up Address",
      field: "pu_address",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 230,
    },
    {
      headerName: "Planned Pick-up Time",
      field: "pu_planned_time",
      valueGetter: rowDataGetter,
      cellRenderer: PickupTimeStamp,
      comparator: dateComparator,
      sortable: true,
      width: 170,
    },
    {
      headerName: "Signed At",
      field: "pu_signed_at",
      valueGetter: rowDataGetter,
      cellRenderer: SignedAtTimeStamp,
      comparator: dateComparator,
      sortable: true,
      width: 150,
      filter: "agDateColumnFilter",
      filterParams: {
        // provide comparator function
        //https://www.ag-grid.com/react-data-grid/filter-date/
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue.pu_signed_at;

          if (dateAsString == null) {
            return 0;
          }

          const cellDate = new Date(dateAsString);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
    },
    {
      headerName: "",
      width: 130,
      cellRenderer: Toolbar,
      valueGetter: toolbarDataGetter,
    },
  ];

  if (!orders) return <p>No order to show</p>;

  return (
    <div className="ag-theme-alpine" style={{ height: 450, width: 1080 }}>
      <AgGridReact
        rowData={rowData.length === 0 ? orders : rowData}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        animateRows={true}
      />
    </div>
  );
}
