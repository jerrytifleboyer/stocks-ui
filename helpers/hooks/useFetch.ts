import { useState, useEffect } from "react";

// //good practice for fetch, create a fetch hook
// export const useFetch = (url: string) => {
//   const [state, setState] = useState({ data: null, loading: true });
//   useEffect(() => {
//     // setState((state) => ({ data: state.data, loading: true }));
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setState({ data, loading: false });
//       });
//   }, [url, setState]);
// };
// //then your main component can just:
// //const {data, loading} = useFetch('api')
// //<div>{loading?"loading...":data}
