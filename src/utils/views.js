import {getPets} from "./pets";

const handlePetView = async ({res, excludePet = null}) => {
  const {current: {name: title, picture, info}, otherPets} = await getPets(excludePet);
  res.render('index', { title, info, picture, otherPets })
};

export const getAllPets = async (req, res) => {
  return handlePetView({res});
}

export const getPet = async (req, res) => {
  return handlePetView({res, excludePet: req.params.id});
}
