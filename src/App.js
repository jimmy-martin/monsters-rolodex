import { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: { firstName: 'Jimmy', lastName: 'MARTIN' },
      company: 'TALEEN',
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            I am {this.state.name.firstName} {this.state.name.lastName} and I
            work at {this.state.company} !
          </p>
          <button
            onClick={() => {
              //! Cette façon de faire met à jour le state de façon asynchrone
              //! donc lorsque je fais un console.log() juste après la modification de mon state,
              //! je récupère toujours les anciennes valeurs
              // this.setState({
              //   name: { firstName: 'Océane', lastName: 'MARTIN' },
              // });
              // console.log(this.state);

              //! On va donc procéder ainsi afin de pouvoir tout de suite récupérer les nouvelles valeurs du state
              this.setState(
                () => {
                  return {
                    name: { firstName: 'Océane', lastName: 'MARTIN' },
                  };
                },
                //! On utilise la callback function pour y placer notre console.log()
                //! Elle sera appelée uniquement lorsque le state aura effectivement été modifié
                //! et affichera donc les valeurs à jour
                () => {
                  console.log(this.state);
                }
              );
            }}
          >
            Change Name
          </button>
        </header>
      </div>
    );
  }
}

export default App;
