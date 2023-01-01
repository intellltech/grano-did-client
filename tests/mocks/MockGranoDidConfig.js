// @ts-check
'use strict'

const GranoDidConfig = require('./../../lib/GranoDidConfig')

const mockGranoDidConfigParams = {
  endPoint: 'http://localhost:26657',
  denom: 'ugrano',
  mnemonic: 'estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic',
  prefix: 'grano',
  fromAddress: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
}

const mockGranoDidConfig = GranoDidConfig.create(mockGranoDidConfigParams)

module.exports = {
  mockGranoDidConfigParams,
  mockGranoDidConfig,
}
