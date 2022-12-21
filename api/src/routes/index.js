const { Router } = require("express");
const axios = require("axios");
// TRAER LAS TABLAS CREADAS DE SQL
const { Op } = require("sequelize");
const Breed = require("../models/Breed");
const Temperament = require("../models/Temperament");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//array.flat();
router.get("/temperaments", async (req, res) => {
  const temperamentsApi = await axios.get(
    "https://api.thedogapi.com/v1/breeds"
  );
  const temperaments = temperamentsApi.data.map((el) => el.temperament);
  const tempEach = temperaments.map((el) => {
    for (let i = 0; i < el.length; i++) return el[i];
  });
  console.log(tempEach);
  tempEach.forEach((el) => {
    Temperament.findOrCreate({
      where: { name: el },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

router.post("/breed", async (req, res) => {
  const {
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
    createdInDB
  } = req.body;
  const breedCreated = await Breed.create({
    weight,
    height,
    id,
    name,
    bred_for,
    breed_group,
    life_span,
    origin,
    reference_image_id,
    image,
    createdInDB
  })

  let temperamentDb = await Temperament.findAll({
    where: {nombre:temperament}
  })
  breedCreated.addTemperament(temperamentDb);
  res.send("Raza creada con éxito");
});

module.exports = router;
