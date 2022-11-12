// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')

const GranoDidClient = require('../../lib/GranoDidClient')
const { mockGranoDidConfig } = require('../mocks/MockGranoDidConfig')

describe('GranoDidClient', () => {
  describe('revokeAttribute', () => {
    describe('success', () => {
      const tables = [
        {
          params: {
            codeId: 1,
            setAttribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.id',
              value: '#github',
              validity: 3600 * 24, // second
            },
            revokeAttribute: {
              identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              name: 'service.id',
              value: '#github',
            }
          },
          expected: {
            response: {
              logs: expect.any(Array),
              height: expect.any(Number),
              transactionHash: expect.any(String),
              gasWanted: expect.any(Number),
              gasUsed: expect.any(Number)
            },
            wasmEvent: {
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
            },
          }
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

        const setAttributeParams = {
          contractAddress: contractAddress,
          identifier: params.setAttribute.identifier,
          name: params.setAttribute.name,
          value: params.setAttribute.value,
          validity: params.setAttribute.validity,
        }
        await client.setAttribute(setAttributeParams)

        const revokeAttributeParams = {
          contractAddress: contractAddress,
          identifier: params.revokeAttribute.identifier,
          name: params.revokeAttribute.name,
          value: params.revokeAttribute.value,
        }

        const response = await client.revokeAttribute(revokeAttributeParams)
        expect(response).toMatchObject(expected.response)
        const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
        expect(wasmEvent).toEqual(expected.wasmEvent)

        // check queryValidTo
        const validToParams = {
          contractAddress: contractAddress,
          identifier: params.revokeAttribute.identifier,
          name: params.revokeAttribute.name,
          value: params.revokeAttribute.value,
        }
        const queryValidToResult = await client.validTo(validToParams)
        expect(parseInt(queryValidToResult.valid_to)).toEqual(0)
      })
    })
  })
})
