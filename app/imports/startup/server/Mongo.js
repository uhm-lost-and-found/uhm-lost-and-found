import { Meteor } from 'meteor/meteor';
import { LostObjects } from '../../api/lostobject/LostObject';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addLostObject = (lostObject) => {
  console.log(`  Adding: ${lostObject.name} (${lostObject.owner})`);
  LostObjects.collection.insert(lostObject);
};

// Initialize the LostObjectsCollection if empty.
if (LostObjects.collection.find().count() === 0) {
  if (Meteor.settings.defaultLostObjects) {
    console.log('Creating default lost objects.');
    Meteor.settings.defaultLostObjects.forEach(lostObject => addLostObject(lostObject));
  }
}
