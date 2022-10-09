import { Component } from 'react';

// Il faut noter ici, qu'on importe le CSS qui concerne uniquement ce composant
// afin de bien ranger nos fichiers CSS
// mais il faut noter malgré tout que le CSS qui se trouve dans notre fichier importé
// s'applique tout de même à toute notre application React
// (exemple: ce fichier CSS pourrait très bien contenir le style de composant card-list)
import './search-box.style.css';

class SearchBox extends Component {
  render() {
    return (
      <input
        className={`search-box ${this.props.className}`}
        type="search"
        placeholder={this.props.placeholder}
        onChange={this.props.onChangeHandler}
      />
    );
  }
}

export default SearchBox;
