// was gonna use this but... nyeh..
// import axios from 'axios'
// import config from '../assets/js/config'
// import { createContext, useEffect, useState } from 'react';

// const MovieContext = createContext({
//   movieLoading: false,
//   movie: null,
//   movieList: [],
//   // otherMovies: [],
//   // otherMovieLoading: false,
//   init: (_, __) => {}
// });

// export function useMovieList() {
//   return useContext(MovieProvider);
// }

// export const MovielistProvider = ({ children }) => {
//   const [movieList, setMovieList] = useState({});
//   const [keyword, setKeyword] = useState('Batman');
//   const [query, setQuery] = useState({ page: 1 })

//   useEffect(() => {
//     async function fetchList() {
//       try {
//         const response = await axios.get(`${config.baseURL}&type=movie${query.page ? `&page=${query.page}` : ''}&s=${keyword}`)
//         console.log(response)
//         if (response.status >= 200 && response.status < 300) {
//           if (response.data.Response === 'True') {
//             setMovieList({
//               data: response.data.Search,
//               meta: {
//                 total: response.data.totalResults
//               }
//             })
//           } else {
//             alert('error:', response.data.Error)
//           }
//         }
//       } catch (error) {
//         console.log({error})
//       }
//     }

//     fetchList()
//   }, [])

//   return (
//     <MovieContext.Provider
//       value={{
//         movieList
//       }}
//     >
//       {children}
//     </MovieContext.Provider>
//   );
// }

// export function useMovie() {
//   return useContext(MovieContext);
// }

// export const MovieProvider = ({ children }) => {
//   /* states & hooks */
//   // const { session } = useAuth();
//   // const [hashedId, setHashedId] = useState(null);
//   // const [initialMovie, setInitialMovie] = useState(null);
//   const [movie, setMovie] = useState(null);
//   const [movieLoading, setMovieLoading] = useState(false);
// }