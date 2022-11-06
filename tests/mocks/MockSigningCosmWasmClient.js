// @ts-check
'use strict'

const mockConnectWithSignerResult = require('./mockConnectWithSignerResult')
const mockUploadResult = require('./mockUploadResult')
const mockInstantiateResult = require('./mockInstantiateResult')
const mockExecuteResult = require('./mockExecuteResult')

class MockSigningCosmWasmClient {
  static async connectWithSigner () {
    return mockConnectWithSignerResult
  }

  async upload () {
    return mockUploadResult
  }

  async instantiate () {
    return mockInstantiateResult
  }

  async queryContractSmart () {
    return expect.any()
  }

  async execute (key) {
    return mockExecuteResult[key]
  }
}

module.exports = MockSigningCosmWasmClient
