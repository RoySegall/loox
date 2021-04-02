import {resolve} from 'path';
import {readFileSync, readdirSync} from 'fs';
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
export async function getPetsFromFile(excludePetId, returnFlat = false) {
  const pets = {};
  const petDataFolder = resolve('src', 'data');

  await readdirSync(petDataFolder).forEach((fileName, index) => {
    if (!fileName.includes('.json')) {
      // This is not a metadata file of a pet.
      return;
    }

    const pet = require(resolve(petDataFolder, fileName));
    const petMarkdownInfo = readFileSync(resolve(petDataFolder, pet.fileInfo), 'utf8');
    pet.info = md.render(petMarkdownInfo);
    pets[index + 1] = pet;
  });

  if (returnFlat) {
    return pets;
  }

  // Take the pet by the ID we want to exclude, set it as the current and remove it from all the pets. Then, take the
  // remains pets and treat them as other pets i.e. the pets on the side.
  if (isEmpty(excludePetId)) {
    excludePetId = head(Object.keys(pets));
  }

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
