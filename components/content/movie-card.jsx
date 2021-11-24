/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import Link from 'next/link'

const MovieCard = ({
  data = { imdbID:null },
  onImgClick = () => {}
}) => {
  return (
    <div className="border border-white rounded-lg p-4">
      <div className="flex flex-col items-center text-center">
        <img src={data.Poster}
          onError={e => e.target.src='https://via.placeholder.com/125x150'}
          alt="film-cover"
          className="h-48 mb-4 cursor-pointer"
          onClick={() => onImgClick(data.Poster)} />
        <Link href={`/film/${data.imdbID ?? '/'}`} passHref>
          <div className="font-semibold cursor-pointer hover:underline">
            {data.Title}
          </div>
        </Link>
        <div className="opacity-50 text-sm">{data.Year}</div>
      </div>
    </div>
  )
}

export default MovieCard