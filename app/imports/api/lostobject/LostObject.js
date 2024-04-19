import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The LostObjectsCollection. It encapsulates state and variable values for lost objects.
 */
class LostObjectsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'LostObjectsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dateFound: String,
      locationFound: String,
      currentDepartment: String,
      image: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.departmentPublicationName = `${this.name}.publication.department`;
  }

  /**
   * Insert a lost object into the collection.
   * @param {Object} object The lost object to insert.
   * @returns {string} The ID of the inserted document.
   */
  insertLostObject(object) {
    return this.collection.insert(object);
  }
}

/**
 * The singleton instance of the LostObjectsCollection.
 * @type {LostObjectsCollection}
 */
export const LostObjects = new LostObjectsCollection();
