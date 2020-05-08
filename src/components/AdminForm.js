import React from 'react'

const AdminForm = ({id: key, updateRecette, recettes, supprimerRecette}) => {
// id: key = j'importe le props id mais avec le nom key

    const recette = recettes[key];

    const handleChange = (e, key) => {
        const { name, value } = e.target;
        const recette = recettes[key];
        recette[name] = value;
        updateRecette(key, recette);
    }

    return (
        <div className='card'>
            <form className='admin-form'>
                <input value={recette.nom} onChange= {e => handleChange(e, key)} name = 'nom' type='text' placeholder='Nom de la recette'/>
                <input value={recette.image} onChange= {e => handleChange(e, key)} name = 'image' type='text'placeholder='Nom de l image'/>
                <textarea value={recette.ingredients} onChange= {e => handleChange(e, key)} name = 'ingredients' id = '' cols='30' rows='3'placeholder='Ingredients'></textarea>
                <textarea value={recette.instructions} onChange= {e => handleChange(e, key)} name = 'instructions' id = '' cols='30' rows='15'placeholder='Instructions'></textarea>
                <button onClick={() => supprimerRecette(key)}>Supprimer</button>
            </form>
        </div>
    )
}

export default AdminForm;
