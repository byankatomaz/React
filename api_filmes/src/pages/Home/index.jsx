import { useEffect, useState } from "react";
import { Container, MovieList, Movie } from "./styles";
import { APIKey } from "../../config/key";

export default function Home(){

    const [movies, setMovies] = useState([])
    const image_path = 'https://image.tmdb.org/t/p/w500'

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
                            <a href="https://www.google.com"><img src={`${image_path}${movie.poster_path}`}/></a>
                            <span>{movie.title}</span>
                        </Movie>
                    );
                })}
            </MovieList>

        </Container>
    );
}