// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('#instantiate', () => {
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
        const client = await GranoDidClient.createFulfilled({
          OriginalSigningCosmWasmClient: SigningCosmWasmClient,
          config: mockGranoDidConfig,
        })
        const instantiateParams = {
          codeId: codeId
        }
        const response = await client.instantiate(instantiateParams)
        expect(response).toMatchObject(expected)
      })
    })
  })
})
