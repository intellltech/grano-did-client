// @ts-check
'use strict'

const GranoDidConfig = require('./../../lib/GranoDidConfig')

const mockGranoDidConfigParams = {
  endPoint: 'http://localhost:26657',
  denom: 'uwasm',
  mnemonic: 'estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic',
  prefix: 'wasm',
  fromAddress: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
}

const mockGranoDidConfig = GranoDidConfig.create(mockGranoDidConfigParams)

module.exports = {
  mockGranoDidConfigParams,
  mockGranoDidConfig,
}
