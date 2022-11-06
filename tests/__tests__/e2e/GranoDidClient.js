// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const objectContaining = expect.objectContaining
const arrayContaining = expect.arrayContaining

const GranoDidClient = require('../../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('.create()', () => {
    test('instance of the class', () => {
      const client = GranoDidClient.create()

      expect(client)
        .toBeInstanceOf(GranoDidClient)
    })
  })
})

describe('GranoDidClient', () => {
  describe('.createFulfilled()', () => {
    test('instance of the class', async () => {
      const client = await GranoDidClient.createFulfilled({
        OriginalSigningCosmWasmClient: SigningCosmWasmClient,
        config: mockGranoDidConfig,
      })

      expect(client)
        .toBeInstanceOf(GranoDidClient)
    })
  })
})

describe('GranoDidClient', () => {
  describe('.getChainId()', () => {
    test('getChainId', async () => {
      const client = await GranoDidClient.createFulfilled({
        OriginalSigningCosmWasmClient: SigningCosmWasmClient,
        config: mockGranoDidConfig,
      })

      const chainId = await client.getChainId()

      expect(chainId).toBe('did-1')
    })
  })
})

describe('GranoDidClient', () => {
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
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const response = await client.upload(wasmPath)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('GranoDidClient', () => {
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
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: codeId
        }
        const response = await client.instantiate(instantiateParams)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('controller(address)', () => {
    describe('controller successfully', () => {
      const tables = [
        {
          codeId: 1,
          address: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          expected: {
            controller: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        address,
        expected,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })

        const instantiateParams = {
          codeId: codeId
        }
        const result = await client.instantiate(instantiateParams)

        const controllerParams = {
          contractAddress: result.contractAddress,
          address: address,
        }
        const response = await client.controller(controllerParams)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('changeController(old, new)', () => {
    describe('changeController successfully', () => {
      const tables = [
        {
          codeId: 1,
          oldControllerAddress: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          newControllerAddress: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
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
        oldControllerAddress,
        newControllerAddress,
        expected,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: codeId
        }
        const result = await client.instantiate(instantiateParams)

        const oldControllerParams = {
          contractAddress: result.contractAddress,
          address: oldControllerAddress
        }
        const controllerQueryForOldAddressResult = await client.controller(oldControllerParams)
        expect(controllerQueryForOldAddressResult.controller).toEqual(oldControllerAddress)

        const changeControllerParams = {
          oldControllerAddress: oldControllerAddress,
          newControllerAddress: newControllerAddress,
        }
        const response = await client.changeController(changeControllerParams)
        expect(response).toEqual(expected)

        const newControllerParams = {
          contractAddress: result.contractAddress,
          address: newControllerAddress
        }
        const controllerQueryForNewAddressResult = await client.controller(newControllerParams)
        expect(controllerQueryForNewAddressResult.controller).toEqual(newControllerAddress)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('setAttribute(identifier,name,value,validity)', () => {
    describe('setAttribute successfully', () => {
      const tables = [
        {
          codeId: 1,
          address: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'age',
          value: '20',
          validity: 100,
          expectedResponse: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          },
          expectedWasmEvent: {
            type: 'wasm',
            attributes: arrayContaining([
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              },
              {
                key: 'name',
                value: 'age',
              },
              {
                key: 'value',
                value: '20',
              },
              {
                key: 'validTo',
                value: expect.any(String),
              },
              {
                key: 'previousChange',
                value: '0',
              },
            ])
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        address,
        name,
        value,
        validity,
        expectedResponse,
        expectedWasmEvent,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: codeId
        }
        await client.instantiate(instantiateParams)

        const setAttributeParams = {
          identifier: address,
          name: name,
          value: value,
          validity: validity
        }

        const response = await client.setAttribute(setAttributeParams)
        expect(response).toEqual(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('revokeAttribute(identifier,name,value)', () => {
    describe('revokeAttribute successfully', () => {
      const tables = [
        {
          codeId: 1,
          address: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
          name: 'age',
          value: '20',
          expectedResponse: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          },
          expectedWasmEvent: {
            type: 'wasm',
            attributes: arrayContaining([
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              },
              {
                key: 'name',
                value: 'age',
              },
              {
                key: 'value',
                value: '20',
              },
              {
                key: 'validTo',
                value: '0',
              },
            ])
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        codeId,
        address,
        name,
        value,
        expectedResponse,
        expectedWasmEvent,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: codeId
        }
        await client.instantiate(instantiateParams)

        const revokeAttributeParams = {
          identifier: address,
          name: name,
          value: value,
        }

        const response = await client.revokeAttribute(revokeAttributeParams)
        expect(response).toEqual(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)
      })
    })
  })
})
