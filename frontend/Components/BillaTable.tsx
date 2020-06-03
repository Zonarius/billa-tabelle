import React from "react";
import { SearchResults } from "../../server/billa-client/types";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef } from "ag-grid-community";

interface Props {
  data: SearchResults
}

const columnDefs: ColDef[] = [
  {
    headerName: "Name", field: "data.name", sortable: true, resizable: true
  },
  {
    headerName: "Preis", field: "data.price.normal", sortable: true
  }
]

export default function BillaTable({ data }: Props) {
  return (
    <div
      className="ag-theme-alpine billa-tabelle"
    >
    <AgGridReact
      columnDefs={columnDefs}
      rowData={data.tiles}>
    </AgGridReact>
  </div>
  )
}