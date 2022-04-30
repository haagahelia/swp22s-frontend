import React from "react"
import { AgGridReact } from 'ag-grid-react';

import Toolbar from "./Toolbar"
import PickupTimeStamp from "./PickupTimestamp";
import SignedAtTimeStamp from "./SignedAtTimestamp";

export default function Table({ orders, setOrder, signed }) {
    const toolbarDataGetter = (params) => {
        params.data.setOrder = setOrder
        return params.data
    }

    const rowDataGetter = (params) => {
        return params.data;
    };

    const columns = [
        {
            headerName: 'UUID',
            field: 'uuid',
            sortable: true,
            filter: 'agTextColumnFilter',
            width: 150,
        },
        {
            headerName: 'Country',
            field: 'country_code',
            sortable: true,
            filter: 'agTextColumnFilter',
            width: 110,
        },
        {
            headerName: 'Type',
            field: 'order_type',
            sortable: true,
            filter: 'agTextColumnFilter',
            width: 100,
        },
        {
            headerName: 'Pick-up Address',
            field: 'pu_address',
            sortable: true,
            filter: 'agTextColumnFilter',
            width: 260,
        },
        {
            headerName: 'Planned Pick-up Time',
            field: 'pu_planned_time',
            valueGetter: rowDataGetter,
            cellRenderer: PickupTimeStamp,
            sortable: true,
            width: 180,
        },
        {
            headerName: 'Signed At',
            field: 'pu_signed_at',
            valueGetter: rowDataGetter,
            cellRenderer: SignedAtTimeStamp,
            sortable: true,
            width: 180,
            filter: 'agDateColumnFilter',
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
                }
            }
        },
        {
            headerName: '',
            width: 90,
            cellRenderer: Toolbar,
            valueGetter: toolbarDataGetter
        }
    ]

    if (!orders) return <p>No order to show</p>

    return (
        <div className="ag-theme-alpine" style={{ height: 450, width: 1080}}>
            <AgGridReact
                rowData={orders}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
                animateRows={true}
            />
        </div>
    )
}
