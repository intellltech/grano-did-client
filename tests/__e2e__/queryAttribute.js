// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('#attribute', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
            name: 'service',
          },
          expected: { values: [] },
        },
        {
          params: {
            codeId: 1,
            identifier: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv',
            name: 'service.id',
          },
          expected: { values: [] },
        }
      ]

      test.each(tables)('params:$params', async ({
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

        const attributeParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
          name: params.identifier,
        }
        const queryAttributeResult = await client.attribute(attributeParams)

        expect(queryAttributeResult).toEqual(expected)
      })
    })
  })
})
