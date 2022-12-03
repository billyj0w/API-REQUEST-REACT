import './App.css';
import City from './components/city/City';
import Gym from './components/gym/Gym';
import Items from './components/items/Items';
import Pokemon from './components/pokemon/Pokemon';
import Nav from './components/nav/Nav'
import PokemonInfo from './components/pokemon/PokemonInfo';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Nav />}></Route>
        <Route path="/pokemon" element={<Pokemon />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/gym" element={<Gym />}></Route>
        <Route path="/city" element={<City />}></Route>
        <Route path="/pokemon/info" element={<PokemonInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
