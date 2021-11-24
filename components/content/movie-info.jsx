/* eslint-disable @next/next/no-img-element */
const MovieInfo = ({
  data = {
    Ratings: []
  }
}) => {
  const ratings = data.Ratings ?? []
  return (
    <>
      <div className="grid grid-cols-9 gap-4 my-12 mobile:text-center">
      <div className="col-span-1 mobile:col-span-9 mobile:flex mobile:justify-center">
        <img src={data.Poster} alt="poster" className="rounded-lg" />
      </div>
      <div className="col-span-8 p-4 mobile:col-span-9">
        <div className="text-3xl mb-2">{data.Title}</div>
        <span className="text-sm border rounded-sm p-1 w-fit-content">{data.Rated}</span>
        <div className="opacity-50 mt-3 mb-6">{data.Year} - {data.Genre} - {data.Runtime}</div>
        <div className="flex">
          {ratings.map((rating, i) => {
            return (
              <div key={i} className={i > 0 ? 'mx-6' : 'mr-6'}>
                <div className="text-xl">{rating.Value}</div>
                <div className="text-sm">{rating.Source}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    
    {/* <div className="text-2xl font-semibold">
      Plot
    </div> */}
    <div className="text-sm opacity-70">{data.Plot}</div>

    <div className="border border-white border-opacity-20 my-4" />

    <div className="text-2xl font-semibold mt-8 mb-2">
      Information
    </div>
    <div>Release Date</div>
    <div className="text-sm opacity-70">{data.Released}</div>
    <div>Director</div>
    <div className="text-sm opacity-70">{data.Director}</div>
    <div>Writer</div>
    <div className="text-sm opacity-70">{data.Writer}</div>
    <div>Actors</div>
    <div className="text-sm opacity-70">{data.Actors}</div>
    </>
  )
}

export default MovieInfo