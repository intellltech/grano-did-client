// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('#validTo', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            name: 'service',
            value: '#github',
          },
          expected: { valid_to: '0' },
        },
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

        const validToParams = {
          contractAddress: contractAddress,
          identifier: params.identifier,
          name: params.identifier,
          value: params.value,
        }
        const queryValidToResult = await client.validTo(validToParams)

        expect(queryValidToResult).toEqual(expected)
      })
    })
  })
})
