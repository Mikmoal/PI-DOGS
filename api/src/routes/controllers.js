const Breed = require("../models/Breed");
const Temperament = require("../models/Temperament");
const axios = require("axios");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      weight: el.weight,
      height: el.height,
      id: el.id,
      name: el.name,
      bred_for: el.bred_for,
      breed_group: el.breed_group,
      life_span: el.life_span,
      temperament: el.temperament,
      origin: el.origin,
      reference_image_id: el.reference_image_id,
      image: el.image,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["nombre"],
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

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllBreeds
}