import React, { useState, FormEvent } from 'react';
import BillaTable from './BillaTable';
import { SearchResults } from '../../server/billa-client/types';

export default function App() {
  const [data, setData] = useState<undefined | SearchResults>();
  if (!data) {
    return (
      <UrlChooser onDataFetched={setData}/>
    )
  }

  return (
    <BillaTable data={data} />
  )
}

function UrlChooser({ onDataFetched }: any) {
  const [fetching, setFetching] = useState(false);

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setFetching(true);

    const form = ev.target as any;
    try {
      const data = await fetch("/api/searchByUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: form.url.value })
      }).then(r => r.json())
      setFetching(false);
      onDataFetched(data);
    } catch {
      setFetching(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input disabled={fetching} name="url" className="url-chooser" type="text" defaultValue="https://www.billa.at/warengruppe/grundnahrungsmittel/muesli-und-cerealien/B2-6B"/>
      <button disabled={fetching}>Fetch</button>
    </form>
  )
}