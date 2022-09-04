// @ts-check
'use strict'

const objectContaining = expect.objectContaining

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

describe('DidClient', () => {
  describe('.upload()', () => {
    describe('upload successfully', () => {
      const tables = [
        {
          wasmPath: './wasm/did_contract.wasm',
          expected: objectContaining({
            originalSize: expect.any(Number),
            originalChecksum: expect.any(String),
            compressedSize: expect.any(Number),
            compressedChecksum: expect.any(String),
            codeId: expect.any(Number),
            height: expect.any(Number),
            logs: expect.any(Array),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          })
        }
      ]

      test.each(tables)('wasmPath: $wasmPath', async ({
        wasmPath,
        expected,
      }) => {
        const client = await DidClient.createFulfilled(
          mockDidConfig
        )
        const response = await client.upload(wasmPath)
        expect(response).toEqual(expected)
      })
    })
  })
})
