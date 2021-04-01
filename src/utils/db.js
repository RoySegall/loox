import { MongoClient } from 'mongodb';
import {MONGODB_NAME, MONGODB_URL} from "./config";

/**
 *
 * @returns {Promise<Collection>}
 */
export async function getCollection() {
  const client = await MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true });

  const db = client.db(MONGODB_NAME);
  let collection = db.collection('pets');

  return collection;

  let query = { name: 'Volkswagen' }

  let res = await collection.findOne(query);
  //
  // let res2 = await collection.insertOne(query);
  //
  // console.log(res);

  return {}

  // await client.connect();
  // await client.db().command({ ping: 1 });
  //
  // const db = client.db(MONGODB_COLLECTION);
  //
  // let collection = db.collection('pets');
  //
  // return collection;
  //
  // let collection = db.collection('cars');
  //
  // let query = { name: 'Volkswagen' }
  //
  // let res = await collection.findOne(query);
  //
  // console.log(res);
}

/**
 *
 * @param item
 * @returns {Promise<*>}
 */
export async function insertItem(item) {
  const collection = await getCollection();
  return await collection.insertOne(item);
}

/**
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
