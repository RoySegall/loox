import { MongoClient } from 'mongodb';
import {MONGODB_NAME, MONGODB_URL} from "./config";

/**
 * Get the collection object for a given collection.
 *
 * @returns {Promise<Collection>}
 */
export async function getCollection() {
  const client = await MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true });

  const db = client.db(MONGODB_NAME);
  let collection = db.collection('pets');

  return collection;
}

/**
 * Insert an item into the collcetion.
 *
 * @param {object} item - The collection to insert.
 *
 * @returns {Promise<*>}
 */
export async function insertItem(item) {
  const collection = await getCollection();
  return await collection.insertOne(item);
}

/**
 * Get all the items from the collection.
 *
 * @returns {Promise<[]>}
 */
export async function getItems() {
  const collection = await getCollection();
  const items = [];

  await collection.find({}).forEach((item) => {
    items.push(item);
  });

  return items;
}
