import { Link } from 'react-router-dom';
import { Grid } from './styles';


const GridPokemons = ({ pokemons }: any)  => {
  return (
    <Grid>
        <div className="container">
          {pokemons.map((pokemon: any) => (
            <div className="content" key={pokemon.name}>
              <Link to={`pokemon/${pokemon.name}`}>
                <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                />
              </Link>
              <div>
                <strong>{pokemon.name}</strong>
              </div>
            </div>
          ))}
        </div>
    </Grid>
  );
}

export default GridPokemons;
