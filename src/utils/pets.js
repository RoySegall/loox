import {resolve} from 'path';
import {readFileSync} from 'fs';
import {DRIVER} from './config';
import MarkdownIt from 'markdown-it';
import {getItems} from "./db";
import {isEmpty} from 'lodash';
const md = new MarkdownIt();


export function getPetsFromFile(excludePetId = 1) {
  const petsNames = ['bowtruckle', 'hippogriff', 'niffler', 'puffskein', 'thestral', 'unicorn'];
  const pets = {};

  petsNames.forEach((name, index) => {
    const pet = require(resolve('src', 'data', `${name}.json`));
    const petMarkdownInfo = readFileSync(resolve('src', 'data', pet.fileInfo), 'utf8');
    pet.info = md.render(petMarkdownInfo);
    pets[index + 1] = pet;
  });

  // Take the pet by the ID we want to exclude, set it as the current and remove it from all the pets. Then, take the
  // remains pets and treat them as other pets i.e. the pets on the side.
  const current = pets[excludePetId];
  delete pets[excludePetId];
  const otherPets = pets;

  return {current, otherPets};
}

async function getPetsFromDB(excludePet = null) {
  try {
    const items = await getItems();

    if (isEmpty(items)) {
      throw new Error('You need to seed the DB');
    }

    console.log(items);
  } catch (e) {
    console.error(e)
  }

  return {};
}

export async function getPets(excludePet = 1) {
  console.log(DRIVER);

  if (DRIVER === 'files') {
    return getPetsFromFile(excludePet);
  }

  if (DRIVER === 'db') {
    return await getPetsFromDB(excludePet);
  }
}
