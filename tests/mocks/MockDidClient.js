// @ts-check
'use strict'

const MockDidClient = {
  config: {
    endPoint: 'http://localhost:26657',
  },
  didClient: {
    codesCache: {},
    tmClient: {
      client: {
        url: 'http://localhost:26657'
      }
    },
    queryClient: {
      tmClient: {
        client: {
          url: 'http://localhost:26657'
        }
      },
      auth: {},
      bank: {},
      wasm: {},
      tx: {}
    },
    chainId: 'did-1'
  }
}

module.exports = MockDidClient
