import {getPets} from "./pets";

const handlePetView = ({res, driver, excludePet = 1}) => {
  const {current: {name: title, picture, info}, otherPets} = getPets({driver, excludePet});
  res.render('index', { title, info, picture, otherPets })
};

export const getAllPets = (req, res) => {
  return handlePetView({res, driver: 'files'});
}

export const getPet = (req, res) => {
  return handlePetView({res, driver: 'files', excludePet: req.params.id});
}
