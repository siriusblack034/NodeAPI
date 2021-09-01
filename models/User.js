const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({ // Tạo 1 bảng
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  decks: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }]
})
const User = mongoose.model('User', userSchema)
module.exports = User
