import { useState, useEffect } from "react";

export function useFetch(api: string) {
  const [state, setState] = useState({ data: [], loading: true });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setState({ data, loading: false });
      } catch {
        setState({ data: [], loading: false });
      }
    };
    getData();
  }, [api, setState]);
  return state;
}
