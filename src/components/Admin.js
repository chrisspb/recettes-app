import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette';
import AdminForm from './AdminForm';
import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base';
import Login from './Login';

class Admin extends Component {

    state = {
        uid: null,
        chief: null
    }
    
    componentDidMount( ) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                //{user} : {} car objet qui contient des objets 
                this.handleAuth({user});
            }
        })
    }


    handleAuth = async authData => {
        console.log(authData);
        const box = await base.fetch(this.props.pseudo, { context: this });
        if(!box.chef) {
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            });
        }

        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider();

        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.handleAuth);
    }

    logout = async () => {
        console.log('Déconnexion');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render() {

        const {recettes, ajouterRecette, updateRecette, chargerExemple, supprimerRecette} = this.props;
        const logout = <button onClick={this.logout}>Déconnexion</button>

        // Si l'utilisateur n'est pas connecté
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>
        }

        if(this.state.uid !== this.state.chef) {
            return <div>
                <p>Tu n'est pas le chef de cette boîte</p>
                {logout}
            </div>
        }

        return (
            <div className='cards'>
                <AjouterRecette ajouterRecette={ajouterRecette} />
                {
                    Object.keys(recettes).map(key => {
                        return <AdminForm 
                        updateRecette={updateRecette}
                        recettes={recettes}
                        supprimerRecette = {supprimerRecette}
                        key = {key}
                        id={key}>
                        
                        </AdminForm>
                    })
                }
                <footer>
                    <button onClick={chargerExemple}>Remplir</button>
                    {logout}
                </footer>
            </div>
            
            )
    }

}

export default Admin;
