const express = require('express')
const router = express.Router()
const SearchController = require('../controllers/search.controller')

router.get('/jira', SearchController.jira)

module.exports = router
