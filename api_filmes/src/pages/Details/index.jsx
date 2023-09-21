import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { APIKey } from "../../config/key";
import { image_path } from "../../config/image_path";
import { Container } from "./styles";

export default function Details(){

    const { id } = useParams();

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: APIKey
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                
                const { title, poster_path, overview, release_date } = response
                
                const movie = {
                    id,
                    title,
                    sinopse: overview,
                    image: `${image_path}${poster_path}`,
                    releaseDate: release_date
                }

                console.log(response)

                setMovie(movie)

            })
            .catch(err => console.error(err));
    }, [id])

    return(
        <Container>
            <div className="movie">
                <img src={movie.image} alt={movie.sinopse}></img>
                <div className="details">
                    <h1>{movie.title}</h1>
                    <span>Sinopse: {movie.sinopse}</span>
                    <span className="release-date">Release Date: {movie.releaseDate}</span>
                    <Link to={'/'}><button>Go Back</button></Link>
                </div>
            </div>
        </Container>
    );
}