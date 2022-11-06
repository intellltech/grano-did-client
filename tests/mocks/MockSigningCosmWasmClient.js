// @ts-check
'use strict'

const mockConnectWithSignerResult = require('./mockConnectWithSignerResult')
const mockUploadResult = require('./mockUploadResult')

class MockSigningCosmWasmClient {
  static async connectWithSigner () {
    return mockConnectWithSignerResult
  }

  async upload () {
    return mockUploadResult
  }
}

module.exports = MockSigningCosmWasmClient
