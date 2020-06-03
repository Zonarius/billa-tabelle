import React from "react";
import { SearchResults } from "../../server/billa-client/types";

interface Props {
  data: SearchResults
}

export default function BillaTable({ data }: Props) {
  return (
    <div>Table</div>
  )
}