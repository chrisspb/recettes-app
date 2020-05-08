import React, { Component } from 'react'

class AjouterRecette extends Component {

    state = {
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]:value });
    }

    handleSubmit = (event) => {
        // on gère par cette fonction la soumission du formulaire
        event.preventDefault();

        const recette = {...this.state};
        this.props.ajouterRecette(recette);

        // reset 
        // map est censé return alors que foreach pas besoin de return
        Object.keys(recette).forEach((item) => {
            recette[item] = '';
        })
        this.setState({...recette});
    }

    render() {
        return (
            <div className='card'>
                <form className='admin-form ajouter-recette' onSubmit={this.handleSubmit}>
                    <input value={this.state.nom} onChange= {this.handleChange} name = 'nom' type='text' placeholder='Nom de la recette'/>
                    <input value={this.state.image} onChange= {this.handleChange} name = 'image' type='text'placeholder='Nom de l image'/>
                    <textarea value={this.state.ingredients} onChange= {this.handleChange} name = 'ingredients' id = '' cols='30' rows='3'placeholder='Ingredients'></textarea>
                    <textarea value={this.state.instructions} onChange= {this.handleChange} name = 'instructions' id = '' cols='30' rows='15'placeholder='Instructions'></textarea>
                    <button type='submit'>+ Ajouter une recette</button>
                </form>
            </div>
        )
    }
}

export default AjouterRecette
