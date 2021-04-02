import {getPetsFromFile} from "./pets";
import {getItems, insertItem} from "./db";
require('colors');

const petExists = async (pet) => {
  const results = await getItems({name: pet.name});
  return results.length !== 0;
}

const insertPetToDb = async (pet) => {
  const petInDb = await petExists(pet);

  if (petInDb) {
    console.log(`The pet ${pet.name} already exists in the DB. Skipping 😿`.yellow.bold);
    return;
  }
  await insertItem(pet);
  console.log(`Inserting ${pet.name} to the DB 😸`.blue.bold);
};

(async () => {
  const pets = await getPetsFromFile(null, true);
  console.log('Starting to seed the DB 😺'.green.bold);
  await Promise.all(Object.keys(pets).map((id) => insertPetToDb(pets[id])));
  console.log('DB seeded 🍕🚀🕺'.green.bold);

  // Terminating the process, free the terminal 🤟!
  process.exit(0);
})();
