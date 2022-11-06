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

  async getChainId () {
    return 'did-1'
  }
}

module.exports = MockSigningCosmWasmClient
