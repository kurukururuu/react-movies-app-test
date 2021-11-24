// import styles from '../styles/Home.module.css'
/* eslint-disable @next/next/no-img-element */

import MovieCard from "../components/content/movie-card";
import LayoutFullHeight from "../components/layout/fullHeight";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../assets/js/config';
import debounce from "../assets/js/utils/debounce";
import { useSelector, useDispatch } from 'react-redux'
import { setList, setLoading, resetList } from '../store/film'

export default function Home(ctx) {
  const dispatch = useDispatch()

  const movieList = useSelector(state => state.film.list)
  const loading = useSelector(state => state.film.loading)
  const [keyword, setKeyword] = useState('Batman');
  const [emptyResponse, setEmptyResponse] = useState(false);
  const [page, setPage] = useState(1);
  const [popupImage, setPopupImage] = useState(null);

  // TODO: fail somehow ????
  // const [query, setQuery] = useState({
  //   page: 1,
  // })

  const initInfiniteScrollListener = useCallback(() => {
    const pageNumber = page
    // if (process.browser) {
      window.onscroll = () => {
        if (!loading) {
          if (window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - 200)) {
            if(!emptyResponse) {
              console.log('page num', page)
              fetchList({
                action: 'append'
              })
            }
          }
        }
      }
    // }
  },[page, loading])

  const fetchList = debounce(async (payload) => {
    const params = payload ?? {}
    // console.log('action', params.action)
    let pageNumber = page
    if (params.action !== 'append') { 
      pageNumber = 1
    }
    console.log("fetching movies:", keyword, pageNumber)
    setEmptyResponse(false)
    dispatch(setLoading(true))

    try {
      const response = await axios.get(`${config.baseURL}&type=movie${pageNumber ? `&page=${pageNumber}` : ''}&s=${keyword}`)
      if (response.status >= 200 && response.status < 300) {
        if (response.data.Response === 'True') {
          const data = response.data.Search

          const newPage = page + 1;
          setPage(newPage);

          if (data.length > 0) {
            dispatch(setList({
              action: params.action,
              data: data,
              meta: buildMeta({page, total: response.data.totalResults})
            }))
          } else {
            setEmptyResponse(true)
          }
        } else {
          console.error('error:', response.data.Error)
        }
      }
    } catch (error) {
      console.log({error})
    } finally {
      dispatch(setLoading(false))
    }
  }, 1000)
  
  // once only
  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    initInfiniteScrollListener()
  }, [page, loading])

  // methods

  const buildMeta = (meta) => {
    const perPage = 10 // from API, can't be changed
    const totalPage = Math.floor(meta.total / perPage)
    return {
      total: meta.total,
      page: meta.page,
      totalPage
    }
  }

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value)
    setPage(1)
  }

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    // setPage(() => 1)
    dispatch(resetList())
    dispatch(setLoading(true)) // show loader early for UX purpose xd
    fetchList({action: 'set'})
  },[page, keyword])

  const openImage = (v) => {
    setPopupImage(v)
  }

  return (
    <LayoutFullHeight>
      <div className="container mx-auto py-8">
        <div className="text-3xl mb-12">Movies</div>

        <form onSubmit={e => handleSearch(e)}>
          <label htmlFor="keyword" className="flex items-center mb-8">
            <div className="font-semibold mr-2">Search:</div>
            <input id="keyword" name="keyword" value={keyword} onChange={e => {handleKeywordChange(e)}}
              className="bg-transparent text-white px-2 py-1 border border-white rounded-lg w-1/4 mobile:w-3/4" />

            <button className="ml-4 border border-white rounded-lg px-2 py-1 mobile:w-1/4">Search</button>
          </label>
        </form>

        <div className="text-lg mb-4">Total items: {movieList.meta.total ?? 0}</div>

        <div className="grid grid-cols-4 gap-4 mobile:grid-cols-2">
          {movieList.data.map((movie, i) => {
            return (
              <MovieCard key={i} data={movie} onImgClick={openImage} className="col-span-1" />
            )
          })}
        </div>
        {loading ?
          <div className="w-full my-4 flex justify-center">
            <div className="loader" /> 
          </div> : "" }
        {emptyResponse ? <div className="text-center my-4">no data anymore ...</div> : "" } 
      </div>

      <div className={[
        popupImage ? 'scale-100 fixed' : 'scale-0 hidden',
        'top-0 left-0 w-screen h-screen bg-black bg-opacity-75 transform transition-all duration-300 ease-in-out'
        ].join(' ')}>
        <div className="flex items-center justify-center h-full relative">
          <img src={popupImage} alt="popup" />

          <div className="absolute top-4 right-8 bg-gray-500 px-2 py-1 cursor-pointer rounded-full" onClick={() => setPopupImage(null)}>
            &#x2715;
          </div>
        </div>
      </div>
    </LayoutFullHeight>
  )
}
