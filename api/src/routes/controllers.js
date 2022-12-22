const Breed = require("../models/Breed");
const Temperament = require("../models/Temperament");
const axios = require("axios");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map(
    ({
      weight,
      height,
      id,
      name,
      bred_for,
      breed_group,
      life_span,
      temperament,
      origin,
      reference_image_id,
      image,
    }) => {
      return {
        weight,
        height,
        id,
        name,
        bred_for,
        breed_group,
        life_span,
        temperament,
        origin,
        reference_image_id,
        image,
      };
    }
  );
  return apiInfo;
};

const getDbInfo = async () => {
  return await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllBreeds = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getBreedByName = async (name) => {
  let allBreeds = await getAllBreeds();
  const result = allBreeds.filter((breed) => {
    return breed.name === name;
  });
  if (result.length) return result;
  return { error: "Breed by name not found" };
};

const getBreedById = async (id) => {
  let allBreeds = await getAllBreeds();
  const result = allBreeds.filter((breed) => {
    return breed.id === id;
  });
  if (result.length) return result;
  return { error: "Breed by id not found" };
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllBreeds,
  getBreedByName,
  getBreedById,
};
