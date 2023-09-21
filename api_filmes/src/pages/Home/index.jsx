import { useEffect, useState } from "react";
import { Container, MovieList, Movie } from "./styles";
import { APIKey } from "../../config/key";
import { Link } from "react-router-dom";
import { image_path } from "../../config/image_path";

export default function Home(){

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: APIKey
            }
          };
          
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setMovies(response.results))
            .catch(err => console.error(err));
    }, [])

    return(
        <Container>
            <h1>Movies</h1>

            <MovieList>
                {movies.map(movie => {
                    return(
                        <Movie key={movie.id}>
                            <Link to={`/details/${movie.id}`}><img src={`${image_path}${movie.poster_path}`}/></Link>
                            <span>{movie.title}</span>
                        </Movie>
                    );
                })}
            </MovieList>

        </Container>
    );
}