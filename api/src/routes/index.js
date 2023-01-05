const { Router } = require("express");
//const { Breed,Temperament,breeds_temperaments } = require("../db.js");
const Breed = require('./breeds');
const Temperament = require('./temperaments')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get("/dogs", async (req, res) => {
//   const { name } = req.query;
//   const apiBreeds = await getApiInfo();
//   try {
//     //SI YA TENGO DB LLENA NO HAGO NARANJA
//     let hay = await Breed.findAll();
//     //SI NO TENGO DATOS EN MI DB LOS CREO
//     if (hay.length) await Breed.bulkCreate(apiBreeds);
//   } catch (error) {
//     console.log(error);
//   }
//   if (name) {
//     try {
//       let breed = await Breed.findAll({
//         where: {
//           name: {
//             [Op.ilike]: "%" + name + "%",
//           },
//         },
//       });
//       return res.json(breed);
//     } catch (error) {
//       console.log(error);
//     }
//   } else if (req.query.filter) {
//     try {
//       let breed = await Breed.findAll({
//         where: {
//           status: req.query.filter,
//         },
//         limit: 6,
//         offset: req.query.page,
//         order: [["name", req.query.order]],
//         include: { model: Temperament },
//       });
//       return res.json(breed);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     try {
//       let breed = await Breed.findAll({
//         limit: 6,
//         offset: req.query.page,
//         order: [["name", req.query.order]],
//         include: { model: Temperament },
//       });
//       return res.json(breed);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

// router.get("/dogs/:id", (req, res) => {
//   const { id } = req.params;
//   try {
//     const breed = getBreedById(id);
//     return res.status(200).json(breed);
//   } catch(error){
//     console.log(error);
//   }
// });

//array.flat();
// router.get("/temperaments", async (req, res) => {
//   const temperamentsApi = await axios.get(
//     "https://api.thedogapi.com/v1/breeds"
//   );
//   const temperaments = temperamentsApi.data.map((el) => el.temperament);
//   const tempEach = temperaments.map((el) => {
//     for (let i = 0; i < el.length; i++) return el[i];
//   });
//   console.log(tempEach);
//   tempEach.forEach((el) => {
//     Temperament.findOrCreate({
//       where: { name: el },
//     });
//   });
//   const allTemperaments = await Temperament.findAll();
//   res.send(allTemperaments);
// });

// router.post("/dogs", async (req, res) => {
//   const {
//     weight,
//     height,
//     id,
//     name,
//     bred_for,
//     breed_group,
//     life_span,
//     temperament,
//     origin,
//     reference_image_id,
//     image,
//     createdInDB,
//   } = req.body;
//   const breedCreated = await Breed.create({
//     weight,
//     height,
//     id,
//     name,
//     bred_for,
//     breed_group,
//     life_span,
//     origin,
//     reference_image_id,
//     image,
//     createdInDB,
//   });

//   let temperamentDb = await Temperament.findAll({
//     where: { nombre: temperament },
//   });
//   breedCreated.addTemperament(temperamentDb);
//   res.send("Raza creada con éxito");
// });

router.use('/dogs', Breed)
router.use('/temperaments', Temperament)

module.exports = router;
