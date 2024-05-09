import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { LostObjects } from '../../api/lostobject/LostObject';

Meteor.publish('allAccess', function () {
  return LostObjects.collection.find();
});

// Department-level publication.
Meteor.publish(LostObjects.departmentPublicationName, function () {
  if (this.userId) {
    const user = Meteor.users.findOne(this.userId);
    if (user) {
      if (Roles.userIsInRole(user._id, 'admin')) {
        // Admin user, publish all items
        return LostObjects.collection.find();
      }
      // Non-admin user, publish only their own items
      return LostObjects.collection.find({ owner: user.emails[0].address });
    }
  }
  return this.ready();
});

Meteor.publish(LostObjects.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return LostObjects.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
