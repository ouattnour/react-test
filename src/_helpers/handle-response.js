import { authenticationService } from '@/_services';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
              // déconnexion automatique si la réponse 401 non autorisée ou 403 interdite est renvoyée par l'api
              authenticationService.logout();
              location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}