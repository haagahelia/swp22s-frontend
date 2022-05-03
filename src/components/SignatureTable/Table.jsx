import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';

import SignatureImg from './SignatureImg';
import TimeStamps from './TimeStamps';

function Table({ orders, setSignature }) {
  const navigate = useNavigate()

  const [components] = useState({
    'signatureImgComponent': SignatureImg
  })

  const rowDataGetter = (params) => {
    return params.data;
  };

  /**
   * When a user click on a row to display in a view the content 
   */
  function onRowClicked(e) {
    setSignature(e.data)
    navigate(e.data.uuid)
  }

  const columns = [
    {
      headerName: "Order's UUID",
      field: 'uuid',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 220,
    },
    {
      headerName: 'Image',
      cellRenderer: SignatureImg,
      valueGetter: rowDataGetter,
      sortable: false,
      filter: false,
      width: 220,
    },
    {
      headerName: 'Signed At',
      field: 'pu_signed_at',
      valueGetter: rowDataGetter,
      cellRenderer: TimeStamps,
      sortable: true,
      width: 140,
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
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 450, width: 600 }}>
      <AgGridReact
        rowData={orders}
        onRowClicked={(e) => onRowClicked(e)}
        components={components}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        animateRows={true}
        rowHeight={110}
      />
    </div>
  );
}

export default Table;
