// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

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
