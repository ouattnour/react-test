import { authenticationService } from '@/_services';

export function authHeader() {
  // renvoyer l'en-tête d'autorisation avec le jeton jwt
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}