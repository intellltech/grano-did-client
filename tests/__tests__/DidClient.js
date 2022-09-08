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

describe('DidClient', () => {
  describe('.instantiate()', () => {
    describe('instantiate successfully', () => {
      const tables = [
        {
          codeId: 1,
          expected: objectContaining({
            contractAddress: expect.any(String),
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          })
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        expected,
      }) => {
        const client = await DidClient.createFulfilled(
          mockDidConfig
        )
        const response = await client.instantiate(codeId)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('DidClient', () => {
  describe('identityOwner(address)', () => {
    describe('identityOwner successfully', () => {
      const tables = [
        {
          codeId: 1,
          address: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          expected: {
            owner: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        address,
        expected,
      }) => {
        const client = await DidClient.createFulfilled(
          mockDidConfig
        )
        await client.instantiate(codeId)
        const response = await client.identityOwner(address)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('DidClient', () => {
  describe('changeOwner(old, new)', () => {
    describe('changeOwner successfully', () => {
      const tables = [
        {
          codeId: 1,
          oldOwnerAddress: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          newOwnerAddress: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          expected: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        oldOwnerAddress,
        newOwnerAddress,
        expected,
      }) => {
        const client = await DidClient.createFulfilled(
          mockDidConfig
        )
        await client.instantiate(codeId)
        const identityOwnerQueryForOldAddressResult = await client.identityOwner(oldOwnerAddress)
        expect(identityOwnerQueryForOldAddressResult.owner).toEqual(oldOwnerAddress)

        const response = await client.changeOwner(oldOwnerAddress, newOwnerAddress)
        expect(response).toEqual(expected)

        const identityOwnerQueryForNewAddressResult = await client.identityOwner(oldOwnerAddress)
        expect(identityOwnerQueryForNewAddressResult.owner).toEqual(newOwnerAddress)
      })
    })
  })
})
