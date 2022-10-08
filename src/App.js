import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
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

  render() {
    console.log('render');

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="Search monsters"
          onChange={(event) => {
            const searchString = event.target.value.toLocaleLowerCase();
            const filteredMonsters = this.state.monsters.filter((monster) => {
              return monster.name.toLocaleLowerCase().includes(searchString);
            });

            this.setState(() => {
              return { monsters: filteredMonsters };
            });
          }}
        />
        {this.state.monsters.map((monster) => {
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
