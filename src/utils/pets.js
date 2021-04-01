import {resolve} from 'path';
import {readFileSync} from 'fs';
import {DRIVER} from './config';
import MarkdownIt from 'markdown-it';
import {getItems} from "./db";
import {isEmpty, head} from 'lodash';
const md = new MarkdownIt();

/**
 * Get all the pets from the files.
 *
 * @param excludePetId - The pet ID to exclude from the other pets and consider as the current pet.
 *
 * @returns {Promise<{current, otherPets: {}}>}
 */
export async function getPetsFromFile(excludePetId) {

  if (isEmpty(excludePetId)) {
    excludePetId = 1;
  }

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

/**
 * Get the pets from the DB.
 *
 * @param excludePetId - The pet ID to exclude from the other pets and consider as the current pet.
 *
 * @returns {Promise<{current, otherPets: {}}|{}>}
 */
async function getPetsFromDB(excludePetId) {
  try {
    const petsFromDB = await getItems();

    if (isEmpty(petsFromDB)) {
      throw new Error('You need to seed the DB');
    }

    const pets = {};
    await petsFromDB.forEach(petFromDB => {
      pets[petFromDB._id] = petFromDB;
    });

    if (isEmpty(excludePetId)) {
      excludePetId = head(Object.keys(pets));
    }

    const current = pets[excludePetId];
    delete pets[excludePetId];
    const otherPets = pets;

    return {current, otherPets};
  } catch (e) {
    console.error(e)
  }
  return {};
}

/**
 * Get the pets by the driver - files or DB.
 *
 * @param excludePet - The pet ID to exclude from the other pets and consider as the current pet.
 *
 * @returns {Promise<{current, otherPets: {}}|{}>}
 */
export async function getPets(excludePet = null) {
  if (DRIVER === 'files') {
    return await getPetsFromFile(excludePet);
  }

  if (DRIVER === 'db') {
    return await getPetsFromDB(excludePet);
  }
}
