import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // pas connecté donc rediriger vers la page de connexion avec l'url de retour
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // vérifier si la route est restreinte par rôle
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // rôle non autorisé donc rediriger vers la page d'accueil
            return <Redirect to={{ pathname: '/'}} />
        }

        // autorisé donc retourner le composant
        return <Component {...props} />
    }} />
)