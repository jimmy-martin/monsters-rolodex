import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };

    console.log('constructor');
  }

  // Ici on place le code qui sera appelé lorsque le component sera render
  // C'est un endroit idéal pour y placer les requêtes nécessaires avant l'affichage (exemple: fetch sur une API)
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return {
              monsters: users,
            };
          },
          () => {
            // console.log(this.state);
          }
        )
      );

    console.log('componentDidMount');
  }

  // afin d'optimiser les performances
  // on crée une nouvelle méthode directement dans le composant
  // ceci évite que la fonction soit réinitialisée à chaque appel de rendeer()
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      // Si ma variable a le même nom que ma clé,
      // je n'ai pas besoin de la préciser car JavaScript s'en charge
      // return { searchField: searchField };

      return { searchField };
    });
  };

  render() {
    console.log('render');

    // On peut utiliser ce système afin de ne pas devoir utiliser le terme this
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // Une bonne pratique est de conserver les données d'origine (ici monsters)
    // On va donc créer une variable (ici: filteredMonsters) qui va permettre d'afficher les données filtrées
    // en fonction de la valeur de la variable searchField
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="Search monsters"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
