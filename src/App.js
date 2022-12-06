import './App.css';
import City from './components/city/City';
import Gym from './components/gym/Gym';
import Pokemon from './components/pokemon/Pokemon';
import PokemonInfo from './components/pokemon/PokemonInfo';
import Items from './components/items/Items';
import ItemsInfo from './components/items/ItemInfo';
import Nav from './components/nav/Nav'
import Battle from './components/versus/Battle';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Nav />}></Route>
        <Route path="/pokemon" element={<Pokemon />}></Route>
        <Route path="/pokemon/info" element={<PokemonInfo />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/items/info" element={<ItemsInfo />}></Route>
        <Route path="/battle/" element={<Battle />}></Route>
        <Route path="/gym" element={<Gym />}></Route>
        <Route path="/city" element={<City />}></Route>
      </Routes>
    </div>
  );
}

export default App;
