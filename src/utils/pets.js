import {resolve} from 'path';
import {readFileSync} from 'fs';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

export function getPetsFromFile(excludePetId = 1) {
  const petsNames = ['bowtruckle', 'hippogriff', 'niffler', 'puffskein', 'thestral', 'unicorn'];
  const pets = {};

  petsNames.forEach((name, index) => {
    const pet = require(resolve('src', 'data', `${name}.json`));
    const petMarkdownInfo = readFileSync(resolve('src', 'data', pet.fileInfo), 'utf8')
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

export function getPets({req, driver, excludePet = 1}) {
  if (driver === 'files') {
    return getPetsFromFile(excludePet);
  }
}
