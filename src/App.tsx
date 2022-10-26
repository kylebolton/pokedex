import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { getAllPokemons, getPokemon } from '../src/services/pokemon.services';
import './App.css';

interface Pokemon {
  id: number;
  name: string;
}

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);


  const loadAllPokemons = async () => {
    const pokemons = await getAllPokemons();
    setPokemons(pokemons);
  }

  useEffect(() => {
    loadAllPokemons();
  }, []);

  console.log(pokemons);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
