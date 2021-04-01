import {getPetsFromFile} from "./pets";
import {insertItem} from "./db";

(async () => {
  const {current, otherPets} = await getPetsFromFile();
  console.log('Starting to seed the DB...');
  await insertItem(current);
  Object.keys(otherPets).forEach((index) => {
    insertItem(otherPets[index]);
  });
  console.log('DB seeded');
})();
