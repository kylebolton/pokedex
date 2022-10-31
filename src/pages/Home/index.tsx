import { FormEvent, useEffect, useState } from 'react';
import { getAllPokemons, getPokemon } from '../../services/pokemon.services';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import GridPokemons from '../../components/GridPokemons'

import { Title, Form, ResultSearch, Error } from './styles';

interface Pokemon {
  id: number;
  name: string;
}
const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Pokemon[] | any>([] || null);
  const [newPokemon, setNewPokemon] = useState('');
  const [inputError, setInputError] = useState('');

  const loadAllPokemons = async () => {
    const pokemons = await getAllPokemons();
    setPokemons(pokemons);
  }

  useEffect(() => {
    loadAllPokemons();
  }, []);

  async function handleSearchPokemon(
    event: FormEvent<HTMLFormElement>,
    ): Promise<void>{
    event.preventDefault();

    if (!newPokemon) {
      setInputError('No pokemon found!');
      return;
    }
    try {
      const pokemon: Pokemon = await getPokemon(newPokemon.toLowerCase());
      setPokemon(pokemon);
      setNewPokemon('');
      setInputError('');
    } catch (err) {
      setInputError('Couldn\'t find this Pokemon');
    }
  }

  return (
    <>
      <Title>Explore Pokemon</Title>

      <Form hasError={!!inputError} onSubmit={handleSearchPokemon}>
        <input
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      {pokemon ?
        <ResultSearch>
          <Link key={pokemon.name}
            to={`/pokemon/${pokemon.name}`}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <div>
              <strong>{pokemon.name.toUpperCase()} #
              {pokemon.id.toString().padStart(4, '0')}</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </ResultSearch>
        :
        <GridPokemons
          pokemons={pokemons}
        />
      }
    </>
  )
}

export default Home;
