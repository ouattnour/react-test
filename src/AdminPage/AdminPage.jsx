import React, { useState, useEffect } from "react";

import { userService } from "@/_services";

function AdminPage(props) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <p>Cette page n'est accessible qu'aux administrateurs.</p>
      <div>
        Tous les utilisateurs (administrateur uniquement) :
        {users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export { AdminPage };
