const User = require('../models/User')
const Deck = require('../models/Deck')

const index = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users })
  } catch (error) {
    next(error)

  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    await User.deleteOne({ "_id": userID })
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}
const getUserDecks = async (req, res, next) => {
  try {
    const { userID } = req.params
    const user = await (User.findById(userID)).populate('decks')
    return res.status(200).json({ decks: user.decks })
  } catch (error) {
    next(error)
  }
}
const getUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    const user = await User.findById(userID)
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }

}
const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(200).json({ user: newUser })
  } catch (error) {
    next(error)
  }
}
const createDeck = async (req, res, next) => {
  try {
    const { userID } = req.params
    const newDeck = new Deck(req.body)
    const user = await User.findById(userID)
    newDeck.owner = user
    await newDeck.save();
    user.decks.push(newDeck._id)
    await user.save();
    return res.status(200).json({ deck: newDeck })

  } catch (error) {
    next(error)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}
const replaceUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({ success: true })

  } catch (error) {
    next(error)
  }
}
module.exports = {
  index,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  replaceUser,
  getUserDecks,
  createDeck
}