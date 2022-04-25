import React from "react"
import { AgGridReact } from 'ag-grid-react';

import Toolbar from "./Toolbar"
import PickupTimeStamp from "./PickupTimestamp";
import SignedAtTimeStamp from "./SignedAtTimestamp";

export default function Table({ orders, setOrder }) {
    const toolbarDataGetter = (params) => {
        params.data.setOrder = setOrder
        return params.data
    }

    // const onRowClicked = (e) => {
    //     setSelected(e.data)
    // }
    
    /**
     * When a user click on a row to display in a view the content 
     */
    // function onRowClicked(e) {
    //     try {
    //         if (e.data === undefined) {
    //         alert(
    //             'Could not open the signature'
    //         )
    //         } else {
    //         props.setShowOneSig(e.data)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         alert(
    //         'Could not open the signature: ', error
    //         )
    //     }
    
    // }

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
            headerName: 'Order Type',
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
            width: 200,
        },
        {
            headerName: 'Signed At',
            field: 'pu_signed_at',
            valueGetter: rowDataGetter,
            cellRenderer: SignedAtTimeStamp,
            sortable: true,
            width: 200,
        },
        {
            headerName: '',
            width: 70,
            cellRenderer: Toolbar,
            valueGetter: toolbarDataGetter
        }
    ];

    if (!orders) return <p>No order to show</p>

    return (
        <div className="ag-theme-alpine" style={{ height: 450, width: 1100 }}>
            <AgGridReact
                rowData={orders}
                // onRowClicked={(e) => onRowClicked(e)}
                // components={components}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
                animateRows={true}
            />
        </div>
    )
}
