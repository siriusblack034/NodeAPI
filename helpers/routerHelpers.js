const Joi = require('@hapi/joi')

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
  idSchema: Joi.object().keys({
    params: Joi.string().regex(/^[0-9a-fA-F]{24}/).required()
  })
}
module.exports = {
  validateParams,
  schemas
}