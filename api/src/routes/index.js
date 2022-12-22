const { Router } = require("express");
const axios = require("axios");
const {
  getApiInfo,
  getDbInfo,
  getAllBreeds,
  getBreedByName,
  getBreedById
} = require("./controllers.js");
// TRAER LAS TABLAS CREADAS DE SQL
const Breed = require("../models/Breed");
const Temperament = require("../models/Temperament");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
router.get("/dogs", (req, res) => {
  const breeds = getAllBreeds();
  if(breeds.length) return breeds;
  return res.status(400).json({error: 'No se encontraron razas'});
})

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get("/dogs", (req,res) => {
  const { name } = req.query;
  if (name) {
    const breeds = getBreedByName(name);
    if (!breeds) return res.status(400).json({error: 'No se encontraron razas con ese nombre'});
    else return res.status(200).json(breeds);
  } else {
    const breeds = getAllBreeds();
    if(breeds.length) return breeds;
    return res.status(400).json({error: 'No se encontraron razas'});
  }
})

// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get("/dogs/:id", (req,res) => {
  const { id } = req.params;
  const breed = getBreedById(id);
  if (breed["error"]) return res.status(400).json(breed);
  else return res.status(200).json(breed);
})

//array.flat();
// [ ] GET /temperaments:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
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

// [ ] POST /dogs:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos relacionada con sus temperamentos
router.post("/dogs", async (req, res) => {
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