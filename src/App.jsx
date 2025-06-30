import "./App.css";
import { Button } from "./components/Button/Button.jsx";
import { Card } from "./components/Card/Card.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0",
  );
  const [pagination, setPagination] = useState({
    next: "",
    previous: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function getPokemon() {
      setError(false);
      try {
        setIsLoading(true);
        const { data } = await axios.get(url, { signal: controller.signal });
        setPagination({
          next: data.next,
          previous: data.previous,
        });
        setPokemons(data.results);
      } catch (error) {
        // zou hier evt nog wat met de signal kunnen doen van abort controller
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getPokemon();

    return () => {
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();

    async function getPokemonDetails() {
      setError(false);
      try {
        setIsLoading(true);

        const results = await Promise.all(
          pokemons.map(async (pokemon) => {
            const response = await axios.get(pokemon.url, {
              signal: controller.signal,
            });
            return response.data;
          }),
        );
        setPokemonDetails(results);
      } catch (error) {
        // zou hier evt nog wat met de signal kunnen doen van abort controller
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getPokemonDetails();

    return () => {
      controller.abort();
    };
  }, [pokemons]);

  function handleClick(buttonLabel) {
    if (buttonLabel === "volgende" && pagination.next) {
      setUrl(pagination.next);
    } else if (buttonLabel === "vorige" && pagination.previous) {
      setUrl(pagination.previous);
    }
  }

  return (
    <>
      {pokemonDetails.length > 0 && (
        <div className="container">
          {isLoading && <span className="loading">Loading...</span>}
          {error && <span className="error">Error while fetching pokemon</span>}
          <header>
            <h1>Pokemon</h1>
            <div>
              <Button
                label="vorige"
                type="button"
                isDisabled={!pagination.previous}
                handleClick={() => handleClick("vorige")}
              />
              <Button
                label="volgende"
                type="button"
                isDisabled={!pagination.next}
                handleClick={() => handleClick("volgende")}
              />
            </div>
          </header>
          <main>
            {pokemonDetails.map((pokemon) => {
              return (
                <Card
                  key={pokemon.name}
                  title={pokemon.name}
                  image={pokemon.sprites.front_default}
                  weight={pokemon.weight}
                  moves={pokemon.moves.length}
                  abilities={pokemon.abilities}
                />
              );
            })}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
