import {getPets} from "./pets";

const handlePetView = async ({res, excludePet = 1}) => {
  const results = await getPets({excludePet});
  return{};
  const {current: {name: title, picture, info}, otherPets} = getPets({excludePet});

  res.render('index', { title, info, picture, otherPets })
};

export const getAllPets = async (req, res) => {
  return handlePetView({res});
}

export const getPet = async (req, res) => {
  return handlePetView({res, excludePet: req.params.id});
}
