// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../../lib/GranoDidClient')

const { mockGranoDidConfig } = require('../../mocks/MockGranoDidConfig')
const MockSigningCosmWasmClient = require('../../mocks/MockSigningCosmWasmClient')

const mockExecuteResult = require('../../mocks/mockExecuteResult')
const mockSigningCosmWasmClient = new MockSigningCosmWasmClient()
const client = GranoDidClient.create({
  signingCosmWasmClient: /** @type{*} */ (mockSigningCosmWasmClient),
  granoDidConfig: mockGranoDidConfig,
})

describe('GranoDidClient', () => {
  describe('#create', () => {
    test('instance of the class', () => {
      const client = GranoDidClient.create()

      expect(client)
        .toBeInstanceOf(GranoDidClient)
    })
  })
})

describe('GranoDidClient', () => {
  describe('#createFulfilled', () => {
    test('instance of the class', async () => {
      const mockConnectWithSigner = jest.fn().mockReturnValue(MockSigningCosmWasmClient.connectWithSigner())
      SigningCosmWasmClient.connectWithSigner = mockConnectWithSigner

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
  describe('#upload', () => {
    describe('success', () => {
      const tables = [
        {
          wasmPath: './wasm/did_contract.wasm',
          expected: {
            originalSize: expect.any(Number),
            originalChecksum: expect.any(String),
            compressedSize: expect.any(Number),
            compressedChecksum: expect.any(String),
            codeId: expect.any(Number),
            height: expect.any(Number),
            logs: expect.any(Array),
            transactionHash: expect.any(String),
            gasWanted: expect.any(Number),
            gasUsed: expect.any(Number),
          }
        }
      ]

      test.each(tables)('wasmPath: $wasmPath', async ({
        wasmPath,
        expected,
      }) => {
        const actual = await client.upload({ wasmPath: wasmPath })

        expect(actual).toMatchObject(expected)
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('instantiate', () => {
    describe('success', () => {
      const tables = [
        {
          codeId: 1,
          expected: {
            contractAddress: expect.any(String),
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
        expected,
      }) => {
        const instantiateParams = {
          codeId: codeId
        }
        const response = await client.instantiate(instantiateParams)
        expect(response).toMatchObject(expected)
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
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            mockResponse: {
              controller: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
          },
          expected: {
            controller: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        params,
        expected,
      }) => {
        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const controllerParams = {
          contractAddress: result.contractAddress,
          identifier: params.identifier,
        }
        const spyClient = jest.spyOn(mockSigningCosmWasmClient, 'queryContractSmart')
          .mockImplementation(() => Promise.resolve(params.mockResponse))
        const response = await client.controller(controllerParams)
        expect(response).toEqual(expected)

        expect(spyClient).toHaveBeenCalled()

        spyClient.mockRestore()
      })
    })
  })
})

describe('GranoDidClient', () => {
  describe('#changed', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            mockResponse: {
              block: 1000,
            },
          },
          expected: {
            block: expect.any(Number),
          }
        }
      ]

      test.each(tables)('codeId: $codeId', async ({
        params,
        expected,
      }) => {
        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const changedParams = {
          contractAddress: result.contractAddress,
          identifier: params.identifier,
        }
        const spyClient = jest.spyOn(mockSigningCosmWasmClient, 'queryContractSmart')
          .mockImplementation(() => Promise.resolve(params.mockResponse))
        const response = await client.changed(changedParams)
        expect(response).toEqual(expected)

        expect(spyClient).toHaveBeenCalled()

        spyClient.mockRestore()
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
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            newController: 'grano14svund04f69g3ue77d2qc7nf0tye4cf0pm2zum',
            mockQueryResponseFirst: {
              controller: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
            mockQueryResponseSecond: {
              controller: 'grano14svund04f69g3ue77d2qc7nf0tye4cf0pm2zum',
            },
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
        const instantiateParams = {
          codeId: params.codeId
        }
        const result = await client.instantiate(instantiateParams)

        const contractAddress = result.contractAddress

        const controllerParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
        }
        const spyQueryClient = jest.spyOn(mockSigningCosmWasmClient, 'queryContractSmart')
          .mockImplementationOnce(() => Promise.resolve(params.mockQueryResponseFirst))
          .mockImplementationOnce(() => Promise.resolve(params.mockQueryResponseSecond))

        const firstControllerQueryResult = await client.controller(controllerParams)
        expect(firstControllerQueryResult.controller).toEqual(params.identifier)

        const changeControllerParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
          newController: params.newController,
        }
        const spyExecuteClient = jest.spyOn(mockSigningCosmWasmClient, 'execute')
          .mockImplementation(() => Promise.resolve(mockExecuteResult['changeController']))

        const response = await client.changeController(changeControllerParams)
        expect(response).toEqual(expected)

        const secondControllerQueryResult = await client.controller(controllerParams)
        expect(secondControllerQueryResult.controller).toEqual(params.newController)

        expect(spyQueryClient).toHaveBeenCalledTimes(2)
        expect(spyExecuteClient).toHaveBeenCalled()

        spyQueryClient.mockRestore()
        spyExecuteClient.mockRestore()
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
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
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
                key: 'executeMsg',
                value: 'setAttribute',
              },
              {
                key: 'identifier',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
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

      test.each(tables)('params: $params', async ({
        params,
        expectedResponse,
        expectedWasmEvent,
      }) => {
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

        const spyExecuteClient = jest.spyOn(mockSigningCosmWasmClient, 'execute')
          .mockImplementation(() => Promise.resolve(mockExecuteResult['setAttribute']))

        const response = await client.setAttribute(setAttributeParams)
        expect(response).toMatchObject(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)

        expect(spyExecuteClient).toHaveBeenCalled()
        spyExecuteClient.mockRestore()
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
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
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
                key: 'executeMsg',
                value: 'revokeAttribute',
              },
              {
                key: 'identifier',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
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
        const spyExecuteClient = jest.spyOn(mockSigningCosmWasmClient, 'execute')
          .mockImplementation(() => Promise.resolve(mockExecuteResult['revokeAttribute']))

        const response = await client.revokeAttribute(revokeAttributeParams)
        expect(response).toMatchObject(expectedResponse)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expectedWasmEvent)

        expect(spyExecuteClient).toHaveBeenCalled()
        spyExecuteClient.mockRestore()
      })
    })
  })
})
