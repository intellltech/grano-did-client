// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

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
