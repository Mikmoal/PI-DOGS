const { Router } = require("express");
const db = require("../db");
const { Breed,Temperament,breeds_temperaments } = require("../db.js");
const { Op } = require('sequelize');
const router = Router();
const {
  getTemperaments,
} = require("../controllers/breed");



router.get('/', getTemperaments)

module.exports = router;