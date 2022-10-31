import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { getPokemon } from '../../services/pokemon.services';

import { Header, PokemonInfo } from './styles';

interface PokemonParams {
  pokemon: string;
}

interface Pokemon {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<Type>;
}

interface Type {
  type: {name: string;};
}

// eslint-disable-next-line 
const Pokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { params } = useRouteMatch<PokemonParams>();

  const loadPokemon = async () => {
    const pokemon = await getPokemon(params.pokemon);
    setPokemon(pokemon);
  }

  useEffect(() => {
    loadPokemon();
    // eslint-disable-next-line 
  }, [params.pokemon]);

  return(
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Back
        </Link>
      </Header>

      {pokemon && (
        <PokemonInfo>
          <header>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <div>
              <strong>{pokemon.name.toUpperCase()} #
              {pokemon.id.toString().padStart(3, '0')}</strong>
              {pokemon.types.map(type => (
                <span key={pokemon.id}>{type.type.name.toUpperCase()}</span>
                )
              )}
              <p>{pokemon.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{pokemon.height}m</strong>
              <span>Height</span>
            </li>
            <li>
              <strong>{pokemon.weight}kg</strong>
              <span>Weight</span>
            </li>
            <li>
              <strong>{pokemon.base_experience}xp</strong>
              <span>Base XP</span>
            </li>
          </ul>
        </PokemonInfo>
      )}
    </>
  );
}

export default Pokemon;
