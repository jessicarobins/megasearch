const express = require('express')
const router = express.Router()
const SearchController = require('../controllers/search.controller')

router.get('/jira', SearchController.jira)
router.get('/confluence', SearchController.confluence)
router.get('/github', SearchController.github)

module.exports = router
