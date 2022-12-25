const { Router } = require("express");
const db = require("../db");
const { Breed,Temperament,breeds_temperaments } = require("../db.js");
const { Op } = require('sequelize');
const router = Router();
const {
  getBreedsApiInfo,
  getBreedsDbInfo,
  getAllBreeds,
  getBreedByName,
  getBreedById,
  postBreed,
} = require("../controllers/breed");



router.get("/", getBreedByName);

router.get("/:id", getBreedById);

router.post("/", postBreed);

module.exports = router;
