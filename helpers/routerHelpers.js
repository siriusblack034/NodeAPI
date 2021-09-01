const Joi = require('@hapi/joi')

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
    }
    else {
      if (!req.value) req.value = {}
      if (!req.value.params) req.value.params = {}
      req.body = validatorResult.value
      next()
    }
  }
}

const validateParams = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ params: req.params[name] })

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
    }
    else {
      console.log(req.params[name]);
      if (!req.value) req.value = {}
      if (!req.value.params) req.value.params = {}
      req.value.params[name] = req.params[name]
      next();
    }
  }
}


const schemas = {
  deckSchema: Joi.object().keys({
    name: Joi.string().required().min(2),
    description: Joi.string(),
    total: Joi.number()
  }),
  idSchema: Joi.object().keys({
    params: Joi.string().regex(/^[0-9a-fA-F]{24}/).required()
  }),
  userChema: Joi.object().keys({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().email().required()
  }),
  userOptional: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email()
  })
}
module.exports = {
  validateParams,
  validateBody,
  schemas,
}