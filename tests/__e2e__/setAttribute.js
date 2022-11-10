// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

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

      test.each(tables)('params: $params', async ({
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
