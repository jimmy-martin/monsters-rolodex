import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // Dans notre cas, le hook useEffect permet de remplir la variable monsters
  // en effectuant un fetch sans créer d'appel infini
  // Sans ce hook, à chaque fois que la variable monsters est modifiée via fetch
  // le code qui se trouve dans App, se réexécuterai à l'infini
  // car les données sont certes les mêmes mais correspondent bien à deux tableaux différents en mémoire
  // useEffect prend en second argument un tableau des variables qui si elles sont modifiées
  // permettront de relancer le code qui se trouve à l'intérieur du callback en premier argument (ici le fetch)

  // Pour résumer, ici tant que la valeur de monsters n'est pas modifiée via setMonsters
  // le fetch ne sera pas réexecuté. Il sera ne sera donc exécuté uniquement lors du premier render
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // On veut filter la liste de monstres
  // uniquement si les variables monsters et searchField sont modifiées
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        placeholder="Search monsters"
        onChangeHandler={onSearchChange}
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
