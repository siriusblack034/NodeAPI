const express = require('express')
const router = express.Router()
const { validateParams, schemas } = require('../helpers/routerHelpers')
const userController = require('../controllers/users')

router.route('/')
  .get(userController.index)
  .post(userController.createUser)
router.route('/:userID')
  .get(validateParams(schemas.idSchema,'userID'), userController.getUser)
  .put(userController.replaceUser)         // replace 1 user Mới vào 1 user cũ
  .patch(userController.updateUser)         // update có thể 1 trường hoặc tất cả trường
router.route('/:userID/decks')
  .get(userController.getUserDecks)
  .post(userController.createDeck)
module.exports = router
