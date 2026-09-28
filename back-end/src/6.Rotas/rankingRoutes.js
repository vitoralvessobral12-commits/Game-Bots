const express = require('express')
const router = express.Router()

const rankingController = require('../4.Controladores/rankingController')

router.get('/ranking', rankingController.listarRanking)

module.exports = router