import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Objects } from '../../api/object/Objects';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

/*
const addObject = (lostObject) => {
  console.log(`  Adding: ${lostObject.name} (${lostObject.owner})`);
  Objects.collection.insert(lostObject);
};

if (Objects.collection.find().count() === 0) {
  if (Meteor.settings.defaultLostObjects) {
    console.log('Creating default objects.');
    Meteor.settings.defaultLostObjects.forEach(lostObject => addObject(lostObject));
  }
}
*/
