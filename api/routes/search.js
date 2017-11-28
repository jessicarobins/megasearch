const express = require('express')
const passport = require('passport')
const router = express.Router()
const SearchController = require('../controllers/search.controller')

const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/jira', requireAuth, SearchController.jira)
router.get('/confluence', requireAuth, SearchController.confluence)
router.get('/atlassian', requireAuth, SearchController.atlassian)
router.get('/github', requireAuth, SearchController.github)
router.get('/slack', requireAuth, SearchController.slack)

module.exports = router
