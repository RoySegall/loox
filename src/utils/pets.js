import {resolve} from 'path';

export function getPetsFromFile() {
  const petsNames = ['bowtruckle', 'hippogriff', 'niffler', 'puffskein', 'thestral', 'unicorn'];
  const pets = {};

  petsNames.forEach((name, index) => {
    pets[index + 1] = require(resolve('src', 'data', `${name}.json`))
  });

  return pets;
}

export function getPets({driver, excludePet = null}) {

  // Get the pets by the driver.
  let pets, current, otherPets;

  if (driver === 'files') {
    pets = getPetsFromFile();
  }

  console.log(pets);

  // Check if we need to exclude something.

  // Return the data.
  return {
    current: {},
    otherPets: {},
  };
}
