/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

export class Film {
  constructor({
    Poster = null,
    Title = null,
    Type = null,
    Year = null,
    imdbID = null
  } ={}) {
    this.id = imdbID
    this.title = Title
    this.cover = Poster
    this.type = Type
    this.year = Year
  }

  createItem(data) {
    return Object.freeze(new Film(data))
  }
}

export default Film