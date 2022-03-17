import React, { useState, useEffect } from "react";

import { userService, authenticationService } from "@/_services";

function HomePage(props) {

  const [currentUser, setCurrentUser] = useState(
    authenticationService.currentUserValue,
  );
    
  const [userFromApi, setUserFromApi] = useState(null);

  useEffect(() => {
    setCurrentUser(currentUser);
    userService
      .getById(currentUser.id)
      .then((userFromApi) => setUserFromApi(userFromApi));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Vous êtes connecté avec React & JWT!!</p>
      <p>
        Votre rôle est: <strong>{currentUser.role}</strong>.
      </p>
      <p>Cette page est accessible à tous les utilisateurs authentifiés.</p>
      <div>
        Utilisateur actuel:
        {userFromApi && (
          <ul>
            <li>
              {userFromApi.firstName} {userFromApi.lastName}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export { HomePage };
