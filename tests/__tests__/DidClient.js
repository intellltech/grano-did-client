// @ts-check
'use strict'

// const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const DidClient = require('../../lib/DidClient')
const DidConfig = require('../../lib/DidConfig')

describe('DidClient', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const client = DidClient.create()

      expect(client)
        .toBeInstanceOf(DidClient)
    })
  })
})

describe('DidClient', () => {
  describe('.createFulfilled()', () => {
    test('instance of the class', async () => {
      const mockConfigParam = {
        endPoint: 'http://localhost:26657'
      }

      const client = await DidClient.createFulfilled(
        DidConfig.create(mockConfigParam)
      )

      expect(client)
        .toBeInstanceOf(DidClient)
    })
  })
})

describe('DidClient', () => {
  describe('.getChainId()', () => {
    test('getChainId', async () => {
      const mockConfigParam = {
        endPoint: 'http://localhost:26657'
      }

      const didClient = await DidClient.createFulfilled(
        DidConfig.create(mockConfigParam)
      )

      const chainId = await didClient.getChainId()

      expect(chainId).toBe('did-1')
    })
  })
})
