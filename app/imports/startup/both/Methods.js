import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const addDepartment = 'addDepartmentMethod';

if (Meteor.isServer) {
  Meteor.methods({
    'addDepartmentMethod'({ email, password }) {
      const userID = Accounts.createUser({
        username: email,
        email: email,
        password: password,
      });
      Roles.createRole('department', { unlessExists: true });
      Roles.addUsersToRoles(userID, 'department');
    },
  });
}

export { addDepartment };
