const express = require('express')
const router = express.Router()
const { validateBody, validateParams, schemas } = require('../helpers/routerHelpers')
const userController = require('../controllers/users')

router.route('/')
  .get(userController.index)
  .post(validateBody(schemas.userChema), userController.createUser)
router.route('/:userID')
  .get(validateParams(schemas.idSchema, 'userID'), userController.getUser)
  .put(validateParams(schemas.idSchema, 'userID'), validateBody(schemas.userChema), userController.replaceUser)         // replace 1 user Mới vào 1 user cũ
  .patch(validateParams(schemas.idSchema, 'userID'), validateBody(schemas.userOptional), userController.updateUser)         // update có thể 1 trường hoặc tất cả trường
  .delete(validateParams(schemas.idSchema, 'userID'), userController.deleteUser)
router.route('/:userID/decks')
  .get(validateParams(schemas.idSchema, 'userID'), userController.getUserDecks)
  .post(validateParams(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), userController.createDeck)
module.exports = router
