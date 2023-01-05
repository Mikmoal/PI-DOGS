require("dotenv").config();
const axios = require("axios");
const { Breed, Temperament } = require("../db");
const { API_KEY } = process.env;

const getBreedsApiInfo = async () => {
  const apiBreeds = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiBreeds.data.map((e) => {
    let weight = e.weight.metric.split("-");
    let height = e.height.metric.split("-");
    let life_span = e.life_span.split("-");
    let weightMin = parseInt(weight[0]);
    let weightMax = parseInt(weight[1]);
    let heightMin = parseInt(height[0]);
    let heightMax = parseInt(height[1]);
    let life_span_min = parseInt(life_span[0]);
    let life_span_max = parseInt(life_span[1]);
    return {
      weightMin: weightMin ? weightMin : weightMax, //e.weight.metric,
      weightMax: weightMax ? weightMax : weightMin,
      heightMin: heightMin ? heightMin : heightMax, //e.height.metric,
      heightMax: heightMax ? heightMax : heightMin,
      id: e.id,
      name: e.name,
      bred_for: e.bred_for,
      breed_group: e.breed_group,
      life_span_min: life_span_min ? life_span_min : life_span_max,
      life_span_max: life_span_max ? life_span_max : life_span_min,
      temperament: e.temperament ? e.temperament : "Not Temperament",
      origin: e.origin,
      reference_image_id: e.reference_image_id,
      image: e.image.url,
    };
  });
  console.log("ESTO DEVUELVE LA API: ", apiInfo);
  return apiInfo;
};

const getBreedsDbInfo = async () => {
  const dbBreeds = await Breed.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const dbInfo = dbBreeds.map((e) => {
    return {
      id: e.id,
      name: e.name,
      heightMin: e.heightMin,
      heightMax: e.heightMax,
      weightMin: e.weightMin,
      weightMax: e.weightMax,
      life_span_min: e.life_span_min,
      life_span_max: e.life_span_max,
      temperament: e.dataValues.temperaments.map((el) => el.name).join(", "),
      image: e.image,
    };
  });

  return dbInfo;
};

const getAllBreeds = async () => {
  const apiInfo = await getBreedsApiInfo();
  const dbInfo = await getBreedsDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getBreedByName = async (req, res) => {
  //ACA ANTES RECIBIA name COMO PARAMETRO
  const { name } = req.query;
  var allData = await getAllBreeds();
  try {
    if (name) {
      var searchName = allData.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      searchName.length > 0
        ? res.status(200).json(searchName)
        : res.status(404).send({ msg: "Breed name not found" });
    } else {
      res.status(200).json(allData);
    }
  } catch (error) {
    console.log(error);
  }
};

const getBreedById = async (req, res) => {
  const { id } = req.params;
  var allId = await getAllBreeds();

  try {
    if (id) {
      let breedId = allId.filter(
        (el) => el.id === Number(id) || el.id === String(id)
      );
      //console.log(allId)
      breedId.length > 0
        ? res.status(200).json(breedId)
        : res.status(404).send("Breed id not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const postBreed = async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span_min,
    life_span_max,
    temperament,
    image,
  } = req.body;

  try {
    const newBreed = await Breed.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span_min,
      life_span_max,
      image,
    });
    //console.log(newBreed)
    await newBreed.addTemperaments(temperament);
    res.status(201).json(newBreed).send({ msg: "Breed Created" });
  } catch (error) {
    console.log(error);
  }
};

const getTemperaments = async (req, res) => {
  try {
    const dbTemperament = [];
    // const dbTemperament = await Temperament.findAll({
    //   include: [
    //     {
    //       model: Dog,
    //       attributes: ["name"],
    //       through: {
    //         attributes: [],
    //       },
    //     },
    //   ],
    // });

    if (!dbTemperament.length) {
      const apiData = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const temperaments = apiData.data.map((t) => t.temperament);
      const temps = temperaments.toString().split(",");
      const tempsArr = new Set(temps);
      let result = [...tempsArr];
      result
        .filter((t) => t !== "")
        .forEach((el) => {
          let i = el.trim();
          Temperament.findOrCreate({
            where: { name: i },
          });
        });

      const allTemp = await Temperament.findAll();
      res.send(allTemp);
    }

    //   const apiTemperament = apiData.data.map((e) => {
    //     return {
    //       temperament: e.temperament,
    //     };
    //   });

    //   let aux = apiTemperament
    //     .map((e) => Object.values(e))
    //     .flat()
    //     .join(", ")
    //     .split(", ");
    //   let aux2 = new Set(aux);
    //   let aux3 = [...aux2];
    //   let arrayTemperaments = aux3.filter((e) => e !== "").slice(1);

    //   let temperamentsFinal = arrayTemperaments.sort();
    //   console.log(temperamentsFinal);

    //   temperamentsFinal.map((el) =>
    //     Temperament.findOrCreate({
    //       where: { name: el },
    //     })
    //   );
    // } else {
    //   res.json(dbTemperament);
    // }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBreedsApiInfo,
  getBreedsDbInfo,
  getAllBreeds,
  getBreedByName,
  getBreedById,
  postBreed,
  getTemperaments,
};
