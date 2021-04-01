import {getPets} from "./pets";

/**
 * Handle the pet view - all pets or a specific pet.
 *
 * @param res - The response object from express.
 * @param excludePet - The pet ID to exclude from the other pets and consider as the current pet.
 *
 * @returns {Promise<void>}
 */
const handlePetView = async ({res, excludePet = null}) => {
  const {current: {name: title, picture, info}, otherPets} = await getPets(excludePet);
  res.render('index', { title, info, picture, otherPets })
};

/**
 * Showing all the pets.
 *
 * @param req - The request object from express.
 * @param res - The response object from express.
 *
 * @returns {Promise<void>}
 */
export const getAllPets = async (req, res) => {
  return handlePetView({res});
}

/**
 * Display a specific pet.
 *
 * @param req - The request object from express.
 * @param res - The response object from express.
 *
 * @returns {Promise<void>}
 */
export const getPet = async (req, res) => {
  return handlePetView({res, excludePet: req.params.id});
}
