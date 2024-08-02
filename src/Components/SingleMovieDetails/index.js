import {Component} from 'react'

import './index.css'

import Navbar from '../Navbar'

class SingleMovieDetails extends Component {
  state = {
    movieDetails: [],
    castDetails: [],
  }

  componentDidMount() {
    this.fetchSingleApi()
    this.fetchCast()
  }

  fetchSingleApi = async () => {
    const API_KEY = '9921d7a7a2a6868b951977e93308d47e'

    const {match} = this.props
    const {params} = match
    const {id} = params

    const MOVIE_ID = id

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`,
    )

    const responseToJson = await response.json()

    if (response.ok === true) {
      const movieDetail = {
        name: responseToJson.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${responseToJson.backdrop_path}`,
        rating: responseToJson.vote_average,
        duration: responseToJson.runtime,
        genres: responseToJson.genres.map(each => ({
          genreName: each.name,
          id: each.id,
        })),

        poster: `https://image.tmdb.org/t/p/w500${responseToJson.poster_path}`,
        releaseDate: responseToJson.release_date,
        overView: responseToJson.overview,
        id: responseToJson.id,
      }
      this.setState({movieDetails: movieDetail})
    }
  }

  fetchCast = async () => {
    const API_KEY = '9921d7a7a2a6868b951977e93308d47e'

    const {match} = this.props
    const {params} = match
    const {id} = params

    const MOVIE_ID = id

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`,
    )

    const reponsedToJson = await response.json()

    if (response.ok === true) {
      const castAdding = reponsedToJson.cast.map(each => ({
        id: each.credit_id,
        profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        originalName: each.original_name,
        name: each.name,
        charactorName: each.character,
      }))

      const crewAdding = reponsedToJson.crew.map(each => ({
        id: each.credit_id,
        profilePath: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        originalName: each.original_name,
        name: each.name,
        job: each.job,
      }))

      const details = [...castAdding, ...crewAdding]

      this.setState({
        castDetails: details,
      })
    }
  }

  render() {
    const {movieDetails, castDetails} = this.state

    return (
      <div>
        <Navbar />
        <div className="flexing-movie-image-and-details">
          <div>
            <img
              className="moviePoster"
              src={movieDetails.poster}
              alt={movieDetails.name}
            />
          </div>
          <div>
            <h1 className="movie-name">Movie Name: {movieDetails.name}</h1>
            <p className="rating">Rating: {movieDetails.rating}</p>

            <p className="duration">Duration: {movieDetails.duration}</p>

            <p className="releaseDate">
              Release Date: {movieDetails.releaseDate}
            </p>

            <p className="movie-overview">
              Movie Overview: {movieDetails.overView}
            </p>
          </div>
        </div>

        <div>
          <h1 className="casting">Casting Members</h1>
          <div className="castFlexing">
            {castDetails.map(each => (
              <div className="eachCastMember" key={each.id}>
                <img
                  className="castingTeam"
                  src={each.profilePath}
                  alt={each.originalName}
                />
                <p className="original-name">{each.originalName}</p>
                {each.charactorName !== undefined && (
                  <p className="charactor-name">{each.charactorName}</p>
                )}
                {each.job !== undefined && (
                  <p className="charactor-name">{each.job}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SingleMovieDetails
