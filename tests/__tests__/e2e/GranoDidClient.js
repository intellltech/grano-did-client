// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const objectContaining = expect.objectContaining

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
        const response = await client.upload({ wasmPath: wasmPath })
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
  describe('#controller', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          },
          expected: {
            controller: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        params,
        expected,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })

        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const controllerParams = {
          contractAddress: result.contractAddress,
          identifier: params.identifier,
        }
        const response = await client.controller(controllerParams)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('#changeController', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            newController: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
          },
          expected: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          }
        }
      ]

      test.each(tables)('params: $params', async ({
        params,
        expected,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const contractAddress = result.contractAddress

        const controllerParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
        }
        const firstControllerQueryResult = await client.controller(controllerParams)
        expect(firstControllerQueryResult.controller).toEqual(params.identifier)

        const changeControllerParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
          newController: params.newController,
        }
        const response = await client.changeController(changeControllerParams)
        expect(response).toEqual(expected)

        const secondControllerQueryResult = await client.controller(controllerParams)
        expect(secondControllerQueryResult.controller).toEqual(params.newController)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('setAttribute', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            name: 'service.id',
            value: '#github',
            validity: 3600 * 24, // second
          },
          expectedResponse: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          },
          expectedWasmEvent: {
            type: 'wasm',
            attributes: expect.arrayContaining([
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              },
              {
                key: 'name',
                value: 'service.id',
              },
              {
                key: 'value',
                value: '#github',
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
        params,
        expectedResponse,
        expectedWasmEvent,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: params.codeId
        }

        const result = await client.instantiate(instantiateParams)

        const setAttributeParams = {
          contractAddress: result.contractAddress,
          identifier: params.identifier,
          name: params.name,
          value: params.value,
          validity: params.validity,
        }

        const response = await client.setAttribute(setAttributeParams)
        expect(response).toMatchObject(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('revokeAttribute', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            name: 'service.id',
            value: '#github',
          },
          expectedResponse: {
            logs: expect.any(Array),
            height: expect.any(Number),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number)
          },
          expectedWasmEvent: {
            type: 'wasm',
            attributes: expect.arrayContaining([
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              },
              {
                key: 'name',
                value: 'service.id',
              },
              {
                key: 'value',
                value: '#github',
              },
              {
                key: 'validTo',
                value: '0',
              },
            ])
          }
        }
      ]

      test.each(tables)('params:$params', async ({
        params,
        expectedResponse,
        expectedWasmEvent,
      }) => {
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const revokeAttributeParams = {
          contractAddress: result.contractAddress,
          identifier: params.identifier,
          name: params.name,
          value: params.value,
        }

        const response = await client.revokeAttribute(revokeAttributeParams)
        expect(response).toMatchObject(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)
      })
    })
  })
})