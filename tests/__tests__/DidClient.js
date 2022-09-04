// @ts-check
'use strict'

const DidClient = require('../../lib/DidClient')
const { mockDidConfig } = require('../mocks/MockDidConfig')

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
      const client = await DidClient.createFulfilled(
        mockDidConfig
      )

      expect(client)
        .toBeInstanceOf(DidClient)
    })
  })
})

describe('DidClient', () => {
  describe('.getChainId()', () => {
    test('getChainId', async () => {
      const client = await DidClient.createFulfilled(
        mockDidConfig
      )

      const chainId = await client.getChainId()

      expect(chainId).toBe('did-1')
    })
  })
})
