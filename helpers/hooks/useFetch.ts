import { useState, useEffect } from "react";

const everyTwoMinutes: number = 1000 * 60 * 2;

export function useFetch(api: string, refresh: boolean) {
  const [state, setState] = useState({ data: [], loading: true });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setState({ data, loading: false });
        if (refresh) {
          setTimeout(getData, everyTwoMinutes);
        }
      } catch {
        setState({ data: [], loading: false });
      }
    };
    getData();
  }, [api, setState]);
  return state;
}
