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

const deleteDepartment = 'deleteDepartmentMethod';

if (Meteor.isServer) {
  Meteor.methods({
    // ES Lint disable line needed since the passed in argument is not an object and does not work if passed in as one
    // eslint-disable-next-line meteor/audit-argument-checks
    'deleteDepartmentMethod'(userID) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin') && Meteor.userId() !== userID) {
        Meteor.users.remove({ _id: userID });
        return true;
      }
      return false;
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish('listDepartments', function () {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return [
        Meteor.users.find({}, { fields: { emails: 1, username: 1, createdAt: 1 } }),
        Meteor.roleAssignment.find({}),
      ];
    }
    return false;
  });
}

export { addDepartment, deleteDepartment };
