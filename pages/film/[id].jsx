/* eslint-disable @next/next/no-img-element */
import LayoutFullHeight from "../../components/layout/fullHeight";
import MovieInfo from "../../components/content/movie-info"

import { useSelector, useDispatch } from 'react-redux'
import { setItem, setLoading } from '../../store/film'
import { useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '../../assets/js/config';

export default function FilmDetail(ctx) {
  const dispatch = useDispatch()
  const router = useRouter()

  const movieItem = useSelector(state => state.film.item)
  const loading = useSelector(state => state.film.loading)

  const fetchDetail = async () => {
    dispatch(setLoading(true))
    const id = router.query.id

    try {
      const response = await axios.get(`${config.baseURL}&i=${id}`)
      if (response.status >= 200 && response.status < 300) {
        if (response.data.Response === 'False') {
          router.push('/')
        } else {
          dispatch(setItem(response.data))
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  // once only
  useEffect(() => {
    if (router.query.id) {
      fetchDetail()
    }
  },[router])

  return (
    <LayoutFullHeight>
      <div className="container mx-auto py-8">
        {loading ?
          <div className="w-full my-4 flex justify-center">
            <div className="loader" /> 
          </div> : 

          <>
            <div
              id="back-button"
              className="bg-gray-500 rounded-full w-12 h-12 text-xl flex items-center justify-center font-semibold cursor-pointer transform hover:scale-110"
              onClick={() => router.push('/')}>
              &lt;
            </div>

            <MovieInfo data={movieItem} />
          </>
        }
      </div>
    </LayoutFullHeight>
  )
}