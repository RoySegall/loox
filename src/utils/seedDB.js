import {getPetsFromFile} from "./pets";
import {insertItem} from "./db";

const {current, otherPets} = getPetsFromFile();

(async () => {
  console.log('Starting to seed the DB...');
  await insertItem(current);
  Object.keys(otherPets).forEach((index) => {
    insertItem(otherPets[index]);
  });
  console.log('DB seeded');
})();
