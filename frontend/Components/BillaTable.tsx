import React from "react";
import { SearchResultsWithInfos, SearchResultWithInfos } from "../../server/billa-client/types";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, ValueFormatterParams } from "ag-grid-community";

interface Props {
  data: SearchResultsWithInfos
}

const suffixFormatter = (suffix: string) => (params: ValueFormatterParams) => params.value ? params.value + suffix : "";

const columnDefs: ColDef[] = [
  {
    headerName: "Name", field: "name", sortable: true, resizable: true
  },
  {
    headerName: "Preis/kg", field: "preispkg", sortable: true, valueFormatter: suffixFormatter("€")
  },
  {
    headerName: "Energie", field: "energie", sortable: true, valueFormatter: suffixFormatter(" kcal")
  },
  {
    headerName: "Fett", field: "fett", sortable: true, valueFormatter: suffixFormatter("g")
  },
  {
    headerName: "Kohlenhydrate", field: "kohlenhydrate", sortable: true, valueFormatter: suffixFormatter("g")
  },
  {
    headerName: "Kohlenhydrate ohne Zucker", field: "khOhneZucker", sortable: true, valueFormatter: suffixFormatter("g")
  },
  {
    headerName: "Zucker", field: "zucker", sortable: true, valueFormatter: suffixFormatter("g")
  },
  {
    headerName: "Ballaststoffe", field: "ballaststoffe", sortable: true, valueFormatter: suffixFormatter("g")
  },
  {
    headerName: "Eiweiß", field: "eiweiss", sortable: true, valueFormatter: suffixFormatter("g")
  }
]

export default function BillaTable({ data }: Props) {
  return (
    <div
      className="ag-theme-alpine billa-tabelle"
    >
    <AgGridReact
      columnDefs={columnDefs}
      rowData={data.tiles.map(prepareData)}>
    </AgGridReact>
  </div>
  )
}

function prepareData(result: SearchResultWithInfos) {
  const nut = (name: string, unit?: string) => result.infos.nutritions.find(n => n.preperationGrade === "Unzubereitet für 100 Gramm")
    ?.nutritions.find(n => {
      if (unit) {
        return n.nutritionName.trim() === name && n.unit === unit
      } else {
        return n.nutritionName.trim() === name
      }
    })?.nutritionalValue;
  return {
    name: result.data.name,
    preis: result.data.price.normal,
    preispkg: preispkg(result),
    energie: nut("Energie", "Kilokalorie"),
    fett: nut("Fett"),
    kohlenhydrate: nut("Kohlenhydrate"),
    khOhneZucker: nut("Kohlenhydrate") - nut("davon Zucker"),
    zucker: nut("davon Zucker"),
    ballaststoffe: nut("Ballaststoffe"),
    eiweiss: nut("Eiweiß")
  }
}

function preispkg(result: SearchResultWithInfos) {
  const parsed = result.data.price.unit?.match(/1 kg (\d+(\.\d+)?)/);
  return Number(parsed?.[1]);
}