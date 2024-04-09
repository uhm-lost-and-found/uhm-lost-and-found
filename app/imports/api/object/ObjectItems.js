import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ObjectsCollection. It encapsulates state and variable values for lostObject.
 */
class ObjectsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ObjectsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dateFound: Date,
      locationFound: String,
      currentDepartment: String,
      image: String,
      _id: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.all`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ObjectsCollection.
 * @type {ObjectsCollection}
 */
export const ObjectItems = new ObjectsCollection();
