import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const addDepartment = 'addDepartmentMethod';

if (Meteor.isServer) {
  Meteor.methods({
    'addDepartmentMethod'({ username, email, password }) {
      const userID = Accounts.createUser({
        username: username,
        email: email,
        password: password,
      });
      Roles.createRole('department', { unlessExists: true });
      Roles.addUsersToRoles(userID, 'department');
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish('listDepartments', function () {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return Meteor.users.find({}, { fields: { emails: 1, username: 1, createdAt: 1 } });
    }
    return false;
  });
}

export { addDepartment };
