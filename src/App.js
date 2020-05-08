import React, { Component } from 'react'
// CSS
import './App.css'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card';
import recettes from './recettes';
import base from './base';


class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: []
  }

  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
 
  chargerExemple = () => {
    return this.setState({recettes: recettes})
  }

  ajouterRecette = (recette) => {
    const recettes = {...this.state.recettes};
    recettes[`recette-${Date.now()}`] = recette;
    this.setState({recettes});
  }

  updateRecette = (key, newRecette) => {
    const recettes = {...this.state.recettes};
    recettes[key] = newRecette;
    this.setState({recettes});
  }

  supprimerRecette = key => {
    const recettes = {...this.state.recettes};
    recettes[key] = null;
    this.setState({recettes})
  }

  render () {
    const cards =
        Object.keys(this.state.recettes).map(recette => {
          return <Card key={recette} details={this.state.recettes[recette]}/>
        });
      
    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo}/>
        <div className='cards'>
          {cards}
        </div>
        <Admin 
        pseudo = {this.state.pseudo}
        recettes = {this.state.recettes}
        chargerExemple={this.chargerExemple}
        updateRecette = {this.updateRecette}
        ajouterRecette = {this.ajouterRecette}
        supprimerRecette = {this.supprimerRecette}/>
      </div>
    )
  }
}

export default App
